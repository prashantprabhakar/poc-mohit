const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  userid: { type: String },
  status: {type: String, required: true},
  priority: {type: String, required: false},
  isDeleted: {type: Boolean, default: false},
  crtd: { type: Date, default: Date.now }
})

module.exports = mongoose.model('todos', todoSchema)