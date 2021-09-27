import useApi from '../../hooks/useApi'
import Link from 'next/link'
import styles from '../../styles/tournaments.module.css'
import ApiResolver from '../../components/ApiResolver'
import TournamentList from '../../components/TournamentList'

export default function AllTournaments () {
  const [tournaments, loading] = useApi('/api/tournaments', {}, [], true)

  return (
    <div>
      <ApiResolver data={tournaments} loading={loading}>
        <TournamentList data={tournaments} />
      </ApiResolver>
      <Link href="/tournaments/create">
        <a className={styles.link}>Create Tournament</a>
      </Link>
    </div>
  )
}
