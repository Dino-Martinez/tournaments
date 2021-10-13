import { useEffect, useContext, useState } from 'react'
import InputForm from '../../components/InputForm'
import useApi from '../../hooks/useApi'
import Authenticator from '../../components/Authenticator'
import Router from 'next/router'
import { AuthContext } from '../../hooks/useAuth'

const fields = [
  {
    key: 'name',
    type: 'text',
    label: 'Team Name'
  },
  {
    key: 'authorIsPlayer',
    type: 'checkbox',
    label: 'Act as a player?'
  }
]
export default function CreateTeam () {
  const [data, loading, refetch] = useApi('/api/teams')
  const [session] = useContext(AuthContext)
  const [authenticated, setAuthenticatedStatus] = useState(false)

  const onSubmit = (values) => {
    values.author = session.user.email
    values.owner = values.author
    const isPlayer = values.authorIsPlayer === 'on' ? values.players = [values.author] : values.players = []
    values.members = [{ email: values.author, isManager: true, isPlayer }]
    delete values.authorIsPlayer
    refetch('', { method: 'POST', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (!loading && data) {
      if (data.result.ok) Router.push('/teams')
    }
  }, [loading, data])

  return (
    <>
      <Authenticator setReady={setAuthenticatedStatus}/>
      {authenticated &&
      <>
        <h1>Create a team:</h1>
        <InputForm fields={fields} onSubmit={onSubmit} />
      </>
      }
    </>
  )
}
