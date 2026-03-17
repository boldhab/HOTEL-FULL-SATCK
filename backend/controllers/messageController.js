const prisma = require('../config/prisma');
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

  const message = await prisma.message.create({
    data: { name, email, subject, content },
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
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });

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
  await prisma.message.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    success: true,
    message: 'Message deleted successfully',
  });
});
