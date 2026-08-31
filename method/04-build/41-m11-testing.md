---
chapter: 41
title: "Milestone 11 — Testing"
slug: "m11-testing"
phase: 4
phase_name: "Build"
milestone: "M11"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "11.1"
  - "11.2"
  - "11.3"
deliverables: "Unit tests, integration tests, E2E tests, test coverage >= 80%"
prerequisites: []
when_to_use:
  - "After M10 (Polish) and Checkpoint C. Your app is launch-ready - now ensure it stays working."
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-41-m11-testing.html"
---

# Chapter 41: Milestone 11 — Testing

> **TL;DR** — Implement comprehensive testing: unit tests, integration tests, and E2E tests covering critical user flows.

> **When to use:** After M10 (Polish) and Checkpoint C. Your app is launch-ready - now ensure it stays working.

In this chapter, you'll implement comprehensive testing for your application. By the end, you'll have unit tests, integration tests, and end-to-end tests covering critical user flows.

> **Workflow tip:** **Workflow Tip:** Testing is iterative. See [Agentic Patterns](../00-operating/16-understanding-sub-agents.md) for efficient test generation.

## 41.1 Overview

Comprehensive testing ensures your application works correctly and continues to work as you make changes. Focus on testing critical user flows and business logic first.

## 41.2 Implementation Prompts

### Prompt 11.1: Unit Tests

### Prompt 11.1 — Unit Tests

> Prompt file: [`prompts/B-11.1-unit-tests.md`](../../prompts/B-11.1-unit-tests.md)

```text
ROLE
Test Engineer implementing unit tests.

CONTEXT
Project: {{productName}}
Testing framework: Vitest or Jest
Need unit tests for utilities and business logic.

OBJECTIVE
Create unit tests for core utility functions and business logic.

REQUIREMENTS

1. Test setup:
   - Configure Vitest or Jest
   - Set up test utilities
   - Configure coverage reporting

2. Utility function tests:
   - Test all helper functions in src/lib/
   - Test validation schemas
   - Test formatting functions

3. Business logic tests:
   - Test data transformation functions
   - Test permission checks
   - Test calculation logic

4. Coverage target:
   - >= 80% line coverage for utility code
   - 100% coverage for critical business logic

VERIFICATION
npm test runs all tests
Coverage report shows >= 80%
All tests pass
```

### Prompt 11.2: Integration Tests

### Prompt 11.2 — Integration Tests

> Prompt file: [`prompts/B-11.2-integration-tests.md`](../../prompts/B-11.2-integration-tests.md)

```text
ROLE
Test Engineer implementing integration tests.

CONTEXT
Project: {{productName}}
Unit tests complete (Prompt 11.1).
Need integration tests for API and components.

OBJECTIVE
Create integration tests for server actions and components.

REQUIREMENTS

1. Server action tests:
   - Test authentication required
   - Test authorization (user can only access own data)
   - Test validation errors
   - Test successful operations

2. Component tests:
   - Test form submission flows
   - Test error state rendering
   - Test loading state rendering
   - Use React Testing Library

3. API route tests:
   - Test webhook handlers
   - Test checkout flow
   - Test authentication endpoints

4. Database tests:
   - Use test database or mocks
   - Test RLS policies work
   - Reset state between tests

VERIFICATION
Integration tests cover critical paths
Tests isolated (don't affect each other)
All tests pass
```

### Prompt 11.3: End-to-End Tests

### Prompt 11.3 — End-to-End Tests

> Prompt file: [`prompts/B-11.3-end-to-end-tests.md`](../../prompts/B-11.3-end-to-end-tests.md)

```text
ROLE
Test Engineer implementing E2E tests.

CONTEXT
Project: {{productName}}
Unit and integration tests complete.
Need E2E tests for critical user flows.

OBJECTIVE
Create Playwright E2E tests for critical user journeys.

REQUIREMENTS

1. Test setup:
   - Configure Playwright
   - Set up test user accounts
   - Configure for CI/CD

2. Critical user flows to test:
   - Sign up new user
   - Login existing user
   - Core feature CRUD (Create, Read, Update, Delete)
   - Checkout flow (test mode)
   - Settings update

3. Test patterns:
   - Use page object pattern
   - Test across browsers (Chrome, Firefox, Safari)
   - Test mobile viewport

4. CI integration:
   - Run on pull requests
   - Screenshots on failure
   - Parallel execution

VERIFICATION
All E2E tests pass
Tests run in CI pipeline
Critical flows covered
```

## 41.3 Test Coverage Summary

```text
# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npx playwright test

# Generate coverage report
npm test -- --coverage --reporter=html
```

## 41.4 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - Unit tests for utilities and business logic
> - Integration tests for server actions and components
> - E2E tests for critical user flows
> - CI pipeline running tests on pull requests
> - Test coverage >= 80% for new code

### Verification Checklist

- [ ] Test coverage >= 80% for new code
- [ ] All tests pass locally
- [ ] Tests run in CI pipeline
- [ ] E2E tests cover signup, login, core feature, checkout
- [ ] `npm run build` passes without errors

## 41.5 Chapter Summary

You've completed Milestone 11 and the Build Phase! Your project now has:

- Unit tests for utilities and logic
- Integration tests for actions and components
- E2E tests for critical user flows
- Test coverage >= 80%
- CI pipeline integration

> **Build Phase Complete!**
>
> Congratulations! You've completed all 11 milestones and 3 checkpoints. Your SaaS application is now:
>
> - Fully functional with core and supporting features
> - Secure with RLS and proper authorization
> - Monetized with Stripe integration
> - Polished with error handling and accessibility
> - Tested with comprehensive test coverage
> - Ready for launch!

**Next:** Chapter 42 (Phase 5) - QA and Deployment for production launch.
