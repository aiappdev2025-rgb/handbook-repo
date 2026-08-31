---
id: "CA-01"
title: "Full Checkpoint A Audit"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Run Checkpoint A: Foundation Audit

1. Detect my architecture:
   - Check package.json for database (supabase, prisma, sqlite, gray-matter/file-based, none)
   - Check for auth packages (next-auth, @clerk, @supabase/auth, lucia, or none)
   - Check folder structure for API style (app/api, server actions, tRPC, file operations)
   - Check for deployment config (vercel.json, Dockerfile, railway.json, or localhost-only)
   - Display results in a table and confirm with me before proceeding

2. Run automated checks based on my architecture:
   - npm run build (must pass)
   - npm run lint (must pass)
   - npx tsc --noEmit (must pass)
   - npm audit (no critical vulnerabilities)

3. Run architecture-specific checks:
   - If Supabase: note RLS checks for manual verification, check client setup
   - If file-based: verify data/ directory structure, check for Zod schemas, verify data/ not in public/, check for path validation patterns
   - If local-only: verify no required cloud dependencies, check localhost binding
   - If has auth: note auth flow for manual verification
   - If no auth (local-only): skip auth checks

4. Find my Build Contract (BUILD-CONTRACT.md, build-contract.md, or docs/build-contract.md):
   - Extract MVP criteria
   - Extract next steps
   - Include in report

5. Generate CHECKPOINT-A-REPORT.md with:
   - Architecture detection results
   - All check results (✅ Passed, ⚠️ Adapted, ⏭️ Skipped, ❌ Failed)
   - Any manual checks I need to do
   - Next steps from my Build Contract
   - Git tag commands (if all critical checks pass)

6. Tell me:
   - Overall status (ready to tag or needs fixes)
   - What manual checks remain (if any)
   - The exact commands to run for git tagging
```
