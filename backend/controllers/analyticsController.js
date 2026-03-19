const analyticsService = require('../services/analyticsService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get dashboard analytics
 * @route   GET /api/analytics
 * @access  Private/Admin
 */
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const { start, end } = req.query;
  const stats = await analyticsService.getDashboardStats({ start, end });

  res.status(200).json({
    success: true,
    data: stats,
  });
});
