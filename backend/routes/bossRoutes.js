
const express = require('express');
const { getBosses} = require('../controllers/bossController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getBosses)

module.exports = router;
