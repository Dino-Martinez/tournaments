import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function useApi (url, options = {}, dependencies = [], runOnMount = false) {
  const [apiResult, setApiResult] = useState()
  const [loading, setLoading] = useState(false)
  const firstUpdate = useRef(!runOnMount)

  const refetch = () => {
    setLoading(true)
    fetch(url, { ...DEFAULT_OPTIONS, ...options })
      .then(res => res.json())
      .then(json => {
        setApiResult(json)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!firstUpdate.current) refetch()
    if (firstUpdate.current) firstUpdate.current = false
  }, dependencies)

  return [apiResult, refetch, loading]
}
