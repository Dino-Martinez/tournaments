export default function ApiResolver ({ loading, data, children, message = 'Loading info...' }) {
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
