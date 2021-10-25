import Router, { useRouter } from 'next/router'
import useApi from '../../../hooks/useApi'
import React, { useEffect } from 'react'
import useUser from '../../../hooks/useUser'

export default function TeamRegistration () {
  const router = useRouter()
  const { tid } = router.query

  const [user] = useUser()
  const { data, loading, refetch } = useApi(`/api/teams/${tid}/register`)
  const submit = () => {
    const update = {
      member: user._id
    }
    refetch('', { method: 'POST', body: JSON.stringify(update) })
  }

  useEffect(() => {
    if (!loading && data && data.acknowledged) {
      Router.push(`/teams/${tid}`)
    }
  }, [data, loading])
  return (
    <>
      <p>Registering for {tid}</p>
      <button onClick={submit}>Complete Registration</button>
    </>
  )
}

TeamRegistration.auth = {
  protected: true,
  redirect: '/teams/'
}
