import Team from '../../../models/Team'
import connectDB from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const teams = await Team
      .find({})
      .populate('members')
      .lean()
    return res.status(200).json(teams)
  }

  if (req.method === 'POST') {
    const request = req.body

    if (request.query) {
      const teams = await Team
        .find(request.query)
        .populate('members')
        .lean()

      return res.status(200).json(teams)
    }

    const team = new Team(request)

    const result = await team.save()

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
