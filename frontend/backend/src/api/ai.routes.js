const express = require('express');
const router = express.Router();
const aiController = require('./ai.controller');
const { verifyToken, isLawyer } = require('../middleware/auth.middleware');

router.post('/generate-draft', aiController.generateDraft);
router.post('/voice-over', verifyToken, isLawyer, aiController.voiceOver);

module.exports = router;
