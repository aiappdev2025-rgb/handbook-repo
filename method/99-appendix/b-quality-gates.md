---
chapter: null
appendix: "B"
title: "Quality Gate Checklists"
slug: "quality-gates"
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
source_html: "archive/html-v3/handbook/phase4/appendix-b-quality-gates.html"
---

# Appendix B: Quality Gate Checklists

Use these checklists at quality gates throughout the build phase. Every item must pass before proceeding.

## SPEC Ready Gate

Before starting implementation, verify the SPEC meets these criteria:

### SPEC Ready Checklist

- [ ] Overview section complete with Problem and Solution
- [ ] Build Contract references included
- [ ] At least one requirement (EARS format)
- [ ] At least one test case per requirement
- [ ] All placeholders replaced with actual values
- [ ] Status set to "Ready"

## Implementation Done Gate

Before marking a feature complete, verify these criteria:

### Implementation Done Checklist

- [ ] All tests pass (npm test)
- [ ] Test coverage >= 80% for new code
- [ ] Functions <= 30 lines
- [ ] Files <= 200 lines
- [ ] Nesting depth <= 3
- [ ] No TypeScript errors (npm run build)
- [ ] No linting errors (npm run lint)
- [ ] SPEC status updated to "Done"

## Checkpoint A: Foundation Audit

After completing M3 (Database), verify:

### Checkpoint A Checklist

- [ ] RLS enabled on ALL tables
- [ ] RLS policies tested with different user roles
- [ ] No security vulnerabilities (npm audit)
- [ ] Schema matches architecture document
- [ ] Technical debt score >= 6.0
- [ ] All M1-M3 tests passing
- [ ] Git tagged: checkpoint-a

## Checkpoint B: Feature Complete Audit

After completing M6 (Core Feature), verify:

### Checkpoint B Checklist

- [ ] Core feature fully functional
- [ ] User flows match UX Package specifications
- [ ] Test coverage >= 80%
- [ ] Performance: Lighthouse >= 80
- [ ] Technical debt score >= 6.0
- [ ] No critical bugs in backlog
- [ ] All M1-M6 tests passing
- [ ] Git tagged: checkpoint-b

## Checkpoint C: Pre-Launch Audit

After completing M10 (Polish), verify:

### Checkpoint C Checklist

- [ ] All features complete and tested
- [ ] Security verification complete (OWASP checks)
- [ ] Performance: Lighthouse >= 90
- [ ] Accessibility: WCAG 2.1 AA compliance
- [ ] Technical debt score >= 7.0
- [ ] Error boundaries in place
- [ ] Loading states on all async operations
- [ ] Mobile responsive verified
- [ ] All M1-M10 tests passing
- [ ] Git tagged: checkpoint-c

## Code Review Gate

Before merging any PR, verify:

### Code Review Checklist

- [ ] PR linked to relevant SPEC
- [ ] Tests cover new functionality
- [ ] No console.log statements
- [ ] No hardcoded secrets or credentials
- [ ] Error handling in place
- [ ] TypeScript types properly defined
- [ ] Code follows project conventions (CLAUDE.md)
- [ ] Documentation updated if needed

## Quality Score Thresholds

| Score | Rating | Gate Decision |
| --- | --- | --- |
| >= 8.0 | Excellent | PASS - Proceed |
| 7.0 - 7.9 | Good | PASS - Document debt |
| 6.0 - 6.9 | Acceptable | PASS - Create remediation plan |
| 5.0 - 5.9 | Concerning | CONDITIONAL - Address before next milestone |
| < 5.0 | Critical | BLOCK - Remediation required |

## Using These Checklists

Copy the relevant checklist into your SPEC or PR description and check off items as you verify them. This creates a documented audit trail and ensures nothing is missed.

> **Note:** Automation Tip:
>
> Many of these checks can be automated via CI/CD. Set up GitHub Actions to run tests, linting, and type checks on every PR.
