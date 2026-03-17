const express = require('express');
const { getGallery, uploadToGallery, deleteGalleryItem } = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, authorize('ADMIN'), upload.single('image'), uploadToGallery);
router.delete('/:id', protect, authorize('ADMIN'), deleteGalleryItem);

module.exports = router;
