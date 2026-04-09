import { useContext, createContext, useEffect } from 'react'
import { setToken, getToken, clearToken } from '../libs/token'
import { api } from '../libs/axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider ({ children }) {
  const navigate = useNavigate()
  
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

    const token = getToken()
    if (!token) {
      silentRefresh()
    }
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
