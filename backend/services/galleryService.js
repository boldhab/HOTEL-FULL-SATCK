const prisma = require('../config/prisma');

const listGallery = () =>
  prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } });

const createGalleryItem = (data) => prisma.gallery.create({ data });

const getGalleryItem = (id) => prisma.gallery.findUnique({ where: { id } });

const deleteGalleryItem = (id) => prisma.gallery.delete({ where: { id } });

module.exports = {
  listGallery,
  createGalleryItem,
  getGalleryItem,
  deleteGalleryItem,
};
