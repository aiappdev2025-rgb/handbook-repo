---
id: "S-test-strategy"
title: "Generate Test Strategy"
tool: "claude-chat"
variant: "canonical"
source: "archive/docusaurus/docs"
---

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
