const express = require('express');
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoom);

// Protected routes (Admin only)
router.post('/', protect, authorize('ADMIN'), upload.array('images', 5), createRoom);
router.put('/:id', protect, authorize('ADMIN'), upload.array('images', 5), updateRoom);
router.delete('/:id', protect, authorize('ADMIN'), deleteRoom);

module.exports = router;
