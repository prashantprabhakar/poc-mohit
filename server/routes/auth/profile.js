const express = require('express')
const router = express.Router()
const passport = require('passport')
const { handleResponse } = require('./../../utils/responseHanlder')
const TodoModel = require('./../../models/todo.mode')
const usersModel = require('../../models/users.model')

router.get('/', passport.authenticate('jwt', { session: false }), async(req, res) => {
  try {
    let {_id } = req.query
    let user = await usersModel.findOne({_id})
    
    return handleResponse(res, 200, '', {user})
  } catch(error) {
    return handleResponse(res, 500, 'Something went wrong')
  }
})

router.post('/', passport.authenticate('jwt', { session: false }), async(req, res) => {
    try {
      let { _id, fName, lName, address1, address2, city, state, zip, aptNo, subscribed_to_mails, accepted_tnc } = req.body
      let user = await usersModel.updateOne({_id}, {
          $set: {
            fName, lName, address1, address2, city, state, zip, aptNo, subscribed_to_mails, accepted_tnc, 
          }
      })
      
      return handleResponse(res, 200, '', {user})
    } catch(error) {
        console.log(error)
      return handleResponse(res, 500, 'Something went wrong')
    }
  })




module.exports  = router