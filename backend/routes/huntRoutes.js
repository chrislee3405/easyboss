
const express = require('express');
const { getHunts, addHunt  } = require('../controllers/huntController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getHunts).post(protect, addHunt);

module.exports = router;
