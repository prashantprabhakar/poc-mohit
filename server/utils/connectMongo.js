// @ts-check
'use strict'
const mongoose = require('mongoose')

const setupDB = async(url) => {
    let db = await mongoose.connect(url)

    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`)
        process.exit(-1)
    })
}

module.exports = setupDB