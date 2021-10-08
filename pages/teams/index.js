import useApi from '../../hooks/useApi'
import generateKey from '../../lib/generateKey'

export default function Teams () {
  const [teams, loading] = useApi('/api/teams', {}, [], true)
  const keys = generateKey()
  return (
    <ul>
      {!loading && teams &&
        teams.map(team => <li key={keys.next().value}>{team.name}</li>)
      }
    </ul>
  )
}
