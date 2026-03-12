const express = require('express');
const router = express.Router();
const caseController = require('./case.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/', verifyToken, caseController.createCase);
router.get('/', verifyToken, caseController.getCases);
router.get('/:id', verifyToken, caseController.getCaseById);
router.put('/:id', verifyToken, caseController.updateCase);
router.delete('/:id', verifyToken, caseController.deleteCase);

// Hearing routes (nested or separate, let's keep them here for now)
router.post('/:caseId/hearings', verifyToken, caseController.addHearing);
router.get('/:caseId/hearings', verifyToken, caseController.getHearings);

module.exports = router;
