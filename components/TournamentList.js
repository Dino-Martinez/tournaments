import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/tournaments.module.css'
import Link from 'next/link'

export default function TournamentList ({ data }) {
  const keys = generateKey()
  return (
    <ul className={styles.list}>
      {data.map(tournament => {
        return (
          <li key={keys.next().value} className={styles.listItem}>
            <Link href={`/tournaments/${tournament._id}`}>
              <a className={` ${utils.button} ${styles.link}`}>{tournament.title}</a>
            </Link>
                - {tournament.date ? tournament.date : 'No date specified'}
          </li>
        )
      })
      }
    </ul>
  )
}
