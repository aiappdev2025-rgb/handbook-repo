---
chapter: 27
title: "Build Milestones"
slug: "build-milestones"
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
source_html: "archive/html-v3/handbook/phase4/chapter-27-build-milestones.html"
---

# Chapter 27: Build Milestones

In this chapter, you'll see the complete milestone structure for building your SaaS product. This overview shows what gets built when and where quality checkpoints occur. By the end of this chapter, you'll understand the full build journey.

> **Note:** Reference
>
> — This is an overview of all milestones and checkpoints. For detailed prompts and step-by-step instructions, open the
>
> Build Phase Guide
>
> .

## 27.1 Milestone Overview

The build phase is structured into 11 milestones with three quality checkpoints. Each milestone has clear deliverables, and checkpoints ensure you don't accumulate debt that will slow you down later.

| Milestone | Name | Focus | Deliverables |
| --- | --- | --- | --- |
| **M1** | Project Setup | Next.js, TypeScript, Tailwind, folder structure | Configured project |
| **M2** | Design System | shadcn/ui, design tokens, core components | Component library |
| **M3** | Database | Schema, RLS policies, indexes, admin tables | Secure data layer |
| **CHECKPOINT A** — Foundation Audit (security, RLS, schema review) |  |  |  |
| **M4** | Layouts | Root, marketing, app layouts, navigation | Page structure |
| **M5** | Authentication | Auth clients, login/signup, middleware, context | User sessions |
| **M6** | Core Feature | Data layer, server actions, UI, page assembly | Primary value |
| **CHECKPOINT B** — Feature Complete Audit (code quality, tests, debt score) |  |  |  |
| **M7** | Admin Console | Role access, user management, error logs | Operational control |
| **M8** | Supporting Features | Secondary features using M6 pattern | Extended functionality |
| **M9** | Payments | Stripe, webhooks, checkout, subscriptions | Revenue system |
| **M10** | Polish | Error boundaries, loading states, accessibility | Production quality |
| **CHECKPOINT C** — Pre-Launch Audit (full security, performance, debt) |  |  |  |
| **M11** | Testing | E2E tests, unit tests, integration tests | Test coverage |

> **How to Execute Each Milestone**
>
> **Before Starting Any Milestone:**
>
> 1. Review the milestone's requirements in Build Phase Guide v3
> 2. Create SPEC documents for each feature in the milestone
> 3. Verify previous milestone is complete and committed
>
> **During Each Milestone:**
>
> 1. Follow TDD workflow for each feature (RED → GREEN → REFACTOR)
> 2. Run quality checks after each feature completion
> 3. Commit working code frequently with descriptive messages
>
> **At Checkpoints (A, B, C):**
>
> 1. Run the Refactoring Audit prompt from Build Phase Guide v3
> 2. Address all critical issues before proceeding
> 3. Run full test suite and verify 100% pass rate
> 4. Create a git tag for the checkpoint: `git tag -a checkpoint-a -m "Checkpoint A complete"`
>
> **Manual Verification:**
>
> # Run all quality checks npm run build && npm run lint && npm test # Check test coverage (aim for >= 80%) npm test -- --coverage # Tag checkpoint git tag -a checkpoint-a -m "Checkpoint A: Foundation complete"

> **Expected Outcome**
>
> **What you should understand:** The complete milestone structure (M1-M11) and when each checkpoint (A, B, C) occurs.
>
> **What you should be ready for:** Opening the Build Phase Guide and starting Milestone 1.
>
> **Next:** Open the Build Phase Guide and begin implementation!

## 27.2 Chapter Summary

You've seen the complete Build Milestones overview. Key takeaways:

- 11 milestones from setup (M1) to testing (M11)
- Three checkpoints for quality verification:
  - **Checkpoint A** after M3 (Database) — Foundation security audit
  - **Checkpoint B** after M6 (Core Feature) — Feature complete audit
  - **Checkpoint C** after M10 (Polish) — Pre-launch audit
- Each milestone follows SPEC-First and TDD workflow
- Build Phase Guide has detailed step-by-step instructions

Ready to Start Building

You now understand the MOAI methodology:

- **SPEC-First** — Define features with EARS requirements before coding
- **TDD Workflow** — RED → GREEN → REFACTOR for every feature
- **Technical Debt** — Measure and manage debt at each checkpoint

**Next Step:** Open the Build Phase Guide and start Milestone 1. The Build Guide contains the detailed prompts, step-by-step instructions, and quality checks for all 11 milestones.

Open Build Phase Guide →
