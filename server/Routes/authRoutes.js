const express = require('express');
const { registerUser, loginUser, getUser, logout, uploadProfile, editUser } = require('../Controllers/authControllers');
const verifyUser = require('../Middlewares/verifyUser');
const upload = require('../Middlewares/profileUpload');
const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getUser',verifyUser,getUser);
router.post('/logout',verifyUser,logout);
router.put('/profileupload',verifyUser,upload.single('profile_pic'),uploadProfile);
router.put('/edituser',verifyUser,editUser);


module.exports = router;