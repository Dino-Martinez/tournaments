import useApi from './useApi'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function useUser () {
  const { data: session, status } = useSession()
  const { data: user, refetch } = useApi('/api/users')

  const refresh = () => {
    refetch(session.user.email)
  }

  useEffect(() => {
    if (status === 'authenticated') refresh()
  }, [status])

  return [user, refresh]
}
