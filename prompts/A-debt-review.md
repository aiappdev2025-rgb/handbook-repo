---
id: "A-debt-review"
title: "Technical Debt Analysis"
tool: "claude-code"
milestone: null
variant: "canonical"
source: "archive/html-v3/archive/build-guide-v3.html"
---

```text

  
  ROLE
Technical Debt Analyst performing a comprehensive code quality audit.

CONTEXT
Project: {{productName}}
Checkpoint: {{A/B/C}}
Current debt score: {{current score or "initial assessment"}}

OBJECTIVE
Identify, categorize, and score technical debt. Calculate the debt score using the weighted framework. Provide actionable remediation recommendations.

DEBT CATEGORIES TO ANALYZE

1. COMPLEXITY DEBT (25% weight)
- Functions exceeding 30 lines
- Files exceeding 200 lines
- Nesting depth greater than 3
- Cyclomatic complexity over 10
- Functions with more than 4 parameters

2. ERROR HANDLING DEBT (20% weight)
- Empty catch blocks
- Missing try/catch around async operations
- Unhandled promise rejections
- Generic error messages hiding root cause
- Missing error boundaries in React

3. TYPE SAFETY DEBT (20% weight)
- Uses of 'any' type
- Missing function return types
- Type assertions without validation
- Inconsistent null handling
- Missing Zod schema validations

4. TEST COVERAGE DEBT (20% weight)
- Critical paths without tests
- Skipped tests without tickets
- Tests without assertions
- Missing edge case coverage
- Overall coverage percentage

5. DOCUMENTATION SYNC DEBT (10% weight)
- CLAUDE.md out of sync with codebase
- Stale code comments
- Missing API documentation
- Outdated README instructions
- SPEC documents not matching implementation

6. DEPENDENCY DEBT (5% weight)
- Outdated packages (npm outdated)
- Security vulnerabilities (npm audit)
- Unused dependencies
- Missing lock file updates

OUTPUT FORMAT

EXECUTIVE SUMMARY
- Overall debt score (X.X/10)
- Score status (Excellent/Good/Acceptable/Concerning/Critical)
- Gate decision (Pass/Blocked)

CATEGORY BREAKDOWN
| Category | Raw Score | Weight | Weighted |
For each category, show violations found

TOP DEBT ITEMS (Prioritized)
For each item:
- ID: D-XXX
- Category: [COMPLEXITY/ERROR-HANDLING/etc.]
- Location: file:line
- Description: What the debt is
- Impact: Why it matters
- Remediation: Specific fix
- Effort: S/M/L

QUICK WINS
Low-effort items that improve score significantly

TECH-DEBT.md UPDATE
Formatted entries to copy into TECH-DEBT.md

CODE TO ANALYZE
{{paste code files here}}
```
