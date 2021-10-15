import mongoose from 'mongoose'
const Schema = mongoose.Schema
const team = new Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  members: { type: Array, default: [] }
})

mongoose.models = {}

const Team = mongoose.model('Team', team)
export default Team
