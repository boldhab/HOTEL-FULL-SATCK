const express = require('express');
const { body } = require('express-validator');
const {
  getPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
} = require('../controllers/pageController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getPages);
router.get('/:slug', getPageBySlug);

router.post(
  '/',
  protect,
  authorize('ADMIN'),
  [
    body('slug').notEmpty().withMessage('Slug is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('published').optional().isBoolean(),
  ],
  validate,
  createPage
);

router.put(
  '/:id',
  protect,
  authorize('ADMIN'),
  [
    body('slug').optional().isString(),
    body('title').optional().isString(),
    body('content').optional().isString(),
    body('published').optional().isBoolean(),
  ],
  validate,
  updatePage
);

router.delete('/:id', protect, authorize('ADMIN'), deletePage);

module.exports = router;
