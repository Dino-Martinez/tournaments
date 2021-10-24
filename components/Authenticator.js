import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Authenticator ({ children }) {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push({
        pathname: '/signin',
        query: { redirect: router.pathname }
      })
    }
  }, [status])

  return (
    <>
      {status === 'loading'
        ? (<div className="loading">
          <h1>Authenticating session...</h1>
          <div className="lds-dual-ring"></div>
        </div>)
        : children
      }
    </>
  )
}
