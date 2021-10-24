import PropTypes from 'prop-types'

/**
 * This component will take reactive state props and conditionally render its children when that state has resolved
 *
 * @component
 * @prop {string} [message=Loading info...] - The message to be displayed while the data is still resolving
 * @prop {bool} loading - State to become true once data is resolved
 * @prop {string} data - Data to be resolved
 * @prop {Node} children - A React Node. This represents any renderable object, including functional components, class components, and groups of either.
 * @example
 * const {data, loading} = useApi('/api-route')
 *
 * return (
 *   <ApiResolver data={data} loading={loading} message={"We're loading your data..."}>
 *     <ExampleComponent data={data} />
 *   </ApiResolver>
 * )
 */
const ApiResolver = ({ loading, data, children, message = 'Loading info...' }) => {
  return (
    <>
      {loading &&
        <div className="loading">
          <h1>{message}</h1>
          <div className="lds-dual-ring"></div>
        </div>
      }

      {!loading && data &&
        children
      }
    </>
  )
}

ApiResolver.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
  message: PropTypes.string
}

export default ApiResolver
