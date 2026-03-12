const express = require('express');
const router = express.Router();
const documentController = require('./document.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Upload document
router.post('/upload', verifyToken, upload.single('file'), documentController.uploadDocument);

// Get documents by case
router.get('/case/:caseId', verifyToken, documentController.getDocumentsByCase);

// Delete document
router.delete('/:id', verifyToken, documentController.deleteDocument);

module.exports = router;
