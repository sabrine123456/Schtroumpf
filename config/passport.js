const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const config = require('../config/database');



module.exports = function(passport) {
  
  let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
 
    User.getUserById(jwt_payload.data._id, (err, user) => {
   
      if(err) {
        return done(null, false, { message: "bad username or passwords don't match" });
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "bad username or passwords don't match" });
        // return done(null, false);
      }
    });
  }));
}