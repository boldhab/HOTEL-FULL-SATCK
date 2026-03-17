const prisma = require('../config/prisma');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
exports.getServices = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json({
    success: true,
    data: services,
  });
});

/**
 * @desc    Create new service
 * @route   POST /api/services
 * @access  Private/Admin
 */
exports.createService = asyncHandler(async (req, res) => {
  const { title, type, description, icon } = req.body;

  const service = await prisma.service.create({
    data: { title, type, description, icon },
  });

  res.status(201).json({
    success: true,
    data: service,
  });
});

/**
 * @desc    Delete service
 * @route   DELETE /api/services/:id
 * @access  Private/Admin
 */
exports.deleteService = asyncHandler(async (req, res) => {
  await prisma.service.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});
