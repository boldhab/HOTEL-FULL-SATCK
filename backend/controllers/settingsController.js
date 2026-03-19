const settingsService = require('../services/settingsService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all settings
 * @route   GET /api/settings
 * @access  Public
 */
exports.getSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.listSettings();

  res.status(200).json({
    success: true,
    data: settings,
  });
});

/**
 * @desc    Update settings (upsert by key)
 * @route   PUT /api/settings
 * @access  Private/Admin
 */
exports.updateSettings = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const keys = Object.keys(payload);

  if (keys.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Provide at least one setting key',
    });
  }

  const results = await Promise.all(
    keys.map((key) => settingsService.upsertSetting(key, payload[key]))
  );

  await logAdminAction({
    adminId: req.user.id,
    action: 'UPDATE_SETTINGS',
    entity: 'Setting',
    metadata: { keys },
  });

  res.status(200).json({
    success: true,
    data: results,
  });
});
