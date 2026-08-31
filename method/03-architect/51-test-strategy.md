---
chapter: 51
title: "Test Strategy"
slug: "51-test-strategy"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-code"
session: "project"
estimated_time: "15-20 min"
description: "Define your testing approach for reliable software"
prerequisites:
  - "Solution Architecture complete"
  - "Tech stack decisions made"
when_to_use:
  - "After completing your solution architecture"
  - "Before starting Phase 4 build"
  - "When you need to decide on testing tools and coverage goals"
skip_if: "Extending existing project with established test patterns"
source_mdx: "archive/docusaurus/docs/phase-3-architect/test-strategy.mdx"
---

# Chapter 51: Test Strategy

> **TL;DR**
> Define what you'll test, how you'll test it, and what tools you'll use. A clear test strategy prevents bugs from reaching production and gives you confidence to ship fast.
>
> **Why:** The MOAI methodology requires tests before implementation (TDD). A clear strategy ensures consistent test quality across your entire codebase.
>
> **Outcome:** A test strategy document, configured testing tools (Vitest + Playwright), and example tests ready to run.

> **When to use**
>
> - After completing your solution architecture
> - Before starting Phase 4 build
> - When you need to decide on testing tools and coverage goals
>
> **Skip if:** Extending existing project with established test patterns

**Prerequisites**

- [ ] Solution Architecture complete
- [ ] Tech stack decisions made

## What You'll Get

By the end of this chapter, Claude Code will have created:

| File | Purpose |
|------|---------|
| `docs/test-strategy.md` | Your complete testing plan document |
| `vitest.config.ts` | Test runner configuration |
| `src/test/setup.ts` | Test environment setup |
| `src/lib/__tests__/example.test.ts` | Example unit test structure |
| Updated `package.json` | Test scripts added |

---

## Why Test Strategy Matters

| Without Strategy | With Strategy |
|------------------|---------------|
| Random test coverage | Focused testing on critical paths |
| "I'll add tests later" (never) | Tests built into each milestone |
| Bugs in production | Bugs caught before deploy |
| Fear of refactoring | Confidence to change code |

### For Solo Founders

You don't need 100% coverage. Focus on:

- **Critical user flows** (signup, payment, core feature)
- **Business logic** (pricing calculations, permissions)
- **Integration points** (API calls, database operations)

---

## The Testing Pyramid

```
        /\
       /E2E\        Few, slow, expensive
      /──────\
     /  Integ  \    Some, moderate
    /────────────\
   /    Unit       \  Many, fast, cheap
  /──────────────────\
```

| Level | What | Tools | Coverage Target |
|-------|------|-------|-----------------|
| **Unit** | Functions, hooks, utils | Vitest | 80%+ |
| **Integration** | API routes, DB queries | Vitest + Testing Library | 70%+ |
| **E2E** | Critical user flows | Playwright | 3-5 key paths |

**Recommended ratio for MVP:** 70% unit, 20% integration, 10% E2E

---

## Step 1: Generate Your Test Strategy

Run this prompt in Claude Code to create your test strategy document and initial test setup.

### Generate Test Strategy

> Prompt file: [`prompts/S-test-strategy.md`](../../prompts/S-test-strategy.md)

````text
Create a test strategy for [PRODUCT_NAME].

**Tech Stack**: [TECH_STACK]
**Core Features**: [CORE_FEATURES]

## Task 1: Create Test Strategy Document

Create docs/test-strategy.md with this content:

# Test Strategy for [PRODUCT_NAME]

## Overview

This document defines our testing approach, tools, and coverage targets.

## Testing Tools

| Type | Tool | Purpose |
|------|------|---------|
| Unit | Vitest | Fast unit tests for functions and utilities |
| Integration | Vitest + Testing Library | Component and API tests |
| E2E | Playwright | Critical user flow testing |
| Mocking | MSW | API request mocking |

## Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Business logic | 80% | High |
| API endpoints | 70% | High |
| UI components | 50% | Medium |
| E2E flows | 3-5 critical paths | High |

## What to Test

### Must Test (Critical)
- User authentication (signup, login, logout)
- Payment processing
- Core feature: [main feature from CORE_FEATURES]
- Data validation and permissions

### Should Test (Important)
- API error handling
- Form submissions
- Permission checks
- Edge cases for business logic

### Nice to Test (If Time)
- UI variations
- Error state rendering
- Accessibility

## Test File Structure

```
src/
├── lib/
│   └── __tests__/        # Unit tests for utilities
│       ├── utils.test.ts
│       └── validation.test.ts
├── components/
│   └── __tests__/        # Component tests
├── app/
│   └── api/
│       └── __tests__/    # API route tests
└── test/
    └── setup.ts          # Test environment setup
e2e/
├── auth.spec.ts          # E2E: Authentication flows
├── checkout.spec.ts      # E2E: Payment flows
└── core-feature.spec.ts  # E2E: Main feature
```

## Running Tests

```bash
npm run test          # Run unit/integration tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
npm run test:e2e      # Run Playwright E2E tests
```

## Test-Driven Development Workflow

For each feature:
1. Write failing test first
2. Implement minimal code to pass
3. Refactor while keeping tests green
4. Repeat

---

## Task 2: Create Vitest Configuration

Create vitest.config.ts:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## Task 3: Create Test Setup File

Create src/test/setup.ts:

```typescript
import '@testing-library/jest-dom'

// Mock environment variables for tests
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

// Global test utilities
beforeEach(() => {
  // Reset any test state before each test
})

afterEach(() => {
  // Clean up after each test
})
```

---

## Task 4: Create Example Unit Test

Create src/lib/__tests__/example.test.ts:

```typescript
import { describe, it, expect } from 'vitest'

// Example utility function (replace with your actual utils)
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('handles negative numbers', () => {
    expect(formatCurrency(-50)).toBe('-$50.00')
  })
})

describe('Example async test', () => {
  it('handles promises', async () => {
    const result = await Promise.resolve('success')
    expect(result).toBe('success')
  })
})
```

---

## Task 5: Update package.json Scripts

Add these scripts to package.json (merge with existing scripts):

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

After creating all files, confirm:
1. List all created files
2. Show the npm install command for dependencies
````

---

## Step 2: Install Dependencies

After Claude Code creates the files, install the test dependencies:

```bash
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npm install -D msw
```

---

## Step 3: Verify Setup

Run the tests to verify everything works:

```bash
# Check files were created
ls docs/test-strategy.md
ls vitest.config.ts
ls src/test/setup.ts
ls src/lib/__tests__/

# Run tests
npm run test
```

Expected output:
```
✓ src/lib/__tests__/example.test.ts (4 tests)
  ✓ formatCurrency › formats positive numbers correctly
  ✓ formatCurrency › handles zero
  ✓ formatCurrency › handles negative numbers
  ✓ Example async test › handles promises

Test Files  1 passed
Tests       4 passed
```

---

## Step 4: Plan Your First Tests

During Phase 4, you'll write tests for each milestone. Here's what to test per milestone:

| Milestone | What to Test |
|-----------|--------------|
| M1: Foundation | Project setup, environment config |
| M2: Database | Schema validation, query functions |
| M3: Auth | Login, signup, logout, session handling |
| M4: UI Shell | Component rendering, navigation |
| M5-M10 | Feature-specific business logic |
| M11: Payments | Checkout flow, webhook handling |

---

## Testing Tips for Solo Founders

### Start Simple
```typescript
// Don't over-engineer tests. Start basic:
it('calculates price correctly', () => {
  expect(calculatePrice(10, 0.1)).toBe(11)
})
```

### Test Business Logic First
```typescript
// Focus on critical business rules
describe('Subscription', () => {
  it('should not allow access after expiry', () => {
    const sub = { expiresAt: new Date('2024-01-01') }
    expect(hasAccess(sub)).toBe(false)
  })
})
```

### Use Test-Driven Development (TDD)
1. **Red** — Write a failing test
2. **Green** — Write minimal code to pass
3. **Refactor** — Clean up while tests stay green
4. **Repeat**

---
