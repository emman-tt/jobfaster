import axios from 'axios'
import { toast } from 'sonner'
import { toastPresets } from '../components/toasters'
import { getToken, setToken } from './token'

const API_URL = import.meta.env.VITE_PORT_URL

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000
})

let isRefreshing = false
let queue = []

api.interceptors.request.use(config => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(undefined, async error => {
  // only redirect if it was a retried auth request
  if (error.config._retry && error.response?.status === 401) {
    window.location.href = '/auth'
    return
  }

  if (error.code === 'ECONNABORTED') {
    return toast.error('Something went wrong, please try again', {
      ...toastPresets.authError(),
      position: 'top-center'
    })
  }

  if (
    error.response?.data?.message === 'ACCESS_TOKEN_EXPIRED' && // ← data.message
    !error.config._retry
  ) {
    error.config._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push(err => {
          if (err) return reject(err) // ← handle rejection
          resolve(api(error.config))
        })
      })
    }

    isRefreshing = true

    try {
      const { data } = await api.post('/auth/refresh')
      console.log(data)
      setToken(data.accessToken) // ← store new token
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}` // ← update default header
      queue.forEach(cb => cb(null)) // ← resolve queue
      queue = []
      return api(error.config) // ← retry original request
    } catch (err) {
      queue.forEach(cb => cb(err)) // ← reject queue on failure
      queue = []
      window.location.href = '/auth' // ← redirect on refresh failure
    } finally {
      isRefreshing = false
    }
  }

  throw error
})
