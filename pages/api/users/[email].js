import User from '../../../models/User'
import connectDB from '../../../lib/db'

const handler = async (req, res) => {
  const { email } = req.query

  if (req.method === 'GET') {
    const user = await User
      .findOne({ email: email })

    return res.status(200).json(user)
  }

  if (req.method === 'PUT') {
    const update = req.body

    const result = await User
      .updateOne({ email: email }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
