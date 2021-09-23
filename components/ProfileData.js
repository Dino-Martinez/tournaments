import InputForm from './InputForm'

const fields = [
  {
    title: 'username',
    type: 'text'
  },
  {
    title: 'bio',
    type: 'text'
  },
  {
    title: 'age',
    type: 'number'
  }
]

const onSubmit = (values) => { console.log(values) }

export default function ProfileData ({ data }) {
  return (
    <>
      <ul>
        <li>{data.email}</li>
        <li>{data.name}</li>
      </ul>
      <InputForm fields={fields} onSubmit={onSubmit}></InputForm>
    </>
  )
}
