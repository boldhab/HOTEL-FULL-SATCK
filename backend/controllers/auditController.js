const prisma = require('../config/prisma');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get audit logs
 * @route   GET /api/audit-logs
 * @access  Private/Admin
 */
exports.getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { admin: { select: { id: true, name: true, email: true } } },
  });

  res.status(200).json({
    success: true,
    data: logs,
  });
});
