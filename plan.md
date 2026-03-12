# Implementation Plan: Advocate Nisar Hussain Bhatti Professional Transformation

## 1. Research & Analysis (Phase 1)
- Map existing navigation and component structure.
- Review Prisma schema and API services.
- Identify integration points for the client portal.

## 2. Structural & Data Updates (Phase 2)
- Update Prisma models:
  - Add `judgeRemarks` and `nextHearingDate` to `Note`.
  - Add `Role.CLIENT` logic for the portal.
- Create migration and update database.

## 3. Branding & Information Update (Phase 3)
- Update `Footer.tsx`, `About.tsx`, `Home.tsx`, and `Contact.tsx`.
- Add WhatsApp button and social media links.
- Add developer credit.

## 4. Feature Implementation (Phase 4)
### 4.1. Smart Notepad
- Enhance `Notepad.tsx` with new fields.
- Implement Web Speech API integration.
- Implement debounced auto-save.
- Add upcoming dates list.

### 4.2. Case Management & Documents
- Implement file upload middleware in backend.
- Update `CaseManagement.tsx` with document upload UI.
- Add client phone number to case views.

### 4.3. Law Library & Search
- Create `LawLibrary.tsx` with PDF viewers.
- Integrate search functionality into `LegalAssistant.tsx`.

### 4.4. Document Generator
- Add "Generator" mode to `LegalAssistant.tsx`.
- Create templates for legal drafts.

### 4.5. Client Portal
- Update `Login.tsx` to handle client roles.
- Create `ClientDashboard.tsx` (reusing components where possible).

## 5. Validation & Delivery (Phase 5)
- Verify all data updates.
- Test voice-to-text functionality.
- Ensure no UI regressions.
