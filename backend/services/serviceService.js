const prisma = require('../config/prisma');

const listServices = () =>
  prisma.service.findMany({ orderBy: { createdAt: 'desc' } });

const createService = (data) => prisma.service.create({ data });

const updateService = (id, data) =>
  prisma.service.update({ where: { id }, data });

const deleteService = (id) => prisma.service.delete({ where: { id } });

module.exports = {
  listServices,
  createService,
  updateService,
  deleteService,
};
