import { useContext, createContext, useEffect } from 'react'
import { setToken } from '../libs/token'
import { api } from '../libs/axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider ({ children }) {
  const navigate = useNavigate()
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        const res = await api.post(
          '/auth/refresh',
          {},
          {
            withCredentials: true
          }
        )

        const data = res.data
        const token = data.data

        setToken(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (err) {
        console.log(err)
        navigate('/auth')
      }
    }

    silentRefresh()
  }, [navigate])
  return children
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
