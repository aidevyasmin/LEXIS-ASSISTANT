---
id: 052
title: Diagnose missing DATABASE_URL in Vercel
stage: misc
date: 2026-03-26
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: User
command: /sp.implement
labels: ["prisma", "vercel", "env-vars"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/src/models/prisma.js
tests:
  - manual verification of logs
---

## Prompt

The user reported a `PrismaClientInitializationError: Environment variable not found: DATABASE_URL` occurring on the Vercel-deployed application at the `/api/auth/login` endpoint.

## Response snapshot

I analyzed the error and confirmed that Prisma requires the `DATABASE_URL` environment variable to be present at runtime. I added a diagnostic log to `backend/src/models/prisma.js` to explicitly flag if `DATABASE_URL` is missing. I then informed the user that they need to ensure `DATABASE_URL` is correctly configured in their Vercel Project Settings.

## Outcome

- ✅ Impact: Added diagnostic logging to help identify missing environment variables in production.
- 🧪 Tests: none (code change is purely diagnostic)
- 📁 Files: backend/src/models/prisma.js
- 🔁 Next prompts: none
- 🧠 Reflection: Prisma's dependency on environment variables requires them to be explicitly passed in cloud environments like Vercel.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
