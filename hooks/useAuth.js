import { createContext, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import useApi from './useApi'

export const AuthContext = createContext()

export default function AuthProvider ({ children }) {
  const [session, loading] = useSession()
  // eslint-disable-next-line no-unused-vars
  const [user, loadingUser, fetchUser] = useApi('/api/users')
  useEffect(() => {
    if (session && !loading) fetchUser(session.user.email)
  }, [session, loading])
  return <AuthContext.Provider value={[session, loading, user]}>{children}</AuthContext.Provider>
}
