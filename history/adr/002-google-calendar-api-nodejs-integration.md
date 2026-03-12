# ADR-002: Google Calendar API Node.js Integration

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-03-04
- **Feature:** Lexis Assistant
- **Context:** The Lexis Assistant requires automated appointment scheduling synced with the lawyer's Google Calendar (Task T010). This ADR documents the decision to integrate with the Google Calendar API using Node.js. This decision impacts the backend architecture, authentication mechanisms, and external service dependencies.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

The Google Calendar API will be integrated into the Node.js backend using the official `googleapis` client library. OAuth 2.0 will be used for authentication, requiring the lawyer to grant consent to access their calendar. The system will handle token storage (refresh tokens) for persistent access.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- Automated real-time calendar syncing for appointments (T010).
- Reduced manual effort for the lawyer in managing appointments.
- Improved user experience for clients through instant booking confirmation.
- Utilizes a robust and officially supported API client.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- Adds external dependency on Google's services.
- Requires implementing and managing an OAuth 2.0 flow.
- Potential security implications if tokens are not handled securely.
- Requires Google Cloud Project setup and maintenance.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

- **Manual Calendar Updates**: Rejected due to high manual effort, prone to errors, and does not meet automation requirements of T010.
- **Third-party Scheduling Services (e.g., Calendly API)**: Rejected to maintain full control over the scheduling logic, reduce recurring costs, and avoid additional third-party dependencies, as direct Google Calendar integration is sufficient and more tailored to the project's needs.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: spec.md (User Story 2 - Smart Appointment Scheduling)
- Implementation Plan: plan.md (Phase 1: Monetization & Integration)
- Related ADRs: N/A
- Evaluator Evidence: history/prompts/general/003-google-calendar-api-integration-research.general.prompt.md
