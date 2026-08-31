---
id: "CA-02"
title: "Detect Architecture"
tool: "claude-code"
chapter: 31
variant: "canonical"
source: "archive/html-v3/handbook"
---

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
