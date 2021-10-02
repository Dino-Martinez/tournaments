import { useEffect } from 'react'
import useObject from '../hooks/useObject'
import generateKey from '../lib/generateKey'
import styles from '../styles/form.module.css'
import utils from '../styles/utilities.module.css'

export default function InputForm ({ fields, onSubmit, classNames = styles }) {
  const keys = generateKey()
  const [data, setValue] = useObject()

  useEffect(() => {
    fields.forEach(field => {
      validate('', field)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  const validate = (value, field) => { if (field.validate) field.error = field.validate(value) }

  const handleChange = (e, field) => {
    const { value } = e.target
    validate(value, field)
    setValue(field.key, value)
  }

  return (
    <form onSubmit={handleSubmit} className={classNames.form}>
      {fields.map(field => {
        const attributes = field.attributes || {}
        return (
          <fieldset key={keys.next().value} className={classNames.fieldset}>
            <label htmlFor={field.key} className={classNames.label}>{field.label}</label>
            <input name={field.key} type={field.type} {...attributes} onChange={(e) => handleChange(e, field)} className={classNames.input}/>
            <p className={`${classNames.error} ${field.error ? classNames.throw : ''}`}></p>
          </fieldset>
        )
      })}
      <input type="submit" value="Submit" className={`${classNames.submit} ${utils.button}`}/>
    </form>
  )
}
