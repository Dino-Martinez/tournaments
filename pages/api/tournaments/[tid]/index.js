import { connectToDatabase } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler (req, res) {
  const { tid } = req.query
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const tournament = await db.collection('tournaments')
      .findOne({ _id: new ObjectId(tid) })
    const rounds = []
    for (let i = 0; i < Math.log2(tournament.maxTeams); i++) {
      const round = {
        title: `round ${i + 1}`
      }
      const seeds = []
      for (let n = 0; n < (tournament.maxTeams / (Math.pow(2, i + 1))); n++) {
        const seed = {
          id: n, // refactor for unique ID
          date: 'Today',
          teams: [{ name: `Team ${i}` }, { name: `Team ${n}` }]
        }
        seeds.push(seed)
      }
      round.seeds = seeds
      rounds.push(round)
    }
    tournament.rounds = rounds
    return res.status(200).json(tournament)
  }

  if (req.method === 'PUT') {
    const update = req.body

    const result = await db.collection('tournaments')
      .updateOne({ _id: new ObjectId(tid) }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}
