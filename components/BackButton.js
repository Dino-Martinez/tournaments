import { useRouter } from 'next/router'
import styles from '../styles/backbutton.module.css'
import React from 'react'

/** This component provides a persistent back button */
export default function BackButton () {
  const router = useRouter()

  return (
    <button className={styles.button} onClick={() => router.back()}><i className={styles.back}></i></button>
  )
}
