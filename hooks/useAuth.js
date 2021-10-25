import React, { createContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import useApi from './useApi'
import PropTypes from 'prop-types'

export const AuthContext = createContext()

export default function AuthProvider ({ children }) {
  const [session, waiting] = useSession()
  const { data: user, refetch: fetchUser } = useApi('/api/users')
  useEffect(() => {
    if (session && !waiting) fetchUser(session.user.email)
  }, [session, waiting])
  return <AuthContext.Provider value={{ session, waiting, user }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node
}
