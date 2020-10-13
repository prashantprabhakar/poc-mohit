// @ts-check

var express = require('express')
var router = express.Router()
const jwtService = require('../../utils/jwt.service')
const { jwtTokenExpireTime } = require('../../config/config')

const { handleResponse } = require('./../../utils/responseHanlder')

const UserModel = require('./../../models/users.model')

router.post('/', async (req, res) => {
  console.log('login post route was hit')
  let { email: username, password } = req.body
  if (!username || !password) {
    return handleResponse(res, 400, 'Missing params')
  }

  let user = await UserModel.findOne({$or: [{email: username}, { phone: username}], password}).select({ password: -1, crtd: -1 })
  console.log('user', {user})
  if(!user) {
    return handleResponse(res, 401, 'Invalid credentials')
  }
  let token = await  jwtService.sign({ data: user }, jwtTokenExpireTime )
  return handleResponse(res, 200, 'sign in successful', { token, user })

})

module.exports = router