import { useRouter } from 'next/router'
import ApiResolver from '../../../components/ApiResolver'
import useApi from '../../../hooks/useApi'
import { Bracket } from 'react-brackets'
import { useEffect, useState } from 'react'

export async function getServerSideProps (context) {
  return {
    props: {} // will be passed to the page component as props
  }
}

export default function Tournament () {
  const router = useRouter()
  const { tid } = router.query
  const [data, loading] = useApi(`/api/tournaments/${tid}`, {}, [], true)
  const [rounds, setRounds] = useState([])

  useEffect(() => {
    if (data && !loading) {
      setRounds(data.rounds)
      console.log(data.tournaments)
    }
  }, [data, loading])

  return (
    <ApiResolver data={data} loading={loading}>
      <button type="button" onClick={() => router.push(`/tournaments/${tid}`)}>
        Back
      </button>
      <Bracket rounds={rounds} />
    </ApiResolver>
  )
}
