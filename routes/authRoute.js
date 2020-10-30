const router = require('express').Router();
const passport = require('passport');









/* -----------------------------------
.              LOGOUT
----------------------------------- */
router.get('/logout', (req, res)=>{
  req.logOut();
  res.redirect('/');
});




















/* -----------------------------------
.              SIGNUP
----------------------------------- */
router.post('/signup', (req, res, next)=>{
  passport.authenticate('local-signup', (err, user, info) =>{

      // if there is any error (including the error I defined on the strategies)
      if(err) return res.status(400).json(err);


      req.logIn(user, (err)=>{
        // if there is an error while logging in
        if(err) return res.status(500).json({ msg: `Oops, something went wrong`, erro: err.message });



        // if everything is OK, return the usr onto the Cookie-fyer
        return res.json(user);
      })
      
    }
    

  )(req, res, next)
})























/* -----------------------------------
.              LOGIN
----------------------------------- */
router.post('/login', (req, res, next)=>{
  passport.authenticate('local-login', (err, user, info) =>{

      // if there is any error (including the error I defined on the strategies)
      if(err) return res.status(400).json(err);


      req.logIn(user, (err)=>{
        // if there is an error while logging in
        if(err) return res.status(500).json({ msg: `Oops, something went wrong`, erro: err.message });



        // if everything is OK, return the usr onto the Cookie-fyer
        return res.json(user);
      })
      
    }
    

  )(req, res, next)
})