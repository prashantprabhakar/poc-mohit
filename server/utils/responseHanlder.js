//@ts-check
'use strict'

exports.missingParans = (res) => {
    return res.status(200).json({ success: false, message: 'Missing params'})
}


exports.resourceAlreadyExists = (res, message) => {
    return res.status(400).json({ success: false, message })
}


exports.handleResponse  = (res, statusCode, message, data=null) => {
    console.log(statusCode)
    switch(statusCode) {
      case 200:
        return res.status(statusCode).json({ success: true, message, data })
        break
      
      case 201:
        return res.status(statusCode).json({ success: true, message, data })
        break
  
      case 404:
        return res.status(statusCode).json({ success: false, message, data })
        break
  
      default:
        return res.status(404).json({ success: false, message: 'No response found'})
    }
  }
  
