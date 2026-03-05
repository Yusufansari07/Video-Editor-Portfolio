const express = require('express');
const router = express.Router();
const { sendInquiry } = require('../controllers/contactController');
const { validate, contactValidationRules } = require('../middleware/validate');
const { apiLimiter } = require('../middleware/rateLimiter');

router.post('/', apiLimiter, contactValidationRules(), validate, sendInquiry);
module.exports = router;
