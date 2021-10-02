import { useState } from 'react'

export default function useObject (start = {}) {
  const [obj, setObj] = useState(start)

  const setValue = (key, val) => {
    setObj(prevState => ({
      ...prevState,
      [key]: val
    }))
  }

  return [obj, setValue]
}
