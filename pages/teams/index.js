import useApi from '../../hooks/useApi'
import utils from '../../styles/utilities.module.css'
import ApiResolver from '../../components/ApiResolver'
import TeamList from '../../components/TeamList'
import Link from 'next/link'
import React from 'react'

export default function Teams () {
  const { data: teams, loading } = useApi('/api/teams', {}, [], true)
  return (
    <div>
      <ApiResolver data={teams} loading={loading}>
        <TeamList data={teams} />
      </ApiResolver>
      <Link href="/teams/create">
        <a className={`${utils.button}`}>Create Team</a>
      </Link>
    </div>
  )
}
