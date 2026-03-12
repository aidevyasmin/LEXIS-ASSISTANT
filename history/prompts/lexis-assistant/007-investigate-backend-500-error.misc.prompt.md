---
id: 007
title: "Investigate 500 Internal Server Error on Backend"
stage: "misc"
date_iso: "2026-03-09"
surface: "agent"
model: "gemini-2.0-flash-001"
feature: "lexis-assistant"
branch: "main"
user: "PC"
command: "Failed to load resource: the server responded with a status of 500 (Internal Server Error) Understand this error"
labels: ["backend", "database", "postgresql", "docker", "bugfix"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml:
  - "backend/src/app.js"
  - "backend/src/api/auth.controller.js"
  - "backend/verify-db.js"
  - "docker-compose.yml"
tests_yaml:
  - "node verify-db.js"
---

## Summary
The 500 error is caused by a database connection failure. The backend (Prisma) cannot reach the PostgreSQL server at `localhost:5432`.

## Findings
- `node verify-db.js` failed with `PrismaClientInitializationError: Can't reach database server at localhost:5432`.
- `netstat` shows nothing is listening on port 5432.
- `docker ps` failed because Docker is not running.
- `docker-compose.yml` defines the database service, but it's not active.

## Recommendation
Start the database using `docker-compose up -d`. Ensure Docker Desktop is running first.
