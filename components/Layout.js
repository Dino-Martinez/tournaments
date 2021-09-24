import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../hooks/useAuth'
import { signIn, signOut } from 'next-auth/client'

export default function Layout ({ children }) {
  const [session] = useContext(AuthContext)

  return (
    <>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        {session &&
          <>
            <Link href='/users/profile'>
              <a>Profile</a>
            </Link>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        }
        {!session &&
          <button onClick={() => signIn('google')}>Sign in</button>
        }
      </nav>
      <main>{children}</main>
      <footer>
        <p>Copyright 2021</p>
      </footer>
    </>
  )
}
