import Link from 'next/link'
import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/form.module.css'
import { Bracket } from 'react-brackets'

export default function TournamentData ({ data, tid }) {
  const keys = generateKey()
  const rounds = [
    {
      title: 'Round one',
      seeds: [
        {
          id: 1,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team B' }]
        },
        {
          id: 2,
          date: new Date().toDateString(),
          teams: [{ name: 'Team C' }, { name: 'Team D' }]
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team E' }, { name: 'Team F' }]
        },
        {
          id: 4,
          date: new Date().toDateString(),
          teams: [{ name: 'Team G' }, { name: 'Team H' }]
        }
      ]
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }]
        },
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }]
        }
      ]
    },
    {
      title: 'Round two',
      seeds: [
        {
          id: 3,
          date: new Date().toDateString(),
          teams: [{ name: 'Team A' }, { name: 'Team C' }]
        }
      ]
    }
  ]
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
      <Bracket rounds={rounds} />

      <Link href={`/tournaments/${tid}/register`}>
        <a className={`${utils.button} ${styles.submit}`}>Register</a>
      </Link>
    </>
  )
}
