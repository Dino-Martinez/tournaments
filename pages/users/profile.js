import ProfileData from '../../components/ProfileData'
import React from 'react'

export default function Profile () {
  return (
    <ProfileData></ProfileData>
  )
}

Profile.auth = {
  protected: true,
  callbackUrl: '/profile'
}
