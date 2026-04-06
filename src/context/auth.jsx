import { useContext, createContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider ({ children }) {
  const [token, SetToken] = useState(null)

  return (
    <AuthContext.Provider value={{ SetToken, token: token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};