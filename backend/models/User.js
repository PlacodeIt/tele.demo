const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String }, 
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;