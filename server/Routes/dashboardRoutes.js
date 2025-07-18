const express = require('express');
const adminAuth = require('../Middlewares/adminAuth');
const { getUserCount, getProductCount, getSellerCount } = require('../Controllers/dashboardControllers');
const router = express.Router();

router.get('/getusercount',adminAuth,getUserCount);
router.get('/getproductcount', adminAuth,getProductCount);
router.get('/getsellerscout',adminAuth,getSellerCount)





module.exports = router;