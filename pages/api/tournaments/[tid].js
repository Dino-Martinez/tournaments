import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { tid } = req.query
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const tournament = await db.collection('tournaments')
      .findOne({ _id: new ObjectId(tid) })

    return res.status(200).json(tournament)
  }

  if (req.method === 'POST') {
    const tournament = req.body

    const result = await db.collection('tournaments')
      .insertOne(tournament)

    return res.status(200).json(result)
  }

  if (req.method === 'PUT') {
    const update = req.body

    const result = await db.collection('tournaments')
      .updateOne({ _id: new ObjectId(tid) }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}
