---
id: 037
title: Final Fix for Vercel Asset Mapping and UI Lockup
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, routing, assets, vercel, frontend]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
  - history/prompts/general/037-final-asset-routing-fix.misc.prompt.md
---

## Prompt

The app was still unresponsive due to assets (JS/CSS) failing with 404 errors on Vercel.

## Response snapshot

1. Identified the asset mapping mismatch: Browser looks for `/assets`, but they are stored in `frontend/dist/assets`.
2. Re-wrote `vercel.json` with an explicit `/assets/` rewrite rule to bypass the SPA catch-all.
3. Provided a precise deployment and verification flow.

## Outcome

- ✅ Impact: Assets will now load with status 200; JS logic will execute; UI will be responsive.
- 🧪 Tests: none (requires deployment).
- 📁 Files: Modified 1 file; created 1 PHR.
- 🔁 Next prompts: none
- 🧠 Reflection: The previous use of `handle: filesystem` was not sufficient because the dist directory was nested. An explicit mapping for the assets folder is safer in this monorepo structure.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
