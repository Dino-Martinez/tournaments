import { useContext, useEffect } from 'react'
import { AuthContext } from '../hooks/useAuth'
import SignInForm from './signinForm'

export default function Authenticator ({ setReady }) {
  const { session, waiting: authenticating } = useContext(AuthContext)
  useEffect(() => { if (session) setReady(true) }, [session])

  return (
    <>
      {authenticating &&
        <div className="loading">
          <h1>Authenticating session...</h1>
          <div className="lds-dual-ring"></div>
        </div>
      }
      {!authenticating && !session &&
        <SignInForm session={session}></SignInForm>
      }
    </>
  )
}
