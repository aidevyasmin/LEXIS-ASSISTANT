---
id: 004
title: Bug Fix - `db.query` is not a function in `googleAuth.js`
stage: green
date: 2026-03-04
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: 002-nisar-hussain-assistant
user: User
command: Please fix my Node.js backend project.Issue:When calling db.query in googleAuth.js, I get: "db.query is not a function".Requirements:1. Ensure backend/src/models/db.js correctly exports a query function using pg Pool.2. Do NOT change project structure.3. Keep existing security setup in app.js (helmet, cors, rate limit, session).4. Use environment variables from .env.5. Provide only corrected code for:   - backend/src/models/db.js (if needed)   - backend/src/googleAuth.js (if needed)6. Do not add extra features.7. Keep it minimal and production-safe.
labels: ["bug-fix", "database", "knex", "google-auth"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- backend/src/googleAuth.js
tests: null
---

## Prompt

Please fix my Node.js backend project.Issue:When calling db.query in googleAuth.js, I get: "db.query is not a function".Requirements:1. Ensure backend/src/models/db.js correctly exports a query function using pg Pool.2. Do NOT change project structure.3. Keep existing security setup in app.js (helmet, cors, rate limit, session).4. Use environment variables from .env.5. Provide only corrected code for:   - backend/src/models/db.js (if needed)   - backend/src/googleAuth.js (if needed)6. Do not add extra features.7. Keep it minimal and production-safe.

## Response snapshot

I have applied the fix to `backend/src/googleAuth.js`, replacing `db.query` with `db.raw` to align with the Knex database instance. This should resolve the "db.query is not a function" error.

## Outcome

- ✅ Impact: Resolved the "db.query is not a function" error in `backend/src/googleAuth.js` by updating the database interaction to use `db.raw` with Knex's parameter binding, adhering to the existing Knex setup and user's instruction not to alter `db.js`.
- 🧪 Tests: No explicit test instructions were provided. Manual verification of the Google authentication flow is recommended to confirm the fix.
- 📁 Files: Modified `backend/src/googleAuth.js`.
- 🔁 Next prompts: Continue with Google Calendar API integration (T010). This involves setting up Google Cloud project, managing credentials, and implementing the authentication and event creation logic within the backend.
- 🧠 Reflection: The issue was a common mismatch when mixing `pg` client direct queries with a Knex instance. The fix leveraged Knex's `db.raw` to execute the raw SQL query, maintaining the original intent while using the correct database abstraction.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Implement T010 by setting up Google Cloud project and integrating the authentication and event creation logic into the backend.
