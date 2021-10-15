import Tournament from '../../../models/Tournament'
import connectDB from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const tournaments = await Tournament
      .find()
      .populate('registered')
      .lean()

    return res.status(200).json(tournaments)
  }

  if (req.method === 'POST') {
    const tournament = new Tournament(req.body)

    const result = await tournament.save()

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
