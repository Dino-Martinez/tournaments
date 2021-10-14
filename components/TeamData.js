import Link from 'next/link'
import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/form.module.css'

export default function TeamData ({ data, tid }) {
  const keys = generateKey()
  return (
    <>
      <h2>{data.name}</h2>
      <p>Owner: {data.owner}</p>
      {data.players.length > 0 &&
        <ul>
          Players:
          {data.players.map(name => <li key={keys.next().value}>{name}</li>)}
        </ul>
      }
      <Link href={`/teams/${tid}/register`}>
        <a className={`${utils.button} ${styles.submit}`}>Join Team</a>
      </Link>
    </>
  )
}
