---
chapter: 37
title: "Milestone 8 — Supporting Features"
slug: "m8-supporting-features"
phase: 4
phase_name: "Build"
milestone: "M8"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "8.1"
deliverables: "Secondary features complete, tests passing, integrated with core feature"
prerequisites: []
when_to_use:
  - "After M7 (Admin Console). You have your core feature and admin panel - now complete the feature set."
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-37-m8-supporting-features.html"
---

# Chapter 37: Milestone 8 — Supporting Features

> **TL;DR** — Add secondary features using the same four-prompt pattern from M6. Each supporting feature is a mini-M6.

> **When to use:** After M7 (Admin Console). You have your core feature and admin panel - now complete the feature set.

In this chapter, you'll build additional user-facing features using the same four-prompt pattern from M6. By the end, you'll have a complete feature set for your MVP.

> **Workflow tip:** **Workflow Tip:** Each supporting feature is a mini-M6. See [Task Decomposition](../00-operating/08-breaking-large-projects-into-subtasks.md) for managing multiple features.

## 37.1 Overview

Supporting features complement your core value proposition. Using the same four-prompt pattern ensures consistency and maintainability across your entire feature set.

## 37.2 Feature Planning

Before implementing each supporting feature, run this planning prompt:

### Prompt 8.1 — Feature Planning

> Prompt file: [`prompts/B-8.1-feature-planning.md`](../../prompts/B-8.1-feature-planning.md)

```text
ROLE
Product Developer planning the next feature.

CONTEXT
Project: {{productName}}
Core feature complete (Milestone 6).
Adding: {{name of supporting feature}}

OBJECTIVE
Plan the supporting feature before implementing.

REQUIREMENTS

1. Define the feature scope:
   - What specific problem does this feature solve?
   - What are the must-have vs nice-to-have capabilities?
   - How does it integrate with the core feature?

2. Identify data requirements:
   - New tables needed (if any)
   - Modifications to existing tables
   - Relationships to existing data

3. Define the user journey:
   - Entry point (how user accesses feature)
   - Core actions user can take
   - Success states and feedback

4. List the pages/components needed:
   - Which pages in the four-prompt pattern?
   - Any new shared components?
   - Navigation additions

OUTPUT
Brief feature spec document
Ready to execute Prompts 6.1-6.4 with feature substituted
```

## 37.3 Implementation Pattern

For each supporting feature, use the same four-prompt pattern from Chapter 34 (M6):

1. **Data Layer** (Prompt 6.1) - Queries and mutations
2. **Server Actions** (Prompt 6.2) - Business logic and validation
3. **UI Components** (Prompt 6.3) - Reusable display components
4. **Page Assembly** (Prompt 6.4) - Wire everything together

Simply substitute your new feature name in place of the core feature placeholders.

## 37.4 Feature Checklist

### Per-Feature Verification

- [ ] Data layer compiles without TypeScript errors
- [ ] Server actions have proper validation and authorization
- [ ] UI components render correctly with sample data
- [ ] Complete user journey works: Create → View → Edit → Delete
- [ ] Feature integrates with navigation
- [ ] Tests pass for new code

## 37.5 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - All supporting features implemented using four-prompt pattern
> - Features integrated with core feature
> - Proper navigation between features
> - Consistent UX patterns across all features

### Verification Checklist

- [ ] Each feature passes the same criteria as M6
- [ ] Complete CRUD journey works for each feature
- [ ] Data persists correctly to database
- [ ] Navigation between features is intuitive
- [ ] `npm run build` passes without errors

## 37.6 Chapter Summary

You've completed Milestone 8. Your project now has:

- All planned supporting features
- Consistent implementation pattern across features
- Integrated navigation
- Tests for each feature

**Next:** Chapter 38 (Milestone 9) - Integrate Stripe for payment processing.
