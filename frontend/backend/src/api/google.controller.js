const { generateAuthUrl, getTokensAndSave, setCredentials, oauth2Client } = require('../services/googleAuthService');
const { google } = require('googleapis');
const prisma = require('../models/prisma');

// Redirect to Google for OAuth consent
exports.googleAuth = (req, res) => {
  // Save the userId to session or a temporary state to link it back after callback
  // For simplicity, we'll pass it as a query param in a real app, use session or a more robust state management
  const userId = req.user.id; // Assuming user ID is available from verifyToken middleware
  const authUrl = generateAuthUrl();
  res.redirect(authUrl + `&state=${userId}`); // Pass userId through state parameter
};

// Handle Google OAuth callback
exports.googleAuthCallback = async (req, res) => {
  const { code, state } = req.query; // 'state' will contain the userId
  const userId = state;

  if (!code) {
    return res.status(400).send('Google OAuth: Authorization code not received.');
  }
  if (!userId) {
    return res.status(400).send('Google OAuth: User ID not found in state.');
  }

  try {
    const tokens = await getTokensAndSave(code, userId);
    res.send('Google Calendar API access granted and tokens saved successfully! You can close this window.');
    // In a real application, you might redirect to a frontend dashboard or show a success message
  } catch (error) {
    console.error('Google OAuth Callback Error:', error);
    res.status(500).send('Error during Google OAuth callback.');
  }
};

// --- Google Calendar Operations ---

// Get Free/Busy Slots for a date range (for appointment booking)
exports.getFreeBusySlots = async (req, res) => {
  const { userId } = req.user; // Assuming user ID from token
  const { timeMin, timeMax } = req.query; // ISO strings for start and end

  if (!timeMin || !timeMax) {
    return res.status(400).json({ message: 'timeMin and timeMax are required.' });
  }

  try {
    const auth = await setCredentials(userId);
    if (!auth) {
      return res.status(401).json({ message: 'Google authentication not set up for this user.' });
    }

    const calendar = google.calendar({ version: 'v3', auth });

    const calendarId = 'primary'; // Lawyer's primary calendar

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      },
    });

    const busySlots = response.data.calendars[calendarId].busy;
    res.status(200).json({ busySlots });

  } catch (error) {
    console.error('Error fetching free/busy slots:', error);
    if (error.code === 401 || error.code === 403) {
      return res.status(401).json({ message: 'Unauthorized access to Google Calendar. Please re-authenticate.' });
    }
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

// Create a new calendar event for a confirmed appointment
exports.createCalendarEvent = async (req, res) => {
  const { userId } = req.user; // Assuming user ID from token (Lawyer)
  const { summary, description, startDateTime, endDateTime, clientEmail, clientName } = req.body;

  if (!summary || !startDateTime || !endDateTime || !clientEmail) {
    return res.status(400).json({ message: 'Summary, startDateTime, endDateTime, and clientEmail are required.' });
  }

  try {
    const auth = await setCredentials(userId);
    if (!auth) {
      return res.status(401).json({ message: 'Google authentication not set up for this user.' });
    }

    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Asia/Karachi', // Assuming Pakistan time zone
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Asia/Karachi',
      },
      attendees: [{ email: clientEmail, displayfullName: clientName }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 24 hours before
          { method: 'popup', minutes: 10 },      // 10 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary', // Lawyer's primary calendar
      resource: event,
      sendNotifications: true, // Send email notifications to attendees
    });

    res.status(201).json({ message: 'Calendar event created successfully.', eventLink: response.data.htmlLink, eventId: response.data.id });

  } catch (error) {
    console.error('Error creating calendar event:', error);
    if (error.code === 401 || error.code === 403) {
      return res.status(401).json({ message: 'Unauthorized access to Google Calendar. Please re-authenticate.' });
    }
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

// Placeholder for revoking access (future expansion)
exports.revokeAccess = async (req, res) => {
  const { userId } = req.user;
  try {
    const auth = await setCredentials(userId);
    if (!auth) {
      return res.status(401).json({ message: 'Google authentication not set up for this user.' });
    }
    // Revoke the token
    await oauth2Client.revokeCredentials();
    // Clear tokens from database
    await prisma.user.update({
      where: { id: userId },
      data: {
        googleAccessToken: null,
        googleRefreshToken: null,
        googleTokenExpiry: null,
      },
    });
    res.status(200).json({ message: 'Google Calendar access revoked successfully.' });
  } catch (error) {
    console.error('Error revoking Google Calendar access:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};
