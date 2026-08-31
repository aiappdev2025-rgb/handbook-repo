# Prompt Library

Every prompt in the handbook as a standalone file. Flat by design: `ls` is the
catalogue and `grep -l` is the search.

**ID scheme** — namespaced so the same number can never mean two things:

| Prefix | Set |
| --- | --- |
| `B-<M>.<n>` | Build prompts, keyed to the milestone they belong to |
| `CA-`, `CB-`, `CC-` | Checkpoint prompts (A after M3, B after M6, C after M10) |
| `A-<slug>` | Audit prompts — refactor, code-review, security, debt-review, debt-remediation |
| `V-`, `D-`, `X-` | Phase 1 Validate / Phase 2 Design / Phase 3 Architect prompts |
| `W-` | Part 0, operating Claude Code |

**Total: 108 files** (81 canonical, 27 variants).

## Taxonomy

- **Foundation** — M1–M4: project setup, design system, database, layouts
- **Feature** — M5–M9: auth, core feature, admin, supporting features, payments
- **Quality** — M10–M11 plus the `A-*` audit prompts, run at checkpoints

## All prompts

| ID | Title | Tool | Milestone | Chapter | Variant | File |
| --- | --- | --- | --- | --- | --- | --- |
| `A-code-review` | Code Review Request | claude-code |  |  | canonical | [`A-code-review.md`](A-code-review.md) |
| `A-debt-remediation` | Technical Debt Remediation | claude-code |  |  | canonical | [`A-debt-remediation.md`](A-debt-remediation.md) |
| `A-debt-review` | Technical Debt Analysis | claude-code |  |  | canonical | [`A-debt-review.md`](A-debt-review.md) |
| `A-refactor` | Refactoring Audit | claude-code |  |  | canonical | [`A-refactor.md`](A-refactor.md) |
| `A-security` | Security Audit Request | claude-code |  |  | canonical | [`A-security.md`](A-security.md) |
| `B-1.1` | Project Initialization | claude-code | M1 |  | alt-v3 | [`B-1.1-project-initialization.alt-v3.md`](B-1.1-project-initialization.alt-v3.md) |
| `B-1.1` | Project Initialization | claude-code |  | 28 | canonical | [`B-1.1-project-initialization.md`](B-1.1-project-initialization.md) |
| `B-2.1` | Design System Setup | claude-code | M2 |  | alt-v3 | [`B-2.1-design-system-setup.alt-v3.md`](B-2.1-design-system-setup.alt-v3.md) |
| `B-2.1` | Design System Setup | claude-code |  | 29 | canonical | [`B-2.1-design-system-setup.md`](B-2.1-design-system-setup.md) |
| `B-3.1` | Core Database Schema | claude-code | M3 |  | alt-v3 | [`B-3.1-core-database-schema.alt-v3.md`](B-3.1-core-database-schema.alt-v3.md) |
| `B-3.1` | Core Database Schema | claude-code |  | 30 | canonical | [`B-3.1-core-database-schema.md`](B-3.1-core-database-schema.md) |
| `B-3.2` | Row Level Security Policies | claude-code | M3 |  | alt-v3 | [`B-3.2-row-level-security-policies.alt-v3.md`](B-3.2-row-level-security-policies.alt-v3.md) |
| `B-3.2` | Row Level Security Policies | claude-code |  | 30 | canonical | [`B-3.2-row-level-security-policies.md`](B-3.2-row-level-security-policies.md) |
| `B-4.1` | Application Layouts | claude-code | M4 |  | alt-v3 | [`B-4.1-application-layouts.alt-v3.md`](B-4.1-application-layouts.alt-v3.md) |
| `B-4.1` | Application Layouts | claude-code |  | 32 | canonical | [`B-4.1-application-layouts.md`](B-4.1-application-layouts.md) |
| `B-5.1` | Supabase Auth Configuration | claude-code | M5 |  | alt-v3 | [`B-5.1-supabase-auth-configuration.alt-v3.md`](B-5.1-supabase-auth-configuration.alt-v3.md) |
| `B-5.1` | Supabase Auth Configuration | claude-code |  | 33 | canonical | [`B-5.1-supabase-auth-configuration.md`](B-5.1-supabase-auth-configuration.md) |
| `B-5.2` | Login and Signup Pages | claude-code | M5 |  | alt-v3 | [`B-5.2-login-and-signup-pages.alt-v3.md`](B-5.2-login-and-signup-pages.alt-v3.md) |
| `B-5.2` | Login and Signup Pages | claude-code |  | 33 | canonical | [`B-5.2-login-and-signup-pages.md`](B-5.2-login-and-signup-pages.md) |
| `B-6.1` | Data Layer | claude-code | M6 |  | alt-v3 | [`B-6.1-data-layer.alt-v3.md`](B-6.1-data-layer.alt-v3.md) |
| `B-6.1` | Data Layer | claude-code |  | 34 | canonical | [`B-6.1-data-layer.md`](B-6.1-data-layer.md) |
| `B-6.2` | Server Actions | claude-code | M6 |  | alt-v3 | [`B-6.2-server-actions.alt-v3.md`](B-6.2-server-actions.alt-v3.md) |
| `B-6.2` | Server Actions | claude-code |  | 34 | canonical | [`B-6.2-server-actions.md`](B-6.2-server-actions.md) |
| `B-6.3` | UI Components | claude-code | M6 |  | alt-v3 | [`B-6.3-ui-components.alt-v3.md`](B-6.3-ui-components.alt-v3.md) |
| `B-6.3` | UI Components | claude-code |  | 34 | canonical | [`B-6.3-ui-components.md`](B-6.3-ui-components.md) |
| `B-6.4` | Page Assembly | claude-code | M6 |  | alt-v3 | [`B-6.4-page-assembly.alt-v3.md`](B-6.4-page-assembly.alt-v3.md) |
| `B-6.4` | Page Assembly | claude-code |  | 34 | canonical | [`B-6.4-page-assembly.md`](B-6.4-page-assembly.md) |
| `B-7.0` | Admin Database Tables | claude-code | M7 |  | canonical | [`B-7.0-admin-database-tables.md`](B-7.0-admin-database-tables.md) |
| `B-7.1` | Admin Middleware and Access Control | claude-code | M7 |  | alt-v3 | [`B-7.1-admin-middleware-and-access-control.alt-v3.md`](B-7.1-admin-middleware-and-access-control.alt-v3.md) |
| `B-7.1` | Admin Schema | claude-code |  | 36 | canonical | [`B-7.1-admin-schema.md`](B-7.1-admin-schema.md) |
| `B-7.2` | Admin Layout and Access | claude-code |  | 36 | canonical | [`B-7.2-admin-layout-and-access.md`](B-7.2-admin-layout-and-access.md) |
| `B-7.2` | Admin Layout and Navigation | claude-code | M7 |  | alt-v3 | [`B-7.2-admin-layout-and-navigation.alt-v3.md`](B-7.2-admin-layout-and-navigation.alt-v3.md) |
| `B-7.3` | User Management Features | claude-code | M7 |  | alt-v3 | [`B-7.3-user-management-features.alt-v3.md`](B-7.3-user-management-features.alt-v3.md) |
| `B-7.3` | User Management | claude-code |  | 36 | canonical | [`B-7.3-user-management.md`](B-7.3-user-management.md) |
| `B-7.4` | Error Logs | claude-code |  | 36 | canonical | [`B-7.4-error-logs.md`](B-7.4-error-logs.md) |
| `B-7.4` | Subscription Viewing | claude-code | M7 |  | alt-v3 | [`B-7.4-subscription-viewing.alt-v3.md`](B-7.4-subscription-viewing.alt-v3.md) |
| `B-7.5` | Error Log Integration | claude-code | M7 |  | canonical | [`B-7.5-error-log-integration.md`](B-7.5-error-log-integration.md) |
| `B-8.1` | Feature Planning | claude-code | M8 |  | alt-v3 | [`B-8.1-feature-planning.alt-v3.md`](B-8.1-feature-planning.alt-v3.md) |
| `B-8.1` | Feature Planning | claude-code |  | 37 | canonical | [`B-8.1-feature-planning.md`](B-8.1-feature-planning.md) |
| `B-9.1` | Stripe Configuration | claude-code | M9 |  | alt-v3 | [`B-9.1-stripe-configuration.alt-v3.md`](B-9.1-stripe-configuration.alt-v3.md) |
| `B-9.1` | Stripe Configuration | claude-code |  | 38 | canonical | [`B-9.1-stripe-configuration.md`](B-9.1-stripe-configuration.md) |
| `B-9.2` | Webhook Handler | claude-code | M9 |  | alt-v3 | [`B-9.2-webhook-handler.alt-v3.md`](B-9.2-webhook-handler.alt-v3.md) |
| `B-9.2` | Webhook Handler | claude-code |  | 38 | canonical | [`B-9.2-webhook-handler.md`](B-9.2-webhook-handler.md) |
| `B-9.3` | Checkout Flow | claude-code | M9 |  | alt-v3 | [`B-9.3-checkout-flow.alt-v3.md`](B-9.3-checkout-flow.alt-v3.md) |
| `B-9.3` | Checkout Flow | claude-code |  | 38 | canonical | [`B-9.3-checkout-flow.md`](B-9.3-checkout-flow.md) |
| `B-9.4` | Billing Management | claude-code | M9 |  | alt-v3 | [`B-9.4-billing-management.alt-v3.md`](B-9.4-billing-management.alt-v3.md) |
| `B-9.4` | Billing Management | claude-code |  | 38 | canonical | [`B-9.4-billing-management.md`](B-9.4-billing-management.md) |
| `B-10.1` | Error Boundaries | claude-code | M10 |  | alt-v3 | [`B-10.1-error-boundaries.alt-v3.md`](B-10.1-error-boundaries.alt-v3.md) |
| `B-10.1` | Error Boundaries | claude-code |  | 39 | canonical | [`B-10.1-error-boundaries.md`](B-10.1-error-boundaries.md) |
| `B-10.2` | Loading States Audit | claude-code |  | 39 | canonical | [`B-10.2-loading-states-audit.md`](B-10.2-loading-states-audit.md) |
| `B-10.2` | Loading States | claude-code | M10 |  | alt-v3 | [`B-10.2-loading-states.alt-v3.md`](B-10.2-loading-states.alt-v3.md) |
| `B-10.3` | Empty States | claude-code | M10 |  | alt-v3 | [`B-10.3-empty-states.alt-v3.md`](B-10.3-empty-states.alt-v3.md) |
| `B-10.3` | Empty States | claude-code |  | 39 | canonical | [`B-10.3-empty-states.md`](B-10.3-empty-states.md) |
| `B-10.4` | Accessibility Audit | claude-code |  | 39 | canonical | [`B-10.4-accessibility-audit.md`](B-10.4-accessibility-audit.md) |
| `B-10.4` | Edge Cases | claude-code | M10 |  | alt-v3 | [`B-10.4-edge-cases.alt-v3.md`](B-10.4-edge-cases.alt-v3.md) |
| `B-10.5` | Accessibility Audit | claude-code | M10 |  | canonical | [`B-10.5-accessibility-audit.md`](B-10.5-accessibility-audit.md) |
| `B-11.1` | Test Infrastructure | claude-code | M11 |  | alt-v3 | [`B-11.1-test-infrastructure.alt-v3.md`](B-11.1-test-infrastructure.alt-v3.md) |
| `B-11.1` | Unit Tests | claude-code |  | 41 | canonical | [`B-11.1-unit-tests.md`](B-11.1-unit-tests.md) |
| `B-11.2` | E2E Critical Path Tests | claude-code | M11 |  | alt-v3 | [`B-11.2-e2e-critical-path-tests.alt-v3.md`](B-11.2-e2e-critical-path-tests.alt-v3.md) |
| `B-11.2` | Integration Tests | claude-code |  | 41 | canonical | [`B-11.2-integration-tests.md`](B-11.2-integration-tests.md) |
| `B-11.3` | End-to-End Tests | claude-code |  | 41 | canonical | [`B-11.3-end-to-end-tests.md`](B-11.3-end-to-end-tests.md) |
| `B-11.3` | Unit Tests | claude-code | M11 |  | alt-v3 | [`B-11.3-unit-tests.alt-v3.md`](B-11.3-unit-tests.alt-v3.md) |
| `B-11.4` | Integration Tests | claude-code | M11 |  | canonical | [`B-11.4-integration-tests.md`](B-11.4-integration-tests.md) |
| `B-26-1` | Technical Debt Scoring Framework | claude-code |  | 26 | canonical | [`B-26-1-technical-debt-scoring-framework.md`](B-26-1-technical-debt-scoring-framework.md) |
| `CA-01` | Full Checkpoint A Audit | claude-code |  | 31 | canonical | [`CA-01-full-checkpoint-a-audit.md`](CA-01-full-checkpoint-a-audit.md) |
| `CA-02` | Detect Architecture | claude-code |  | 31 | canonical | [`CA-02-detect-architecture.md`](CA-02-detect-architecture.md) |
| `CA-03` | Run Code Quality Checks | claude-code |  | 31 | canonical | [`CA-03-run-code-quality-checks.md`](CA-03-run-code-quality-checks.md) |
| `CA-04` | Check Supabase Security | claude-code |  | 31 | canonical | [`CA-04-check-supabase-security.md`](CA-04-check-supabase-security.md) |
| `CA-05` | Check File-Based Security | claude-code |  | 31 | canonical | [`CA-05-check-file-based-security.md`](CA-05-check-file-based-security.md) |
| `CA-06` | Check Local-Only Security | claude-code |  | 31 | canonical | [`CA-06-check-local-only-security.md`](CA-06-check-local-only-security.md) |
| `CA-07` | Generate Schema Integrity Checklist | claude-code |  | 31 | canonical | [`CA-07-generate-schema-integrity-checklist.md`](CA-07-generate-schema-integrity-checklist.md) |
| `CA-08` | Check File-Based Data Integrity | claude-code |  | 31 | canonical | [`CA-08-check-file-based-data-integrity.md`](CA-08-check-file-based-data-integrity.md) |
| `CA-09` | Check API Layer | claude-code |  | 31 | canonical | [`CA-09-check-api-layer.md`](CA-09-check-api-layer.md) |
| `CA-10` | Check UI Shell | claude-code |  | 31 | canonical | [`CA-10-check-ui-shell.md`](CA-10-check-ui-shell.md) |
| `CA-11` | Generate Checkpoint A Report | claude-code |  | 31 | canonical | [`CA-11-generate-checkpoint-a-report.md`](CA-11-generate-checkpoint-a-report.md) |
| `CA-12` | Complete Checkpoint A | claude-code |  | 31 | canonical | [`CA-12-complete-checkpoint-a.md`](CA-12-complete-checkpoint-a.md) |
| `CA-13` | Claude Code Prompt | claude-code |  | 31 | canonical | [`CA-13-claude-code-prompt.md`](CA-13-claude-code-prompt.md) |
| `CA-14` | Claude Code Prompt | claude-code |  | 31 | canonical | [`CA-14-claude-code-prompt.md`](CA-14-claude-code-prompt.md) |
| `CA-15` | Claude Code Prompt | claude-code |  | 31 | canonical | [`CA-15-claude-code-prompt.md`](CA-15-claude-code-prompt.md) |
| `D-09-1` | UX Package | claude-chat |  | 9 | canonical | [`D-09-1-ux-package.md`](D-09-1-ux-package.md) |
| `D-10-1` | UX Critique and Validation | claude-chat |  | 10 | canonical | [`D-10-1-ux-critique-and-validation.md`](D-10-1-ux-critique-and-validation.md) |
| `D-10-2` | UX Critique and Validation | claude-chat |  | 10 | canonical | [`D-10-2-ux-critique-and-validation.md`](D-10-2-ux-critique-and-validation.md) |
| `D-11-1` | UI System | claude-chat |  | 11 | canonical | [`D-11-1-ui-system.md`](D-11-1-ui-system.md) |
| `D-12-1` | Visual Direction Options | claude-chat |  | 12 | canonical | [`D-12-1-visual-direction-options.md`](D-12-1-visual-direction-options.md) |
| `S-adr-templates` | Generate ADRs Prompt | claude-chat |  |  | canonical | [`S-adr-templates.md`](S-adr-templates.md) |
| `S-api-spec` | API Specification Prompt | claude-chat |  |  | canonical | [`S-api-spec.md`](S-api-spec.md) |
| `S-competitive-analysis` | Competitive Analysis Prompt | claude-chat |  |  | canonical | [`S-competitive-analysis.md`](S-competitive-analysis.md) |
| `S-component-library` | Component Library Prompt | claude-chat |  |  | canonical | [`S-component-library.md`](S-component-library.md) |
| `S-mvp-scope` | MVP Scoping Prompt | claude-chat |  |  | canonical | [`S-mvp-scope.md`](S-mvp-scope.md) |
| `S-security-architecture` | Security Architecture Prompt | claude-chat |  |  | canonical | [`S-security-architecture.md`](S-security-architecture.md) |
| `S-test-strategy` | Generate Test Strategy | claude-chat |  |  | canonical | [`S-test-strategy.md`](S-test-strategy.md) |
| `S-user-flows` | UX Flows Critique Prompt | claude-chat |  |  | canonical | [`S-user-flows.md`](S-user-flows.md) |
| `V-05-1` | Stage 0.1 — Research and Opportunity Assessment | claude-chat |  | 5 | canonical | [`V-05-1-stage-0-1-research-and-opportunity-assessment.md`](V-05-1-stage-0-1-research-and-opportunity-assessment.md) |
| `V-06-1` | Stage 1.0 — Business One-Pager | claude-chat |  | 6 | canonical | [`V-06-1-stage-1-0-business-one-pager.md`](V-06-1-stage-1-0-business-one-pager.md) |
| `V-07-1` | Stage 2.0 — Shared Design Brief | claude-chat |  | 7 | canonical | [`V-07-1-stage-2-0-shared-design-brief.md`](V-07-1-stage-2-0-shared-design-brief.md) |
| `W-07-1` | Prompt: Initialize Project Documentation | claude-code |  |  | canonical | [`W-07-1-prompt-initialize-project-documentation.md`](W-07-1-prompt-initialize-project-documentation.md) |
| `W-11-1` | Prompt: Recovery Protocol | claude-code |  |  | canonical | [`W-11-1-prompt-recovery-protocol.md`](W-11-1-prompt-recovery-protocol.md) |
| `W-14-1` | Prompt: Session Start (Standard) | claude-code |  |  | canonical | [`W-14-1-prompt-session-start-standard.md`](W-14-1-prompt-session-start-standard.md) |
| `W-14-2` | Prompt: Session End (Standard) | claude-code |  |  | canonical | [`W-14-2-prompt-session-end-standard.md`](W-14-2-prompt-session-end-standard.md) |
| `W-15-1` | Prompt: Minimal Recovery (Same Task Area) | claude-code |  |  | canonical | [`W-15-1-prompt-minimal-recovery-same-task-area.md`](W-15-1-prompt-minimal-recovery-same-task-area.md) |
| `W-15-2` | Prompt: Full Recovery (After Break) | claude-code |  |  | canonical | [`W-15-2-prompt-full-recovery-after-break.md`](W-15-2-prompt-full-recovery-after-break.md) |
| `X-13-1` | Stage 5.0 — Solution Architecture | claude-chat |  | 13 | canonical | [`X-13-1-stage-5-0-solution-architecture.md`](X-13-1-stage-5-0-solution-architecture.md) |
| `X-14-1` | Database Schema Design | claude-chat |  | 14 | canonical | [`X-14-1-database-schema-design.md`](X-14-1-database-schema-design.md) |
| `X-15-1` | GitHub Repository Setup | claude-code |  | 15 | canonical | [`X-15-1-github-repository-setup.md`](X-15-1-github-repository-setup.md) |
| `X-16-1` | Supabase Project Setup | claude-code |  | 16 | canonical | [`X-16-1-supabase-project-setup.md`](X-16-1-supabase-project-setup.md) |
| `X-17-1` | Vercel Project Setup | claude-code |  | 17 | canonical | [`X-17-1-vercel-project-setup.md`](X-17-1-vercel-project-setup.md) |
| `X-21-1` | Generating the Build Contract | claude-chat |  | 21 | canonical | [`X-21-1-generating-the-build-contract.md`](X-21-1-generating-the-build-contract.md) |
| `X-22-1` | The Critical Transition | claude-code |  | 22 | canonical | [`X-22-1-the-critical-transition.md`](X-22-1-the-critical-transition.md) |

## Known Divergences

The archived `build-guide-v3.html` is the *parent* of the live chapters, not an
older sibling — both were last touched in the same commit. Of the prompts whose
titles match, **none has an identical body**. Neither tree is uniformly newer, so
both are kept: the live wording is canonical, the guide's wording is preserved as
`.alt-v3`. This table is the review queue; it is not a defect list.

| ID | Title | Canonical | Variant |
| --- | --- | --- | --- |
| `B-1.1` | Project Initialization | [`B-1.1-project-initialization.md`](B-1.1-project-initialization.md) | [`B-1.1-project-initialization.alt-v3.md`](B-1.1-project-initialization.alt-v3.md) |
| `B-2.1` | Design System Setup | [`B-2.1-design-system-setup.md`](B-2.1-design-system-setup.md) | [`B-2.1-design-system-setup.alt-v3.md`](B-2.1-design-system-setup.alt-v3.md) |
| `B-3.1` | Core Database Schema | [`B-3.1-core-database-schema.md`](B-3.1-core-database-schema.md) | [`B-3.1-core-database-schema.alt-v3.md`](B-3.1-core-database-schema.alt-v3.md) |
| `B-3.2` | Row Level Security Policies | [`B-3.2-row-level-security-policies.md`](B-3.2-row-level-security-policies.md) | [`B-3.2-row-level-security-policies.alt-v3.md`](B-3.2-row-level-security-policies.alt-v3.md) |
| `B-4.1` | Application Layouts | [`B-4.1-application-layouts.md`](B-4.1-application-layouts.md) | [`B-4.1-application-layouts.alt-v3.md`](B-4.1-application-layouts.alt-v3.md) |
| `B-5.1` | Supabase Auth Configuration | [`B-5.1-supabase-auth-configuration.md`](B-5.1-supabase-auth-configuration.md) | [`B-5.1-supabase-auth-configuration.alt-v3.md`](B-5.1-supabase-auth-configuration.alt-v3.md) |
| `B-5.2` | Login and Signup Pages | [`B-5.2-login-and-signup-pages.md`](B-5.2-login-and-signup-pages.md) | [`B-5.2-login-and-signup-pages.alt-v3.md`](B-5.2-login-and-signup-pages.alt-v3.md) |
| `B-6.1` | Data Layer | [`B-6.1-data-layer.md`](B-6.1-data-layer.md) | [`B-6.1-data-layer.alt-v3.md`](B-6.1-data-layer.alt-v3.md) |
| `B-6.2` | Server Actions | [`B-6.2-server-actions.md`](B-6.2-server-actions.md) | [`B-6.2-server-actions.alt-v3.md`](B-6.2-server-actions.alt-v3.md) |
| `B-6.3` | UI Components | [`B-6.3-ui-components.md`](B-6.3-ui-components.md) | [`B-6.3-ui-components.alt-v3.md`](B-6.3-ui-components.alt-v3.md) |
| `B-6.4` | Page Assembly | [`B-6.4-page-assembly.md`](B-6.4-page-assembly.md) | [`B-6.4-page-assembly.alt-v3.md`](B-6.4-page-assembly.alt-v3.md) |
| `B-7.1` | Admin Middleware and Access Control | [`B-7.1-admin-schema.md`](B-7.1-admin-schema.md) | [`B-7.1-admin-middleware-and-access-control.alt-v3.md`](B-7.1-admin-middleware-and-access-control.alt-v3.md) |
| `B-7.2` | Admin Layout and Navigation | [`B-7.2-admin-layout-and-access.md`](B-7.2-admin-layout-and-access.md) | [`B-7.2-admin-layout-and-navigation.alt-v3.md`](B-7.2-admin-layout-and-navigation.alt-v3.md) |
| `B-7.3` | User Management Features | [`B-7.3-user-management.md`](B-7.3-user-management.md) | [`B-7.3-user-management-features.alt-v3.md`](B-7.3-user-management-features.alt-v3.md) |
| `B-7.4` | Subscription Viewing | [`B-7.4-error-logs.md`](B-7.4-error-logs.md) | [`B-7.4-subscription-viewing.alt-v3.md`](B-7.4-subscription-viewing.alt-v3.md) |
| `B-8.1` | Feature Planning | [`B-8.1-feature-planning.md`](B-8.1-feature-planning.md) | [`B-8.1-feature-planning.alt-v3.md`](B-8.1-feature-planning.alt-v3.md) |
| `B-9.1` | Stripe Configuration | [`B-9.1-stripe-configuration.md`](B-9.1-stripe-configuration.md) | [`B-9.1-stripe-configuration.alt-v3.md`](B-9.1-stripe-configuration.alt-v3.md) |
| `B-9.2` | Webhook Handler | [`B-9.2-webhook-handler.md`](B-9.2-webhook-handler.md) | [`B-9.2-webhook-handler.alt-v3.md`](B-9.2-webhook-handler.alt-v3.md) |
| `B-9.3` | Checkout Flow | [`B-9.3-checkout-flow.md`](B-9.3-checkout-flow.md) | [`B-9.3-checkout-flow.alt-v3.md`](B-9.3-checkout-flow.alt-v3.md) |
| `B-9.4` | Billing Management | [`B-9.4-billing-management.md`](B-9.4-billing-management.md) | [`B-9.4-billing-management.alt-v3.md`](B-9.4-billing-management.alt-v3.md) |
| `B-10.1` | Error Boundaries | [`B-10.1-error-boundaries.md`](B-10.1-error-boundaries.md) | [`B-10.1-error-boundaries.alt-v3.md`](B-10.1-error-boundaries.alt-v3.md) |
| `B-10.2` | Loading States | [`B-10.2-loading-states-audit.md`](B-10.2-loading-states-audit.md) | [`B-10.2-loading-states.alt-v3.md`](B-10.2-loading-states.alt-v3.md) |
| `B-10.3` | Empty States | [`B-10.3-empty-states.md`](B-10.3-empty-states.md) | [`B-10.3-empty-states.alt-v3.md`](B-10.3-empty-states.alt-v3.md) |
| `B-10.4` | Edge Cases | [`B-10.4-accessibility-audit.md`](B-10.4-accessibility-audit.md) | [`B-10.4-edge-cases.alt-v3.md`](B-10.4-edge-cases.alt-v3.md) |
| `B-11.1` | Test Infrastructure | [`B-11.1-unit-tests.md`](B-11.1-unit-tests.md) | [`B-11.1-test-infrastructure.alt-v3.md`](B-11.1-test-infrastructure.alt-v3.md) |
| `B-11.2` | E2E Critical Path Tests | [`B-11.2-integration-tests.md`](B-11.2-integration-tests.md) | [`B-11.2-e2e-critical-path-tests.alt-v3.md`](B-11.2-e2e-critical-path-tests.alt-v3.md) |
| `B-11.3` | Unit Tests | [`B-11.3-end-to-end-tests.md`](B-11.3-end-to-end-tests.md) | [`B-11.3-unit-tests.alt-v3.md`](B-11.3-unit-tests.alt-v3.md) |

Beware also that the two trees **reuse the same numbers for different prompts** —
live `7.4` is *Error Logs* while the guide's `7.4` is *Subscription Viewing*, and
`11.1/11.2/11.3` are permuted between them. The namespaced IDs above keep those
apart; do not renumber them back.
