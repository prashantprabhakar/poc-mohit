// @ts-check

var express = require('express')
var router = express.Router()
const jwtService = require('../../utils/jwt.service')
const { jwtTokenExpireTime } = require('../../config/config')

const { handleResponse } = require('./../../utils/responseHanlder')

const UserModel = require('./../../models/users.model')

router.post('/', async (req, res) => {
  console.log('login post route was hit')
  let { email, password } = req.body
  if (!email || !password) {
    return handleResponse(res, 200, 'Missing params')
  }

  let user = await UserModel.findOne({email, password}).select({ password: -1, crtd: -1 })
  if(!user) {
    return handleResponse(res, 404, 'Invalid credentials')
  }
  let token = await  jwtService.sign({ data: user }, jwtTokenExpireTime )
  return handleResponse(res, 200, 'sign in successful', { token, user })

})

module.exports = router