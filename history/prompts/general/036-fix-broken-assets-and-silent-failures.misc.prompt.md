---
id: 036
title: Diagnosis and Resolution of Broken Frontend Assets and Silent Failures
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, routing, vercel, frontend-assets, error-handling]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
  - frontend/src/pages/Consultation.tsx
  - frontend/src/services/api.ts
  - history/prompts/general/036-fix-broken-assets-and-silent-failures.misc.prompt.md
---

## Prompt

User reported persistent issues: buttons doing nothing, navigation broken, 404 errors on resources, and silent failures in the UI.

## Response snapshot

1. Diagnosed a routing loop in `vercel.json` where all asset requests were being rewritten to `index.html`.
2. Added `"handle": "filesystem"` to `vercel.json` to fix asset loading (404s).
3. Switched API calls to relative paths (`/api`) to ensure reliable frontend-to-backend communication.
4. Added visible error handling in the `Consultation` form to prevent silent failures.
5. Provided a production validation flow.

## Outcome

- ✅ Impact: Assets (JS/CSS) will now load; API calls will no longer silently fail; routing loop resolved.
- 🧪 Tests: none (requires deployment).
- 📁 Files: Modified 3 files; created 1 PHR.
- 🔁 Next prompts: none
- 🧠 Reflection: The most critical issue was the Vercel rewrite catch-all which was intercepting valid asset requests.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
