const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  phone: { type: String, required: true, unique: true},
  password: {type: String, required: true},
  fName: {type: String, required: true},
  lName: { type: String},
  address1: String,
  address2: String,
  aptNo: String,
  city: String,
  state: String,
  zip: String,
  initials: String,
  subscribed_to_mails: Boolean,
  accepted_tnc: Boolean,
  crtd: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', usersSchema)