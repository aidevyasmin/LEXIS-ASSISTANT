---
id: 035
title: Production-Level Validation and Debugging Protocol
stage: general
date: 2026-03-17
surface: agent
model: gemini-2.0-flash-exp
feature: none
branch: main
user: PC
command: none
labels: [validation, checklist, production, debugging, protocol]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/035-production-validation-protocol.general.prompt.md
---

## Prompt

The user demanded execution-level clarity and a strict validation checklist for the fixes.

## Response snapshot

Provided a high-fidelity technical validation protocol covering:
1. Nodemailer/Gmail SMTP verification.
2. Database connectivity checks (Prisma/Vercel).
3. JWT/Authentication verification.
4. API connectivity (frontend to backend).
5. A strict 5-step validation flow with expected results and failure fixes.

## Outcome

- ✅ Impact: User has a professional-grade checklist to confirm the success of the fixes.
- 🧪 Tests: none
- 📁 Files: history/prompts/general/035-production-validation-protocol.general.prompt.md
- 🔁 Next prompts: none
- 🧠 Reflection: Transitioned from "troubleshooting advice" to "production engineering protocol" as requested.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): null
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
