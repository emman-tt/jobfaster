import { useContext, createContext, useEffect, useRef } from 'react'
import { setToken, getToken, clearToken } from '../libs/token'
import { api } from '../libs/axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider ({ children }) {
  const navigate = useNavigate()
  const isRefreshing = useRef(false)
  
  const logout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (err) {
      console.error('Logout error:', err)
    }
    clearToken()
    delete api.defaults.headers.common['Authorization']
    navigate('/auth')
  }
  
  useEffect(() => {
    const controller = new AbortController()
    const silentRefresh = async () => {
      if (isRefreshing.current) return
      isRefreshing.current = true

      try {
        const res = await api.post(
          '/auth/refresh',
          {},
          {
            withCredentials: true,
            signal: controller.signal
          }
        )

        const data = res.data
        const token = data.data

        setToken(token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } catch (err) {
        if (err.name === 'AbortError') return
        const isNetworkError = !err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED'
        if (!isNetworkError) {
          console.error('Auth refresh failed:', err)
          navigate('/auth')
        }
      } finally {
        isRefreshing.current = false
      }
    }

    const token = getToken()
    if (!token) {
      silentRefresh()
    }

    return () => controller.abort()
  }, [navigate])
  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
