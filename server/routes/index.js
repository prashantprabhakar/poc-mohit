const express = require('express')
const router = express.Router()

const login = require('./auth/login')
const signup = require('./auth/signup')
const todo = require('./todos/todo')


router.use('/signup', signup)
router.use('/login', login)
router.use('/todo', todo)

module.exports = router 
