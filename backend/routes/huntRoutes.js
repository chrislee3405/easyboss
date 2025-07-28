
const express = require('express');
const { getHunts, addHunt, updateHunt ,deleteAllHunts, deleteHuntById} = require('../controllers/huntController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getHunts).post(protect, addHunt).delete(protect, deleteAllHunts);
router.route('/:id').put(protect, updateHunt).delete(protect, deleteHuntById);  // Add this line

module.exports = router;


