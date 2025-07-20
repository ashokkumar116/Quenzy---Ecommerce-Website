const express = require('express');
const verifyUser = require('../Middlewares/verifyUser');
const { getCart, addToCart, removeFromCart, clearCart } = require('../Controllers/cartControllers');
const router = express.Router();



router.get('/getcartitems',verifyUser,getCart);
router.post('/synctocart',verifyUser,addToCart);
router.delete('/removeitem/:id',verifyUser,removeFromCart);
router.delete('/clear',verifyUser,clearCart);









module.exports = router;