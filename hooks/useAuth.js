import { createContext } from 'react'
import { useSession } from 'next-auth/client'

export const AuthContext = createContext()

export default function AuthProvider ({ children }) {
  const [session, loading] = useSession()

  return <AuthContext.Provider value={[session, loading]}>{children}</AuthContext.Provider>
}
