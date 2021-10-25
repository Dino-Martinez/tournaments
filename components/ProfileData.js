import useApi from '../hooks/useApi'
import InputForm from './InputForm'
import DataList from './DataList'
import styles from '../styles/profile.module.css'
import useUser from '../hooks/useUser'

// This is the shape of our input form for updating a user profile
const fields = [
  {
    key: 'username',
    type: 'text',
    label: 'Username'
  },
  {
    key: 'bio',
    type: 'text',
    label: 'Biography'
  },
  {
    key: 'age',
    type: 'number',
    label: 'Age'
  }
]

// This is the shape of the displayed data, including immutable data
const shape = [...fields,
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'name',
    label: 'Full Name'
  }
]

export default function ProfileData () {
  const [user, refresh] = useUser()
  const { refetch: update } = useApi('/api/users', { method: 'PUT' })
  const onSubmit = (values) => {
    update(user.email, { body: JSON.stringify(values) })
    refresh()
  }

  return (
    <>
      {user &&
      <>
        <DataList data={user} shape={shape} classNames={ { ul: styles.list, li: styles.listItem, p: styles.listText } }/>
        <InputForm fields={fields} onSubmit={onSubmit}></InputForm>
      </>
      }
    </>
  )
}
