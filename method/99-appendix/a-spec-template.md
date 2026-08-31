---
chapter: null
appendix: "A"
title: "SPEC Template"
slug: "spec-template"
phase: 4
phase_name: "Build"
milestone: null
checkpoint: null
tool: null
session: null
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/appendix-a-spec-template.html"
---

# Appendix A: SPEC Template

Use this template for every SPEC document. Copy it to `docs/specs/SPEC-[PREFIX]-[NNN].md` and fill in the bracketed placeholders.

## SPEC Document Template

```text
# SPEC-[PREFIX]-[NNN]: [Feature Name]

**Status**: [Draft | Ready | In Progress | Review | Done]
**Milestone**: [Number and Name]

## Overview
**Problem**: [What problem does this solve?]
**Solution**: [How does this feature solve it?]

## Source References
- Build Contract Section [X.X]: [Name]

## Requirements
**REQ-001** [EARS-format requirement]

## Test Cases
### TC-[PREFIX]-001: [Name]
**GIVEN** [precondition]
**WHEN** [action]
**THEN** [outcome]

## Acceptance Criteria
- [ ] All test cases pass
- [ ] Code meets quality standards
```

## Status Definitions

| Status | Definition |
| --- | --- |
| **Draft** | Initial creation, requirements not finalized |
| **Ready** | Requirements complete, ready for implementation |
| **In Progress** | Currently being implemented |
| **Review** | Implementation complete, under review |
| **Done** | All acceptance criteria met, merged |

## PREFIX Conventions

| Prefix | Domain | Example |
| --- | --- | --- |
| AUTH | Authentication | SPEC-AUTH-001 |
| USER | User Management | SPEC-USER-001 |
| CORE | Core Feature | SPEC-CORE-001 |
| PAY | Payments | SPEC-PAY-001 |
| ADMIN | Admin Console | SPEC-ADMIN-001 |
| UI | UI Components | SPEC-UI-001 |

## EARS Requirements Reference

Every requirement must follow one of these EARS patterns:

- **Ubiquitous**: The [system] shall [action]
- **State-Driven**: While [state], the [system] shall [action]
- **Event-Driven**: When [event], the [system] shall [action]
- **Optional**: Where [condition], the [system] shall [action]
- **Unwanted**: The [system] shall not [action]

## Test Case Reference

Test cases use GIVEN-WHEN-THEN format:

```text
### TC-AUTH-001: Valid login
**GIVEN** a registered user with email "test@example.com"
  AND the user has password "ValidPass123"
**WHEN** the user submits the login form
**THEN** the user is redirected to /dashboard
  AND the user session is established
```

## Test File Linking Convention

Test files must include a comment linking to their SPEC:

```text
// SPEC: SPEC-AUTH-001
describe('User Authentication', () => {
  // TC-001: User can log in with valid credentials
  it('should authenticate user with valid email and password', () => {
    // Test implementation
  });
});
```

This linking enables automated verification that SPECs match implementation.
