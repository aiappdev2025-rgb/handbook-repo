---
part: 0
part_name: "Operating"
appendix: "A"
title: "Starter CLAUDE.md Template"
slug: "a-starter-claude-md-template"
section: "APPENDICES"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# Appendix A: Starter CLAUDE.md Template

This appendix provides a complete CLAUDE.md template that integrates with the AI SaaS Handbook methodology. Copy and customize this template for your project.

**`CLAUDE.md`**

```text
# Project: [Your Project Name]

## Quick Context
[Your Project] is a [type of SaaS] that helps [target user] to [outcome] by [mechanism]. Built with Next.js 14, Supabase, Stripe, and Tailwind CSS. Currently in [Build Phase - Milestone N].

## Commands
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run test         # Run test suite
npm run db:migrate   # Run Supabase migrations
npm run db:types     # Generate TypeScript types from Supabase

## Documentation (Read These for Context)
- Current State: docs/STATE.md (read at start of each session)
- Task Backlog: docs/TASKS.md (what's done, what's next)
- Architecture: docs/ARCHITECTURE.md (data model, APIs, decisions)
- Learnings: docs/MEMORY.md (patterns, things that didn't work)
- Session Logs: docs/sessions/ (detailed session notes)

## Hard Rules
1. ALWAYS run npm run lint before committing
2. NEVER modify database schema without:
   - Creating a migration file
   - Updating TypeScript types
   - Updating docs/ARCHITECTURE.md
3. USE server actions for mutations, not API routes
4. USE zod schemas for all form validation (src/lib/validations/)
5. FOLLOW conventional commits format

## Code Patterns
- Components: src/components/ (ui/ for primitives)
- Server Actions: src/app/actions/
- Database Queries: src/lib/db/
- Type Definitions: src/types/
- Validation Schemas: src/lib/validations/

## Error Handling Pattern
All server actions return: { success: boolean, data?: T, error?: string }

## Current Focus
See docs/STATE.md for current milestone, active task, and blockers.

---
Following AI SaaS Handbook v2.2 methodology
```

---
