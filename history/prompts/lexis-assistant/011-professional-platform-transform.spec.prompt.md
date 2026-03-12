---
id: 011
title: "Transform Lexis Assistant into Professional Legal Platform"
stage: "spec"
date_iso: "2026-03-09"
surface: "agent"
model: "gemini-2.0-flash-001"
feature: "lexis-assistant"
branch: "main"
user: "PC"
command: "Transform the project into a professional legal practice management platform..."
labels: ["ui-overhaul", "feature-new", "voice-assistant", "legal-notepad", "dashboard", "branding"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "frontend/src/components/layout/Footer.tsx"
  - "frontend/tailwind.config.js"
  - "backend/prisma/schema.prisma"
  - "frontend/src/pages/Dashboard.tsx"
  - "frontend/src/pages/Notepad.tsx"
tests_yaml:
  - "null"
---

## Summary
The user requests a major overhaul to make the application professional, themed "Dark + Gold", and feature-rich.

## Key Requirements
1. **Branding**: Footer credits to "Yasmin Nisar" and Contact info for "Nisar Hussain Bhatti Advocate".
2. **UI/UX**: Dark + Gold professional theme.
3. **New Features**:
   - Voice Assistant (Input/Output).
   - Legal Notepad (Notes system).
   - Enhanced Dashboard (Stats).
   - Document Manager & Hearing Tracker (Refine existing).
4. **Tech Stack**: Maintain existing (React, Node, Postgres, Prisma).

## Plan
1.  **Branding**: Update `Footer.tsx` immediately.
2.  **Theme**: Update `tailwind.config.js` with `legal-gold` (#C5A059) and `legal-dark` (#0A0A0C).
3.  **Schema**: Add `Note` model for the Legal Notepad.
4.  **Backend**: Add/Update controllers for Notes and Dashboard stats.
5.  **Frontend**:
    - Implement Voice Input in Chat.
    - Create `Notepad` page.
    - Redesign `Dashboard` with stats cards and calendar view.
