import { Router, useRouter } from 'next/router'
import ApiResolver from '../../../components/ApiResolver'
import useApi from '../../../hooks/useApi'
import { Bracket } from 'react-brackets'

export async function getServerSideProps (context) {
  return {
    props: {} // will be passed to the page component as props
  }
}

export default function Tournament () {
  const router = useRouter()
  const { tid } = router.query
  const [data, loading] = useApi(`/api/tournaments/${tid}`, {}, [], true)

  const rounds = [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }]
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }]
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team E' }, { name: 'Team F' }]
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: 'Team G' }, { name: 'Team H' }]
        }
      ]
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }]
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }]
        }
      ]
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }]
        }
      ]
    }
  ]

  return (
    <ApiResolver data={data} loading={loading}>
      <Bracket rounds={rounds} />
      <button type="button" onClick={() => router.push(`/tournaments/${tid}`)}>
        Back
      </button>
    </ApiResolver>
  )
}
