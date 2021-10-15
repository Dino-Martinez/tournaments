import mongoose from 'mongoose'
const Schema = mongoose.Schema
const user = new Schema({
  email: { type: String, required: true },
  username: { type: String },
  bio: { type: String },
  age: { type: Number }
})

export const User = mongoose.models.User || mongoose.model('User', user)
export default User
