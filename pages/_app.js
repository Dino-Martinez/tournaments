import '../styles/globals.css'
import Layout from '../components/Layout'
import Authenticator from '../components/Authenticator'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import PropTypes from 'prop-types'

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

        {Component.auth && Component.auth.protected
          ? (
            <Authenticator redirect={Component.auth.redirect}>
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

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.any
}

export default MyApp
