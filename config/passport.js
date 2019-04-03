//const mongoose = require('mongoose')
//const User = mongoose.model('users')  此处如果这么引入会报错 需要从server.js文件中先引入users模型
const User = require('../models/Users')
const keys = require('../config/keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports =  passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //console.log(jwt_payload)
    User.findById(jwt_payload.id)
      .then(user=>{
        if(user){
          return done(null,user)
        }
        return done(null,false)
      }) 
      .catch(err=>console.log(err))
  }));
}