const express = require('express');
const { submitMessage, getMessages, deleteMessage } = require('../controllers/messageController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', submitMessage);
router.get('/', protect, authorize('ADMIN'), getMessages);
router.delete('/:id', protect, authorize('ADMIN'), deleteMessage);

module.exports = router;
