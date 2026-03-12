---
ID: 022
TITLE: Fix Library and Document 404 Errors
STAGE: green
DATE_ISO: 2026-03-11
SURFACE: agent
MODEL: gemini-2.0-flash
FEATURE: lexis-assistant
BRANCH: main
USER: nisar-hussain
COMMAND: fix library book viewing and download
LABELS: ["bug-fix", "backend", "frontend", "static-files"]
LINKS: []
FILES_YAML:
  - backend/src/app.js
  - frontend/src/services/api.ts
  - frontend/src/pages/LawLibrary.tsx
  - frontend/src/pages/CaseManagement.tsx
  - frontend/src/pages/ClientDashboard.tsx
TESTS_YAML:
  - Verified static file serving in backend
  - Verified URL construction in LawLibrary, CaseManagement, and ClientDashboard
---

## PROMPT_TEXT
in library books not download or view oline Not Found
The requested URL was not found on this server.

Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.

## RESPONSE_TEXT
I identified that the 404 "Not Found" errors were caused by two main issues: the backend was not configured to serve static files from the `uploads` directory, and the frontend was using relative paths for document links, which the browser tried to resolve against the frontend server instead of the backend.

I have implemented the following fixes:
1. **Backend Static Serving**: Updated `backend/src/app.js` to serve the `uploads` directory using `express.static`.
2. **Global Base URL**: Exported `BASE_URL` from `frontend/src/services/api.ts` to ensure consistent absolute URL construction.
3. **Law Library Robustness**: Updated `LawLibrary.tsx` to handle both external and local URLs, ensuring buttons correctly trigger views and downloads.
4. **Document Link Fixes**: Updated `CaseManagement.tsx` and `ClientDashboard.tsx` to prepend `BASE_URL` to all document links, ensuring uploaded case files can be opened without 404 errors.
5. **Local Library Support**: Created `backend/uploads/library/` directory to allow for local hosting of legal PDFs.

## OUTCOME
Users can now reliably view and download both official library books and uploaded case documents. The application now correctly serves local files and handles external fallbacks.
