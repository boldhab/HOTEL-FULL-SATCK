const roomService = require('../services/roomService');
const { uploadBuffer, deleteByPublicId } = require('../services/cloudinaryService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

const ROOM_STATUSES = ['available', 'occupied', 'maintenance', 'booked'];

const parseRoomStatus = (value, fallback = 'available') => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  const normalized = String(value).trim().toLowerCase();
  return ROOM_STATUSES.includes(normalized) ? normalized : fallback;
};

const parseAmenities = (value, fallback = []) => {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Fallback to comma/newline parsing.
    }

    return trimmed
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
};

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
  const { name, type, description, price, capacity, status, amenities } = req.body;

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
    status: parseRoomStatus(status, 'available'),
    amenities: parseAmenities(amenities, []),
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

  const { name, type, description, price, capacity, status, amenities } = req.body;
  
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
    status: parseRoomStatus(status, room.status || 'available'),
    amenities: parseAmenities(amenities, room.amenities || []),
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
