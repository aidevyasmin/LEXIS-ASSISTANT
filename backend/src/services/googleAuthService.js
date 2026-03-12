const { google } = require('googleapis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Function to generate an authentication URL
const generateAuthUrl = () => {
  const scopes = [process.env.GOOGLE_CALENDAR_SCOPE];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // This is crucial to get a refresh token
    scope: scopes,
    prompt: 'consent', // Always ask for consent to ensure refresh token is provided
  });
};

// Function to exchange authorization code for tokens and store them
const getTokensAndSave = async (code, userId) => {
  const { tokens } = await oauth2Client.getToken(code);
  // Store tokens securely. For this project, we'll assume a 'User' model
  // can store googleAccessToken and googleRefreshToken.
  // In a real-world app, you might encrypt these tokens.

  // First, set the tokens for the current client instance
  oauth2Client.setCredentials(tokens);

  // Then, save them to the database for the specific user
  await prisma.user.update({
    where: { id: userId },
    data: {
      googleAccessToken: tokens.access_token,
      googleRefreshToken: tokens.refresh_token || null, // refresh token is only provided on first consent
      googleTokenExpiry: new Date(tokens.expiry_date),
    },
  });

  return tokens;
};

// Function to set credentials for an authenticated user
const setCredentials = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      googleAccessToken: true,
      googleRefreshToken: true,
      googleTokenExpiry: true,
    },
  });

  if (!user || !user.googleAccessToken) {
    return null;
  }

  // Set credentials from database
  oauth2Client.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
    expiry_date: user.googleTokenExpiry ? user.googleTokenExpiry.getTime() : null,
  });

  // Automatically refresh token if it's expired or about to expire
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.refresh_token) {
      // Store the new refresh token if it's provided (it usually isn't after the first time)
      // This part is mostly for access token refresh
      await prisma.user.update({
        where: { id: userId },
        data: {
          googleAccessToken: tokens.access_token,
          googleRefreshToken: tokens.refresh_token || user.googleRefreshToken, // Keep old refresh token if new one not provided
          googleTokenExpiry: new Date(tokens.expiry_date),
        },
      });
    }
  });

  return oauth2Client;
};

module.exports = {
  oauth2Client,
  generateAuthUrl,
  getTokensAndSave,
  setCredentials,
};