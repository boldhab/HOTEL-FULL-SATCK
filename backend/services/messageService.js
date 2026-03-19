const prisma = require('../config/prisma');

const createMessage = (data) => prisma.message.create({ data });

const listMessages = () =>
  prisma.message.findMany({ orderBy: { createdAt: 'desc' } });

const getMessageById = (id) => prisma.message.findUnique({ where: { id } });

const updateMessage = (id, data) =>
  prisma.message.update({ where: { id }, data });

const deleteMessage = (id) => prisma.message.delete({ where: { id } });

module.exports = {
  createMessage,
  listMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
