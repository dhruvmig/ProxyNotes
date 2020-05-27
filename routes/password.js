const Password=require('../controllers/password');
const express=require('express');
const router=express.Router();
const verifyToken = require('../middleware/verifyToken');

router.route('/forgotpassword').post(verifyToken,Password.forgotPassword);
router.route('/:id/resetpassword').put(verifyToken,Password.resetPassword);

module.exports=router;