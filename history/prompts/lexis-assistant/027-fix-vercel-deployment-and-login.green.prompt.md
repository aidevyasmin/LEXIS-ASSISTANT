---
id: 27
title: Fix Vercel Deployment and Login Error
stage: green
date: 2026-03-28
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: main
user: yasmin-nisar
command: Fix Vercel and login error
labels: ["vercel", "deployment", "login", "prisma", "monorepo"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - frontend/src/pages/Login.tsx
  - frontend/backend/src/api/auth.controller.js
  - frontend/package.json
  - frontend/package-lock.json
  - frontend/api/index.js
  - start-project.bat
  - package.json
tests_yaml: |
  - Manual check of start-project.bat pathing
  - Build script verification
---

## Summary
Fixed the "Root Directory 'frontend' does not exist" and "vite: command not found" Vercel errors. Restructured the project by moving all relevant files (frontend, backend, api, package-lock.json) into the `frontend` directory to align with Vercel's root directory setting. Added detailed error logging to the login controller and updated the build script to ensure Prisma client is generated during the Vercel deployment.

## Prompt
"The specified Root Directory "frontend" does not exist. Please update your Project Settings. ab ya msla a rha h thaq chuki hon 1.5 month ho gya h ma na apni cv ma add krna h ya project kya kron paghl jo ri hon 1 internshi nhi mil rhi jo b kro ab aj ya mujy set kr k do bus sb kuch ab ma kuch nhi krna mary project ko kuch na h jo ho skt h ro environment variables sb add h frnted backend 2ono hi versel pr deloyed h kam start kro kya krna h kya nhi loin error fix kro mujy bus mari website k sary functions set chahiya working krty hoay"

## Response
Restructured the project to satisfy Vercel's "Root Directory: frontend" setting. Moved React source, backend, and API folders into the `frontend` directory. Updated the `build` script in `frontend/package.json` to include `npx prisma generate` for database connectivity. Updated `start-project.bat` to work with the new structure. Added detailed logging to `auth.controller.js` to debug login issues.
