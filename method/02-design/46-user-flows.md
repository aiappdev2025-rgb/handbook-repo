---
chapter: 46
title: "User Flows & Wireframes"
slug: "46-user-flows"
phase: 2
phase_name: "Design"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "continue"
estimated_time: "20 min read"
description: "Validate your UX Package through critique and create visual user flow diagrams"
prerequisites:
  - "UX Package complete"
  - "Core user flows documented"
when_to_use:
  - "UX Package is complete (first draft)"
  - "Need to visualize specific user journeys"
  - "Validating feature interactions before UI design"
skip_if: "Working from existing validated wireframes"
source_mdx: "archive/docusaurus/docs/phase-2-design/user-flows.mdx"
---

# Chapter 46: User Flows & Wireframes

> **TL;DR**
> Validate your UX Package through structured critique, then create visual diagrams of key user journeys.
>
> **Why:** A 10-minute critique now saves hours of rework later—catch usability issues before they become implementation problems.
>
> **Outcome:** A refined UX Package with validated flows and optional wireframe diagrams.

> **When to use**
>
> - UX Package is complete (first draft)
> - Need to visualize specific user journeys
> - Validating feature interactions before UI design
>
> **Skip if:** Working from existing validated wireframes

**Prerequisites**

- [ ] UX Package complete
- [ ] Core user flows documented

## Phase 1: UX Critique

Before proceeding to UI design, critique your UX Package for issues. This step catches design flaws that are expensive to fix during implementation.

### Critique Prompt

### UX Flows Critique Prompt

> Prompt file: [`prompts/S-user-flows.md`](../../prompts/S-user-flows.md)

```text
Review the UX flows for [PRODUCT_NAME] as a UX expert.

**User Personas**: [USER_PERSONAS]
**Core Features**: [CORE_FEATURES]
**Key User Flows**: [USER_FLOWS]

Identify issues in these categories:

1. **Usability Issues**: Friction points, confusing flows, cognitive overload
2. **Missing States**: Empty states, error states, loading states not defined
3. **Edge Cases**: Scenarios not covered (first-time user, power user, edge data)
4. **Accessibility Gaps**: Issues for users with disabilities (keyboard nav, screen readers)
5. **Mobile Considerations**: Touch targets, thumb zones, scrolling, gestures

For each issue found:
- Describe the problem
- Rate severity (High/Medium/Low)
- Suggest a specific improvement

Output in markdown format as a structured critique document, ready to save as docs/user-flows-critique.md
```

### Common Issues Found

| Category | Example Issue | Typical Fix |
|----------|---------------|-------------|
| **Usability** | Too many steps to complete core action | Combine steps or add shortcuts |
| **Missing States** | No empty state for new users | Add onboarding guidance |
| **Edge Cases** | What if user has 1000+ items? | Add pagination or virtualization |
| **Accessibility** | Color-only indicators | Add text labels or icons |
| **Mobile** | 44px touch targets too small | Increase to 48px minimum |

### Incorporate Feedback

After receiving critique, update your UX Package:

1. Review each identified issue
2. Decide whether to fix or defer (with rationale)
3. Update `docs/ux-package.md` with improvements

:::tip Iterate as Needed
Run multiple critique cycles until the UX Package is solid. Always update the same file rather than creating separate versions.
:::

## Phase 2: Visual Flow Diagrams

For complex flows, create visual diagrams to communicate the journey:

### Flow Diagram Template

```
┌─────────────┐
│  Start      │
│  (Entry)    │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  Step 1     │────▶│  Step 2     │
│  (Action)   │     │  (Action)   │
└──────┬──────┘     └──────┬──────┘
       │                   │
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│  Decision   │────▶│  Error      │
│  Point      │ No  │  Recovery   │
└──────┬──────┘     └─────────────┘
       │ Yes
       ▼
┌─────────────┐
│  Success    │
│  (End)      │
└─────────────┘
```

### Key Flows to Diagram

Create diagrams for your most critical flows:

1. **Onboarding Flow**: First-time user from signup to first value
2. **Core Action Flow**: The main thing users do in your app
3. **Recovery Flow**: How users recover from errors or mistakes

### Flow Documentation

For each flow, document:

```markdown
## Flow: [Name]

**Trigger**: What initiates this flow
**Goal**: What user is trying to accomplish
**Success Criteria**: How user knows they succeeded

### Steps

1. User lands on [screen]
2. User clicks [action]
3. System shows [response]
4. User enters [data]
5. System validates and [result]

### Decision Points

- **If validation fails**: Show inline error, preserve data
- **If network error**: Show retry option
- **If success**: Show confirmation, redirect to [screen]

### Edge Cases

- First-time user: Show tooltip guidance
- Mobile user: Use bottom sheet instead of modal
- Slow network: Show progress indicator
```

## Optional: Low-Fidelity Wireframes

For complex screens, sketch wireframes to clarify layout:

```
┌─────────────────────────────────────┐
│  [Logo]    [Nav] [Nav] [Nav] [User] │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │  Stat   │ │  Stat   │ │ Stat  │  │
│  │  Card   │ │  Card   │ │ Card  │  │
│  └─────────┘ └─────────┘ └───────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │        Main Content           │  │
│  │                               │  │
│  │                               │  │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

:::info When to Wireframe
Create wireframes when:
- Screen layout isn't obvious from description
- Stakeholders need visual alignment
- Component placement affects flow understanding

Skip wireframes when:
- Using standard patterns (list, detail, form)
- Working solo and layout is clear
:::
