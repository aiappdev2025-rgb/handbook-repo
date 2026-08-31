---
title: "AI SaaS Handbook — the method"
slug: "method"
---

# The Method

Everything needed to take a SaaS product from idea to launch with Claude Code.
Read **Part 0 first** — it is orthogonal to the five phases and applies throughout.

Prompts referenced by these chapters live in [`../prompts/`](../prompts/INDEX.md),
one file each, flat and greppable. Templates for the artifacts you produce live in
[`../plugins/moai/assets/templates/`](../plugins/moai/assets/templates/).

## Part 0 — Operating Claude Code

How to drive the tool well: context budgeting, session boundaries, `CLAUDE.md` vs
skills, when to `/clear`, carrying state across sessions.

→ [**Part 0 index**](00-operating/README.md) · 23 chapters + 5 appendices


## Phase 1 — Validate

Is this worth building? Research, one-pager, design brief.

| Ch | Title | Tool | Milestone |
| --- | --- | --- | --- |
| 1 | [Introduction and Philosophy](01-validate/01-introduction.md) |  |  |
| 2 | [The Code Quality Crisis](01-validate/02-quality-crisis.md) |  |  |
| 3 | [The Quality Framework — Five Pillars](01-validate/03-quality-framework.md) |  |  |
| 4 | [Claude Tools Guide](01-validate/04-claude-tools.md) |  |  |
| 5 | [Stage 0.1 — Research and Opportunity Assessment](01-validate/05-research.md) | claude-chat |  |
| 6 | [Stage 1.0 — Business One-Pager](01-validate/06-one-pager.md) | claude-chat |  |
| 7 | [Stage 2.0 — Shared Design Brief](01-validate/07-design-brief.md) | claude-chat |  |
| 44 | [Competitive Analysis](01-validate/44-competitive-analysis.md) | claude-chat |  |
| 45 | [MVP Scoping](01-validate/45-mvp-scoping.md) | claude-chat |  |

## Phase 2 — Design

What does it look like? UX package, UI system, visual direction.

| Ch | Title | Tool | Milestone |
| --- | --- | --- | --- |
| 8 | [Design Philosophy](02-design/08-design-philosophy.md) |  |  |
| 9 | [UX Package](02-design/09-ux-package.md) | claude-chat |  |
| 10 | [UX Critique and Validation](02-design/10-ux-critique.md) | claude-chat |  |
| 11 | [UI System](02-design/11-ui-system.md) | claude-chat |  |
| 12 | [Visual Direction Options](02-design/12-visual-direction.md) | claude-chat |  |
| 46 | [User Flows & Wireframes](02-design/46-user-flows.md) | claude-chat |  |
| 47 | [Component Library Spec](02-design/47-component-library.md) | claude-chat |  |

## Phase 3 — Architect

How is it built? Architecture, infrastructure, the Build Contract.

| Ch | Title | Tool | Milestone |
| --- | --- | --- | --- |
| 13 | [Stage 5.0 — Solution Architecture](03-architect/13-architecture.md) | claude-chat |  |
| 14 | [Database Schema Design](03-architect/14-database-schema.md) | claude-chat |  |
| 15 | [GitHub Repository Setup](03-architect/15-github-setup.md) | claude-code |  |
| 16 | [Supabase Project Setup](03-architect/16-supabase-setup.md) | claude-code |  |
| 17 | [Vercel Project Setup](03-architect/17-vercel-setup.md) | claude-code |  |
| 18 | [Multi-Environment Configuration](03-architect/18-multi-environment.md) |  |  |
| 19 | [Build Contract Introduction](03-architect/19-build-contract-intro.md) |  |  |
| 20 | [Build Contract Structure](03-architect/20-build-contract-structure.md) |  |  |
| 21 | [Generating the Build Contract](03-architect/21-generating-contract.md) | claude-chat |  |
| 22 | [The Critical Transition](03-architect/22-dev-environment.md) | claude-code |  |
| 48 | [API Specification](03-architect/48-api-specification.md) | claude-chat |  |
| 49 | [Security Architecture](03-architect/49-security.md) | claude-chat |  |
| 50 | [Architecture Decision Records](03-architect/50-adr-templates.md) | claude-code |  |
| 51 | [Test Strategy](03-architect/51-test-strategy.md) | claude-code |  |

## Phase 4 — Build

Ship it. SPEC-first + TDD across milestones M1–M11 with checkpoints A/B/C.

| Ch | Title | Tool | Milestone |
| --- | --- | --- | --- |
| 23 | [MOAI-ADK Overview](04-build/23-moai-overview.md) |  |  |
| 24 | [SPEC-First Development](04-build/24-spec-first.md) |  |  |
| 25 | [TDD Workflow](04-build/25-tdd-workflow.md) |  |  |
| 26 | [Technical Debt Scoring Framework](04-build/26-tech-debt.md) | claude-code |  |
| 27 | [Build Milestones](04-build/27-build-milestones.md) |  |  |
| 28 | [Milestone 1 — Project Setup](04-build/28-m1-project-setup.md) | claude-code | M1 |
| 29 | [Milestone 2 — Design System](04-build/29-m2-design-system.md) | claude-code | M2 |
| 30 | [Milestone 3 — Database](04-build/30-m3-database.md) | claude-code | M3 |
| 31 | [Checkpoint 1 — Foundation Audit](04-build/31-checkpoint-a.md) |  |  |
| 32 | [Milestone 4 — Layouts](04-build/32-m4-layouts.md) | claude-code | M4 |
| 33 | [Milestone 5 — Authentication](04-build/33-m5-authentication.md) | claude-code | M5 |
| 34 | [Milestone 6 — Core Feature](04-build/34-m6-core-feature.md) ⛔ | claude-code | M6 |
| 35 | [Checkpoint B — Feature Complete Audit](04-build/35-checkpoint-b.md) ⛔ |  |  |
| 36 | [Milestone 7 — Admin Console](04-build/36-m7-admin-console.md) | claude-code | M7 |
| 37 | [Milestone 8 — Supporting Features](04-build/37-m8-supporting-features.md) | claude-code | M8 |
| 38 | [Milestone 9 — Payments](04-build/38-m9-payments.md) | claude-code | M9 |
| 39 | [Milestone 10 — Polish](04-build/39-m10-polish.md) ⛔ | claude-code | M10 |
| 40 | [Checkpoint C — Pre-Launch Audit](04-build/40-checkpoint-c.md) ⛔ |  |  |
| 41 | [Milestone 11 — Testing](04-build/41-m11-testing.md) | claude-code | M11 |

## Phase 5 — Launch

QA, deployment, launch checklist.

| Ch | Title | Tool | Milestone |
| --- | --- | --- | --- |
| 42 | [QA & Deployment](05-launch/42-qa-deployment.md) | claude-code |  |
| 43 | [Launch Checklist](05-launch/43-launch-checklist.md) | claude-chat |  |

## Appendices

- [SPEC Template](99-appendix/a-spec-template.md)
- [Quality Gate Checklists](99-appendix/b-quality-gates.md)
- [EARS Syntax](99-appendix/d-ears-syntax.md)
- [Troubleshooting](99-appendix/e-troubleshooting.md)

## The milestone sequence

M1 Project Setup → M2 Design System → M3 Database → **Checkpoint A** →
M4 Layouts → M5 Authentication → M6 Core Feature → **Checkpoint B** →
M7 Admin Console → M8 Supporting Features → M9 Payments → M10 Polish →
**Checkpoint C** → M11 Testing.

Checkpoints tag the repo (`checkpoint-a`, `checkpoint-b`, `checkpoint-c`) and gate
progress on a technical-debt score. This numbering is canonical — see
`CLAUDE.md` § CANONICAL FACTS for why, and do not renumber it.
