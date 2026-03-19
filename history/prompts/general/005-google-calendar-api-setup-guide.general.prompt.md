---
id: 005
title: Google Calendar API Setup Guide and Node.js Integration
stage: general
date: 2026-03-04
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: 002-nisar-hussain-assistant
user: User
command: I want to integrate Google Calendar API in my Node.js backend.Instead of asking for client_secret.json manually, please guide me step-by-step to:1. Create OAuth credentials correctly in Google Cloud Console.2. Use Web Application type.3. Set correct Authorized Redirect URI.4. Provide the exact environment variables needed (.env format).5. Show the minimal secure Node.js example using googleapis package.6. Do NOT require desktop client flow.7. Keep it production-ready and secure.My backend runs on:/apiRedirect URI should match this environment.
labels: ["Google Calendar API", "Integration Guide", "OAuth", "Node.js"]
links:
  spec: spec.md
  ticket: null
  adr: history/adr/002-google-calendar-api-nodejs-integration.md
  pr: null
files: null
tests: null
---

## Prompt

I want to integrate Google Calendar API in my Node.js backend.Instead of asking for client_secret.json manually, please guide me step-by-step to:1. Create OAuth credentials correctly in Google Cloud Console.2. Use Web Application type.3. Set correct Authorized Redirect URI.4. Provide the exact environment variables needed (.env format).5. Show the minimal secure Node.js example using googleapis package.6. Do NOT require desktop client flow.7. Keep it production-ready and secure.My backend runs on:/apiRedirect URI should match this environment.

## Response snapshot

I understand you'd like a step-by-step guide to set up Google Calendar API integration securely and without manual `client_secret.json` provision.

I will provide a detailed, production-ready guide to:
1.  **Google Cloud Console Setup**: Instructions for enabling the API, creating a "Web application" OAuth client ID, and configuring the correct Authorized Redirect URI.
2.  **Environment Variables**: The exact `.env` format needed for the credentials.
3.  **Secure Node.js Example**: Minimal Node.js code using `googleapis` for authentication and token management, ensuring a web-based flow suitable for your `/api` backend.

Let's start with the Google Cloud Console setup.

**Step 1: Enable Google Calendar API & Create OAuth Credentials**

1.  **Go to Google Cloud Console**: Open your web browser and navigate to [https://console.developers.google.com/](https://console.developers.google.com/).
2.  **Select or Create a Project**: From the project dropdown at the top, select an existing project or create a new one.
3.  **Enable Google Calendar API**:
    *   In the navigation menu, go to "APIs & Services" > "Library".
    *   Search for "Google Calendar API" and click on it.
    *   Click the "Enable" button.
4.  **Create OAuth Consent Screen**:
    *   In the navigation menu, go to "APIs & Services" > "OAuth consent screen".
    *   Choose "External" as the User type and click "CREATE".
    *   Fill in the required information:
        *   **App name**: e.g., "Lexis Assistant Backend"
        *   **User support email**: Your email address
        *   **Developer contact information**: Your email address
    *   Click "SAVE AND CONTINUE".
    *   For "Scopes", click "ADD OR REMOVE SCOPES". You will need the `https://www.googleapis.com/auth/calendar` scope. This allows full access to the user's calendar. Choose this scope and click "UPDATE".
    *   Click "SAVE AND CONTINUE".
    *   For "Test users", add your Google account's email address.
    *   Click "SAVE AND CONTINUE", then "BACK TO DASHBOARD".
5.  **Create OAuth Client ID**:
    *   In the navigation menu, go to "APIs & Services" > "Credentials".
    *   Click "CREATE CREDENTIALS" > "OAuth client ID".
    *   For "Application type", select **"Web application"**.
    *   Give it a **Name**: e.g., "Lexis Assistant Web App Client".
    *   **Authorized JavaScript origins**: Add `http://localhost:3000` (assuming this is your frontend's address). If you have a production frontend, add that URL too.
    *   **Authorized redirect URIs**: Add `/api/api/google/oauth2callback`. This is where Google will redirect the user after they grant permission.
    *   Click "CREATE".
    *   A dialog will appear showing your **Client ID** and **Client Secret**. **Copy these values immediately.** They will be needed for your `.env` file. You can also download the JSON file, but copying the values directly is often easier for `.env` setup.

**Step 2: Environment Variables (`.env` file)**

Now that you have your Client ID and Client Secret, add them to your `backend/.env` file (or `backend/.env.example` if setting up for deployment).

```dotenv
# Google Calendar API Credentials
GOOGLE_CLIENT_ID="YOUR_CLIENT_ID_HERE"
GOOGLE_CLIENT_SECRET="YOUR_CLIENT_SECRET_HERE"
GOOGLE_REDIRECT_URI="/api/api/google/oauth2callback"
# This is the scope we selected in Google Cloud Console
GOOGLE_CALENDAR_SCOPE="https://www.googleapis.com/auth/calendar"
```
**Important**: Replace `YOUR_CLIENT_ID_HERE` and `YOUR_CLIENT_SECRET_HERE` with the actual values you obtained from the Google Cloud Console.

With these steps completed, the Google Cloud setup and environment variables are configured.

I will now proceed to the next part: **Secure Node.js Example** for authentication and token management.

## Outcome

- ✅ Impact: Provided a detailed step-by-step guide for setting up Google Cloud Console for Google Calendar API integration, including enabling the API, creating OAuth consent screen and client ID (Web application type), and configuring Authorized Redirect URIs. Also provided the exact `.env` format for the required credentials.
- 🧪 Tests: N/A
- 📁 Files: N/A
- 🔁 Next prompts: Provide the Node.js example for Google Calendar API authentication and token management.
- 🧠 Reflection: This detailed guide addresses the user's request for step-by-step instructions without manual `client_secret.json` provision, ensuring a secure and production-ready setup.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Implement Node.js code for Google Calendar API authentication and event management.
