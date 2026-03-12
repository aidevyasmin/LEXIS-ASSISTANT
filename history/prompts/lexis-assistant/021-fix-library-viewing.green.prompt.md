---
ID: 021
TITLE: Fix Law Library Online Viewing Functionality
STAGE: green
DATE_ISO: 2026-03-11
SURFACE: agent
MODEL: gemini-2.0-flash
FEATURE: lexis-assistant
BRANCH: main
USER: nisar-hussain
COMMAND: fix library book viewing
LABELS: ["bug-fix", "frontend", "library", "pdf-viewing"]
LINKS: []
FILES_YAML:
  - frontend/src/pages/LawLibrary.tsx
TESTS_YAML:
  - Manual verification of button click handlers and URL mapping
---

## PROMPT_TEXT
libary ma jo books daali wo onine view nhi ho rhi fix kro immediately

## RESPONSE_TEXT
I identified that the `LawLibrary.tsx` component had placeholder data for books without actual file URLs and the buttons lacked click handlers. 

I updated the component by:
1. Mapping each legal book (PPC, CrPC, Constitution, etc.) to its official PDF source from the Government of Pakistan (pakistancode.gov.pk and na.gov.pk).
2. Implementing a `handleView` function that opens these documents in a new browser tab.
3. Connecting the "View Online" and "Download" buttons to this function.

## OUTCOME
Users can now view and download all 8 major legal acts directly from the Digital Law Library.
