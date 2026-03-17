---
id: 041
title: Root-Level Vite and Backend Routing Fix
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, routing, root-level, vercel, vite]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
  - history/prompts/general/041-root-level-routing-fix.misc.prompt.md
---

## Prompt

The user moved frontend files to the root directory and requested a new `vercel.json` and build settings for this structure.

## Response snapshot

1. Provided a corrected `vercel.json` for a root-level Vite project with a nested Node.js backend.
2. Specified exact Vercel dashboard settings (Build Command, Output Directory).
3. Confirmed the `<script>` tag path for `index.html`.
4. Provided Git commands for a clean deployment.

## Outcome

- ✅ Impact: Vercel will now find the `package.json` in the root and build the frontend correctly.
- 🧪 Tests: none
- 📁 Files: Modified 1 file; created 1 PHR.
- 🔁 Next prompts: none
- 🧠 Reflection: Moving to the root simplifies the build command but requires explicit mapping for the nested backend.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
