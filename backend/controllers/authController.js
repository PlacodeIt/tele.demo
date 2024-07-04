const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ email, username, password });
        await user.save();

        res.json({ message: 'Registration successful.' });
    } catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).json({message: 'Validation error', details: error.message})
        } else if(error.name === 'MongoError'){
            res.status(500).json({message: 'Database error', details: error.message})
        } else{
            res.status(500).json({ message: 'Server error during registration.', error: error.message });
        }
    }
};

exports.login = async (req, res) => {
    const { credential, password, rememberMe } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: credential }, { username: credential }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const expiresIn = rememberMe ? '7d' : '1h';
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation error.', details: error.message });
        } else if (error.name === 'MongoError') {
            res.status(500).json({ message: 'Database error.', details: error.message });
        } else {
            res.status(500).json({ message: 'Server error during login.', details: error.message });
        }
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verificationCode = user.generateVerificationCode();
        await user.save();

        const subject = 'Password Reset Verification';
        const text = `Your verification code is: ${verificationCode}`;
        await sendEmail(user.email, subject, text);

        res.json({ message: 'Verification code sent to your email' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation error.', details: error.message });
        } else if (error.name === 'MongoError') {
            res.status(500).json({ message: 'Database error.', details: error.message });
        } else {
            res.status(500).json({ message: 'Server error during password reset request.', details: error.message });
        }
    }
};

exports.resetPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;

    try {
        const user = await User.findOne({ email, verificationCode });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification code or email' });
        }

        user.password = newPassword;
        user.verificationCode = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation error.', details: error.message });
        } else if (error.name === 'MongoError') {
            res.status(500).json({ message: 'Database error.', details: error.message });
        } else {
            res.status(500).json({ message: 'Server error during password reset.', details: error.message });
        }
    }
};
