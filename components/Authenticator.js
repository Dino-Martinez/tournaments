import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Authenticator ({ children, redirect }) {
  const { status } = useSession()
  const router = useRouter()
  const callbackUrl = redirect || router.pathname
  useEffect(() => {
    console.log(status)
    if (status === 'unauthenticated') {
      router.push({
        pathname: '/signin',
        query: { redirect: callbackUrl }
      })
    }
  }, [status])

  return (
    <>
      {status === 'authenticated'
        ? children
        : (<div className="loading">
          <h1>Authenticating session...</h1>
          <div className="lds-dual-ring"></div>
        </div>)
      }
    </>
  )
}
