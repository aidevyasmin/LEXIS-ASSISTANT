const express = require('express');
const router = express.Router();
const clientController = require('./client.controller');
const { verifyToken, isLawyer } = require('../middleware/auth.middleware');

// Public route for client intake form (or maybe protected for registered users?)
// For now, let's assume it's public for new leads.
router.post('/intake', clientController.createClient);

// Lawyer-only routes
router.get('/', verifyToken, isLawyer, clientController.getAllClients);
router.get('/:id', verifyToken, isLawyer, clientController.getClient);

module.exports = router;
