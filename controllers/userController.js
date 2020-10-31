const User = require('../models/User');





/* ------------------------------------
.           GET ALL USERS
------------------------------------ */
module.exports.get_all_users = async (req, res, next)=>{
  try {
    const allUsers = await User.find({});

    /* this reverse() will give us the latest user on top of that array
    I mean, the newest user will be on the first place of that array */
    res.json(allUsers.reverse()); 

  } catch (err) {
    next(err, req, res);
  }
}









/* ------------------------------------
.           DELETE ACCOUNT
------------------------------------ */
module.exports.delete_account = async (req, res, next)=>{
  try{

    const deleteUser = await User.findByIdAndDelete(req.user._id);
    res.json(deleteUser);
  } catch(err){
    next(err, req, next);
  }
}











/* ------------------------------------
.           UPDATE ACCOUNT
------------------------------------ */
module.exports.update_account = async (req, res, next)=>{
  try{    
    await User.findByIdAndUpdate(userId, req.body);
    const updatedUser = await User.findById(req.user._id);
  }catch(err){
    next(err, req, res);
  }
}