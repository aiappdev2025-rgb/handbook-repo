# Technical Debt Register

> Track, prioritize, and manage technical debt throughout your project lifecycle.
> This file should live in your project root alongside CLAUDE.md.

---

## Current Debt Score

| Checkpoint | Date | Score | Status |
|------------|------|-------|--------|
| A (Foundation) | YYYY-MM-DD | _._/10 | Pending/Pass/Blocked |
| B (Features) | YYYY-MM-DD | _._/10 | Pending/Pass/Blocked |
| C (Production) | YYYY-MM-DD | _._/10 | Pending/Pass/Blocked |

**Latest Overall Score:** _._/10
**Score Trend:** (improving/stable/declining)

---

## Active Debt Items

### Critical Priority (Must Fix Before Next Checkpoint)

| ID | Category | Description | File(s) | Est. Effort | Ticket |
|----|----------|-------------|---------|-------------|--------|
| D-001 | Example | Description of the debt | `path/to/file.ts` | S/M/L | #123 |

### High Priority (Fix Within Current Milestone)

| ID | Category | Description | File(s) | Est. Effort | Ticket |
|----|----------|-------------|---------|-------------|--------|
| D-002 | Example | Description of the debt | `path/to/file.ts` | S/M/L | #124 |

### Medium Priority (Schedule for Next Sprint)

| ID | Category | Description | File(s) | Est. Effort | Ticket |
|----|----------|-------------|---------|-------------|--------|
| D-003 | Example | Description of the debt | `path/to/file.ts` | S/M/L | #125 |

### Low Priority (Backlog)

| ID | Category | Description | File(s) | Est. Effort | Ticket |
|----|----------|-------------|---------|-------------|--------|
| D-004 | Example | Description of the debt | `path/to/file.ts` | S/M/L | #126 |

---

## Debt Categories

Use these categories when logging debt items:

| Category | Description | Weight |
|----------|-------------|--------|
| **COMPLEXITY** | Functions/files too long, deep nesting, high cyclomatic complexity | 25% |
| **ERROR-HANDLING** | Missing try/catch, empty catch blocks, unhandled promises | 20% |
| **TYPE-SAFETY** | `any` types, missing annotations, type assertions | 20% |
| **TEST-COVERAGE** | Missing tests, low coverage, skipped tests | 20% |
| **DOC-SYNC** | Outdated CLAUDE.md, stale comments, missing API docs | 10% |
| **DEPENDENCIES** | Outdated packages, security vulnerabilities, unused deps | 5% |

---

## Checkpoint Audit History

### Checkpoint A: Foundation Complete

**Date:** YYYY-MM-DD
**Score:** _._/10
**Decision:** Pass/Blocked

<details>
<summary>Detailed Audit Results</summary>

| Category | Score | Notes |
|----------|-------|-------|
| Database Schema | _/10 | |
| Authentication | _/10 | |
| Infrastructure | _/10 | |
| Code Organization | _/10 | |

**Issues Identified:**
1. Issue description...

**Actions Taken:**
1. Action description...

</details>

---

### Checkpoint B: Core Features Complete

**Date:** YYYY-MM-DD
**Score:** _._/10
**Decision:** Pass/Blocked

<details>
<summary>Detailed Audit Results</summary>

| Category | Score | Notes |
|----------|-------|-------|
| Complexity | _/10 | |
| Error Handling | _/10 | |
| Type Safety | _/10 | |
| Test Coverage | _/10 | |
| Documentation Sync | _/10 | |

**ESLint Report:**
```
Complexity violations: ___
Error handling issues: ___
Type safety issues: ___
```

**Coverage Report:**
```
Lines: ___%
Branches: ___%
```

**Issues Identified:**
1. Issue description...

**Actions Taken:**
1. Action description...

</details>

---

### Checkpoint C: Production Ready

**Date:** YYYY-MM-DD
**Score:** _._/10
**Decision:** Pass/Conditional/Blocked

<details>
<summary>Detailed Audit Results</summary>

| Category | Score | Notes |
|----------|-------|-------|
| Security | _/10 | |
| Performance | _/10 | |
| Dependencies | _/10 | |
| Monitoring | _/10 | |
| Code Quality | _/10 | |

**Security Audit:**
```
npm audit:
  Critical: ___
  High: ___
```

**Performance Metrics:**
```
Lighthouse: ___
Bundle Size: ___KB
```

**Issues Identified:**
1. Issue description...

**Actions Taken:**
1. Action description...

</details>

---

## Resolved Debt

Track debt items that have been addressed to monitor improvement over time.

| ID | Category | Description | Resolved Date | Resolution |
|----|----------|-------------|---------------|------------|
| D-000 | Example | Original debt description | YYYY-MM-DD | How it was fixed |

---

## Debt Prevention Guidelines

### Before Committing Code

- [ ] Functions are under 30 lines
- [ ] No new `any` types introduced
- [ ] Error handling is complete
- [ ] Tests cover new functionality
- [ ] CLAUDE.md updated if architecture changed

### Weekly Debt Review

- [ ] Run `npm run lint` and review violations
- [ ] Check test coverage hasn't dropped
- [ ] Run `npm audit` for security issues
- [ ] Review and update active debt items
- [ ] Update debt scores if significant changes

### When to Escalate

Escalate to blocking status if:
- Security vulnerability with CVSS >= 7.0
- Test coverage drops below 50%
- Debt score drops below 5.0
- Critical path lacks error handling

---

## Quick Commands

```bash
# Run ESLint debt analysis
npm run lint -- --format json | jq '[.[].messages[] | select(.ruleId | test("complexity|max-|any|unsafe"))] | length'

# Check test coverage
npm run test:coverage

# Security audit
npm audit

# Find TODO/FIXME comments
grep -r "TODO\|FIXME\|HACK\|XXX" --include="*.ts" --include="*.tsx" src/

# Count any types (TypeScript)
grep -r ": any" --include="*.ts" --include="*.tsx" src/ | wc -l
```

---

## Score Thresholds Reference

| Score Range | Status | Meaning |
|-------------|--------|---------|
| >= 8.0 | Excellent | Minimal debt, healthy codebase |
| 7.0 - 7.9 | Good | Acceptable debt, continue development |
| 6.0 - 6.9 | Acceptable | Some debt, plan remediation |
| 5.0 - 5.9 | Concerning | Significant debt, prioritize fixes |
| < 5.0 | Critical | **BLOCKED** - Fix before proceeding |

---

*Template from AI SaaS Handbook v3.0 - Technical Debt Management*
*See Chapter 27 for scoring methodology*
