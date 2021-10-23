import { useContext, useEffect } from 'react'
import useApi from '../hooks/useApi'
import InputForm from './InputForm'
import DataList from './DataList'
import { AuthContext } from '../hooks/useAuth'
import styles from '../styles/profile.module.css'

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

export default function ProfileData ({ data, refresh }) {
  const [session] = useContext(AuthContext)
  const { data: update, loading, refetch } = useApi('/api/users')
  const onSubmit = (values) => {
    refetch(session.user.email, { method: 'PUT', body: JSON.stringify(values) })
  }

  useEffect(() => {
    if (update && !loading) {
      refresh()
    }
  }, [update, loading])
  return (
    <>
      <DataList data={data} shape={shape} classNames={ { ul: styles.list, li: styles.listItem, p: styles.listText } }/>
      <InputForm fields={fields} onSubmit={onSubmit}></InputForm>
    </>
  )
}
