const express = require('express');
const router = express.Router();
const appointmentController = require('./appointment.controller');
const { verifyToken, isLawyer } = require('../middleware/auth.middleware');

router.post('/', appointmentController.createAppointment);
router.get('/', verifyToken, isLawyer, appointmentController.getAllAppointments);
router.put('/:id/status', verifyToken, isLawyer, appointmentController.updateStatus);
router.put('/:id/reschedule', verifyToken, isLawyer, appointmentController.rescheduleAppointment);

module.exports = router;
