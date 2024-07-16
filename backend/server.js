const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const channelsRoutes = require('./routes/channelsRoutes');
const userRoutes = require('./routes/userRoutes');
const logMiddleware = require('./middleware/logMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');  // Ensure this line is included

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Adjust the origin as needed
app.use(cookieParser());
app.use(morgan('combined'));
app.use(logMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/channels', channelsRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware); // Ensure this line is included

const connectWithRetry = () => {
    console.log('Attempting MongoDB connection...');
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('Could not connect to MongoDB:', err);
            setTimeout(connectWithRetry, 5000);
        });
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected, attempting to reconnect...');
    connectWithRetry();
});

connectWithRetry();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
