import useApi from '../../hooks/useApi'
import Link from 'next/link'
import styles from '../../styles/tournaments.module.css'
import utils from '../../styles/utilities.module.css'
import ApiResolver from '../../components/ApiResolver'
import TournamentList from '../../components/TournamentList'
import React from 'react'

export default function AllTournaments () {
  const { data: tournaments, loading } = useApi('/api/tournaments', {}, [], true)

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
