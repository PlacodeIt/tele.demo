const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/me', authMiddleware, (req, res) => {
    console.log('Endpoint /me called');
    userController.getUsername(req, res);
  });
module.exports = router;
