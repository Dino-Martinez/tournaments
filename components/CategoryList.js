import React, { useEffect } from 'react'
import useApi from '../hooks/useApi'
import generateKey from '../lib/generateKey'
import Link from 'next/link'
import Image from 'next/image'

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
                <Image
                  src={category.square}
                  width='64'
                  height='64'
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
