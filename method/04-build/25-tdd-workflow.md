---
chapter: 25
title: "TDD Workflow"
slug: "tdd-workflow"
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
source_html: "archive/html-v3/handbook/phase4/chapter-25-tdd-workflow.html"
---

# Chapter 25: TDD Workflow

In this chapter, you'll learn the TDD (Test-Driven Development) workflow—the RED → GREEN → REFACTOR cycle that ensures every feature is properly tested. This workflow is the core of MOAI implementation. By the end of this chapter, you'll know exactly how to transform SPECs into working code.

> **Note:** Read for Understanding
>
> — Understand the RED → GREEN → REFACTOR cycle. You'll follow this exact workflow for every feature during milestone execution.

## 25.1 The TDD Cycle

TDD follows a strict three-phase cycle. Each phase has a specific purpose and discipline.

```text

TDD CYCLE: RED --> GREEN --> REFACTOR --> DONE

RED:      Write failing tests from SPEC test cases
GREEN:    Write minimum code to pass tests
REFACTOR: Improve code quality, tests still pass
DONE:     All tests pass, quality gate passed
```

> **What You Need to Do**
>
> For each feature, follow the TDD cycle strictly:
>
> RED Phase (Write Failing Tests)
>
> 1. Take test cases from your SPEC document
> 2. Create test file in `src/__tests__/` following naming convention: `[feature].test.ts`
> 3. Write tests that describe expected behavior
> 4. Run tests — they should FAIL (this confirms you're testing the right thing)
>
> **Manual Steps:**
>
> # Create test file touch src/__tests__/auth.test.ts # Write tests based on SPEC test cases # Run tests to confirm failure npm test
>
> **With Claude Code:**
>
> claude "Write failing tests for SPEC-AUTH-001. Create src/__tests__/auth.test.ts Use the test cases defined in the SPEC. Do not write implementation yet."
>
> GREEN Phase (Make Tests Pass)
>
> 1. Write the minimum code needed to pass each test
> 2. Do not over-engineer — just make the test pass
> 3. Run tests after each change to verify progress
>
> **With Claude Code:**
>
> claude "Implement the minimum code to make auth.test.ts pass. Follow the requirements in SPEC-AUTH-001."
>
> REFACTOR Phase (Improve Code Quality)
>
> 1. Clean up code while keeping tests green
> 2. Extract reusable functions, improve naming, add types
> 3. Run tests after each refactor to ensure nothing breaks
>
> **Quality Gate Check:**
>
> # All tests must pass npm test # No TypeScript errors npm run build # No linting errors npm run lint

> **Note:** Detailed TDD prompts and milestone guides are in the Build Phase Guide v3.

> **Expected Outcome**
>
> **What you should understand:** The RED → GREEN → REFACTOR cycle and how each phase contributes to code quality.
>
> **What you should be able to do:** Execute the TDD workflow for any SPEC—write failing tests, implement to pass, then refactor while keeping tests green.
>
> **Next:** Chapter 26 — Learn the Technical Debt Scoring Framework to monitor code health.

## 25.2 Chapter Summary

You've learned the TDD workflow. Key takeaways:

- **RED:** Write failing tests from SPEC test cases first
- **GREEN:** Write minimum code to make tests pass
- **REFACTOR:** Improve code quality while tests stay green
- Run tests after every change to verify progress
- Quality gates ensure code meets standards before moving on

In the next chapter, you'll learn how to measure and manage technical debt throughout the build phase.
