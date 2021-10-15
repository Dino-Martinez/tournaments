import mongoose from 'mongoose'
import User from './User'
const Schema = mongoose.Schema

const team = new Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: User }]
})

export const Team = mongoose.models.Team || mongoose.model('Team', team)
export default Team
