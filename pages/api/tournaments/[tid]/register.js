import { connectToDatabase } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { tid } = req.query
  const { db } = await connectToDatabase()

  if (req.method === 'POST') {
    const { registered } = req.body

    const result = await db.collection('tournaments')
      .updateOne({ _id: new ObjectId(tid) },
        { $addToSet: { registered: { $each: registered } } })

    return res.status(200).json(result)
  }
}
