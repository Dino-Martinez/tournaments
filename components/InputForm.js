import useObject from '../hooks/useObject'
import generateKey from '../lib/generateKey'
import styles from '../styles/form.module.css'
import utils from '../styles/utilities.module.css'

export default function InputForm ({ fields, onSubmit, classNames = styles }) {
  const keys = generateKey()
  const [data, setValue] = useObject()

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className={classNames.form}>
      {fields.map(field => {
        const attributes = field.attributes || {}
        return (
          <fieldset key={keys.next().value} className={classNames.fieldset}>
            <label htmlFor={field.key} className={classNames.label}>{field.label}</label>
            <input name={field.key} type={field.type} {...attributes} onChange={(e) => setValue(field.key, e.target.value)} className={classNames.input}/>
          </fieldset>
        )
      })}
      <input type="submit" value="Submit" className={`${classNames.submit} ${utils.button}`}/>
    </form>
  )
}
