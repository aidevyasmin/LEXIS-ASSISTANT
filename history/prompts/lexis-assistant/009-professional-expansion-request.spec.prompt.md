---
id: 009
title: "Expand Lexis Assistant into professional legal practice management platform"
stage: "spec"
date_iso: "2026-03-09"
surface: "agent"
model: "gemini-2.0-flash-001"
feature: "lexis-assistant"
branch: "main"
user: "PC"
command: "Turn Lexis Assistant into a professional legal practice management platform..."
labels: ["feature-expansion", "legal-tech", "full-stack", "prisma", "react"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "null"
tests_yaml:
  - "null"
---

## Summary
The user wants to transform Lexis Assistant into a comprehensive legal practice management platform. This includes adding specific owner contact details and implementing features like Case Management, Hearing Tracking, Document Storage, AI Drafting, and Billing.

## Proposed Strategy
1. **Update Contact Info**: Immediately update the Footer, Contact page, and Chatbot with the owner's details.
2. **Schema Expansion**: Update the Prisma schema to include `Case`, `Hearing`, and `Invoice` models.
3. **Backend Development**: Implement API routes for case management, hearing tracking, and billing.
4. **Frontend Development**: Create new dashboards and management interfaces for the new modules.
5. **AI Integration**: Enhance the AI service to support legal drafting and research.
