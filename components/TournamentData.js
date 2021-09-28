import Link from 'next/link'
import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/form.module.css'

export default function TournamentData ({ data, tid }) {
  const keys = generateKey()
  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.registered &&
        <ul>
          Attendees:
          {data.registered.map(participant => <li key={keys.next().value}>{participant}</li>)}
        </ul>
      }
      <Link href={`/tournaments/${tid}/register`}>
        <a className={`${utils.button} ${styles.submit}`}>Register</a>
      </Link>
    </>
  )
}
