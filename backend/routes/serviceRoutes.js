const express = require('express');
const { getServices, createService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getServices);

// Protected routes (Admin only)
router.post('/', protect, authorize('ADMIN'), createService);
router.delete('/:id', protect, authorize('ADMIN'), deleteService);

module.exports = router;
