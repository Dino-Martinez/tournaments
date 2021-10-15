import Team from '../../../../models/Team'
import connectDB from '../../../../lib/db'

const handler = async (req, res) => {
  const { tid } = req.query

  if (req.method === 'GET') {
    const team = await Team
      .findOne({ _id: tid })
      .populate('members')

    return res.status(200).json(team)
  }

  if (req.method === 'PUT') {
    const update = req.body

    const result = await Team
      .updateOne({ _id: tid }, { $set: update }, { upsert: false })

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
