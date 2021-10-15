import Tournament from '../../../../models/Tournament'
import connectDB from '../../../../lib/db'

const handler = async (req, res) => {
  const { tid } = req.query

  if (req.method === 'POST') {
    const { registered } = req.body
    console.log(registered)
    const result = await Tournament
      .updateOne({ _id: tid },
        { $addToSet: { registered: registered } })

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
