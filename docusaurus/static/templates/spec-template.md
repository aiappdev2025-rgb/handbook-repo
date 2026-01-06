# SPEC-[PREFIX]-[NNN]: [Feature Name]

> **What is this?** A SPEC (Specification) fully defines a feature before implementation begins. It bridges the Build Contract (what to build) to the actual code (how it's built). Every feature, no matter how small, gets a SPEC.

---

## Metadata

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-[PREFIX]-[NNN] |
| **Status** | Draft / Ready / In Progress / Review / Done |
| **Milestone** | M[N]: [Milestone Name] |
| **Author** | [Your name] |
| **Created** | [Date] |
| **Updated** | [Date] |

### SPEC ID Prefixes

Use these prefixes to organize SPECs by domain:

| Prefix | Domain | Examples |
|--------|--------|----------|
| AUTH | Authentication & Authorization | Sign up, login, password reset |
| DASH | Dashboard & Navigation | Home page, sidebar, breadcrumbs |
| PHOTO | Photo/Image Handling | Upload, processing, gallery |
| GEN | AI Generation | Description creation, regeneration |
| BILL | Billing & Payments | Stripe integration, subscriptions |
| ADMIN | Admin Features | User management, analytics |
| CORE | Core Business Logic | Main feature domain |

---

## Overview

### Problem

> What problem does this feature solve? Why does it need to exist?

[Describe the user pain point or system need in 2-3 sentences]

### Solution

> How does this feature solve the problem?

[Describe the approach in 2-3 sentences]

---

## Source References

> Link to the Build Contract sections that inform this SPEC. This creates traceability from design to implementation.

- Build Contract [version], Section [X.X]: [Section Name]
- Build Contract [version], Section [X.X]: [Section Name]

**Example**:
- Build Contract 1.0, Section 2.3: Core User Flows (Flow 2: Primary Value Delivery)
- Build Contract 1.0, Section 4.1: PhotoUpload Component
- Build Contract 1.0, Section 6: API Surface (/api/photos endpoint)

---

## Requirements

> Use EARS (Easy Approach to Requirements Syntax) format for clarity and testability.

### EARS Quick Reference

| Type | Pattern | Use When |
|------|---------|----------|
| Ubiquitous | The [system] shall [action]. | Always-true requirements |
| State-Driven | While [state], the [system] shall [action]. | Behavior depends on system state |
| Event-Driven | When [event], the [system] shall [action]. | Triggered by specific event |
| Optional | Where [condition], the [system] shall [action]. | Conditional/feature-flagged behavior |
| Unwanted | The [system] shall not [action]. | Explicitly forbidden behaviors |

### Requirements List

**REQ-001** [Type: Ubiquitous]
> [EARS-format requirement sentence]

**REQ-002** [Type: Event-Driven]
> [EARS-format requirement sentence]

**REQ-003** [Type: State-Driven]
> [EARS-format requirement sentence]

**REQ-004** [Type: Unwanted]
> [EARS-format requirement sentence]

**Example Requirements**:

**REQ-001** [Type: Ubiquitous]
> The photo upload component shall accept JPEG, PNG, and HEIC image formats.

**REQ-002** [Type: Event-Driven]
> When the user drops an image on the upload zone, the system shall begin uploading immediately and display a progress indicator.

**REQ-003** [Type: State-Driven]
> While photos are uploading, the system shall disable the Generate button and display "Uploading..." text.

**REQ-004** [Type: Optional]
> Where the user has Pro subscription, the system shall allow up to 50 photos per listing.

**REQ-005** [Type: Unwanted]
> The system shall not accept files larger than 10MB.

---

## Test Cases

> Each requirement needs at least one test case. Use GIVEN-WHEN-THEN format for clarity.

### TC-[PREFIX]-001: [Descriptive Test Name]

**Covers**: REQ-001

**GIVEN** [precondition - the starting state]
  AND [additional precondition if needed]
**WHEN** [action - what the user/system does]
**THEN** [outcome - what should happen]
  AND [additional outcome if needed]

---

### TC-[PREFIX]-002: [Descriptive Test Name]

**Covers**: REQ-002

**GIVEN** [precondition]
**WHEN** [action]
**THEN** [outcome]

---

**Example Test Cases**:

### TC-PHOTO-001: Valid JPEG upload succeeds

**Covers**: REQ-001, REQ-002

**GIVEN** a user is on the create listing page
  AND the user has selected a valid JPEG image (1920x1080, 2MB)
**WHEN** the user drops the image on the upload zone
**THEN** the system displays an upload progress indicator
  AND the image appears in the preview grid after upload completes
  AND the photo count increases by 1

---

### TC-PHOTO-002: Oversized file rejected

**Covers**: REQ-005

**GIVEN** a user is on the create listing page
  AND the user has selected an image larger than 10MB
**WHEN** the user attempts to upload the image
**THEN** the system displays error message "File too large. Maximum size is 10MB."
  AND the file is not uploaded
  AND the photo count remains unchanged

---

### TC-PHOTO-003: Generate button disabled during upload

**Covers**: REQ-003

**GIVEN** a user is on the create listing page
  AND photos are currently uploading
**WHEN** the user looks at the Generate button
**THEN** the button is visually disabled (grayed out)
  AND the button shows "Uploading..." text
  AND clicking the button has no effect

---

## Acceptance Criteria

> The checklist that determines when this SPEC is "done". All items must be checked before moving to Review status.

### Functional Criteria
- [ ] All test cases (TC-*) pass
- [ ] Feature works end-to-end in the browser
- [ ] Error states handled gracefully
- [ ] Loading states provide appropriate feedback

### Quality Criteria
- [ ] All functions ≤30 lines
- [ ] All files ≤200 lines
- [ ] Nesting depth ≤3 levels
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] Test coverage ≥80% for new code

### Security Criteria
- [ ] Input validation implemented (Zod schema)
- [ ] RLS policies cover new data access patterns
- [ ] No sensitive data exposed to client

### Documentation Criteria
- [ ] Code comments explain "why" for non-obvious logic
- [ ] README updated if new setup steps required

---

## Implementation Notes

> Optional section for implementation guidance, technical decisions, or gotchas discovered during development.

[Add notes here as you implement]

---

## Change Log

| Date | Author | Change |
|------|--------|--------|
| [Date] | [Name] | Initial draft |
| [Date] | [Name] | [What changed] |
