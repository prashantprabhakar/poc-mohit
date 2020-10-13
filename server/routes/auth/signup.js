//const router = require('./../../utils/router')

var express = require('express')
var router = express.Router()

const { handleResponse } = require('./../../utils/responseHanlder')

const UserModel = require('./../../models/users.model')

router.post('/', async (req, res) => {
  console.log('signup post route was hit')
  let { fName, lName, address1, address2, city, state, zip, aptNo, email, phone, password, subscribed_to_mails, accepted_tnc } = req.body
  if (!fName || !address1 || !email || !password || !phone) {
    return handleResponse(res, 400, 'Missing params')
  }
  if(!accepted_tnc) {
    return handleResponse(res, 400, 'Terms and conditions must be accepted')
  }

  let existingUser = await UserModel.findOne({ $or: [{email}, {phone}] })
  if(existingUser) {
    return handleResponse(res, 400, 'User with given mail/phone already exists')
  }

  
  let initials = getInitials(fName, lName)
  await new UserModel({
    fName, lName, address1, address2, city, state, zip, aptNo, email, phone, password, initials, subscribed_to_mails, accepted_tnc
  }).save()

  return handleResponse(res,201, 'Signup successful')

})

const getInitials = (fName, lName) => {
  let initials = fName[0]
  if(lName) initials += lName[0]
  else if(fName.length>1) initials += fName[1]
  return initials
}

module.exports = router