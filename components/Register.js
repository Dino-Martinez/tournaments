import PropTypes from 'prop-types'
import React from 'react'

export default function Register ({ data, callback }) {
  return (
    <>
      <p>{data[0]} Registering for {data[1]}</p>
      <button onClick={callback}>Complete Registration</button>
    </>
  )
}

Register.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  callback: PropTypes.func
}
