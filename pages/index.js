import Head from 'next/head'
import SignInForm from '../components/signinForm'
import { useEffect } from 'react'
import useApi from '../hooks/useApi'

export default function Home ({ session, authenticating }) {
  const [data, refetch, apiLoading] = useApi('/api/users')

  useEffect(() => { if (session) refetch(session.user.email) }, [session])

  return (
    <div>
      <Head>
        <title>Tournament Site</title>
        <meta name="description" content="A webapp to find tournaments" />
      </Head>

      {authenticating &&
        <div className="loading">
          <h1>Authenticating session...</h1>
          <div className="lds-dual-ring"></div>
        </div>
      }

      {apiLoading &&
        <h1>Fetching result...</h1>
      }

      {!authenticating && !apiLoading && data &&
        <>
         {data.name}
         {session.user.email}
        </>
      }

      {!authenticating &&
        <SignInForm session={session}></SignInForm>
      }
    </div>
  )
}
