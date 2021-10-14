import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/tournaments.module.css'
import Link from 'next/link'

export default function TeamList ({ data }) {
  const keys = generateKey()
  return (
    <ul className={styles.list}>
      {data.map(team => {
        return (
          <li key={keys.next().value} className={styles.listItem}>
            <Link href={`/teams/${team._id}`}>
              <a className={` ${utils.button} ${styles.link}`}>{team.name}</a>
            </Link>
          </li>
        )
      })
      }
    </ul>
  )
}
