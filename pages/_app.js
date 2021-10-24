import '../styles/globals.css'
import Layout from '../components/Layout'
import Authenticator from '../components/Authenticator'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

function MyApp ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Tournament Site</title>
          <meta name="description" content="A webapp to find tournaments" />
        </Head>

        {Component.auth
          ? (
            <Authenticator>
              <Component {...pageProps}/>
            </Authenticator>
          )
          : (
            <Component {...pageProps}/>
          )}
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
