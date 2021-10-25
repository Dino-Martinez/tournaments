import { useEffect } from 'react'
import useObject from '../hooks/useObject'
import generateKey from '../lib/generateKey'
import styles from '../styles/form.module.css'
import utils from '../styles/utilities.module.css'
import PropTypes from 'prop-types'

/**
 * This component will dynamically render an input form based on the fields provided and will execute the provided callback upon form submission.
 * Validation will be handled for any field with a provided validator function.
 *
 * Example usage:
 * ```jsx
 *const fields = [
 *  {
 *    key: 'name',
 *    type: 'text',
 *    label: 'Enter your name:'
 *  }
 *]
 *
 *const handleSubmit = (values) => {
 *  console.log(values)
 *}
 *
 *<InputForm fields={fields} onSubmit={handleSubmit} />
 * ```
 */
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

        if (field.type === 'select') {
          field.options.sort((left, right) => {
            return left.label === 'Other' ? -1 : left.label < right.label
          })

          return (
            <fieldset key={keys.next().value} className={classNames.fieldset}>
              <label htmlFor={field.key} className={classNames.label}>{field.label}</label>
              <select name={field.key} onChange={(e) => handleChange(e, field)} className={classNames.input}>
                {field.options.map(option => {
                  return (
                    <option key={keys.next().value} value={option.value}>{option.label}</option>
                  )
                })}
              </select>
              <p className={`${classNames.error} ${field.error ? classNames.throw : ''}`}></p>
            </fieldset>
          )
        }

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

InputForm.propTypes = {
  /** The shape of our input fields, including any necessary attributes or extensions */
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  /** A callback function to be executed on form submission */
  onSubmit: PropTypes.func.isRequired
}
