import { capitalCase } from 'change-case'
import useObject from '../hooks/useObject'

function * generateKey () {
  let count = 0
  while (true) yield count++
}

export default function InputForm ({ fields, onSubmit }) {
  const keys = generateKey()
  const [data, setValue] = useObject()

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => {
        return (
          <fieldset key={keys.next().value}>
            <label htmlFor={field.title}>{capitalCase(field.title)}</label>
            <input name={field.title} type={field.type} onChange={(e) => setValue(field.title, e.target.value)}/>
          </fieldset>
        )
      })}
      <input type="submit" value="Submit"/>
    </form>
  )
}
