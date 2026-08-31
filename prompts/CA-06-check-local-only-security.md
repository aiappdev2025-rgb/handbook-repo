---
id: "CA-06"
title: "Check Local-Only Security"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
