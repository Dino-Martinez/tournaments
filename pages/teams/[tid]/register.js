import Router, { useRouter } from 'next/router'
import useApi from '../../../hooks/useApi'
import React, { useEffect } from 'react'
import useUser from '../../../hooks/useUser'
import ApiResolver from '../../../components/ApiResolver'
import Register from '../../../components/Register'

export default function TeamRegistration () {
  const router = useRouter()
  // const [user] = useUser()
  const { tid } = router.query
  const [user] = useUser()
  const { data, loading, refetch } = useApi(`/api/teams/${tid}/register`)
  const { data: team, loading: loadingTeam } = useApi(`/api/teams/${tid}`, {}, [], true)
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

  useEffect(() => {
    console.log(team, loadingTeam)
  }, [team, loadingTeam])
  return (
    <>
      {user && team &&
        <ApiResolver data={team} loading={loadingTeam}>
          <Register data={ [user.email, team.name] } callback={submit} />
        </ApiResolver>
      }
    </>
  )
}

TeamRegistration.auth = {
  protected: true,
  redirect: '/teams/'
}
