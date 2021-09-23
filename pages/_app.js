import '../styles/globals.css'
import { useSession } from 'next-auth/client'
import Layout from '../components/Layout'

function MyApp ({ Component, pageProps }) {
  const [session, loading] = useSession()
  return (
    <Layout session={session}>
      <Component {...pageProps} session={session} authenticating={loading}/>
    </Layout>
  )
}

export default MyApp
