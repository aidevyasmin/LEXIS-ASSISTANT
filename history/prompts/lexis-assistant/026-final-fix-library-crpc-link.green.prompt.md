---
id: 026
title: Final Fix for Library CrPC Link
stage: green
date: 2026-03-12
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: [User]
command: fix broken jpp link for crpc
labels: ["bug-fix", "library", "links"]
links: null
---

## Summary
Replaced the broken `database.jpp.org.pk` DNS-error link for the Code of Criminal Procedure (CrPC) with a stable, official link from the Financial Monitoring Unit (FMU).

## Changes
- Updated `frontend/src/pages/LawLibrary.tsx` to use `https://fmu.gov.pk/docs/laws/Code_of_criminal_procedure_1898.pdf` for the CrPC document.

## Files Modified
- `frontend/src/pages/LawLibrary.tsx`

## Outcome
All library documents are now hosted on official and active government or reputable legal domains, resolving the "DNS_PROBE_FINISHED_NXDOMAIN" error.
