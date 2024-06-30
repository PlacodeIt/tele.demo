const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const errorMiddleware = require('./middleware/errorMiddleware');
const logMiddleware = require('./middleware/logMiddleware');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);

// Routes
app.use('/api/analysis', require('./routes/analysisRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/channels', require('./routes/channelsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error middleware
app.use(errorMiddleware);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => logger.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
