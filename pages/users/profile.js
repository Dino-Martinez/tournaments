import { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import Authenticator from '../../components/Authenticator'
import ApiResolver from '../../components/ApiResolver'
import ProfileData from '../../components/ProfileData'

export default function Profile ({ session, authenticating }) {
  const [data, refetch, loading] = useApi('/api/users')
  const [authenticated, setAuthenticatedStatus] = useState(false)

  useEffect(() => { if (session) refetch(session.user.email) }, [authenticated])

  return (
    <>
      <Authenticator setReady={setAuthenticatedStatus} session={session} authenticating={authenticating} />
      <ApiResolver loading={loading} data={data}>
        <ProfileData data={data}></ProfileData>
      </ApiResolver>
    </>
  )
}
