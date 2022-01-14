import useApi from '../../hooks/useApi'
import Link from 'next/link'
import styles from '../../styles/tournaments.module.css'
import utils from '../../styles/utilities.module.css'
import ApiResolver from '../../components/ApiResolver'
import TournamentList from '../../components/TournamentList'
import React from 'react'
import { useRouter } from 'next/router'

export default function AllTournaments () {
  const router = useRouter()
  console.log(router.query)
  const { data: tournaments, loading } = useApi(`/api/tournaments?category=${router.query.category}`, {}, [], true)
  return (
    <div>
      <ApiResolver data={tournaments} loading={loading}>
        <TournamentList data={tournaments} />
      </ApiResolver>
      <Link href="/tournaments/create">
        <a className={`${utils.button} ${styles.link}`}>Create Tournament</a>
      </Link>
    </div>
  )
}
