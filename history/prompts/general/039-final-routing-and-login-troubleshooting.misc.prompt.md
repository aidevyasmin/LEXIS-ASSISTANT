---
id: 039
title: Final Routing Fix for Notes, Library, and Login Troubleshooting
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, routing, login, vercel, monorepo, asset-mapping]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
  - history/prompts/general/039-final-routing-and-login-troubleshooting.misc.prompt.md
---

## Prompt

The user continues to see 404 errors on "notes" and "library" sections. Login failed for their email.

## Response snapshot

1. Implemented a corrected `vercel.json` to handle client-side routing and asset mapping for a nested structure.
2. Clarified that the "Login failed" message indicates successful frontend-to-backend communication but a database or account issue.
3. Provided a final checklist of environment variables (`DATABASE_URL`, `JWT_SECRET`, `VITE_API_BASE_URL`).

## Outcome

- ✅ Impact: All frontend routes (notes, library) will now correctly fall back to `index.html`.
- 🧪 Tests: none (requires deployment).
- 📁 Files: Modified 1 file; created 1 PHR.
- 🔁 Next prompts: none
- 🧠 Reflection: The 404s on sub-pages are the result of client-side routing lacking a server-side rewrite. The login issue is secondary to the routing but proves connectivity is now working.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
