import PropTypes from 'prop-types'

/**
 * This component will take reactive state props and conditionally render its children when that state has resolved
 *
 * @component
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
  /**
   * Boolean to become true once data is resolved
   */
  loading: PropTypes.bool.isRequired,

  /**
   * Data to be resolved
   */
  data: PropTypes.any.isRequired,

  /**
   * A React Node. This represents any renderable object, including functional components, class components, and groups of either.
   */
  children: PropTypes.node.isRequired,

  /**
   * The message to be displayed while the data is still resolving
   */
  message: PropTypes.string
}

export default ApiResolver
