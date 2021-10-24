import { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm'
import useApi from '../../hooks/useApi'
import Router from 'next/router'
import useUser from '../../hooks/useUser'

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
  const { data, loading, refetch } = useApi('/api/tournaments')
  const { data: games, loading: loadingGames } = useApi('/api/games', {}, [], true)
  const [user] = useUser()
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
      <h1>Create a tournament:</h1>
      <InputForm fields={fields} onSubmit={onSubmit} />
    </>
  )
}

CreateTournament.auth = {
  protected: true,
  redirect: '/tournaments/create'
}
