const express = require('express');
const { query } = require('express-validator');
const { getDashboardStats } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get(
  '/',
  protect,
  authorize('ADMIN'),
  [
    query('start').optional().isISO8601().withMessage('start must be a valid date'),
    query('end').optional().isISO8601().withMessage('end must be a valid date'),
  ],
  validate,
  getDashboardStats
);

module.exports = router;
