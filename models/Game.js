import mongoose from 'mongoose'
import Tournament from './Tournament'
const Schema = mongoose.Schema

const game = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  banner: { type: String, required: true },
  upcoming: [{ type: Schema.Types.ObjectId, ref: Tournament }]
})

export const Game = mongoose.models.Game || mongoose.model('Game', game)
export default Game
