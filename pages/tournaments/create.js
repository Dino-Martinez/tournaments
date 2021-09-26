import { useEffect } from 'react'
import InputForm from '../../components/InputForm'
import useApi from '../../hooks/useApi'
import Router from 'next/router'

const fields = [
  {
    key: 'title',
    type: 'text',
    label: 'Title'
  },
  {
    key: 'description',
    type: 'text',
    label: 'Description'
  }
]

export default function CreateTournament () {
  const [data, loading, refetch] = useApi('/api/tournaments')

  const onSubmit = (values) => {
    refetch('', { method: 'POST', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (!loading && data) {
      if (data.result.ok) Router.push('/tournaments')
    }
  }, [loading, data])

  return (
    <>
      <h1>Create a tournament:</h1>
      <InputForm fields={fields} onSubmit={onSubmit} />
    </>
  )
}
