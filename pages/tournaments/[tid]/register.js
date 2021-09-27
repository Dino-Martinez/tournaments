import Router, { useRouter } from 'next/router'
import useApi from '../../../hooks/useApi'
import { AuthContext } from '../../../hooks/useAuth'
import { useContext, useEffect } from 'react'

export default function TournamentRegistration () {
  const router = useRouter()
  const { tid } = router.query
  const [session] = useContext(AuthContext)
  const [data, loading, refetch] = useApi(`/api/tournaments/${tid}/register`)
  const submit = () => {
    const update = {
      registered: [session.user.email]
    }
    refetch('', { method: 'POST', body: JSON.stringify(update) })
  }

  useEffect(() => {
    if (!loading && data && data.ok) {
      Router.push(`/tournaments/${tid}`)
    }
  }, [loading])
  return (
    <>
      <p>Registering for {tid}</p>
      <button onClick={submit}>Complete Registration</button>
    </>
  )
}
