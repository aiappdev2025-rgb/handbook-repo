---
id: "S-adr-templates"
title: "Generate ADRs Prompt"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

```text
Create Architecture Decision Records for [PRODUCT_NAME].

**Tech Stack**: [TECH_STACK]
**Auth Strategy**: [AUTH_STRATEGY]

TASK: Create ADR files directly in the project.

First, create the folder structure:
- Create docs/adrs/ if it doesn't exist

Then create these ADR files:

1. **docs/adrs/001-frontend-framework.md** - Why we chose [TECH_STACK] frontend
2. **docs/adrs/002-database-backend.md** - Why we chose [TECH_STACK] database
3. **docs/adrs/003-authentication.md** - Why we chose [AUTH_STRATEGY]
4. **docs/adrs/004-hosting.md** - Why we chose [TECH_STACK] hosting
5. **docs/adrs/005-payments.md** - Why we chose [TECH_STACK] payments (if applicable)

Also create **docs/adrs/template.md** with the blank ADR template for future use.

For each ADR file, use this format:

# ADR-00X: [Decision Title]

## Status
Accepted

## Context
[2-3 sentences on why this decision was needed]

## Decision
[1-2 sentences stating the choice clearly]

## Alternatives Considered

### Option A: [Name]
- **Pros:** [benefits]
- **Cons:** [drawbacks]

### Option B: [Name]
- **Pros:** [benefits]
- **Cons:** [drawbacks]

### Option C: [Chosen] ✓
- **Pros:** [benefits]
- **Cons:** [drawbacks]

## Consequences

### Positive
- [Benefits gained]

### Negative
- [Trade-offs accepted]

### Risks
- [What could go wrong and mitigations]

## References
- [Relevant documentation links]

---

Create all files directly. After creating, list the files created for confirmation.
```
