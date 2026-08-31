---
chapter: 45
title: "MVP Scoping"
slug: "45-mvp-scoping"
phase: 1
phase_name: "Validate"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "continue"
estimated_time: "15 min read"
description: "Define the minimum viable product scope—what's in, what's out, and why"
prerequisites:
  - "Business One-Pager complete"
  - "Competitive Analysis complete"
when_to_use:
  - "You have a validated idea but scope is unclear"
  - "Features keep expanding (scope creep)"
  - "You need to define 'what's NOT in v1'"
skip_if: "You have a clear, documented MVP scope under 5 features"
source_mdx: "archive/docusaurus/docs/phase-1-validate/mvp-scoping.mdx"
---

# Chapter 45: MVP Scoping

> **TL;DR**
> Define exactly what's in your MVP and—critically—what's NOT. Create a prioritized feature list with clear boundaries.
>
> **Why:** Scope creep kills products. Without explicit boundaries, features keep expanding until launch never happens.
>
> **Outcome:** A documented MVP scope with 3-5 core features, a deferred features list, and clear launch criteria.

> **When to use**
>
> - You have a validated idea but scope is unclear
> - Features keep expanding (scope creep)
> - You need to define 'what's NOT in v1'
>
> **Skip if:** You have a clear, documented MVP scope under 5 features

**Prerequisites**

- [ ] Business One-Pager complete
- [ ] Competitive Analysis complete

## The MVP Discipline

MVP doesn't mean "crappy first version." It means the **minimum** set of features needed to:
1. Solve the core problem
2. Deliver value to early adopters
3. Validate your hypotheses
4. Generate revenue (or clear learning)

:::warning The Scope Trap
Every feature you add delays launch by 1-2 weeks and increases complexity exponentially. A 5-feature MVP takes ~2 months. A 10-feature MVP takes ~6 months. A 15-feature MVP takes... forever.
:::

## The Scoping Framework

### Step 1: List All Possible Features

Brainstorm everything your product could do. Don't filter yet—just list.

### Step 2: Categorize by Value

For each feature, ask: "Would early adopters pay for just this feature?"

| Category | Description | Action |
|----------|-------------|--------|
| **Core** | Essential for primary value | Must include |
| **Expected** | Users assume it exists | Include if simple |
| **Delight** | Nice surprise | Defer to v2 |
| **Future** | Advanced/enterprise needs | Defer indefinitely |

### Step 3: Apply the "One Thing" Test

Your MVP should do **one thing** exceptionally well. That one thing is your primary value proposition from the One-Pager.

Ask: "If users could only use one feature, which would they choose?"

That's your core. Everything else is supporting cast.

### Step 4: The MoSCoW Method

Prioritize remaining features:

| Priority | Meaning | Criteria |
|----------|---------|----------|
| **Must** | Launch blocker | Can't deliver core value without it |
| **Should** | Important | Significantly improves core value |
| **Could** | Nice-to-have | Improves experience but not essential |
| **Won't** | Not in MVP | Explicitly deferred |

## MVP Scoping Prompt

### MVP Scoping Prompt

> Prompt file: [`prompts/S-mvp-scope.md`](../../prompts/S-mvp-scope.md)

```text
Define MVP scope for [PRODUCT_NAME].

**Product Concept**: [PRODUCT_CONCEPT]
**Target Customer**: [TARGET_CUSTOMER]
**Problem**: [PROBLEM_STATEMENT]

Current feature ideas: [MVP_FEATURES]

Help me scope using the MoSCoW method:

For each feature, categorize as:
- **Must Have**: Required for launch (max 3-5)
- **Should Have**: Important but can wait for v1.1
- **Could Have**: Nice but defer to v2
- **Won't Have**: Explicitly out of scope

Also identify:
1. The "one thing" this MVP does exceptionally well
2. What's explicitly OUT of scope for v1
3. Estimated build complexity for each Must Have feature
4. Technical risks to watch for
5. Launch criteria (what defines "done"?)

Output as MVP Scope document in markdown format.
```

## The 3-5 Feature Rule

Your MVP should have **3-5 core features**. Not 8. Not 12. 3-5.

If you can't get below 5, you're either:
- Building too much
- Not clear on your core value
- Conflating features with sub-features

**Example breakdown:**
- ❌ "User management" (too broad)
- ✅ "User signup", "User login", "Password reset" (these are one feature: Authentication)

## What "Out of Scope" Means

Out of scope doesn't mean "never." It means "not in v1."

Create an explicit "Deferred Features" list:

```markdown
## Deferred to v1.1 (Post-Launch)
- Feature X
- Feature Y

## Deferred to v2 (Post-Revenue)
- Feature Z
- Advanced Feature W

## Not Planned (May Never Build)
- Enterprise Feature
- Feature That Doesn't Fit Vision
```

:::tip The Power of "No"
Every "no" to a feature is a "yes" to shipping faster. Your deferred list is a strategic asset, not a failure.
:::

## Launch Criteria

Define what "done" means:

| Criterion | Specific Target |
|-----------|----------------|
| Features | All "Must Have" features working |
| Quality | Zero critical bugs, fewer than 5 minor bugs |
| Performance | Page load under 2s, API response under 500ms |
| Security | Auth working, data protected |
| Usability | First-time user can complete core flow |
