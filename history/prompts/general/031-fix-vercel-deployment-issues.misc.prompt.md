---
id: 031
title: Debugging and Fixing Vercel Deployment Issues
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, deployment, vercel, frontend, backend]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/pages/Testimonials.tsx
  - frontend/src/pages/Consultation.tsx
  - frontend/src/pages/Contact.tsx
  - frontend/src/services/api.ts
  - backend/src/api/consultation.controller.js
  - backend/src/api/auth.controller.js
  - backend/prisma/schema.prisma
  - vercel.json
tests:
  - none
---

## Prompt

The user reported multiple issues with their "Lexis Assistant" project after deploying to Vercel.
Issues included:
1. Testimonials section blank/crashing (charAt error).
2. Consultation booking not working.
3. Contact form not sending messages.
4. Dashboard, Cases, Notepad, Library not opening.
5. 404 errors on several pages.

## Response snapshot

Identified root causes:
- Hardcoded localhost API URL in frontend.
- Property name mismatches (name vs fullName).
- Missing form logic in Contact page.
- Missing Vercel routing configuration for SPA and API.
- Typo in Auth controller (fullfullName).
- Missing database schema field (email) for contact messages.

Implemented fixes:
- Fixed Testimonials and Consultation pages to use correct property names.
- Implemented full form logic in Contact page.
- Created vercel.json for proper API and SPA routing.
- Updated API service to use environment variables.
- Fixed typo in Auth controller.
- Added email field to Prisma schema.

## Outcome

- ✅ Impact: All reported frontend crashes fixed; deployment routing configured; backend/frontend property mismatch resolved.
- 🧪 Tests: Manual code review and logic verification.
- 📁 Files: Modified 8 files to address crashes, logic errors, and deployment configuration.
- 🔁 Next prompts: none
- 🧠 Reflection: The project had several basic implementation errors (typos, hardcoded URLs) and lacked deployment-specific configuration.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
