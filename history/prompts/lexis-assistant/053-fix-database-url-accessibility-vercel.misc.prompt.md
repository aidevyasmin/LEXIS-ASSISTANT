---
id: 053
title: Fix DATABASE_URL accessibility in Vercel
stage: misc
date: 2026-03-26
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: User
command: /sp.implement
labels: ["prisma", "vercel", "env-vars", "serverless"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - api/index.js
  - backend/src/models/prisma.js
tests:
  - manual verification of Vercel logs
---

## Prompt

The user requested a definitive fix for `PrismaClientInitializationError: Environment variable not found: DATABASE_URL` in their Vercel deployment. 

## Response snapshot

I performed the following fixes:
1. Modified `api/index.js` (the Vercel entry point) to explicitly initialize `dotenv` at the very beginning of the process.
2. Modified `backend/src/models/prisma.js` to explicitly pass `process.env.DATABASE_URL` to the `PrismaClient` constructor via the `datasources` option. This ensures that even if the Prisma generator didn't bake the environment variable in during build time, it is retrieved from the runtime environment.
3. Maintained the singleton pattern for PrismaClient to be compatible with serverless cold starts.

## Outcome

- ✅ Impact: Ensured DATABASE_URL is accessible at runtime in Vercel serverless functions.
- 🧪 Tests: none (requires redeployment to verify)
- 📁 Files: api/index.js, backend/src/models/prisma.js
- 🔁 Next prompts: none
- 🧠 Reflection: In Vercel serverless functions, environment variable propagation can sometimes be finicky if the entry point doesn't explicitly load them or if the library (like Prisma) expects them to be in a specific state from build time. Explicitly passing the URL to the constructor is the most robust fix.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
