const prisma = require('../config/prisma');
const asyncHandler = require('../utils/asyncHandler');
const fs = require('fs');
const path = require('path');

/**
 * @desc    Get all rooms
 * @route   GET /api/rooms
 * @access  Public
 */
exports.getRooms = asyncHandler(async (req, res) => {
  const rooms = await prisma.room.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms,
  });
});

/**
 * @desc    Get single room
 * @route   GET /api/rooms/:id
 * @access  Public
 */
exports.getRoom = asyncHandler(async (req, res) => {
  const room = await prisma.room.findUnique({
    where: { id: req.params.id },
  });

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    });
  }

  res.status(200).json({
    success: true,
    data: room,
  });
});

/**
 * @desc    Create new room
 * @route   POST /api/rooms
 * @access  Private/Admin
 */
exports.createRoom = asyncHandler(async (req, res) => {
  const { name, type, description, price, capacity } = req.body;

  // Handle images if uploaded
  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  const room = await prisma.room.create({
    data: {
      name,
      type,
      description,
      price: parseFloat(price),
      capacity: parseInt(capacity),
      images,
    },
  });

  res.status(201).json({
    success: true,
    data: room,
  });
});

/**
 * @desc    Update room
 * @route   PUT /api/rooms/:id
 * @access  Private/Admin
 */
exports.updateRoom = asyncHandler(async (req, res) => {
  let room = await prisma.room.findUnique({
    where: { id: req.params.id },
  });

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    });
  }

  const { name, type, description, price, capacity } = req.body;
  
  // Handle new images if uploaded, otherwise keep old ones
  let images = room.images;
  if (req.files && req.files.length > 0) {
    images = req.files.map(file => `/uploads/${file.filename}`);
  }

  room = await prisma.room.update({
    where: { id: req.params.id },
    data: {
      name,
      type,
      description,
      price: price ? parseFloat(price) : undefined,
      capacity: capacity ? parseInt(capacity) : undefined,
      images,
    },
  });

  res.status(200).json({
    success: true,
    data: room,
  });
});

/**
 * @desc    Delete room
 * @route   DELETE /api/rooms/:id
 * @access  Private/Admin
 */
exports.deleteRoom = asyncHandler(async (req, res) => {
  const room = await prisma.room.findUnique({
    where: { id: req.params.id },
  });

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    });
  }

  // Delete images from filesystem
  if (room.images && room.images.length > 0) {
    room.images.forEach(imagePath => {
      const fullPath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });
  }

  await prisma.room.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: 'Room deleted successfully',
  });
});
