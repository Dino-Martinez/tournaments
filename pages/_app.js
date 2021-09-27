import '../styles/globals.css'
import Layout from '../components/Layout'
import AuthProvider from '../hooks/useAuth'
import Head from 'next/head'

function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Head>
          <title>Tournament Site</title>
          <meta name="description" content="A webapp to find tournaments" />
        </Head>
        <Component {...pageProps}/>
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
