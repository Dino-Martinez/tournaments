import { connectToDatabase } from '../../../lib/mongodb'

export default async function handler (req, res) {
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const games = await db.collection('games')
      .find()
      .toArray()

    return res.status(200).json(games)
  }
}
