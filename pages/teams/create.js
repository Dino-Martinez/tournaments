import { useEffect } from 'react'
import InputForm from '../../components/InputForm'
import useApi from '../../hooks/useApi'
import Router from 'next/router'
import useUser from '../../hooks/useUser'

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
  const { data, loading, refetch } = useApi('/api/teams')
  const [user] = useUser()

  const onSubmit = (values) => {
    values.author = user.email
    values.owner = values.author
    values.members = [user._id]
    refetch('', { method: 'POST', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (!loading && data) {
      Router.push('/teams')
    }
  }, [loading, data])

  return (
    <>
      <h1>Create a team:</h1>
      <InputForm fields={fields} onSubmit={onSubmit} />
    </>
  )
}

CreateTeam.auth = {
  protected: true
}
