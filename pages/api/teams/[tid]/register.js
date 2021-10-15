import Team from '../../../../models/Team'
import connectDB from '../../../../lib/db'

const handler = async (req, res) => {
  const { tid } = req.query

  if (req.method === 'POST') {
    const { member } = req.body
    const result = await Team
      .updateOne({ _id: tid },
        { $addToSet: { members: member } })

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
