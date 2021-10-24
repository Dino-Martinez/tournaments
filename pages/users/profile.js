import ProfileData from '../../components/ProfileData'

export default function Profile () {
  return (
    <ProfileData></ProfileData>
  )
}

Profile.auth = {
  protected: true,
  callbackUrl: '/profile'
}
