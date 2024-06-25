
const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

router.post('/analyze', analysisController.analyzeText);
router.get('/radical-messages', analysisController.getRadicalMessages);
router.get('/radical-users', analysisController.getRadicalUsers);

module.exports = router;
