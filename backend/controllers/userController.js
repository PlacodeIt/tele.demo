const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUserDetails = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId).select('email username');
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        res.json({ email: user.email, username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateEmail = async (req, res) => {
    const userId = req.user.userId;
    const { email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { email }, { new: true });
        res.json({ message: 'Email updated successfully', email: user.email });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updateUsername = async (req, res) => {
    const userId = req.user.userId;
    const { username } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { username }, { new: true });
        res.json({ message: 'Username updated successfully', username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.updatePassword = async (req, res) => {
    const userId = req.user.userId;
    const { newPassword } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
