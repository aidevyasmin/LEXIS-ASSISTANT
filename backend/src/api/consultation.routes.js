const express = require('express');
const router = express.Router();
const consultationController = require('./consultation.controller');
const { verifyToken, isLawyer } = require('../middleware/auth.middleware');

router.post('/', consultationController.createRequest);
router.get('/', verifyToken, isLawyer, consultationController.getAllRequests);
router.put('/:id/status', verifyToken, isLawyer, consultationController.updateRequestStatus);

module.exports = router;
