
const express = require('express');
const { getHunts, addHunt, updateHunt ,deleteAllHunts} = require('../controllers/huntController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getHunts).post(protect, addHunt).delete(protect, deleteAllHunts);
router.route('/:id').put(protect, updateHunt)

module.exports = router;


