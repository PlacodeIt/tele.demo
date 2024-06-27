
const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

router.get('/', channelController.getChannelData);

module.exports = router;