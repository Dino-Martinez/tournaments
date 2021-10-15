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
  }
  // {
  //   key: 'authorIsPlayer',
  //   type: 'checkbox',
  //   label: 'Act as a player?'
  // }
]
export default function CreateTeam () {
  const [data, loading, refetch] = useApi('/api/teams')
  // eslint-disable-next-line no-unused-vars
  const [session, waiting, user] = useContext(AuthContext)
  const [authenticated, setAuthenticatedStatus] = useState(false)

  const onSubmit = (values) => {
    console.log(values)
    values.author = session.user.email
    values.owner = values.author
    values.members = [user._id]
    refetch('', { method: 'POST', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (!loading && data && data.ok) {
      Router.push('/teams')
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
