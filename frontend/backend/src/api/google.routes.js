const express = require('express');
const router = express.Router();
const googleController = require('./google.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Route to initiate Google OAuth flow
router.get('/auth', verifyToken, googleController.googleAuth);

// Route to handle Google OAuth callback
router.get('/oauth2callback', googleController.googleAuthCallback);

// Route to get free/busy slots (requires lawyer authentication)
router.get('/free-busy', verifyToken, googleController.getFreeBusySlots);

// Route to create a calendar event (requires lawyer authentication)
router.post('/event', verifyToken, googleController.createCalendarEvent);

// Route to revoke Google Calendar access (requires lawyer authentication)
router.post('/revoke', verifyToken, googleController.revokeAccess);

module.exports = router;