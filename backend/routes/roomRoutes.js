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
const roomStatuses = ['available', 'occupied', 'maintenance', 'booked'];
const amenitiesValidator = (value) => {
  if (value === undefined || value === null || value === '') return true;
  if (Array.isArray(value)) {
    return value.every((item) => typeof item === 'string');
  }
  return typeof value === 'string';
};

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
    body('status').optional().isIn(roomStatuses).withMessage('Invalid room status'),
    body('amenities').optional().custom(amenitiesValidator).withMessage('Amenities must be a string or array'),
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
    body('status').optional().isIn(roomStatuses).withMessage('Invalid room status'),
    body('amenities').optional().custom(amenitiesValidator).withMessage('Amenities must be a string or array'),
  ],
  validate,
  updateRoom
);
router.delete('/:id', protect, authorize('ADMIN'), deleteRoom);

module.exports = router;
