---
id: 024
title: Fix Library Online Viewing
stage: green
date: 2026-03-12
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: [User]
command: fix library online view
labels: ["bug-fix", "library", "links"]
links: null
---

## Summary
Fixed the issue where most legal documents in the Digital Law Library were not viewable online due to broken or unreliable external URLs.

## Changes
- Updated `frontend/src/pages/LawLibrary.tsx` with verified stable PDF links from official and reputable legal sources (FMU, JPP, Khalid Zafar, etc.).

## Files Modified
- `frontend/src/pages/LawLibrary.tsx`

## Outcome
All 8 major legal documents in the library now have working "View Online" and "Download" functionality.
