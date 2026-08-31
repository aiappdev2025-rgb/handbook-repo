---
chapter: 7
title: "Stage 2.0 — Shared Design Brief"
slug: "design-brief"
phase: 1
phase_name: "Validate"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "new-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase1/chapter-07-design-brief.html"
---

# Chapter 7: Stage 2.0 — Shared Design Brief

In this chapter, you'll create the Shared Design Brief—the single source of truth for your product. This document establishes the vocabulary, user types, core flows, and scope boundaries that every subsequent artifact will reference. By the end of this chapter, you'll have a comprehensive brief that ensures everyone (including AI tools) speaks the same language about your product.

## 7.1 Purpose

The Design Brief is the single source of truth for the product. It establishes vocabulary that becomes canonical throughout all subsequent stages. Every term defined here will be used consistently in UX, UI, architecture, and code.

> **⚠ Warning:** **Critical:** Vocabulary established in the Design Brief must be used exactly and consistently in all subsequent documents. Inconsistent terminology is the #1 source of design-to-code translation errors.

**What you'll accomplish:** Create a comprehensive design brief covering product vision, canonical vocabulary, user types, core flows, non-functional requirements, and scope boundaries.

## 7.2 Design Brief Prompt

Start a fresh chat for design work. This gives Claude a clean context focused on design decisions rather than business/research context. Attach or summarize your Business One-Pager so Claude understands the business foundation.

> **Run in:** Claude Chat · **Session:** New Chat · fresh context for design work

> Prompt file: [`prompts/V-07-1-stage-2-0-shared-design-brief.md`](../../prompts/V-07-1-stage-2-0-shared-design-brief.md)

```text
Create a Shared Design Brief for [PRODUCT NAME].

**Business Context**: [ATTACH ONE-PAGER OR SUMMARIZE]

The Design Brief should establish:

**SECTION 1: Product Vision**
- One-sentence product description
- Primary user outcome (what do they achieve?)
- Key differentiator (why us?)

**SECTION 2: Vocabulary (CRITICAL)**
Define canonical terms for:
- User roles (e.g., "User", "Admin", "Guest")
- Core entities (e.g., "Listing", "Property", "Description")
- Key actions (e.g., "Generate", "Edit", "Publish")
- States (e.g., "Draft", "Processing", "Complete")

**SECTION 3: User Types**
For each user type:
- Who they are
- What they need to accomplish
- What frustrates them
- Success criteria

**SECTION 4: Core User Flows**
- Flow 1: [Primary value delivery]
- Flow 2: [Secondary flow]
- Flow 3: [Admin/management flow]

**SECTION 5: Non-Functional Requirements**
- Performance targets
- Security requirements
- Accessibility requirements
- Browser/device support

**SECTION 6: Scope Boundaries**
- In scope for MVP
- Out of scope (future phases)
- Explicit anti-goals

Output in markdown format, ready to save as docs/design-brief.md.
```

> **Expected Outcome**
>
> **What you should have:** A Design Brief document (typically 1,500-3,000 words) covering all six sections: product vision, vocabulary, user types, core flows, non-functional requirements, and scope boundaries.
>
> **How to validate:** Section 2 (Vocabulary) should define at least 10-15 canonical terms. Section 4 (Core Flows) should describe 3+ distinct user journeys. Section 6 (Scope) should have clear in-scope and out-of-scope lists.
>
> **Next:** Save the Design Brief to your project.

## 7.3 Save the Design Brief

The Design Brief must be saved as a file because it's referenced by every subsequent stage. UX design, UI system, architecture, and implementation all trace back to the vocabulary and requirements defined here.

### Instructions

1. Copy the complete Design Brief output from Claude Chat
2. Save as `docs/design-brief.md`

> **Note:** Vocabulary is Code:
>
> The terms defined in Section 2 will become variable names, function names, and database columns. Ensure they are clear, unambiguous, and follow naming conventions (no spaces, consistent casing).

> **Expected Outcome**
>
> **What you should have:** A file at `docs/design-brief.md` containing your complete Design Brief with canonical vocabulary.
>
> **How to validate:** Open the file and verify the Vocabulary section (Section 2) exists with clear definitions. These terms should be usable as code identifiers (e.g., "Listing" not "listing item").
>
> **Next:** Chapters 8-10 — Create the UX Package that defines every screen and flow.

## 7.4 Chapter Summary

You've completed the Shared Design Brief phase. Here's what you accomplished:

- Established canonical vocabulary for your product
- Defined user types with their goals and frustrations
- Outlined core user flows that deliver value
- Set non-functional requirements (performance, security, accessibility)
- Defined clear scope boundaries for MVP

Your product definition is complete. In the next chapters, you'll transform this brief into a detailed UX Package that specifies every screen, state, and interaction.
