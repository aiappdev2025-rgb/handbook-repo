---
id: "CA-09"
title: "Check API Layer"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
