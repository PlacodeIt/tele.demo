const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/me', authMiddleware, userController.getUserDetails);
router.put('/me/email', authMiddleware, userController.updateEmail);
router.put('/me/username', authMiddleware, userController.updateUsername);
router.put('/me/password', authMiddleware, userController.updatePassword);

module.exports = router;