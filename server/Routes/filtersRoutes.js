const express = require('express');
const { getFilters, fetchProductsByFilter } = require('../Controllers/filtersControllers');
const router = express.Router();


router.get('/getfilters',getFilters);
router.post('/fetchproductsbyfilter',fetchProductsByFilter);










module.exports = router;