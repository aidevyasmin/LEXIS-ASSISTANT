---
id: 027
title: Sanitize Library URLs
stage: green
date: 2026-03-12
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: [User]
command: fix disallowed characters in URI
labels: ["bug-fix", "library", "links", "security"]
links: null
---

## Summary
Fixed the "An Error Was Encountered: The URI you submitted has disallowed characters" error by sanitizing document URLs.

## Changes
- Replaced `punjabcode.punjab.gov.pk` and `kpcode.kp.gov.pk` links that contained commas and spaces in their filenames with clean direct PDF links from `fmu.gov.pk`.
- Affected documents: Specific Relief Act and Family Courts Act.

## Files Modified
- `frontend/src/pages/LawLibrary.tsx`

## Outcome
All library links are now clean and compliant with strict URI filtering on government servers, ensuring all documents open correctly.
