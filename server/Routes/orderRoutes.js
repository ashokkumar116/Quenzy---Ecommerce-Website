const express = require('express');
const verifyUser = require('../Middlewares/verifyUser');
const { placeOrder, getMyOrders, cancelOrder } = require('../Controllers/orderControllers');
const router = express.Router();


router.post('/placeorder',verifyUser,placeOrder);
router.get('/getmyorders',verifyUser,getMyOrders);
router.put('/cancelorder',verifyUser,cancelOrder);



module.exports = router;
