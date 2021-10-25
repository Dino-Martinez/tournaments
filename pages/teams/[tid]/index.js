import { useRouter } from 'next/router'
import ApiResolver from '../../../components/ApiResolver'
import useApi from '../../../hooks/useApi'
import TeamData from '../../../components/TeamData'
import React from 'react'

export async function getServerSideProps (context) {
  return {
    props: {} // will be passed to the page component as props
  }
}

export default function Team () {
  const router = useRouter()
  const { tid } = router.query
  const { data, loading } = useApi(`/api/teams/${tid}`, {}, [], true)

  return (
    <ApiResolver data={data} loading={loading}>
      <TeamData data={data} tid={tid}/>
    </ApiResolver>
  )
}
