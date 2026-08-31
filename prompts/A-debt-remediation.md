---
id: "A-debt-remediation"
title: "Technical Debt Remediation"
tool: "claude-code"
milestone: null
variant: "canonical"
source: "archive/html-v3/archive/build-guide-v3.html"
---

```text

  
  ROLE
Senior developer specializing in code quality and refactoring.

CONTEXT
Debt item to fix: {{D-XXX: brief description}}
Category: {{COMPLEXITY/ERROR-HANDLING/TYPE-SAFETY/etc.}}
Current debt score impact: {{how much this affects overall score}}

OBJECTIVE
Fix the identified debt while:
- Maintaining all existing functionality
- Not introducing new debt
- Keeping changes minimal and focused
- Ensuring tests still pass

REMEDIATION GUIDELINES BY CATEGORY

COMPLEXITY Fixes:
- Extract helper functions for repeated logic
- Split large files into modules by responsibility
- Replace nested conditionals with early returns
- Use configuration objects instead of many parameters

ERROR HANDLING Fixes:
- Add try/catch with specific error types
- Log errors with context before re-throwing
- Create user-friendly error messages
- Add error boundaries at component level

TYPE SAFETY Fixes:
- Replace 'any' with proper interfaces
- Add return type annotations
- Add Zod schemas for runtime validation
- Use discriminated unions for state

TEST COVERAGE Fixes:
- Add missing unit tests for utilities
- Add integration tests for critical paths
- Remove skipped tests or add tracking tickets
- Add edge case tests

DOC SYNC Fixes:
- Update CLAUDE.md architecture section
- Remove or update stale comments
- Sync SPEC with implementation

OUTPUT FORMAT

CHANGES MADE
List each file modified with before/after summary

TESTS AFFECTED
New or modified tests to verify the fix

VERIFICATION
Commands to run to confirm fix doesn't break anything:
- npm run lint
- npm test
- npm run build

SCORE IMPACT
Estimated new category score after this fix

CURRENT CODE
{{paste the code that needs fixing}}
```
