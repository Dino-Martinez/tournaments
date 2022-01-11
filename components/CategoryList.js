import React, { useEffect } from 'react'
import useApi from '../hooks/useApi'
import generateKey from '../lib/generateKey'
import Link from 'next/link'

export default function CategoryList () {
  const keys = generateKey()
  const { data: categories, loading } = useApi('/api/games/', {}, [], true)

  useEffect(() => {
    if (categories && !loading) { console.log(categories) }
  }, [categories, loading])
  return (
    <>
      {categories && !loading &&
        <ul>
          {categories.map(category => {
            return (
              <li key={keys.next().value}>
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
