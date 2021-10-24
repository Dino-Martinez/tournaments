import { useRouter } from 'next/router'
import useUser from '../../../hooks/useUser'
import useApi from '../../../hooks/useApi'
import { useEffect, useState } from 'react'
import generateKey from '../../../lib/generateKey'
export default function TournamentRegistration () {
  const router = useRouter()
  const { tid } = router.query

  const keys = generateKey()
  const [user] = useUser()
  const { data, loading, refetch } = useApi(`/api/tournaments/${tid}/register`)
  const { data: teams, loading: loadingTeams, refetch: fetchTeams } = useApi('/api/teams/')
  const [selected, setSelected] = useState()

  const submit = () => {
    if (teams && !loadingTeams) {
      console.log(selected)
      const update = {
        registered: selected
      }
      refetch('', { method: 'POST', body: JSON.stringify(update) })
    }
  }

  useEffect(() => {
    if (!loading && data) {
      router.push(`/tournaments/${tid}`)
    }
  }, [loading])

  useEffect(() => {
    if (user) { fetchTeams('', { method: 'POST', body: JSON.stringify({ query: { owner: user.email } }) }) }
  }, [user])

  useEffect(() => {
    if (!loadingTeams && teams) {
      const id = teams[0] ? teams[0]._id : 'No teams'
      setSelected(id)
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

TournamentRegistration.auth = {
  protected: true,
  redirect: '/tournaments'
}
