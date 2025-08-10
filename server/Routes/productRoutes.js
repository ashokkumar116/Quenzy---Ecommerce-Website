const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct, getOneProduct, getProductsByCategory } = require('../Controllers/productController');
const adminAuth = require('../Middlewares/adminAuth');
const upload = require('../Middlewares/fileUpload');
const { uploadProductImage } = require('../Middlewares/cloudinary');
const router = express.Router();


router.get('/getproducts',getAllProducts);
router.post('/addproduct',adminAuth,uploadProductImage.array('images', 10),addProduct);
router.put('/updateproduct/:id',adminAuth,uploadProductImage.array('images', 10),updateProduct);
router.delete('/deleteproduct/:id', adminAuth,deleteProduct);
router.get('/getoneproduct/:slug',getOneProduct);
router.get('/getproductsbycategory/:slug',getProductsByCategory);




module.exports = router;