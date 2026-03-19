const express = require('express');
const { body } = require('express-validator');
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getServices);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  authorize('ADMIN'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('type').optional().isString(),
    body('description').notEmpty().withMessage('Description is required'),
    body('icon').optional().isString(),
  ],
  validate,
  createService
);
router.put(
  '/:id',
  protect,
  authorize('ADMIN'),
  [
    body('title').optional().isString(),
    body('type').optional().isString(),
    body('description').optional().isString(),
    body('icon').optional().isString(),
  ],
  validate,
  updateService
);
router.delete('/:id', protect, authorize('ADMIN'), deleteService);

module.exports = router;
