const express = require('express');
const router = express.Router();
const dashboardController = require('./dashboard.controller');
const { verifyToken, isLawyer } = require('../middleware/auth.middleware');

// Route to get dashboard overview data
router.get('/', verifyToken, isLawyer, dashboardController.getDashboardOverview);

// Route to get client-specific overview data
router.get('/client', verifyToken, dashboardController.getClientOverview);

// Route to get monthly revenue summary
router.get('/monthly-revenue', verifyToken, isLawyer, dashboardController.getMonthlyRevenue);

module.exports = router;