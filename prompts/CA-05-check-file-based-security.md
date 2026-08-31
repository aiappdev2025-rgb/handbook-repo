---
id: "CA-05"
title: "Check File-Based Security"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
