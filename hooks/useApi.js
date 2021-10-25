import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET'
}

/**
 * This hook provides a clean interface for api fetching
 * @param {string} url - url
 * @param {object} options - options
 * @param {Array} dependencies - dependencies
 * @param {bool} runOnMount - runOnMount
 * @returns {object}
 */

export default function useApi (url, options = {}, dependencies = [], runOnMount = false) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const firstUpdate = useRef(!runOnMount)

  const refetch = (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    setLoading(true)
    fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions })
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!firstUpdate.current) refetch()
    if (firstUpdate.current) firstUpdate.current = false
  }, dependencies)

  return { data, loading, refetch }
}
