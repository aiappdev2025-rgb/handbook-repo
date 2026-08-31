---
chapter: 31
title: "Checkpoint 1 — Foundation Audit"
slug: "checkpoint-a"
phase: 4
phase_name: "Build"
milestone: null
checkpoint: "A"
tool: null
session: null
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-31-checkpoint-1-REWRITTEN.html"
---

# Chapter 31: Checkpoint 1 — Foundation Audit

This checkpoint verifies your foundation is solid before building features. Unlike traditional audits, this version auto-detects your architecture, adapts checks to your specific stack, and runs automatically via Claude Code prompts.

### Checkpoint A: Foundation Audit

| | |
| --- | --- |
| **Time** | 10-20 minutes (mostly automated) |
| **Prerequisites** | M1-M4 complete |
| **Outcome** | Verified foundation, git tagged `checkpoint-a` |

## 31.1 TL;DR

You'll copy-paste prompts into Claude Code. It does the rest:

- **Auto-detects** your architecture (Supabase, file-based, local-only, etc.)
- **Adapts checks** to your specific stack
- **Runs automatically** - no manual configuration needed
- **Generates a report** you can review and commit

## 31.2 How To Use This Chapter

### The Easy Path (Recommended)

1. **Run the Full Audit** — Copy the prompt in Section 31.3, paste into Claude Code
2. **Review the Report** — Check CHECKPOINT-A-REPORT.md it generates
3. **Fix Any Failures** — Use the section-specific prompts if needed
4. **Tag the Checkpoint** — Run the git commands

### If You Prefer Step-by-Step

Each section below has:

- **What it checks** — explanation of the verification
- **Claude Code Prompt** — copy and paste this
- **Manual Alternative** — if you prefer to do it yourself
- **Expected Output** — what success looks like

Most sections are fully automated. Sections marked 🔧 require some manual verification.

## 31.3 Full Audit — One Command

For most projects, this single prompt runs everything:

### Full Checkpoint A Audit

> Prompt file: [`prompts/CA-01-full-checkpoint-a-audit.md`](../../prompts/CA-01-full-checkpoint-a-audit.md)

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

### Expected Output

Claude Code will:

- Show your detected architecture
- Run all applicable checks
- Create CHECKPOINT-A-REPORT.md
- Tell you if you're ready to tag checkpoint-a

> **⚠ Warning:** **If It Fails:** Use the section-specific prompts below to debug individual areas.

## 31.4 Step 1: Architecture Detection

Before running checks, we need to know your stack.

### Detect Architecture

> Prompt file: [`prompts/CA-02-detect-architecture.md`](../../prompts/CA-02-detect-architecture.md)

```text
Analyze my project architecture:

1. Read package.json and detect:
   - Database: supabase | postgresql | sqlite | prisma | file-based (gray-matter) | none
   - Auth: supabase-auth | nextauth | clerk | lucia | none-local
   - API: rest-routes (app/api) | trpc | server-actions | file-ops
   - Deployment: vercel | netlify | railway | docker | local-only
   - Framework: nextjs-app | nextjs-pages | remix | astro

2. Check for config files:
   - vercel.json, netlify.toml, Dockerfile, railway.json
   - .env files with localhost indicators

3. Display results in a table:
   | Component  | Detected     | Confidence | Notes |
   |------------|--------------|------------|-------|
   | Database   | ...          | High/Med   | ...   |
   | Auth       | ...          | High/Med   | ...   |
   | API        | ...          | High/Med   | ...   |
   | Deployment | ...          | High/Med   | ...   |
   | Framework  | ...          | High/Med   | ...   |

4. Based on detection, tell me which checks will be:
   - ✅ Run as-is
   - ⚠️ Adapted (and to what)
   - ⏭️ Skipped (and why)

5. Ask me to confirm or correct before proceeding
```

### Manual Alternative

Check your package.json dependencies manually and note your stack.

### Override Detection

If auto-detection is wrong, create `.checkpoint-config.yaml` in your project root:

```text
architecture:
  database: file-based
  auth: none-local
  api: rest-routes
  deployment: local-only
  framework: nextjs-app
```

## 31.5 Step 2: Code Quality Checks (Universal)

These apply to ALL architectures.

### Run Code Quality Checks

> Prompt file: [`prompts/CA-03-run-code-quality-checks.md`](../../prompts/CA-03-run-code-quality-checks.md)

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

### Manual Alternative

```text
npm run build
npm run lint
npx tsc --noEmit
npm audit
```

### Expected Output

All four checks should pass. If any fail, fix before proceeding.

## 31.6 Step 3: Security Verification (Conditional)

Checks vary by architecture.

### If Supabase/PostgreSQL Database

### Check Supabase Security

> Prompt file: [`prompts/CA-04-check-supabase-security.md`](../../prompts/CA-04-check-supabase-security.md)

```text
Check Supabase security setup:

1. Verify I have Supabase client configured:
   - Check for @supabase/supabase-js in package.json
   - Look for supabase client initialization in lib/ or utils/

2. Generate the RLS verification queries I need to run manually:

   Query 1 - Check RLS enabled:
   SELECT schemaname, tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public';

   Query 2 - List policies:
   SELECT tablename, policyname, cmd
   FROM pg_policies
   WHERE schemaname = 'public';

3. Create a checklist for me to verify in Supabase dashboard:
   - [ ] RLS enabled on ALL tables (rowsecurity = true)
   - [ ] Each table has SELECT policy for authenticated users
   - [ ] Each table has INSERT/UPDATE/DELETE policies with auth.uid() check
   - [ ] No policies allow anon access to sensitive data
   - [ ] is_admin() function exists (if using admin features)

4. Note: These must be verified manually in Supabase SQL Editor
```

#### 🔧 Manual Steps Required

1. Go to Supabase Dashboard → SQL Editor
2. Run the queries above
3. Verify all tables show `rowsecurity = true`
4. Check each policy restricts access to `auth.uid() = user_id`

### If File-Based Storage

### Check File-Based Security

> Prompt file: [`prompts/CA-05-check-file-based-security.md`](../../prompts/CA-05-check-file-based-security.md)

```text
Check file-based security:

1. Verify Zod is installed:
   - Check package.json for "zod"
   - If missing, tell me to run: npm install zod

2. Check for validation schemas:
   - Look in lib/validation/, lib/schemas/, src/schemas/
   - Verify schemas exist for: Project, Task, Idea, InboxItem (or whatever entities I have)
   - Check that schemas use .required() for mandatory fields

3. Check data directory security:
   - Verify data/ directory exists
   - Verify data/ is NOT inside public/ folder
   - If data/ is in public/, this is a CRITICAL FAILURE

4. Check for path traversal prevention:
   - Search for slug validation patterns like /^[a-z0-9-]+$/
   - Search for checks that reject ".." in paths
   - If not found, flag as needs attention

5. Check for input sanitization:
   - Look for .parse() or .safeParse() calls in API routes
   - Verify file operations validate input before using

6. Report findings:
   | Check                    | Status | Location/Notes |
   |--------------------------|--------|----------------|
   | Zod installed            | ✅/❌  | ...            |
   | Schemas defined          | ✅/❌  | ...            |
   | Data dir secure          | ✅/❌  | ...            |
   | Path traversal blocked   | ✅/⚠️  | ...            |
   | Input validation in APIs | ✅/⚠️  | ...            |
```

### If No Database / Local-Only

### Check Local-Only Security

> Prompt file: [`prompts/CA-06-check-local-only-security.md`](../../prompts/CA-06-check-local-only-security.md)

```text
Check local-only security:

1. Verify no required external services:
   - Check package.json for cloud dependencies
   - Flag if found: @supabase/supabase-js, firebase, @aws-sdk, stripe
   - Note: It's OK if these exist but are optional

2. Check localhost binding:
   - Check package.json scripts.dev for host flags
   - Check next.config.js for host configuration
   - Verify app doesn't bind to 0.0.0.0 in production

3. Check .env files:
   - Look for localhost:3001 or similar
   - Verify no production API keys are required for local dev

4. Report:
   | Check                  | Status | Notes |
   |------------------------|--------|-------|
   | No required cloud deps | ✅/⚠️  | ...   |
   | Localhost binding      | ✅/⚠️  | ...   |
   | Local-only .env        | ✅/⚠️  | ...   |
```

## 31.7 Step 4: Schema & Data Integrity (Conditional)

### If Supabase/PostgreSQL

### Generate Schema Integrity Checklist

> Prompt file: [`prompts/CA-07-generate-schema-integrity-checklist.md`](../../prompts/CA-07-generate-schema-integrity-checklist.md)

```text
Generate schema integrity checklist:

1. Create SQL query to check foreign keys:
   SELECT
     tc.table_name,
     kcu.column_name,
     ccu.table_name AS foreign_table,
     rc.delete_rule
   FROM information_schema.table_constraints tc
   JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
   JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
   JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
   WHERE tc.constraint_type = 'FOREIGN KEY';

2. Create checklist for manual verification:
   - [ ] profiles table references auth.users with ON DELETE CASCADE
   - [ ] All user-owned tables have user_id foreign key
   - [ ] created_at exists on all tables
   - [ ] updated_at exists on all tables
   - [ ] updated_at trigger applied to relevant tables
   - [ ] Indexes exist on foreign keys
   - [ ] Indexes exist on commonly queried columns

3. Note: Run query in Supabase SQL Editor and verify
```

#### 🔧 Manual Steps Required

Run the SQL query in Supabase and verify the checklist.

### If File-Based

### Check File-Based Data Integrity

> Prompt file: [`prompts/CA-08-check-file-based-data-integrity.md`](../../prompts/CA-08-check-file-based-data-integrity.md)

```text
Check file-based data integrity:

1. Verify directory structure:
   Expected:
   data/
   ├── projects/
   ├── tasks/
   ├── ideas/
   └── inbox/

   - Check each directory exists
   - Create any missing directories

2. Check Zod schemas include required fields:
   - Look for schemas in lib/validation/ or similar
   - Verify each entity schema has:
     - id (string)
     - createdAt (date/string)
     - updatedAt (date/string)
   - List any schemas missing these fields

3. Check file naming convention:
   - Look at any existing files in data/
   - Verify they follow slug pattern (lowercase, hyphens, no spaces)

4. Verify gray-matter is installed for YAML parsing:
   - Check package.json for "gray-matter"
   - If missing, tell me to run: npm install gray-matter

5. Report:
   | Check              | Status | Notes |
   |--------------------|--------|-------|
   | Directory structure | ✅/❌  | ...   |
   | Zod schemas complete| ✅/⚠️  | ...   |
   | File naming OK      | ✅/⚠️  | ...   |
   | gray-matter installed| ✅/❌ | ...   |

6. If directories missing, create them:
   mkdir -p data/projects data/tasks data/ideas data/inbox
```

## 31.8 Step 5: API Layer Verification (Conditional)

### Check API Layer

> Prompt file: [`prompts/CA-09-check-api-layer.md`](../../prompts/CA-09-check-api-layer.md)

```text
Check API layer:

1. Find API routes:
   - Check app/api/ for route handlers
   - Check for 'use server' directives (server actions)
   - Check for tRPC router (if using tRPC)

2. For each API route/action found, check:
   - Input validation: Look for .parse() or .safeParse() calls
   - Error handling: Look for try/catch blocks
   - Error responses: Verify they don't expose file paths or stack traces

3. Check error response patterns:
   - Search for patterns like: { error: ... } or NextResponse.json({ error: })
   - Verify error messages are user-friendly, not technical
   - Flag any that include: stack, __dirname, file path, or internal details

4. Check TypeScript types:
   - If Supabase: verify types are generated (database.types.ts or similar)
   - If file-based: verify types are inferred from Zod schemas (z.infer<>)

5. Report:
   | Check                   | Status | Notes |
   |-------------------------|--------|-------|
   | API routes found        | ✅/❌  | X routes in app/api/ |
   | Input validation        | ✅/⚠️  | X/Y routes validated |
   | Error handling          | ✅/⚠️  | ... |
   | No internal leaks       | ✅/⚠️  | ... |
   | Types defined           | ✅/⚠️  | ... |
```

## 31.9 Step 6: UI Shell Verification (Universal with Conditions)

### Check UI Shell

> Prompt file: [`prompts/CA-10-check-ui-shell.md`](../../prompts/CA-10-check-ui-shell.md)

```text
Check UI shell:

1. Check root layout (app/layout.tsx):
   - Verify it exists
   - Check for providers: ThemeProvider, Toaster, or similar
   - Check for proper html/body structure

2. Check for required UI components:
   - Toast/notification system
   - Theme support (if using dark mode)

3. Check responsive setup:
   - Look for Tailwind responsive classes (sm:, md:, lg:)
   - Check for mobile navigation component

4. Create manual test checklist:
   - [ ] App loads without console errors
   - [ ] Navigation works at 320px width (mobile)
   - [ ] Navigation works at 768px width (tablet)
   - [ ] Navigation works at 1024px+ width (desktop)
   - [ ] Mobile menu opens and closes (if applicable)
   - [ ] Dark mode toggles (if applicable)

5. Architecture-specific:
   - If has auth: [ ] Protected routes redirect to login
   - If local-only: Skip auth redirect check
   - If has marketing pages: [ ] Marketing layout has header/footer
   - If no marketing pages: Skip marketing layout check

6. Report:
   | Check              | Status | Notes |
   |--------------------|--------|-------|
   | Root layout exists | ✅/❌  | ...   |
   | Providers setup    | ✅/⚠️  | ...   |
   | Responsive classes | ✅/⚠️  | ...   |
```

#### 🔧 Manual Steps Required

Open your app in browser and test the checklist items at different viewport widths.

## 31.10 Step 7: Generate Report

### Generate Checkpoint A Report

> Prompt file: [`prompts/CA-11-generate-checkpoint-a-report.md`](../../prompts/CA-11-generate-checkpoint-a-report.md)

```text
Generate Checkpoint A Report:

1. Create CHECKPOINT-A-REPORT.md with:

# Checkpoint A: Foundation Audit Report

**Project:** [detect from package.json name]
**Date:** [today's date]
**Architecture:** [detected architecture profile]

## Architecture

| Component  | Detected     |
|------------|--------------|
| Database   | ...          |
| Auth       | ...          |
| API        | ...          |
| Deployment | ...          |
| Framework  | ...          |

## Results Summary

| Status | Count |
|--------|-------|
| ✅ Passed  | X |
| ⚠️ Adapted | X |
| ⏭️ Skipped | X |
| ❌ Failed  | X |

## Detailed Results

### ✅ Passed
[list all passed checks]

### ⚠️ Adapted
[list checks that were adapted, with what they were adapted to]

### ⏭️ Skipped
[list skipped checks with reason]

### ❌ Failed
[list failed checks with fix instructions]

## Manual Checks Required
[list any checks that need manual verification with instructions]

## Next Steps
[pull from BUILD-CONTRACT.md if found]

## Git Tag

[if all critical pass:]
git add .
git commit -m "Complete Checkpoint A: Foundation verified"
git tag -a checkpoint-a -m "Checkpoint A: Foundation audit complete"
git push origin checkpoint-a

[if failures:]
⚠️ Fix failed checks before tagging

2. Save to project root as CHECKPOINT-A-REPORT.md
3. Show me a summary
```

## 31.11 Step 8: Tag the Checkpoint

Once all checks pass (or only non-critical items remain):

### Complete Checkpoint A

> Prompt file: [`prompts/CA-12-complete-checkpoint-a.md`](../../prompts/CA-12-complete-checkpoint-a.md)

```text
Complete Checkpoint A:

1. Check if there are uncommitted changes:
   git status

2. If changes exist, commit them:
   git add .
   git commit -m "Complete Checkpoint A: Foundation verified"

3. Create the checkpoint tag:
   git tag -a checkpoint-a -m "Checkpoint A: Foundation audit complete - [architecture profile]"

4. Show me the command to push (don't run it):
   git push origin checkpoint-a

5. Confirm checkpoint is complete
```

### Why Tag?

The `checkpoint-a` tag creates a safe rollback point. If you encounter issues in later milestones, you can return to this verified state:

```text
git checkout checkpoint-a
```

## 31.12 What's Next

Your foundation is verified. Based on your Build Contract, your next steps are:

> **Note:** **Note:** Claude Code will pull these from BUILD-CONTRACT.md

If no Build Contract found, typical next steps:

1. M5: Authentication (if applicable)
2. First feature implementation
3. Core CRUD operations

### Continue to Next Chapter

- If has auth: [Chapter 33: M5 - Authentication](33-m5-authentication.md)
- If local-only: [Chapter 34: M6 - Core Features](34-m6-core-feature.md)

## 31.13 Troubleshooting

### Architecture detection is wrong

Create `.checkpoint-config.yaml`:

```text
architecture:
  database: file-based  # or: supabase, postgresql, prisma, none
  auth: none-local      # or: supabase-auth, nextauth, clerk
  deployment: local-only # or: vercel, docker, railway
```

### npm run build fails

### Claude Code Prompt

> Prompt file: [`prompts/CA-13-claude-code-prompt.md`](../../prompts/CA-13-claude-code-prompt.md)

```text
My build is failing. Help me fix it:
1. Run npm run build and capture the full error
2. Identify the root cause
3. Suggest specific fixes
4. Apply the fix if it's safe
```

### TypeScript errors

### Claude Code Prompt

> Prompt file: [`prompts/CA-14-claude-code-prompt.md`](../../prompts/CA-14-claude-code-prompt.md)

```text
Fix my TypeScript errors:
1. Run npx tsc --noEmit
2. Group errors by file
3. For each file, explain the error and fix it
```

### npm audit found vulnerabilities

### Claude Code Prompt

> Prompt file: [`prompts/CA-15-claude-code-prompt.md`](../../prompts/CA-15-claude-code-prompt.md)

```text
Fix security vulnerabilities:
1. Run npm audit
2. For critical/high issues, run npm audit fix
3. If fix doesn't work, show me which packages and suggest alternatives
4. For moderate/low, just note them
```

> **Checkpoint A Complete**
>
> Your foundation is verified and architecture-aware. Proceed with confidence to feature development.
