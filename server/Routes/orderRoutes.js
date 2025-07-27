const express = require('express');
const verifyUser = require('../Middlewares/verifyUser');
const { placeOrder, getMyOrders, cancelOrder, updateOrderStatus, getAllOrders } = require('../Controllers/orderControllers');
const adminAuth = require('../Middlewares/adminAuth');
const router = express.Router();


router.post('/placeorder',verifyUser,placeOrder);
router.get('/getmyorders',verifyUser,getMyOrders);
router.put('/cancelorder',verifyUser,cancelOrder);
router.put('/updateorderstatus',adminAuth,updateOrderStatus);
router.get('/getallorders',adminAuth,getAllOrders);



module.exports = router;
