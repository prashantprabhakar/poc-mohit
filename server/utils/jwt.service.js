// @ts-check
const JWT = require('jsonwebtoken');
let {jwtSecret, jwtTokenExpireTime=86400 } = require('../config/config');


exports.sign = function(key, expireTime) {
    return new Promise((resolve, reject) => {
    try{
      var token = JWT.sign(key, jwtSecret, {expiresIn: jwtTokenExpireTime});
      resolve(token);
    }catch(e){
      console.log('error in signing JWT', e);
      reject(e);
    }
      
  })
}


exports.decode = function(jwt){
  return new Promise((resolve, reject) =>{
    try{
      JWT.verify(jwt, jwtSecret, (err, decoded) =>{
        (err || !decoded) ? reject(err) : resolve(decoded);
      })
    }catch(e){
      console.log('unable to decode JWT token: ', jwt, 'error:',e);
      reject(e);
    }
  })
}
