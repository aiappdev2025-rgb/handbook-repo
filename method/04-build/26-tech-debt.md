---
chapter: 26
title: "Technical Debt Scoring Framework"
slug: "tech-debt"
phase: 4
phase_name: "Build"
milestone: null
checkpoint: null
tool: "claude-code"
session: "at-checkpoints"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-26-tech-debt.html"
---

# Chapter 26: Technical Debt Scoring Framework

In this chapter, you'll learn the Technical Debt Scoring Framework—a systematic way to measure and manage code quality degradation. Understanding technical debt helps you make informed decisions about when to incur debt and when to pay it down. By the end of this chapter, you'll have automated tools to track debt throughout your project.

> **Note:** Read + Setup
>
> — Understand the scoring methodology, then copy the automation templates to your project. You'll run debt audits at each checkpoint during the build phase.

Technical debt is inevitable during rapid development. The difference between successful projects and troubled ones is not the absence of debt—it's the **awareness and management** of that debt. This framework provides objective measurement so you can make informed decisions about when to incur debt, when to pay it down, and when to stop and remediate.

## 26.1 Why Measure Technical Debt

Without measurement, debt accumulates invisibly until it blocks progress. Common symptoms of unmanaged debt:

- Simple changes require touching many files
- New developers take weeks to understand the codebase
- Bugs keep appearing in the same areas
- Fear of refactoring because "it might break something"
- Test suite takes too long or provides false confidence

The scoring framework makes debt visible and actionable. Run it at every checkpoint to catch problems early.

## 26.2 The Six Debt Categories

Technical debt is measured across six categories, each with a specific weight reflecting its impact on long-term maintainability.

| Category | Weight | What It Measures | Automated? |
| --- | --- | --- | --- |
| **Code Complexity** | 25% | Function length, nesting depth, cyclomatic complexity | Yes (ESLint) |
| **Error Handling** | 20% | No empty catches, consistent patterns, explicit handling | Yes (ESLint) |
| **Type Safety** | 20% | Zero `any` types, strict mode, explicit returns | Yes (TypeScript + ESLint) |
| **Test Coverage** | 20% | Line coverage percentage for business logic | Yes (Jest/Vitest) |
| **Documentation Sync** | 10% | CLAUDE.md current, SPECs match implementation | Partial |
| **Dependency Health** | 5% | npm audit clean, dependencies up to date | Yes (npm audit) |

## 26.3 Scoring Each Category (1-10 Scale)

Each category is scored on a 1-10 scale using automated tools where possible. Consistent scoring criteria ensure objective measurement across checkpoints.

### Code Complexity Score

```text
# Run ESLint with complexity rules
npm run lint

# Scoring:
# 10: Zero complexity violations
# 8-9: Only warnings, no errors
# 6-7: 1-5 complexity errors
# 4-5: 6-15 complexity errors
# 1-3: 16+ complexity errors or ignored rules
```

### Type Safety Score

```text
# Check for any types
grep -r ": any" src/ --include="*.ts" --include="*.tsx" | wc -l

# Check TypeScript strict mode
grep "strict" tsconfig.json

# Scoring:
# 10: Zero any types, strict mode enabled
# 8-9: 1-3 any types with justification
# 6-7: 4-10 any types
# 4-5: 11-25 any types or strict mode disabled
# 1-3: 26+ any types or no TypeScript
```

### Test Coverage Score

```text
# Run tests with coverage
npm test -- --coverage

# Scoring:
# 10: 90%+ coverage
# 9: 80-89% coverage
# 8: 70-79% coverage
# 7: 60-69% coverage
# 6: 50-59% coverage
# 1-5: Below 50% coverage
```

## 26.4 Calculating the Overall Score

The weighted formula combines all category scores into a single number that represents overall code health.

```text
Overall Score = (Complexity x 0.25) + (ErrorHandling x 0.20) +
               (TypeSafety x 0.20) + (TestCoverage x 0.20) +
               (DocSync x 0.10) + (Dependencies x 0.05)

Example:
  Complexity:    8 x 0.25 = 2.00
  ErrorHandling: 7 x 0.20 = 1.40
  TypeSafety:    9 x 0.20 = 1.80
  TestCoverage:  8 x 0.20 = 1.60
  DocSync:       6 x 0.10 = 0.60
  Dependencies: 10 x 0.05 = 0.50
  ----------------------------
  Overall Score:         7.90
```

## 26.5 Score Thresholds and Actions

Knowing your score is only useful if you know what action to take. These thresholds define clear decision criteria for each checkpoint.

| Score | Rating | Action |
| --- | --- | --- |
| **>= 8.0** | Excellent | Proceed confidently. Debt is well-managed. |
| **7.0 - 7.9** | Good | Minor debt exists. Document in TECH-DEBT.md and proceed. |
| **6.0 - 6.9** | Acceptable | Create remediation plan. Proceed with awareness. Address before next checkpoint. |
| **5.0 - 5.9** | Concerning | Address high-priority items before proceeding. Allocate time in next milestone. |
| **< 5.0** | Critical | **STOP.** Do not proceed until score reaches 6.0+. Remediation is now the priority. |

> **⚠ Warning:** **Checkpoint Gate:** At Checkpoint A and B, a score below 6.0 is a hard stop. Do not proceed to the next milestone until debt is remediated to at least 6.0.

## 26.6 Generating TECH-DEBT.md

At each checkpoint, use Claude Code to run all debt checks and generate/update `TECH-DEBT.md`:

> **Run in:** Claude Code · **Session:** At Checkpoints · run at Checkpoint A, B, and C

> Prompt file: [`prompts/B-26-1-technical-debt-scoring-framework.md`](../../prompts/B-26-1-technical-debt-scoring-framework.md)

```text
Run a comprehensive technical debt audit and update TECH-DEBT.md.

**Step 1: Run Automated Checks**
Execute these commands and capture results:
- `npm run lint -- --format json` (complexity, error handling, type safety)
- `npm test -- --coverage` (test coverage percentage)
- `npm audit --json` (security vulnerabilities)
- `npm outdated --json` (dependency health)

**Step 2: Calculate Scores**
For each category (weights in parentheses):
- Complexity (25%): Score based on ESLint violations
- Error Handling (20%): Score based on empty catches, unhandled errors
- Type Safety (20%): Score based on `any` types, strict mode
- Test Coverage (20%): Score based on line coverage percentage
- Documentation Sync (10%): Score from manual review
- Dependencies (5%): Score based on audit + outdated

**Step 3: Update TECH-DEBT.md**
Generate/update TECH-DEBT.md at project root with:
1. Current checkpoint name and date
2. Overall score and category breakdown
3. Comparison to previous checkpoint (if exists)
4. Active debt items with severity (Critical/High/Medium/Low)
5. Recommended actions for items below threshold

Current checkpoint: [CHECKPOINT_A | CHECKPOINT_B | CHECKPOINT_C]
```

> **Expected Outcome**
>
> **What you should understand:** The six debt categories, how to score each, and what actions to take at each threshold.
>
> **What you should have:** TECH-DEBT.md created in your project root, ESLint debt config installed.
>
> **Next:** Chapter 27 — Overview of Build Milestones and checkpoints.

## 26.7 Chapter Summary

You've learned the Technical Debt Scoring Framework. Key takeaways:

- Technical debt is inevitable—the key is awareness and management
- Six categories measure different aspects of code health
- Score 8.0+ is excellent, 6.0-7.9 is acceptable, below 6.0 requires action
- Run debt audits at every checkpoint (A, B, C)
- Automated tools catch problems early

In the next chapter, you'll see an overview of all build milestones and checkpoints.
