const express = require('express');
const { body } = require('express-validator');
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getRooms);
router.get('/:id', getRoom);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  authorize('ADMIN'),
  upload.array('images', 5),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('type').optional().isString(),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('capacity').isInt({ gt: 0 }).withMessage('Capacity must be greater than 0'),
  ],
  validate,
  createRoom
);
router.put(
  '/:id',
  protect,
  authorize('ADMIN'),
  upload.array('images', 5),
  [
    body('name').optional().isString(),
    body('type').optional().isString(),
    body('description').optional().isString(),
    body('price').optional().isFloat({ gt: 0 }),
    body('capacity').optional().isInt({ gt: 0 }),
  ],
  validate,
  updateRoom
);
router.delete('/:id', protect, authorize('ADMIN'), deleteRoom);

module.exports = router;
