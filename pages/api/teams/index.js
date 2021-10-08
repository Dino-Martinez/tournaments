import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const teams = await db.collection('teams')
      .find()
      .toArray()

    return res.status(200).json(teams)
  }

  if (req.method === 'POST') {
    const team = req.body

    if (team.game) team.game = new ObjectId(team.game)

    const result = await db.collection('teams')
      .insertOne(team)

    return res.status(200).json(result)
  }
}
