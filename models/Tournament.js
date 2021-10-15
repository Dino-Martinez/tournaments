import mongoose from 'mongoose'
const Schema = mongoose.Schema
const tournament = new Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String },
  game: { type: String },
  maxTeams: { type: Number }
})

mongoose.models = {}

const Tournament = mongoose.model('Tournament', tournament)
export default Tournament
