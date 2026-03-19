const pageService = require('../services/pageService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all pages
 * @route   GET /api/pages
 * @access  Public
 */
exports.getPages = asyncHandler(async (req, res) => {
  const pages = await pageService.listPages();

  res.status(200).json({
    success: true,
    data: pages,
  });
});

/**
 * @desc    Get page by slug
 * @route   GET /api/pages/:slug
 * @access  Public
 */
exports.getPageBySlug = asyncHandler(async (req, res) => {
  const page = await pageService.getPageBySlug(req.params.slug);

  if (!page) {
    return res.status(404).json({
      success: false,
      message: 'Page not found',
    });
  }

  res.status(200).json({
    success: true,
    data: page,
  });
});

/**
 * @desc    Create page
 * @route   POST /api/pages
 * @access  Private/Admin
 */
exports.createPage = asyncHandler(async (req, res) => {
  const { slug, title, content, published } = req.body;

  const page = await pageService.createPage({
    slug,
    title,
    content,
    published: published !== undefined ? Boolean(published) : true,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'CREATE_PAGE',
    entity: 'Page',
    entityId: page.id,
  });

  res.status(201).json({
    success: true,
    data: page,
  });
});

/**
 * @desc    Update page
 * @route   PUT /api/pages/:id
 * @access  Private/Admin
 */
exports.updatePage = asyncHandler(async (req, res) => {
  const { slug, title, content, published } = req.body;

  const page = await pageService.updatePage(req.params.id, {
    slug,
    title,
    content,
    published: published !== undefined ? Boolean(published) : undefined,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'UPDATE_PAGE',
    entity: 'Page',
    entityId: page.id,
  });

  res.status(200).json({
    success: true,
    data: page,
  });
});

/**
 * @desc    Delete page
 * @route   DELETE /api/pages/:id
 * @access  Private/Admin
 */
exports.deletePage = asyncHandler(async (req, res) => {
  const page = await pageService.deletePage(req.params.id);

  await logAdminAction({
    adminId: req.user.id,
    action: 'DELETE_PAGE',
    entity: 'Page',
    entityId: page.id,
  });

  res.status(200).json({
    success: true,
    message: 'Page deleted successfully',
  });
});
