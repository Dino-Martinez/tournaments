import { useEffect, useContext, useState } from 'react'
import InputForm from '../../components/InputForm'
import useApi from '../../hooks/useApi'
import Authenticator from '../../components/Authenticator'
import Router from 'next/router'
import { AuthContext } from '../../hooks/useAuth'

const minLength = (value) => {
  return value.length < 5
}

const fields = [
  {
    key: 'title',
    type: 'text',
    label: 'Title',
    validate: minLength
  },
  {
    key: 'description',
    type: 'text',
    label: 'Description'
  },
  {
    key: 'date',
    type: 'date',
    label: 'Date',
    attributes: {
      min: new Date().toISOString().split('T')[0]
    }
  }
]

export default function CreateTournament () {
  const [data, loading, refetch] = useApi('/api/tournaments')
  const [games, loadingGames] = useApi('/api/games', {}, [], true)
  const [session] = useContext(AuthContext)
  const [authenticated, setAuthenticatedStatus] = useState(false)

  const onSubmit = (values) => {
    values.author = session.user.email
    refetch('', { method: 'POST', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (!loading && data) {
      if (data.result.ok) Router.push('/tournaments')
    }
  }, [loading, data])

  useEffect(() => {
    if (!loadingGames && games) {
      const options = []

      games.forEach(game => {
        options.push(
          {
            label: game.name,
            value: game._id
          }
        )
      })

      const gameField = {
        key: 'game',
        type: 'select',
        label: 'Select game',
        options
      }

      fields.push(gameField)
    }
  }, [loadingGames, games])

  return (
    <>
      <Authenticator setReady={setAuthenticatedStatus}/>
      {authenticated &&
      <>
        <h1>Create a tournament:</h1>
        <InputForm fields={fields} onSubmit={onSubmit} />
      </>
      }
    </>
  )
}
