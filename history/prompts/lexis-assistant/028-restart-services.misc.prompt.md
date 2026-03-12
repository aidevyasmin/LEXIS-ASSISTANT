---
id: 028
title: Restart Backend and Frontend Services
stage: misc
date: 2026-03-12
surface: agent
model: Gemini 2.0 Flash
feature: lexis-assistant
branch: main
user: [User]
command: This site can’t be reached localhost refused to connect.
labels: ["bug", "network", "startup", "reproduction"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - backend.log
  - frontend.log
tests:
  - netstat -ano | findstr ":5000 :5173 :5432"
  - Invoke-RestMethod -Uri 'http://localhost:5000/health'
---

## Prompt

This site can’t be reached
localhost refused to connect.
Try:

Checking the connection
Checking the proxy and the firewall
ERR_CONNECTION_REFUSED

## Response Snapshot

I have diagnosed that the backend (port 5000) and frontend (port 5173) services were not running, although the database (port 5432) was active. I have successfully restarted both services in the background and verified their availability.

- Backend: Running on port 5000 (Health check passed)
- Frontend: Running on port 5173

## Outcome

- ✅ Status: All services are now active and reachable.
- 🧪 Verification: Confirmed via `netstat` and a health check request to the backend.
- 📁 Artifacts: Created `backend/backend.log` and `frontend/frontend.log` for monitoring.
- 💡 Recommendation: Use the `start-project.bat` script in the root directory to start all services in the future.

## Evaluation Notes

- The connection refusal was due to the services being inactive, likely because the `start-project.bat` script hadn't been run or the processes had terminated.
- Future improvements: Add a persistent process manager or a more robust startup check in the dev environment.
