---
id: 015
title: "Fix Localhost Connection Refused"
stage: "misc"
date: "2026-03-11"
surface: "agent"
model: "gemini-2.0-flash-exp"
feature: "none"
branch: "main"
user: "PC"
command: "Fix localhost connection refused"
labels: ["bug", "network", "startup"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - none
tests:
  - curl -I http://127.0.0.1:5173
  - curl -I http://127.0.0.1:5000
---

## Prompt

This site can’t be reached
localhost refused to connect.
Try:

Checking the connection
Checking the proxy and the firewall
ERR_CONNECTION_REFUSED

## Response snapshot

The servers were not running or were only listening on IPv6 loopback. I have restarted the backend on port 5000 and the frontend on port 5173 (with `--host 0.0.0.0` to ensure IPv4 accessibility). Both are now confirmed to be listening and responding.

## Outcome

- ✅ Impact: Servers are running and reachable via 127.0.0.1.
- 🧪 Tests: Verified with `netstat` and `curl`.
- 📁 Files: No files modified.
- 🔁 Next prompts: Continue with feature development.
- 🧠 Reflection: IPv6 vs IPv4 loopback issues often cause "refused to connect" in modern dev environments.

## Evaluation notes (flywheel)

- Failure modes observed: Initial startup was missing or restricted to IPv6.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
