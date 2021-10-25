import Link from 'next/link'
import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/form.module.css'
import React from 'react'
import PropTypes from 'prop-types'

export default function TournamentData ({ data, tid }) {
  const keys = generateKey()
  return (
    <>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      {data.registered.length > 0 &&
        <ul>
          Attendees:
          {data.registered.map(participant => <li key={keys.next().value}>
            <Link href={`/teams/${participant._id}`}>
              <a> {participant.name} </a>
            </Link></li>)}
        </ul>
      }
      <Link href={`/tournaments/${tid}/register`}>
        <a className={`${utils.button} ${styles.submit}`}>Register</a>
      </Link>
      <Link href={`/tournaments/${tid}/bracket`}>
        <a className={`${utils.button} ${styles.submit}`}>Bracket Page</a>
      </Link>
    </>
  )
}

TournamentData.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    registered: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    }))
  }),

  tid: PropTypes.string
}
