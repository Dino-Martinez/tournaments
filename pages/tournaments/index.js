import { useEffect } from 'react'
import useApi from '../../hooks/useApi'
import generateKey from '../../lib/generateKey'
import Link from 'next/link'

export default function AllTournaments () {
  const [tournaments, loading] = useApi('/api/tournaments', {}, [], true)
  const keys = generateKey()
  useEffect(() => { console.log(tournaments) }, [loading])
  return (
    <div>
      <ul>
        {!loading && tournaments &&
          tournaments.map(tournament => {
            return (
              <li key={keys.next().value}>
                <Link href={`/tournaments/${tournament._id}`}>
                  <a>{tournament.title}</a>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
