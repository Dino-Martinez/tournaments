import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const tournaments = await db.collection('tournaments')
      .find()
      .toArray()

    return res.status(200).json(tournaments)
  }

  if (req.method === 'POST') {
    const tournament = req.body

    if (tournament.game) tournament.game = new ObjectId(tournament.game)

    const result = await db.collection('tournaments')
      .insertOne(tournament)

    return res.status(200).json(result)
  }
}
