const prisma = require('../config/prisma');
const asyncHandler = require('../utils/asyncHandler');
const fs = require('fs');
const path = require('path');

/**
 * @desc    Get gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
exports.getGallery = asyncHandler(async (req, res) => {
  const items = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' },
  });

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

  const item = await prisma.gallery.create({
    data: {
      imageUrl: `/uploads/${req.file.filename}`,
      description,
      category,
    },
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
  const item = await prisma.gallery.findUnique({
    where: { id: req.params.id },
  });

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }

  // Delete file from filesystem
  const fullPath = path.join(__dirname, '..', item.imageUrl);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }

  await prisma.gallery.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: 'Item deleted successfully',
  });
});
