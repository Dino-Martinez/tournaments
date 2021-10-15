import mongoose from 'mongoose'
import Team from './Team'
import User from './User'
const Schema = mongoose.Schema
const tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: User, required: true },
  description: { type: String },
  game: { type: String },
  maxTeams: { type: Number },
  date: { type: Date },
  registered: [{ type: Schema.Types.ObjectId, ref: Team }]
})

mongoose.models = {}

const Tournament = mongoose.model('Tournament', tournament)
export default Tournament
