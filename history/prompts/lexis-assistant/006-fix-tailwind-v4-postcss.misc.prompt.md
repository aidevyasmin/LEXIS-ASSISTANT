---
id: 006
title: "Fix Tailwind CSS v4 PostCSS compatibility"
stage: "misc"
date_iso: "2026-03-09"
surface: "agent"
model: "gemini-2.0-flash-001"
feature: "lexis-assistant"
branch: "main"
user: "PC"
command: "fix this error"
labels: ["tailwindcss", "postcss", "vite", "bugfix"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "frontend/package.json"
  - "frontend/postcss.config.js"
  - "frontend/src/index.css"
tests_yaml:
  - "npm run build"
---

## Summary
Fixed the PostCSS error related to Tailwind CSS v4 being used with a v3 configuration.

## Outcome
- Installed `@tailwindcss/postcss`.
- Updated `postcss.config.js` to use `@tailwindcss/postcss` instead of `tailwindcss`.
- Updated `frontend/src/index.css` to use Tailwind v4 `@import "tailwindcss";` instead of the legacy `@tailwind` directives.
- Verified that the project builds successfully.
