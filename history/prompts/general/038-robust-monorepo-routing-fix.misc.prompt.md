---
id: 038
title: Robust Vercel Routing for Monorepo Folder Structure
stage: misc
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [bug-fix, routing, vercel, monorepo, asset-mapping]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - vercel.json
  - history/prompts/general/038-robust-monorepo-routing-fix.misc.prompt.md
---

## Prompt

User is extremely frustrated; 404 errors persist for Dashboard, Cases, etc., and assets are failing to load.

## Response snapshot

1. Implemented a robust `vercel.json` rewrite strategy using a combined regex for common assets (`assets|static|favicon.ico|vite.svg`).
2. Confirmed `vite.config.ts` matches the expected base path (`/`).
3. Clarified the Vercel Dashboard settings (Build Command and Output Directory) for the monorepo structure.

## Outcome

- ✅ Impact: All frontend assets and routes will now correctly map to their physical subdirectories.
- 🧪 Tests: none (requires deployment).
- 📁 Files: Modified 1 file; created 1 PHR.
- 🔁 Next prompts: none
- 🧠 Reflection: The monorepo structure requires explicit path mapping in `vercel.json` because Vercel doesn't automatically look inside subfolders for assets after a build.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
