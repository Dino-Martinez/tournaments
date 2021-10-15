import Tournament from '../../../../models/Tournament'
import connectDB from '../../../../lib/db'

const handler = async (req, res) => {
  const { tid } = req.query

  if (req.method === 'GET') {
    const tournament = await Tournament
      .findOne({ _id: tid })
      .populate('registered')
      .lean()

    const rounds = []

    const numRounds = Math.log2(tournament.maxTeams)

    for (let i = 0; i < numRounds; i++) {
      const round = {
        title: `round ${i + 1}`
      }
      const seeds = []

      const numMatches = tournament.maxTeams / (Math.pow(2, i + 1))
      for (let j = 0; j < numMatches; j++) {
        const index = i * numMatches + j
        const teams = [tournament.registered[index], tournament.registered[tournament.maxTeams - index]]
        const seed = {
          id: index, // refactor for unique ID
          date: 'Today',
          teams: [{ name: teams[0] ? teams[0].name : 'TBD' }, { name: teams[1] ? teams[1].name : 'TBD' }]
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

    const result = Tournament
      .updateOne({ _id: tid }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
