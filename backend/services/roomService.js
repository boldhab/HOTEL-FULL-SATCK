const prisma = require('../config/prisma');

const listRooms = () =>
  prisma.room.findMany({ orderBy: { createdAt: 'desc' } });

const getRoomById = (id) => prisma.room.findUnique({ where: { id } });

const createRoom = (data) => prisma.room.create({ data });

const updateRoom = (id, data) =>
  prisma.room.update({ where: { id }, data });

const deleteRoom = (id) => prisma.room.delete({ where: { id } });

module.exports = {
  listRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
