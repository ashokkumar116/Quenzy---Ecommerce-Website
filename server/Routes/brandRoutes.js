const express = require('express');
const { addBrand, getBrands, updateBrand, deleteBrand, getBrandsPage } = require('../Controllers/brandControllers');
const adminAuth = require('../Middlewares/adminAuth');
const router = express.Router();

router.post('/addbrand',adminAuth,addBrand);
router.get('/getbrands',adminAuth,getBrands);
router.put('/updatebrand/:id', adminAuth,updateBrand)
router.delete('/deletebrand/:id', adminAuth,deleteBrand);
router.get('/getbrandspage', adminAuth, getBrandsPage);


module.exports = router;