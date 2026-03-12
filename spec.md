# Professional Platform Specification: Advocate Nisar Hussain Bhatti

## 1. Project Overview
Transform the existing "Lexis Assistant" into a professional law firm management and client engagement platform for **Advocate Nisar Hussain Bhatti**.

**Core Mission:** Enhance the platform with high-utility professional features for both the advocate and his clients, while maintaining the finalized UI design.

## 2. Advocate Identity
- **Name:** Nisar Hussain Bhatti – Advocate
- **Experience:** 9+ Years of Legal Practice
- **Office Address:** Office No. 53/54 Hajvery Complex Lahore
- **Contact:** 0321 4755492 (WhatsApp Enabled)
- **Social Media:** Facebook, TikTok, X (Twitter), Instagram.

## 3. Core Features & Functional Requirements

### 3.1. Branding & Information Updates
- Update all instances of name, experience, and address.
- Add social media links in contact and footer sections.
- Add "App Developed by Yasmin Nisar" credit in footer.
- Add WhatsApp direct contact button.

### 3.2. Legal Services Expansion
- Add "Filer / Non-Filer Tax Return" service.
- Description: Professional tax return filing services for both individuals and businesses, ensuring compliance and maximizing tax benefits.

### 3.3. Smart Court Notepad
- **Fields:** Case Title (linked to case), Court Notes, Judge Remarks, Next Hearing Date.
- **Auto-Save:** Debounced saving to local state and backend.
- **Voice-to-Text:** Integration with Web Speech API for dictating notes and judge remarks.
- **Calendar Integration:** Display a list of upcoming hearing dates within the notepad interface.

### 3.4. Case Management Enhancements
- **Document Management:** Enable file uploads (PDF, Images) for specific cases.
- **Client Details:** Display client phone number and contact shortcuts.
- **Status Tracking:** Comprehensive list view for managing all open and closed cases.

### 3.5. AI & Law Search Tools
- **Legal Assistant:** Enhanced prompt engineering for Pakistani Law questions.
- **Law Search:** Interface to search for specific sections of major acts (PPC, CrPC, CPC, Constitution).
- **Library:** PDF section for reading major legal texts.

### 3.6. Legal Document Generator
- **Templates:** Affidavit, Legal Notice, Power of Attorney, Agreement Draft, Application Draft.
- **Automation:** Form-based input to generate structured legal text.

### 3.7. Client Portal
- **Login:** Separate login flow for clients.
- **Status View:** Dashboard for clients to view their case status, upcoming dates, and updates from the advocate.

## 4. UI/UX Constraints
- **NO REDESIGN:** Preserve all current colors, fonts, layouts, and navigation patterns.
- **Consistency:** New features must use the existing design system (Tailwind classes and Lucide icons).

## 5. Technical Requirements
- **Frontend:** React (TypeScript), Vite, TailwindCSS.
- **Backend:** Node.js, Express, Prisma, PostgreSQL.
- **APIs:** OpenAI (for AI assistant), Web Speech API (for voice).
- **Storage:** Local file system or cloud storage for document uploads.
