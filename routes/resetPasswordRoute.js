

const router  = require('express').Router();
const passport = require("passport");
const User = require("../models/User");
const bcrypt = require('bcryptjs');




const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");







/* -------------------------------------------
.            POST ON FORGOT ROUTE
. 1) create a random token with expiration
. 2) send a link with the token as a /:token
. 3) render the password change page with token
. 4) change password with the new password
. 5) log in the user
------------------------------------------- */
router.post('/forgot', (req, res, next)=>{
  res.json('send reset link on email')
    
});
































/* -------------------------------------------
.         Send the change pasword page
------------------------------------------- */
router.get('/reset/:token', (req, res)=>{
  res.json('get reset form')
});












/* -------------------------------------------
.      change password with the new one
------------------------------------------- */
router.post('/reset/:token', (req, res)=>{
  res.json('password is changed')
});























module.exports = router;
