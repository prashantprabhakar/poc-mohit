// @ts-check
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')


const { port, mongoUrl } = require('./config/config')


const app = express()

// setup mongo
const connectMongo = require('./utils/connectMongo')

// cors middleware
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


// use routes
const routes = require('./routes')
app.use('/api',routes)

connectMongo(mongoUrl).then(() => {
  app.listen(port, () => {
    console.log(`server listening on ${port}`)
  })
})






