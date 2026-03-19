const express = require('express');
const { body } = require('express-validator');
const { getGallery, uploadToGallery, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', getGallery);
router.post(
  '/',
  protect,
  authorize('ADMIN'),
  upload.single('image'),
  [body('category').optional().isString(), body('description').optional().isString()],
  validate,
  uploadToGallery
);
router.delete('/:id', protect, authorize('ADMIN'), deleteGalleryItem);

module.exports = router;
