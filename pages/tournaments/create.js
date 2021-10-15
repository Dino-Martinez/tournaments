import { useEffect, useContext, useState } from 'react'
import InputForm from '../../components/InputForm'
import useApi from '../../hooks/useApi'
import Authenticator from '../../components/Authenticator'
import Router from 'next/router'
import { AuthContext } from '../../hooks/useAuth'

const minLength = (value) => {
  return value.length < 5
}

const defaults = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
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
  },
  {
    key: 'maxTeams',
    type: 'select',
    label: 'Number of Teams',
    options: [
      {
        label: '8',
        value: '8'
      },
      {
        label: '16',
        value: '16'
      }
    ]
  }
]

export default function CreateTournament () {
  const [data, loading, refetch] = useApi('/api/tournaments')
  const [games, loadingGames] = useApi('/api/games', {}, [], true)
  // eslint-disable-next-line no-unused-vars
  const [session, waiting, user] = useContext(AuthContext)
  const [authenticated, setAuthenticatedStatus] = useState(false)
  const [fields, addField] = useState(defaults)

  const onSubmit = (values) => {
    values.owner = user._id
    refetch('', { method: 'POST', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (!loading && data && data.owner) {
      Router.push('/tournaments')
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
      addField([...fields, { ...gameField }])
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
