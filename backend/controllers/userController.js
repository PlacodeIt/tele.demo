const User = require('../models/User');

exports.getUsername = async (req, res) => {
    const userId = req.user.userId;
    console.log("Fetching username for userId:", userId);

    try {
        const user = await User.findById(userId).select('username');
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: 'User not found' });
        }
        console.log("Username fetched:", user.username);
        res.json({ username: user.username });
    } catch (err) {
        console.log("Server error:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
