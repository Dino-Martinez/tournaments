import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SignInForm () {
  const { data: session } = useSession()
  const router = useRouter()
  const redirect = router.query.redirect || '/'
  return (
    <article>
      {!session &&
        <>
          <h2>You must be signed in to use this page.</h2>
          <button onClick={() => signIn('google', { callbackUrl: `${window.location.origin}${redirect}` })}>Sign in</button>
          <p>Sign in with Google</p>
        </>
      }
      {session &&
        <>
          <p> { session.user.name || session.user.email }</p>
          <button onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}>Sign out</button>
        </>
      }
    </article>
  )
}
