const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        console.log('Received registration data:', { email, username, password });

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already in use:', email);
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = new User({ email, username, password });
        await user.save();

        console.log('User registered successfully:', user);

        // Optional: Send verification email if you decide to use it in the future
        // const subject = 'Email Verification';
        // const text = `Your verification code is: ${verificationCode}`;
        // await sendEmail(user.email, subject, text);

        res.json({ message: 'Registration successful.' });
    } catch (error) {
        console.error('Error during registration:', error); // Improved error logging
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { credential, password, rememberMe } = req.body;

    try {
        console.log(`Login attempt with credential: ${credential}`);

        const user = await User.findOne({
            $or: [{ email: credential }, { username: credential }]
        });

        if (!user) {
            console.log('User not found with given credential:', credential);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            console.log('Password does not match for user:', user.email || user.username);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const expiresIn = rememberMe ? '7d' : '1h'; // Set longer expiration for "Remember Me"
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // Set cookie expiration based on rememberMe
        });

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login.', error: error.message });
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
        console.error('Error during password reset request:', error); // Improved error logging
        res.status(500).json({ message: 'Server error during password reset request.', error: error.message });
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
        console.error('Error during password reset:', error); // Improved error logging
        res.status(500).json({ message: 'Server error during password reset.', error: error.message });
    }
};
