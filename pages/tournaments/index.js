import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import generateKey from '../../lib/generateKey'
import Link from 'next/link'
import styles from '../../styles/tournaments.module.css'

export default function AllTournaments () {
  const [tournaments, loading] = useApi('/api/tournaments', {}, [], true)
  const keys = generateKey()
  useEffect(() => { console.log(tournaments) }, [loading])
  return (
    <div>
      <ul className={styles.list}>
        {!loading && tournaments &&
          tournaments.map(tournament => {
            return (
              <li key={keys.next().value} className={styles.listItem}>
                <Link href={`/tournaments/${tournament._id}`}>
                  <a className={styles.link}>{tournament.title}</a>
                </Link>
                - {tournament.date ? tournament.date : 'No date specified'}
              </li>
            )
          })
        }
      </ul>
      <Link href="/tournaments/create">
        <a className={styles.link}>Create Tournament</a>
      </Link>
    </div>
  )
}
