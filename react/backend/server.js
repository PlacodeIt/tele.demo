const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');
const sendEmail = require('./utils/sendEmail');
const app = express();

// Load environment variables from .env file
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/telegram_data');

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  console.log('Register request received:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const user = new User({ email, username, password: hashedPassword, verificationCode });

    await user.save();

    try {
      const welcomeMessage = `Welcome to our service, ${username}!\n\nYour email: ${email}\nYour username: ${username}\n\nThank you for signing up!`;
      await sendEmail(email, 'Welcome to Our Service', welcomeMessage);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Send a response indicating partial success
      return res.status(201).send('User registered successfully, but failed to send welcome email');
    }

    res.send('User registered successfully, please check your email for the verification code');
  } catch (error) {
    console.error('Error in /register:', error);
    res.status(400).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid password');
    }

    res.send('Login successful');
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(400).send('Error logging in');
  }
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log('Forgot Password request received:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Email not found');
    }

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.verificationCode = verificationCode;

    await user.save();

    try {
      await sendEmail(email, 'Password Reset Code', `Your password reset code is: ${verificationCode}`);
      res.send('Password reset code sent to email');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      res.status(500).send('Error sending password reset code');
    }
  } catch (error) {
    console.error('Error in /forgot-password:', error);
    res.status(400).send('Error sending password reset code');
  }
});

app.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  console.log('Reset Password request received:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code) {
      return res.status(400).send('Invalid code');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.verificationCode = undefined; // Clear the verification code

    await user.save();
    res.send('Password reset successfully');
  } catch (error) {
    console.error('Error in /reset-password:', error);
    res.status(400).send('Error resetting password');
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
