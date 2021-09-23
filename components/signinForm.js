import { signIn, signOut } from 'next-auth/client'

export default function SignInForm ({ session }) {
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
