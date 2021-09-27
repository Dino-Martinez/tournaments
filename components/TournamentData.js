import Link from 'next/link'
import generateKey from '../lib/generateKey'
export default function TournamentData ({ data, tid }) {
  const keys = generateKey()
  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.registered &&
        <ul>
          {data.registered.map(participant => <li key={keys.next().value}>{participant}</li>)}
        </ul>
      }
      <Link href={`/tournaments/${tid}/register`}>Register</Link>
    </>
  )
}
