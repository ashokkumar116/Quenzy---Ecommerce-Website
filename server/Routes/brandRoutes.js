const express = require('express');
const { addBrand, getBrands, updateBrand, deleteBrand } = require('../Controllers/brandControllers');
const adminAuth = require('../Middlewares/adminAuth');
const router = express.Router();

router.post('/addbrand',adminAuth,addBrand);
router.get('/getbrands',adminAuth,getBrands);
router.put('/updatebrand/:id', adminAuth,updateBrand)
router.delete('/deletebrand/:id', adminAuth,deleteBrand)


module.exports = router;