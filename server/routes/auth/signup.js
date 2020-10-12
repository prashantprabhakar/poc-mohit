//const router = require('./../../utils/router')

var express = require('express')
var router = express.Router()

const { handleResponse } = require('./../../utils/responseHanlder')

const UserModel = require('./../../models/users.model')

router.post('/', async (req, res) => {
  console.log('signup post route was hit')
  let { name, email, password } = req.body
  console.log({ name, email, password })
  if (!name || !email || !password) {
    return handleResponse(res, 404, 'Missing params')
  }

  let existingUser = await UserModel.findOne({ email })
  if(existingUser) {
    return handleResponse(res, 404, 'User already exists')
  }

  
  let initials = name[0]+name[1]
  await new UserModel({
    email, name, password, initials
  }).save()

  return handleResponse(res,201, 'Signup successful')

})

module.exports = router