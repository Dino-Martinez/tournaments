import Link from 'next/link'
import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/form.module.css'
import React from 'react'
import PropTypes from 'prop-types'

export default function TeamData ({ data, tid }) {
  const keys = generateKey()
  return (
    <>
      <h2>{data.name}</h2>
      <p>Owner: {data.owner}</p>
      {data.members.length > 0 &&
        <ul>
          Players:
          {data.members.map(member => <li key={keys.next().value}>{member.email}</li>)}
        </ul>
      }
      <Link href={`/teams/${tid}/register`}>
        <a className={`${utils.button} ${styles.submit}`}>Join Team</a>
      </Link>
    </>
  )
}

TeamData.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    owner: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string
    }))
  }),

  tid: PropTypes.string
}
