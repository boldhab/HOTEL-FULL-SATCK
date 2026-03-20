const messageService = require('../services/messageService');
const { sendMessageReply } = require('../services/emailService');
const { logAdminAction } = require('../services/auditService');
const asyncHandler = require('../utils/asyncHandler');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const formatSubject = (subject) => {
  if (!subject) return 'General Inquiry';

  return String(subject)
    .split(/[_-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

/**
 * @desc    Submit contact message
 * @route   POST /api/messages
 * @access  Public
 */
exports.submitMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, content, phone } = req.body;

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

  console.log(
    `[contact] Message saved: id=${message.id} email=${email} subject=${subject || 'General Inquiry'}`
  );

  // Notify admin via email
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      const readableSubject = formatSubject(subject);
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safePhone = phone ? escapeHtml(phone) : 'Not provided';
      const safeContent = escapeHtml(content).replace(/\n/g, '<br/>');

      const info = await sendMessageReply({
        to: adminEmail,
        subject: `New Contact Form Submission: ${readableSubject}`,
        text: [
          'You have received a new message from your website contact form.',
          '',
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || 'Not provided'}`,
          `Subject: ${readableSubject}`,
          '',
          'Message:',
          content,
        ].join('\n'),
        html: `<h3>New Contact Form Submission</h3>
               <p><strong>Name:</strong> ${safeName}</p>
               <p><strong>Email:</strong> ${safeEmail}</p>
               <p><strong>Phone:</strong> ${safePhone}</p>
               <p><strong>Subject:</strong> ${escapeHtml(readableSubject)}</p>
               <br/>
               <p><strong>Message:</strong></p>
               <p>${safeContent}</p>`,
        replyTo: email,
      });

      console.log(
        `[contact] Admin email sent: messageId=${message.id} to=${adminEmail} smtpId=${info.messageId || 'n/a'}`
      );
    } else {
      console.warn(
        `[contact] Email skipped: no ADMIN_EMAIL or SMTP_USER configured for messageId=${message.id}`
      );
    }
  } catch (error) {
    // Log error but do not fail the request if the email fails
    console.error(
      `[contact] Failed to send admin notification email for messageId=${message.id}:`,
      error.message || error
    );
  }

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
