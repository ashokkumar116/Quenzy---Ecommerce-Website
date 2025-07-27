const express = require('express');
const verifyUser = require('../Middlewares/verifyUser');
const { addReview, checkReviewExists } = require('../Controllers/reviewControllers');
const router = express.Router();

router.post('/add-review',verifyUser,addReview);
router.get('/check', checkReviewExists);


module.exports = router;