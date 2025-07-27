const express = require('express');
const verifyUser = require('../Middlewares/verifyUser');
const { placeOrder } = require('../Controllers/orderControllers');
const router = express.Router();


router.post('/placeorder',verifyUser,placeOrder)




module.exports = router;
