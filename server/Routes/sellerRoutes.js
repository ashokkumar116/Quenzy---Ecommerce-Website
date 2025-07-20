const express = require('express');
const { getAllSeller, addSeller, updateSeller, deleteSeller, getSellersPage } = require('../Controllers/sellerController');
const adminAuth = require('../Middlewares/adminAuth');
const router = express.Router();



router.get('/getallsellers',getAllSeller);
router.post('/addseller',adminAuth, addSeller);
router.put('/updateseller/:id',adminAuth, updateSeller);
router.delete('/deleteseller/:id',adminAuth, deleteSeller);
router.get('/getsellerspage',adminAuth,getSellersPage)







module.exports = router;