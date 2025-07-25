const express = require('express');
const { searchByQuery } = require('../Controllers/searchControllers');
const router = express.Router();



router.get('/search',searchByQuery);





module.exports = router;