const User=require('../controllers/user');
const express=require('express');
const router=express.Router();




router.route('/register').post(User.addUser);
router.route('/login').post(User.authUser);


module.exports=router;