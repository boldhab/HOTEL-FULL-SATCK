const roomService = require('../services/roomService');
const { uploadBuffer, deleteByPublicId } = require('../services/cloudinaryService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all rooms
 * @route   GET /api/rooms
 * @access  Public
 */
exports.getRooms = asyncHandler(async (req, res) => {
  const rooms = await roomService.listRooms();

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
  const room = await roomService.getRoomById(req.params.id);

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

  let images = [];
  let imagePublicIds = [];

  if (req.files && req.files.length > 0) {
    const uploads = await Promise.all(
      req.files.map((file) =>
        uploadBuffer(file.buffer, { folder: 'hotel/rooms' })
      )
    );
    images = uploads.map((u) => u.secure_url);
    imagePublicIds = uploads.map((u) => u.public_id);
  }

  const room = await roomService.createRoom({
    name,
    type,
    description,
    price: parseFloat(price),
    capacity: parseInt(capacity),
    images,
    imagePublicIds,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'CREATE_ROOM',
    entity: 'Room',
    entityId: room.id,
    metadata: { name },
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
  let room = await roomService.getRoomById(req.params.id);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    });
  }

  const { name, type, description, price, capacity } = req.body;
  
  // Handle new images if uploaded, otherwise keep old ones
  let images = room.images;
  let imagePublicIds = room.imagePublicIds || [];

  if (req.files && req.files.length > 0) {
    if (imagePublicIds.length > 0) {
      await Promise.all(imagePublicIds.map((id) => deleteByPublicId(id)));
    }

    const uploads = await Promise.all(
      req.files.map((file) =>
        uploadBuffer(file.buffer, { folder: 'hotel/rooms' })
      )
    );
    images = uploads.map((u) => u.secure_url);
    imagePublicIds = uploads.map((u) => u.public_id);
  }

  room = await roomService.updateRoom(req.params.id, {
    name,
    type,
    description,
    price: price ? parseFloat(price) : undefined,
    capacity: capacity ? parseInt(capacity) : undefined,
    images,
    imagePublicIds,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'UPDATE_ROOM',
    entity: 'Room',
    entityId: room.id,
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
  const room = await roomService.getRoomById(req.params.id);

  if (!room) {
    return res.status(404).json({
      success: false,
      message: 'Room not found',
    });
  }

  if (room.imagePublicIds && room.imagePublicIds.length > 0) {
    await Promise.all(room.imagePublicIds.map((id) => deleteByPublicId(id)));
  }

  await roomService.deleteRoom(req.params.id);

  await logAdminAction({
    adminId: req.user.id,
    action: 'DELETE_ROOM',
    entity: 'Room',
    entityId: room.id,
  });

  res.status(200).json({
    success: true,
    message: 'Room deleted successfully',
  });
});
