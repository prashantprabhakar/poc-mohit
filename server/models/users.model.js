const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  initials: String,
  crtd: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', usersSchema)