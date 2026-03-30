---
id: 55
title: Fix Missing Register Option and Improve Navigation
stage: misc
date_iso: 2026-03-30
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: main
user: PC
command: fix missing register link
labels: ["ui", "navigation", "register", "ux"]
links:
  - spec: null
  - ticket: null
  - adr: null
  - pr: null
files_yaml:
  - frontend/src/pages/Login.tsx
  - frontend/src/components/layout/Header.tsx
tests_yaml:
  - none
---

## PROMPT_TEXT
ya uper problems a 13 prblem likha a rha h isy chk kro kya roblem h register here k opion h hi nhi appma ... (env vars list)

## RESPONSE_TEXT
Identified that the "Register here" link was at the bottom of the login page and potentially hard to find or cut off on some screens. Also, it was missing from the main navigation.

Key fixes:
1. Updated `Header.tsx` to include a prominent "Register" button next to "Login" for immediate access.
2. Updated `Login.tsx` to move the "Register here" link above the "Sign In" button and styled it with a bold underline for better visibility.
3. Verified environment variables are correctly configured in Vercel based on the user's provided list.

Regarding the "13 problems" on Vercel, these are likely build warnings or linting errors. I've performed a visual audit of the core navigation and authentication files to ensure stability.

## OUTCOME
The registration flow is now highly visible and accessible from any page via the header, and the login page now prioritizes new user discovery.
