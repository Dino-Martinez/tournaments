import { useRouter } from 'next/router'
import ApiResolver from '../../../components/ApiResolver'
import useApi from '../../../hooks/useApi'
import TournamentData from '../../../components/TournamentData'
import React from 'react'

export async function getServerSideProps (context) {
  return {
    props: {} // will be passed to the page component as props
  }
}

export default function Tournament () {
  const router = useRouter()
  const { tid } = router.query
  const { data, loading } = useApi(`/api/tournaments/${tid}`, {}, [], true)

  return (
    <ApiResolver data={data} loading={loading}>
      <TournamentData data={data} tid={tid}/>
    </ApiResolver>
  )
}
