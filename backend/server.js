const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const errorHandler = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const messageRoutes = require('./routes/messageRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const pageRoutes = require('./routes/pageRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const auditRoutes = require('./routes/auditRoutes');

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // Allow loading local images
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/pages', pageRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/audit-logs', auditRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Hotel API' });
});

// 404 Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
