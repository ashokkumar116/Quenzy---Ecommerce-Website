const express = require('express');
const { getAllProducts, addProduct } = require('../Controllers/productController');
const adminAuth = require('../Middlewares/adminAuth');
const upload = require('../Middlewares/fileUpload');
const router = express.Router();


router.get('/getproducts',getAllProducts);
router.post('/addproduct',adminAuth,upload.array('images', 10),addProduct);



module.exports = router;