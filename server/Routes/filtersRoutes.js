const express = require('express');
const { getFilters } = require('../Controllers/filtersControllers');
const router = express.Router();


router.get('/getfilters',getFilters);










module.exports = router;