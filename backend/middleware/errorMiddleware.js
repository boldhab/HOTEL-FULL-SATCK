const { Prisma } = require('@prisma/client');

/**
 * Global error handling middleware.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Object} next - The next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Resource not found';
    }

    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'A record with that value already exists';
    }
  }

  console.error(`[Error] ${statusCode} - ${message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
