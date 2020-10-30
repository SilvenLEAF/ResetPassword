const passport = require('passport');
const User = require('../models/User');







const LoginStrategy = require('./passportStrategies/LoginStrategy');
const SignupStrategy = require('./passportStrategies/SignupStrategy');













/* --------------------------------
.    SERIALIZE and DESERIALIZE
-------------------------------- */
passport.serializeUser((user, done)=>{
  done(null, user.id);
});



passport.deserializeUser((id, done)=>{
  User.findById(id).then(user=> done(null, user));
})













/* --------------------------------
.           STRATEGIES
-------------------------------- */
passport.use('local-signup', SignupStrategy);
passport.use('local-login', LoginStrategy);