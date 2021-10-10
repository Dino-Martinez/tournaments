import { useContext, useState } from 'react'
import InputForm from '../../components/InputForm'
import { AuthContext } from '../../hooks/useAuth'
import Authenticator from '../../components/Authenticator'

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
  const [session] = useContext(AuthContext)
  const [authenticated, setAuthenticatedStatus] = useState(false)

  const onSubmit = (values) => {
    values.author = session.user.email
    console.log(values)
  }

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
