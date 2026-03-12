# Development Tasks: Advocate Nisar Hussain Bhatti App

## Phase 1: Branding & Info
- [x] Update Advocate Name to "Nisar Hussain Bhatti – Advocate" in all files.
- [x] Update Experience to "9+ Years" in `About.tsx`, `Footer.tsx`, and `Services.tsx`.
- [x] Update Office Address to "Office No. 53/54 Hajvery Complex Lahore" in `Footer.tsx` and `Contact.tsx`.
- [x] Add Social Media links to `Footer.tsx`.
- [x] Add "App Developed by Yasmin Nisar" to `Footer.tsx`.
- [x] Add WhatsApp button to `Footer.tsx`.

## Phase 2: Content Updates
- [x] Add "Filer / Non-Filer Tax Return" service to `Services.tsx`.
- [x] Update specializations in `About.tsx`.

## Phase 3: Database & Backend
- [x] Update Prisma `Note` model with `judgeRemarks` and `nextHearingDate`.
- [ ] Run migration `npx prisma migrate dev --name add_note_fields` (Requires DB connection).
- [x] Update `Note` controller and service to handle new fields.
- [x] Implement file upload API service in `api.ts`.

## Phase 4: Smart Notepad & Voice
- [x] Add `judgeRemarks` and `nextHearingDate` inputs to `Notepad.tsx`.
- [x] Implement debounced auto-save in `Notepad.tsx`.
- [x] Add Speech-to-Text button and logic to `Notepad.tsx`.
- [x] Display "Upcoming Hearings" sidebar in `Notepad.tsx`.

## Phase 5: Case Management & Documents
- [x] Add document upload button to case cards in `CaseManagement.tsx`.
- [x] Display uploaded documents list for each case.
- [x] Ensure client phone number is visible in case details.

## Phase 6: AI Assistant & Document Generator
- [x] Enhance `LegalAssistant.tsx` with structured templates and "Generator" mode.
- [x] Add templates for Affidavit, Power of Attorney, etc.
- [x] Implement Pakistani law search tool in AI Assistant.

## Phase 7: Law Library
- [x] Create `LawLibrary.tsx` page.
- [x] Link to major Acts (PPC, CrPC, CPC, Constitution).
- [x] Add search interface for acts.

## Phase 8: Client Portal
- [x] Update `Login.tsx` to handle client roles and redirection.
- [x] Create `ClientDashboard.tsx` for clients to view their case status.
- [x] Add `getClientOverview` to backend controller and frontend API.

## Phase 9: Final Polish
- [x] Update Header and Mobile Nav with new links.
- [x] Verify all links and contact buttons.
- [x] Ensure UI consistency across new features.
- [ ] Final build and test (Requires full environment).
