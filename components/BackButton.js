import { useRouter } from 'next/router'
import styles from '../styles/backbutton.module.css'
import React from 'react'

export default function BackButton () {
  const router = useRouter()

  return (
    <button className={styles.button} onClick={() => router.back()}><i className={styles.back}></i></button>
  )
}
