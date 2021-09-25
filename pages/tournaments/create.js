import InputForm from '../../components/InputForm'
const fields = [
  {
    type: 'text',
    label: 'Title'
  }
]

export default function CreateTournament () {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <>
      <h1>Create a tournament:</h1>
      <InputForm fields={fields} onSubmit={onSubmit} />
    </>
  )
}
