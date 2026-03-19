const prisma = require('../config/prisma');

const listPages = () => prisma.page.findMany({ orderBy: { createdAt: 'desc' } });

const getPageBySlug = (slug) => prisma.page.findUnique({ where: { slug } });

const createPage = (data) => prisma.page.create({ data });

const updatePage = (id, data) => prisma.page.update({ where: { id }, data });

const deletePage = (id) => prisma.page.delete({ where: { id } });

module.exports = {
  listPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
};
