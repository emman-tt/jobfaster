import axios from 'axios'
const API_URL = import.meta.env.VITE_PORT_URL


export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// api.interceptors.request.use(
//   config => {
//     const { getToken } = useToken()
//     const accessToken = getToken()
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     }

//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )
