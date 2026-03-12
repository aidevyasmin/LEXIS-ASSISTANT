# ADR 001: Legal AI Secure Server-Side Architecture

**Status**: Accepted  
**Date**: 2026-02-26  
**Feature**: lexis-assistant

## Context
This system handles sensitive legal client data in Pakistan. Trust, confidentiality, and professional reputation are critical. Any data exposure could lead to legal liability and loss of trust in Advocate Nisar Hussain's practice.

## Decision
We will implement a **Server-Side-Only AI Architecture** with the following security mandates:
1. **Server-Side Processing**: All AI API calls (OpenAI/other) must be handled by the backend server.
2. **Encrypted Storage**: All client data must be encrypted at rest (AES-256).
3. **RBAC**: Role-based access control (Lawyer/Admin vs. Client) for all endpoints.
4. **Mandatory HTTPS**: All communications must be encrypted in transit.
5. **Environment Variable Security**: All secrets (API keys, DB credentials) must be stored in server-side environment variables and never exposed to the frontend.
6. **AI Safety**: Every AI response must include a mandatory legal disclaimer.

## Alternatives Considered
- **Client-side AI calls**: Rejected due to high risk of API key exposure and lack of data control.
- **Public spreadsheets**: Rejected as they provide no encryption or proper access control for sensitive legal data.
- **No-code builders**: Rejected because they lack the required scalability for a future SaaS model and granular security control.

## Tradeoffs
- **Higher Development Effort**: Requires setting up and maintaining a secure backend server.
- **Slightly Slower Initial Build**: Security configuration and middleware setup take time upfront.
- **Stronger Security**: Significantly reduces the risk of data breaches.
- **Long-term SaaS Scalability**: Provides a robust foundation for multi-user/multi-lawyer expansion.

## Consequences
- **Increased Client Trust**: Professional-grade security builds reputation.
- **Enterprise-Ready Structure**: Clean separation of concerns (API, DB, UI).
- **Subscription Model Support**: The architecture naturally supports a future SaaS/subscription model for other junior lawyers.
