import generateKey from '../lib/generateKey'
import utils from '../styles/utilities.module.css'
import styles from '../styles/tournaments.module.css'
import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'

export default function TournamentList ({ data }) {
  const keys = generateKey()
  return (
    <ul className={styles.list}>
      {data.map(tournament => {
        return (
          <li key={keys.next().value} className={styles.listItem}>
            <Link href={`/tournaments/${tournament._id}`}>
              <a className={` ${utils.button} ${styles.link}`}>{tournament.name}</a>
            </Link>
                - {tournament.date ? tournament.date : 'No date specified'}
          </li>
        )
      })
      }
    </ul>
  )
}

TournamentList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.date
  }))
}
