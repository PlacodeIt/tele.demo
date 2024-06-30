const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const channelsRoutes = require('./routes/channelsRoutes') 
const logMiddleware = require('./middleware/logMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes'); 

dotenv.config();

const app = express();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(logMiddleware);

app.use('/api/auth', authRoutes);  
app.use('/api/analysis', analysisRoutes);
app.use('/api/channels', channelsRoutes);
app.use('/api/users', userRoutes); 

app.use(errorMiddleware);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});