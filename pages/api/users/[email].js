import { connectToDatabase } from '../../../lib/mongodb'

export default async function handler (req, res) {
  const { email } = req.query
  const { db } = await connectToDatabase()
  console.log('Trying...', req.method, email)
  if (req.method === 'GET') {
    const user = await db.collection('users')
      .findOne({ email: email })

    return res.status(200).json(user)
  }

  if (req.method === 'PUT') {
    const update = req.body

    const result = await db.collection('users')
      .updateOne({ email: email }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}
