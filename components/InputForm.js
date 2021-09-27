import useObject from '../hooks/useObject'
import generateKey from '../lib/generateKey'

export default function InputForm ({ fields, onSubmit, classNames = { form: 'input-form', fieldset: 'input-form__fieldset', label: 'input-form__label', input: 'input-form__control' } }) {
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
        console.log(attributes)
        return (
          <fieldset key={keys.next().value} className={classNames.fieldset}>
            <label htmlFor={field.key} className={classNames.label}>{field.label}</label>
            <input name={field.key} type={field.type} {...attributes} onChange={(e) => setValue(field.key, e.target.value)} className={classNames.input}/>
          </fieldset>
        )
      })}
      <input type="submit" value="Submit"/>
    </form>
  )
}
