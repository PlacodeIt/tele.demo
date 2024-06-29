const express = require('express');
const router = express.Router();
const { getUsername } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/username', authMiddleware, getUsername);

module.exports = router;
