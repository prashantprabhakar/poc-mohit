const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users.model');
const config = require('./config');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.jwtSecret;
  passport.use(new JwtStrategy(opts, async(jwt_payload, done) => {
    try{
      let user = await User.findOne({  _id: jwt_payload.data._id})
      return user ? done(null, user) :  done(null, false)
    } catch (e) {
      return done(e,  false)
    }
    

    // User.findOne({_id: jwt_payload.data._id}, (err, user) => {
    //   if(err) {
    //     return done(err, false);
    //   }

    //   if(user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //   }
    // });

  }));
}
