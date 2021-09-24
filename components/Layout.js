import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../hooks/useAuth'

export default function Layout ({ children }) {
  const [session] = useContext(AuthContext)

  return (
    <>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        {session &&
          <Link href='/users/profile'>
            <a>Profile</a>
          </Link>
        }
      </nav>
      <main>{children}</main>
      <footer>
        <p>Copyright 2021</p>
      </footer>
    </>
  )
}
