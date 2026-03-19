const messageService = require('../services/messageService');
const { sendMessageReply } = require('../services/emailService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Submit contact message
 * @route   POST /api/messages
 * @access  Public
 */
exports.submitMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, content } = req.body;

  if (!name || !email || !content) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and content',
    });
  }

  const message = await messageService.createMessage({
    name,
    email,
    subject,
    content,
  });

  res.status(201).json({
    success: true,
    data: message,
  });
});

/**
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Private/Admin
 */
exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.listMessages();

  res.status(200).json({
    success: true,
    data: messages,
  });
});

/**
 * @desc    Delete message
 * @route   DELETE /api/messages/:id
 * @access  Private/Admin
 */
exports.deleteMessage = asyncHandler(async (req, res) => {
  const message = await messageService.deleteMessage(req.params.id);

  await logAdminAction({
    adminId: req.user.id,
    action: 'DELETE_MESSAGE',
    entity: 'Message',
    entityId: message.id,
  });

  res.status(200).json({
    success: true,
    message: 'Message deleted successfully',
  });
});

/**
 * @desc    Mark message as read/unread
 * @route   PATCH /api/messages/:id/read
 * @access  Private/Admin
 */
exports.setReadStatus = asyncHandler(async (req, res) => {
  const { isRead } = req.body;

  const message = await messageService.updateMessage(req.params.id, {
    isRead: Boolean(isRead),
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'UPDATE_MESSAGE_READ',
    entity: 'Message',
    entityId: message.id,
  });

  res.status(200).json({
    success: true,
    data: message,
  });
});

/**
 * @desc    Reply to a message
 * @route   POST /api/messages/:id/reply
 * @access  Private/Admin
 */
exports.replyToMessage = asyncHandler(async (req, res) => {
  const { adminReply } = req.body;

  if (!adminReply) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a reply message',
    });
  }

  const existing = await messageService.getMessageById(req.params.id);
  if (!existing) {
    return res.status(404).json({
      success: false,
      message: 'Message not found',
    });
  }

  await sendMessageReply({
    to: existing.email,
    subject: existing.subject || 'Reply from hotel admin',
    text: adminReply,
    html: `<p>${adminReply}</p>`,
  });

  const message = await messageService.updateMessage(req.params.id, {
    adminReply,
    repliedAt: new Date(),
    isRead: true,
  });

  await logAdminAction({
    adminId: req.user.id,
    action: 'REPLY_MESSAGE',
    entity: 'Message',
    entityId: message.id,
  });

  res.status(200).json({
    success: true,
    data: message,
  });
});
