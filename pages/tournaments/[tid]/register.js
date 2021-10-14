import Router, { useRouter } from 'next/router'
import useApi from '../../../hooks/useApi'
import { AuthContext } from '../../../hooks/useAuth'
import { useContext, useEffect, useState } from 'react'
import generateKey from '../../../lib/generateKey'

export default function TournamentRegistration () {
  const keys = generateKey()
  const router = useRouter()
  const { tid } = router.query
  const [session] = useContext(AuthContext)
  const [data, loading, refetch] = useApi(`/api/tournaments/${tid}/register`)
  const [teams, loadingTeams, fetchTeams] = useApi('/api/teams/')
  const [selected, setSelected] = useState()

  const submit = () => {
    if (teams && !loadingTeams) {
      const update = {
        registered: selected
      }
      refetch('', { method: 'POST', body: JSON.stringify(update) })
    }
  }

  useEffect(() => {
    if (!loading && data && data.ok) {
      Router.push(`/tournaments/${tid}`)
    }
  }, [loading])

  useEffect(() => {
    fetchTeams('', { method: 'POST', body: JSON.stringify({ query: { owner: session.user.email } }) })
  }, [session])

  useEffect(() => {
    if (!loadingTeams && teams) {
      setSelected(teams[0]._id)
    }
  }, [teams, loadingTeams])

  return (
    <>
      {!loadingTeams && teams &&
        <>
          <p>Registering for {tid}</p>
          <select onChange={(e) => { setSelected(e.target.value) }}>
            {teams.map(team => <option key={keys.next().value} value={team._id}>{team.name}</option>)}
          </select>
          <button onClick={submit}>Complete Registration</button>
        </>
      }
    </>
  )
}
