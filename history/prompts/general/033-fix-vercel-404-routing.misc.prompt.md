---
id: 033
title: Fix Vercel 404 Route Mapping
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, deployment, vercel, routing]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
  - history/prompts/general/033-fix-vercel-404-routing.misc.prompt.md
tests:
  - none
---

## Prompt

The user reported a Vercel 404: NOT_FOUND error.

## Response snapshot

Updated vercel.json to correctly map frontend routes to the /frontend/ folder and ensured the backend functions are matched. Provided advice on Vercel dashboard settings (Build Command and Output Directory).

## Outcome

- ✅ Impact: Corrected the path mapping for the Vercel deployment.
- 🧪 Tests: none
- 📁 Files: history/prompts/general/033-fix-vercel-404-routing.misc.prompt.md
- 🔁 Next prompts: none
- 🧠 Reflection: The previous vercel.json assumed index.html was at the project root, but it was actually inside the /frontend/ subfolder.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
