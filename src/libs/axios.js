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
  const status = error.response?.status
  const message = error.response?.data?.message

  if (error.config._retry && status === 401) {
    window.location.href = '/auth'
    return
  }

  if (error.code === 'ECONNABORTED') {
    toast.error('Request timed out, please try again', {
      ...toastPresets.authError(),
      position: 'top-center'
    })
    throw error
  }

  // if (!error.response) {
  //   toast.error('No internet connection', {
  //     ...toastPresets.authError(),
  //     position: 'top-center'
  //   })
  //   throw error
  // }

  if (error.response.status === 401 && !error.config._retry) {
    error.config._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push(err => {
          if (err) return reject(err)
          resolve(api(error.config))
        })
      })
    }

    isRefreshing = true

    try {
      const { data } = await api.post('/auth/refresh')
      console.log(data)
      const accessToken = data.data
      setToken(accessToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      queue.forEach(cb => cb(null))
      queue = []
      return api(error.config)
    } catch (err) {
      queue.forEach(cb => cb(err))
      queue = []
      const isNetworkError =
        !err.response ||
        err.code === 'ERR_NETWORK' ||
        err.code === 'ECONNABORTED'
      if (isNetworkError) {
        toast.error('No internet connection, please check your network', {
          ...toastPresets.authError(),
          position: 'top-center'
        })
      } else {
        window.location.href = '/auth'
      }
    } finally {
      isRefreshing = false
    }
  }

  switch (status) {
    case 403:
      toast.error('You do not have permission to do this', {
        ...toastPresets.authError(),
        position: 'top-center'
      })
      break
    case 429:
      toast.error('Too many requests, please slow down', {
        ...toastPresets.authError(),
        position: 'top-center'
      })
      break
    case 500:
    case 502:
    case 503:
      toast.error('Something went wrong, please try again', {
        ...toastPresets.authError(),
        position: 'top-center'
      })
      break
  }

  throw error
})
