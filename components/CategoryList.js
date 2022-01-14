import React, { useEffect } from 'react'
import useApi from '../hooks/useApi'
import generateKey from '../lib/generateKey'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/categorylist.module.css'

export default function CategoryList () {
  const keys = generateKey()
  const { data: categories, loading } = useApi('/api/games/', {}, [], true)

  useEffect(() => {
    if (categories && !loading) { console.log(categories) }
  }, [categories, loading])
  return (
    <>
      {categories && !loading &&
        <ul className={styles.categoryGrid}>
          {categories.map(category => {
            return (
              <li key={keys.next().value} className={styles.category}>
                <Image
                  src={category.square}
                  width='64px'
                  height='64px'
                  className={styles.thumbnail}
                />
                <Link
                  href={{
                    pathname: '/tournaments',
                    query: { category: category.name }
                  }}
                >
                  <a>{category.name}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      }
    </>
  )
}
