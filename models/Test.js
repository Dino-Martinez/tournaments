import mongoose from 'mongoose'
const Schema = mongoose.Schema

const test = new Schema({
  name: { type: String, required: true },
  description: { type: String }
})

mongoose.models = {}

const Test = mongoose.model('Test', test)
export default Test
