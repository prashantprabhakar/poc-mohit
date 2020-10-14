const express = require('express')
const router = express.Router()

const login = require('./auth/login')
const signup = require('./auth/signup')
const todo = require('./todos/todo')
const profile = require('./auth/profile')


router.use('/signup', signup)
router.use('/login', login)
router.use('/todo', todo)
router.use('/profile', profile)

module.exports = router 
