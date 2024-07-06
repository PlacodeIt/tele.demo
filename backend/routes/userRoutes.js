const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
