import axios from 'axios'
const API_URL = import.meta.env.VITE_PORT_URL

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000
})

let isRefreshing = false
let queue = []

api.interceptors.response.use(undefined, async error => {
  if (error.config._retry == true) {
    window.location.href = '/auth'
  }

  if (
    error.response?.message == 'ACCESS_TOKEN_EXPIRED' &&
    !error.config._retry
  ) {
    error.config._retry = true

    if (isRefreshing) {
      return new Promise(resolve => {
        queue.push(() => resolve(api(error.config)))
      })
    }

    isRefreshing = true

    try {
      await api.post('/auth/refresh')
      queue.forEach(cb => cb())
      queue = []
      return api(error.config)
    } finally {
      isRefreshing = false
    }
  }

  throw error
})
