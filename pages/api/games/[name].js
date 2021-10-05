import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { name } = req.query
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const game = await db.collection('game')
      .findOne({ _id: new ObjectId(name) })

    return res.status(200).json(game)
  }
}
