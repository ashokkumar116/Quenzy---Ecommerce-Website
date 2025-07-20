const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct, getOneProduct } = require('../Controllers/productController');
const adminAuth = require('../Middlewares/adminAuth');
const upload = require('../Middlewares/fileUpload');
const router = express.Router();


router.get('/getproducts',getAllProducts);
router.post('/addproduct',adminAuth,upload.array('images', 10),addProduct);
router.put('/updateproduct/:id',adminAuth,upload.array('images', 10),updateProduct);
router.delete('/deleteproduct/:id', adminAuth,deleteProduct);
router.get('/getoneproduct/:slug',getOneProduct);




module.exports = router;