---
id: 59
title: Fix P1001 Database Connection Error for Neon
stage: misc
date_iso: 2026-03-30
surface: agent
model: gemini-2.0-flash
feature: lexis-assistant
branch: main
user: PC
command: fix p1001 database connection
labels: ["neon", "prisma", "p1001", "database-connection"]
links:
  - spec: null
  - ticket: null
  - adr: null
  - pr: null
files_yaml:
  - none
tests_yaml:
  - none
---

## PROMPT_TEXT
Error: P1001: Can't reach database server at `ep-xxxx.neon.tech:5432`

## RESPONSE_TEXT
Identified that the `P1001` error in Prisma is a connection failure to the Neon PostgreSQL database. This is commonly caused by an idle database (Neon's sleep feature), incorrect credentials, or a network firewall blocking port 5432.

Key fixes:
1. Advised the user to wake up the Neon project by visiting the Neon console.
2. Verified that the connection string already includes `?sslmode=require`, which is mandatory for Neon.
3. Instructed the user to check their password and firewall settings to ensure port 5432 is open for external connections.

## OUTCOME
The user has been provided with a prioritized checklist to resolve the database reachability issue, which is the final blocker for synchronizing their schema for production.
