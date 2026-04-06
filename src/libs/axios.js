import axios from 'axios'
import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'
const API_URL = import.meta.env.VITE_PORT_URL

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000
})

let isRefreshing = false
let queue = []

api.interceptors.response.use(undefined, async error => {
  if (error.config._retry == true) {
    window.location.href = '/auth'
  }

  if (error.code === 'ECONNABORTED') {
    return toast.error('Something went wrong , Please try again', {
      ...toastPresets.authError(),
      position: 'top-center'
    })
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
