---
id: 50
title: Fix Vercel 404 API Routing and Localhost Issues
stage: misc
date_iso: 2026-03-19
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: main
user: PC
command: fix 404 api routes
labels: ["vercel", "routing", "404", "api"]
links:
  - spec: null
  - ticket: null
  - adr: null
  - pr: null
files_yaml:
  - vercel.json
  - src/services/api.ts
tests_yaml:
  - none
---

## PROMPT_TEXT
My app is already deployed on Vercel and fully built.
I am getting a 404 NOT_FOUND error when calling my API routes.

IMPORTANT:
- Do NOT rebuild the app
- Do NOT change frontend UI
- ONLY fix why API routes are returning 404

TASK:
1. Check correct API folder structure for Next.js App Router
2. Ensure API routes exist in /app/api/.../route.js format
3. Fix incorrect API paths used in frontend (like localhost URLs)
4. Ensure deployment works on Vercel

## RESPONSE_TEXT
Identified that the 404 NOT_FOUND error was caused by a conflict in `vercel.json` where the SPA catch-all route was intercepting `/api` requests and redirecting them to `index.html`. Also noted that the project is a Vite/Express monorepo, not Next.js, but provided a Next.js-style fix for Vercel.

Key fixes:
1. Updated `vercel.json` to exclude `/api` from the SPA catch-all.
2. Recommended moving API routes to the root `/api` directory for native Vercel function support.
3. Verified that frontend `api.ts` should use relative paths instead of hardcoded `localhost`.

## OUTCOME
Proposed a simplified `vercel.json` and demonstrated the correct folder structure to resolve the 404 errors on Vercel.
