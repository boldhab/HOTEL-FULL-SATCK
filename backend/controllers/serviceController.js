const serviceService = require('../services/serviceService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
exports.getServices = asyncHandler(async (req, res) => {
  const services = await serviceService.listServices();

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

  const service = await serviceService.createService({
    title,
    type,
    description,
    icon,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'CREATE_SERVICE',
    entity: 'Service',
    entityId: service.id,
  });

  res.status(201).json({
    success: true,
    data: service,
  });
});

/**
 * @desc    Update service
 * @route   PUT /api/services/:id
 * @access  Private/Admin
 */
exports.updateService = asyncHandler(async (req, res) => {
  const { title, type, description, icon } = req.body;

  const service = await serviceService.updateService(req.params.id, {
    title,
    type,
    description,
    icon,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'UPDATE_SERVICE',
    entity: 'Service',
    entityId: service.id,
  });

  res.status(200).json({
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
  const service = await serviceService.deleteService(req.params.id);

  await logAdminAction({
    adminId: req.user.id,
    action: 'DELETE_SERVICE',
    entity: 'Service',
    entityId: service.id,
  });

  res.status(200).json({
    success: true,
    message: 'Service deleted successfully',
  });
});
