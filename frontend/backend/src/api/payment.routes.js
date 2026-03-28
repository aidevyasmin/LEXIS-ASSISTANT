const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');
const uploadMiddleware = require('../middleware/upload.middleware');
const { verifyToken, isLawyer } = require('../middleware/auth.middleware');

// Route for clients to upload payment proof (T009)
// client will need to be authenticated, verifyToken is enough
router.post(
  '/upload',
  verifyToken,
  uploadMiddleware.single('paymentProof'), // 'paymentProof' is the field name for the file
  paymentController.uploadPaymentProof
);

// Route for lawyers to update payment status (T011)
router.put('/:paymentId/status', verifyToken, isLawyer, paymentController.updatePaymentStatus);

// Route for lawyers to view all payments
router.get('/', verifyToken, isLawyer, paymentController.getAllPayments);

// Route for lawyers to view a specific payment
router.get('/:paymentId', verifyToken, isLawyer, paymentController.getPaymentById);

// Route to serve payment proof files (T013)
// This will need more robust authorization in a production setting.
router.get('/proof/:filename', verifyToken, isLawyer, paymentController.getPaymentProof);


module.exports = router;