import { getSession } from 'next-auth/client'
import connectDB from '../../lib/db'
import Test from '../../models/Test'

const handler = async (req, res) => {
  const session = await getSession({ req })
  console.log(session)

  // const test = new Test({
  //   name: 'yessir',
  //   description: 'This is the thing'
  // })

  // const created = await test.save()
  // console.log(created)
  if (req.method === 'GET') {
    const found = await Test.find()
    res.status(200).json(found)
  }
}

export default connectDB(handler)
