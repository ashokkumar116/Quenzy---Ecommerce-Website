const express = require('express');
const { getCategories, AddCategory, updateCategory, deleteCategory } = require('../Controllers/categoriesController');
const adminAuth = require('../Middlewares/adminAuth');
const router = express.Router();

router.get('/getcategories',adminAuth,getCategories);
router.post('/addcategory',adminAuth,AddCategory);
router.put('/updatecategory/:id',adminAuth,updateCategory);
router.delete('/deletecategory/:id',adminAuth,deleteCategory)




module.exports = router;