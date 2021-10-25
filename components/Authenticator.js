import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

/**
 * This component will conditionally render its children based on user authentication status.
 * If the user is authenticated, the children will be rendered.
 * If the user is unauthenticated (i.e. not logged in), they will be redirected to the signin page.
 * If the session is being loaded, a loading spinner will be displayed.
 *
 * The user will automatically be redirected back to the attempted page upon login, unless a specific redirect prop was specified.
 * In this project, the route protection is abstracted into the root level _app.js file as such:
 * ```jsx
 *{Component.auth && Component.auth.protected
 *? (
 *  <Authenticator redirect={Component.auth.redirect}>
 *    <Component {...pageProps}/>
 *  </Authenticator>
 *)
 *: (
 *  <Component {...pageProps}/>
 *)}
 * ```
 *
 * What this means is that, by default, routes/components will *not* be protected by authentication.
 * In order to force authentication, navigate to the route file in the `pages/` directory and add a .auth object.
 *
 * Example:
 * ```jsx
 *export default ExamplePage () { ... }
 *ExamplePage.auth = {
 *  protected: true,
 *  redirect: '/some-route'
 *}
 * ```
 */
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

Authenticator.propTypes = {
  /** Redirect url, default is the protected page which was originally requested */
  redirect: PropTypes.string,

  /** A React Node. This represents any renderable object, including functional components, class components, and groups of either. */
  children: PropTypes.node.isRequired
}
