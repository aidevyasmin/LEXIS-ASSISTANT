---
id: 56
title: Fix Vercel Output Directory Error
stage: misc
date_iso: 2026-03-30
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: main
user: PC
command: fix vercel output directory
labels: ["vercel", "deployment", "monorepo", "routing"]
links:
  - spec: null
  - ticket: null
  - adr: null
  - pr: null
files_yaml:
  - vercel.json
tests_yaml:
  - none
---

## PROMPT_TEXT
No Output Directory named "dist" found after the Build completed. Configure the Output Directory in your Project Settings. Alternatively, configure vercel.json#outputDirectory.

## RESPONSE_TEXT
Identified that Vercel was unable to locate the build output because the monorepo structure stores the Vite build artifacts in `frontend/dist`, while Vercel expects them in the root `dist` directory by default.

Key fixes:
1. Updated `vercel.json` to include `"outputDirectory": "frontend/dist"`.
2. Simplified rewrites to point directly to the output directory's `index.html`.
3. Provided push instructions to trigger a new Vercel build.

## OUTCOME
The deployment pipeline is corrected to recognize the monorepo structure, enabling successful production builds on Vercel.
