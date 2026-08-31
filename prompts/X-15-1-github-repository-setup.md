---
id: "X-15-1"
title: "GitHub Repository Setup"
tool: "claude-code"
chapter: 15
variant: "canonical"
source: "archive/html-v3/handbook"
---

```text
Initialize a new Next.js project for [PROJECT_NAME].

**Reference**: Read docs/architecture.md and use the Project Structure section.

1. Create the project with:
   - Next.js 14+ with App Router
   - TypeScript (strict mode)
   - Tailwind CSS
   - ESLint

2. Set up the folder structure as defined in docs/architecture.md, including:
   - All route groups from the Architecture
   - Feature-specific component folders for each domain entity
   - Service integration folders (supabase/, stripe/, etc.)
   - Any domain-specific lib/ folders

3. Create a comprehensive .gitignore for Next.js + Supabase + env files

4. Create initial README.md with project name and setup instructions

5. Initialize git and make initial commit

6. Connect to GitHub remote: [REPO_URL]
```
