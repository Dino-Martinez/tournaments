import Tournament from '../../../models/Tournament'
import Game from '../../../models/Game'
import connectDB from '../../../lib/db'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    console.log(req.query)
    const query = req.query.category.slice(0, -1)
    const category = await Game
      .findOne({ name: query })
      .lean()
    const tournaments = query !== 'undefined'
      ? await Tournament
        .find({ game: category._id })
        .populate('registered')
        .lean()
      : await Tournament
        .find()
        .populate('registered')
        .lean()

    return res.status(200).json(tournaments)
  }

  if (req.method === 'POST') {
    const tournament = new Tournament(req.body)
    const game = await Game
      .find({ name: tournament.game })
      .lean()

    game.upcoming.push(tournament)
    await game.save()

    const result = await tournament.save()

    return res.status(200).json(result)
  }
}

export default connectDB(handler)
