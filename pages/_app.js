import '../styles/globals.css'
import Layout from '../components/Layout'
import AuthProvider from '../hooks/useAuth'

function MyApp ({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
