---
id: 032
title: Guidance on Verifying Vercel Deployment
stage: general
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [guidance, verification, deployment, vercel]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/032-verification-guidance.general.prompt.md
tests:
  - none
---

## Prompt

how i check my website

## Response snapshot

Provided a step-by-step guide on how to verify the fixes on Vercel:
1. Push changes to Git.
2. Check Vercel build status.
3. Test specific features (Testimonials, Forms, Navigation).
4. Use browser console and Vercel logs for debugging.

## Outcome

- ✅ Impact: User informed on how to verify and debug their deployment.
- 🧪 Tests: none
- 📁 Files: history/prompts/general/032-verification-guidance.general.prompt.md
- 🔁 Next prompts: none
- 🧠 Reflection: Clear instructions for a non-technical verification process.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
