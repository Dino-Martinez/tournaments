import { useEffect } from 'react'

export default function Authenticator ({ setReady, session, authenticating }) {
  useEffect(() => { if (session) setReady(true) }, [session])
  return (
    <>
      {authenticating &&
        <div className="loading">
          <h1>Authenticating session...</h1>
          <div className="lds-dual-ring"></div>
        </div>
      }
    </>
  )
}
