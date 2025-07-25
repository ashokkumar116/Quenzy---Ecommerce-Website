const express = require('express');
const { getFilters, fetchProductsByFilter } = require('../Controllers/filtersControllers');
const router = express.Router();


router.get('/getfilters',getFilters);
router.get('/fetchproductsbyfilter',fetchProductsByFilter);










module.exports = router;