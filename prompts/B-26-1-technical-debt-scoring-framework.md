---
id: "B-26-1"
title: "Technical Debt Scoring Framework"
tool: "claude-code"
chapter: 26
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
