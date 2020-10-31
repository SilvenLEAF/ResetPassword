

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
  console.log(req.body);
  // it will call a series on functions in a series
  async.waterfall([







    /* -------------------------------------------
    .            1) create a random token
    ------------------------------------------- */
    (done)=>{
      crypto.randomBytes(20, function(err, buf) {
        const token = buf.toString('hex');
        console.log(`created token TOKEN DONE`, token)
        done(err, token);
      });
    },










    /* -------------------------------------------
    .         2) create an expiration time
    . and save it and the token on the User model
    ------------------------------------------- */
    (token, done)=>{
     
      // find the user with the email input

      User.findOne({ 'local.email': req.body.email }, (err, user)=>{
        
        
        console.log('User DONE\n', user)
        // if there is no user with that account
        if (!user) return res.json({ msg: `No account with that email exists` });
          

        // if there is, save the token and its expiration time on the User model
        user.local.resetPasswordToken = token;
        user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour


        user.save(err=>{
          done(err, token, user);
        });
      });
    },












    /* -------------------------------------------
    .3) send email to the user with that token link
    ------------------------------------------- */
    (token, user, done)=>{
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'manashsarmatheemperor@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });
      



      const mailOptions = {
        to: user.local.email,
        from: 'manashsarmatheemperor@gmail.com',
        subject: 'Reset your Password',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      
      
      smtpTransport.sendMail(mailOptions, (err)=>{
        console.log('mail sent');
        res.json({ msg: `An email has been sent to ${ user.local.email } with further instructions` });
        done(err, 'done');
      });
    }
  ], (err) =>{
    if (err) return next(err);
  });
});
































/* -------------------------------------------
.         Send the change pasword page
------------------------------------------- */
router.get('/reset/:token', (req, res)=>{
  User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, (err, user)=>{
    if (!user) return res.json({ msg: 'Password reset token is invalid or has expired' });
      
    res.render('reset', {token: req.params.token});
  });
});












/* -------------------------------------------
.      change password with the new one
------------------------------------------- */
router.post('/reset/:token', (req, res)=>{
  async.waterfall([



    (done)=>{
      User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, (err, user) =>{
        if (!user) return res.json({ msg: 'Password reset token is invalid or has expired' });


        if(!req.body.password === req.body.confirm) return res.json({ msg: `Password do not match` });

        user.local.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
        user.local.resetPasswordToken = undefined;
        user.local.resetPasswordExpires = undefined;



        user.save((err)=>{
          req.logIn(user, (err)=>{
            done(err, user);
          });
        });



      });
    },






    (user, done)=>{
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: 'manashsarmatheemperor@gmail.com',
          pass: process.env.GMAIL_PASSWORD
        }
      });


      const mailOptions = {
        to: user.local.email,
        from: 'manashsarmatheemperor@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
      };


      smtpTransport.sendMail(mailOptions, (err)=>{
        res.json({ msg: 'Success! Your password has been changed' });
        done(err);
      });
    }
  ], (err)=>{
    if(err) console.log(err)
    console.log('Completed Password Change');
  });
});






module.exports = router;