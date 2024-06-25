const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const logMiddleware = require('./middleware/logMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(bodyParser.json());
app.use(cors());
app.use(logMiddleware);

app.use('/api/auth', authRoutes);  // <-- Make sure this is correct
app.use('/api/analysis', analysisRoutes);

// Error handling middleware
app.use(errorMiddleware);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});
