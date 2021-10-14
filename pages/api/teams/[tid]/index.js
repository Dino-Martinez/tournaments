import { connectToDatabase } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { tid } = req.query
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const team = await db.collection('teams')
      .findOne({ _id: new ObjectId(tid) })

    return res.status(200).json(team)
  }

  if (req.method === 'PUT') {
    const update = req.body

    const result = await db.collection('teams')
      .updateOne({ _id: new ObjectId(tid) }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}
