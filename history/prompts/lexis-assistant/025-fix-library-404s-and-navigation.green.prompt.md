---
id: 025
title: Fix Library 404s and Navigation
stage: green
date: 2026-03-12
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: [User]
command: fix library links and 404
labels: ["bug-fix", "library", "links", "routing"]
links: null
---

## Summary
Fixed the "Page Not Found" errors in the library by replacing broken external URLs with official government-hosted PDF links and standardizing SPA routing.

## Changes
- Updated `frontend/src/pages/LawLibrary.tsx` with verified official links from FMU, National Assembly, Punjab Code, and KP Code.
- Changed "Consult AI Assistant" link from `<a>` to `<Link>` in `LawLibrary.tsx` to prevent full-page reload 404s.
- Standardized route paths in `frontend/src/App.tsx` by removing inconsistent leading slashes.

## Files Modified
- `frontend/src/pages/LawLibrary.tsx`
- `frontend/src/App.tsx`

## Outcome
All library documents now point to stable, direct PDF links, and navigation within the library no longer triggers SPA routing issues.
