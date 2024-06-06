const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/tele_demo', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username, password });
  await user.save();
  res.send('User registered successfully');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.send('Login successful');
  } else {
    res.status(400).send('Invalid credentials');
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
