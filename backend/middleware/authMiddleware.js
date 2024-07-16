const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('Authentication token is missing');
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        console.log('Invalid authentication token:', error.message);
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};

module.exports = authMiddleware;
