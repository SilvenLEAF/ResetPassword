const router = require('express').Router();
const userController = require('../controllers/userController');


// -------------------middlewares-------------------
const isLoggedin = require('../middlewares/isLoggedin');









// -------------------------GET LOGGED IN USER
router.get('/', isLoggedin, (req, res, next)=>{
  res.json({ user: req.user });
});







router.get('/all', isLoggedin, userController.get_all_users);
router.delete('/', isLoggedin, userController.delete_account);
router.put('/', isLoggedin,  userController.update_account);














module.exports = router;