const express = require('express');
const { registerUser, loginUser, getUser, logout } = require('../Controllers/authControllers');
const verifyUser = require('../Middlewares/verifyUser');
const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getUser',verifyUser,getUser);
router.post('/logout',verifyUser,logout);


module.exports = router;