import { useState } from 'react'

export default function useObject () {
  const [obj, setObj] = useState({})

  const setValue = (key, val) => {
    setObj(prevState => ({
      ...prevState,
      [key]: val
    }))
  }

  return [obj, setValue]
}
