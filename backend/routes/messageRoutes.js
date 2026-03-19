const express = require('express');
const { body } = require('express-validator');
const { submitMessage, getMessages, deleteMessage, setReadStatus, replyToMessage } = require('../controllers/messageController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('subject').optional().isString(),
  ],
  validate,
  submitMessage
);
router.get('/', protect, authorize('ADMIN'), getMessages);
router.patch(
  '/:id/read',
  protect,
  authorize('ADMIN'),
  [body('isRead').isBoolean().withMessage('isRead must be boolean')],
  validate,
  setReadStatus
);
router.post(
  '/:id/reply',
  protect,
  authorize('ADMIN'),
  [body('adminReply').notEmpty().withMessage('Reply message is required')],
  validate,
  replyToMessage
);
router.delete('/:id', protect, authorize('ADMIN'), deleteMessage);

module.exports = router;
