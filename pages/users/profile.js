import useApi from '../../hooks/useApi'
import ApiResolver from '../../components/ApiResolver'
import ProfileData from '../../components/ProfileData'

export default function Profile () {
  const { data, loading } = useApi('/api/users')
  return (
    <>
      <ApiResolver loading={loading} data={data}>
        <ProfileData data={data}></ProfileData>
      </ApiResolver>
    </>
  )
}

Profile.auth = {
  protected: true,
  callbackUrl: '/profile'
}
