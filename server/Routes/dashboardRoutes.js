const express = require('express');
const adminAuth = require('../Middlewares/adminAuth');
const { getUserCount, getProductCount, getSellerCount, getCategoriesData } = require('../Controllers/dashboardControllers');
const router = express.Router();

router.get('/getusercount',adminAuth,getUserCount);
router.get('/getproductcount', adminAuth,getProductCount);
router.get('/getsellerscout',adminAuth,getSellerCount);
router.get('/categoriesdata',adminAuth,getCategoriesData)





module.exports = router;