---
id: "CA-03"
title: "Run Code Quality Checks"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Run code quality checks for Checkpoint A:

1. Run build:
   npm run build
   - Must complete with no errors
   - If it fails, show me the first 30 lines of errors

2. Run linting:
   npm run lint
   - Must pass with no warnings
   - If it fails, offer to run `npm run lint -- --fix`

3. Run type check:
   npx tsc --noEmit
   - Must have no TypeScript errors
   - If it fails, show me the errors grouped by file

4. Run security audit:
   npm audit
   - No critical vulnerabilities allowed
   - High vulnerabilities: warn but pass
   - If critical found, show me which packages and suggest fixes

5. Summarize results:
   | Check      | Status | Notes |
   |------------|--------|-------|
   | Build      | ✅/❌  | ...   |
   | Lint       | ✅/❌  | ...   |
   | TypeScript | ✅/❌  | ...   |
   | Audit      | ✅/❌  | ...   |
```
