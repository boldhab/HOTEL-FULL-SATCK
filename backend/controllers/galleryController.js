const galleryService = require('../services/galleryService');
const { uploadBuffer, deleteByPublicId } = require('../services/cloudinaryService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
exports.getGallery = asyncHandler(async (req, res) => {
  const items = await galleryService.listGallery();

  res.status(200).json({
    success: true,
    data: items,
  });
});

/**
 * @desc    Upload gallery item
 * @route   POST /api/gallery
 * @access  Private/Admin
 */
exports.uploadToGallery = asyncHandler(async (req, res) => {
  const { description, category } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image',
    });
  }

  const uploaded = await uploadBuffer(req.file.buffer, { folder: 'hotel/gallery' });

  const item = await galleryService.createGalleryItem({
    imageUrl: uploaded.secure_url,
    publicId: uploaded.public_id,
    description,
    category,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'CREATE_GALLERY_ITEM',
    entity: 'Gallery',
    entityId: item.id,
  });

  res.status(201).json({
    success: true,
    data: item,
  });
});

/**
 * @desc    Delete gallery item
 * @route   DELETE /api/gallery/:id
 * @access  Private/Admin
 */
exports.deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await galleryService.getGalleryItem(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }

  if (item.publicId) {
    await deleteByPublicId(item.publicId);
  }

  await galleryService.deleteGalleryItem(req.params.id);

  await logAdminAction({
    adminId: req.user.id,
    action: 'DELETE_GALLERY_ITEM',
    entity: 'Gallery',
    entityId: item.id,
  });

  res.status(200).json({
    success: true,
    message: 'Item deleted successfully',
  });
});
