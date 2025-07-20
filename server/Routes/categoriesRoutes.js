const express = require('express');
const { getCategories, AddCategory, updateCategory, deleteCategory, getCategoriesPage } = require('../Controllers/categoriesController');
const adminAuth = require('../Middlewares/adminAuth');
const router = express.Router();

router.get('/getcategories',getCategories);
router.post('/addcategory',adminAuth,AddCategory);
router.put('/updatecategory/:id',adminAuth,updateCategory);
router.delete('/deletecategory/:id',adminAuth,deleteCategory);
router.get('/getcategoriespage',adminAuth,getCategoriesPage);




module.exports = router;