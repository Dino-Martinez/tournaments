import { useContext, useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import Authenticator from '../../components/Authenticator'
import ApiResolver from '../../components/ApiResolver'
import ProfileData from '../../components/ProfileData'
import { AuthContext } from '../../hooks/useAuth'

export default function Profile () {
  const [session] = useContext(AuthContext)
  const { data, loading, refetch } = useApi('/api/users')
  const [authenticated, setAuthenticatedStatus] = useState(false)

  const refresh = () => { if (authenticated) refetch(session.user.email) }

  useEffect(() => { refresh() }, [authenticated])

  return (
    <>
      <Authenticator setReady={setAuthenticatedStatus} />
      <ApiResolver loading={loading} data={data}>
        <ProfileData data={data} refresh={refresh}></ProfileData>
      </ApiResolver>
    </>
  )
}
