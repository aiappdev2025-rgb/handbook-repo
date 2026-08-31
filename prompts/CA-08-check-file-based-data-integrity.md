---
id: "CA-08"
title: "Check File-Based Data Integrity"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
