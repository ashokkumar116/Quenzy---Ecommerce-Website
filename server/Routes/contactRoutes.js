const express = require('express');
const sendMail = require('../Controllers/contactControllers');
const router = express.Router();


router.post('/sendmail',sendMail);







module.exports = router;