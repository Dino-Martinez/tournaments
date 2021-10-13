import { connectToDatabase } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { tid } = req.query
  const { db } = await connectToDatabase()

  if (req.method === 'POST') {
    const { member } = req.body

    const result = await db.collection('teams')
      .updateOne({ _id: new ObjectId(tid) },
        { $addToSet: { members: member } })

    return res.status(200).json(result)
  }
}
