---
ID: 048
TITLE: Configure Codebase for Unified Vercel Deployment
STAGE: misc
DATE_ISO: 2026-03-18
SURFACE: agent
MODEL: gemini-2.0-flash
FEATURE: lexis-assistant
BRANCH: main
USER: PC
COMMAND: /sp.phr
LABELS: ["vercel", "deployment", "backend-connection", "config"]
LINKS: null
FILES_YAML:
  - backend/src/app.js
  - package.json
  - vercel.json
TESTS_YAML:
  - none
PROMPT_TEXT: |
  kyaa ap isy set kr skty h backend ko fronted sa connect ta k sb options sahi chly
RESPONSE_TEXT: |
  1. Updated `backend/src/app.js` to export the Express `app` for Vercel's serverless runtime.
  2. Created a unified root `package.json` with a `vercel-build` script that builds the frontend and installs backend dependencies (including Prisma generation).
  3. Updated `vercel.json` with `rewrites` to correctly route `/api`, `/auth`, and `/uploads` to the backend serverless function.
  4. Instructed user to add Environment Variables manually in the Vercel dashboard.
---
# Outcome
The codebase is now optimized for a "Zero-Config" style deployment on Vercel where both frontend and backend exist in the same repository and communicate seamlessly.
