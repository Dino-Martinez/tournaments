import '../styles/globals.css'
import { useSession } from 'next-auth/client'

function MyApp ({ Component, pageProps }) {
  const [session, loading] = useSession()
  return <Component {...pageProps} session={session} authenticating={loading}/>
}

export default MyApp
