import { signIn, signOut } from 'next-auth/client'
import { useContext } from 'react'
import { AuthContext } from '../hooks/useAuth'

export default function SignInForm () {
  const [session] = useContext(AuthContext)
  return (
    <article>
      {!session &&
        <>
          <h2>You must be signed in to use this site.</h2>
          <button onClick={() => signIn('google')}>Sign in</button>
          <p>Sign in with Google</p>
        </>
      }
      {session &&
        <>
          <p> { session.user.name || session.user.email }</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      }
    </article>
  )
}
