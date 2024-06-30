const User = require('../models/User');

exports.getUsername = async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).select('username');
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        res.json({ username: user.username });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
