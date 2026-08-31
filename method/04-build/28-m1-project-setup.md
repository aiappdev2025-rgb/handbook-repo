---
chapter: 28
title: "Milestone 1 — Project Setup"
slug: "m1-project-setup"
phase: 4
phase_name: "Build"
milestone: "M1"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "1.1"
deliverables: "Configured project, folder structure, environment template, Git initialized."
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-28-m1-project-setup.html"
---

# Chapter 28: Milestone 1 — Project Setup

In this chapter, you'll set up your Next.js project with TypeScript strict mode, proper folder structure, and development tooling. By the end, you'll have a production-ready project foundation.

> **Workflow tip:** **Workflow Tip:** Before starting this milestone, review [Context Management](../00-operating/12-when-and-how-to-use-clear.md) in the Workflow Reference for optimal Claude Code session structure.

## 28.1 Overview

A properly configured project foundation prevents cascading issues later. TypeScript strict mode catches bugs before they reach production, and consistent folder structure makes navigation intuitive for both you and Claude Code.

## 28.2 Project Scaffolding

Before running the main prompt, ensure you have a docs folder ready for your project documentation:

```text
your-saas-project/
├── CLAUDE.md                    # Project conventions for Claude Code
├── docs/
│   ├── specs/                   # SPEC documents
│   │   └── SPEC-template.md
│   ├── contracts/               # Build Contract
│   │   └── build-contract.md
│   ├── architecture/            # ADRs and diagrams
│   │   └── decisions/
│   └── checklists/              # Quality gate checklists
│       ├── checkpoint-a.md
│       ├── checkpoint-b.md
│       └── checkpoint-c.md
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── hooks/
└── ...
```

## 28.3 Implementation Prompt

Initialize Next.js 14+ with TypeScript strict mode, Tailwind CSS, ESLint, and folder structure. Create .env.local.example with Supabase variables.

### Prompt 1.1 — Project Initialization

> Prompt file: [`prompts/B-1.1-project-initialization.md`](../../prompts/B-1.1-project-initialization.md)

```text
ROLE
Full-Stack Developer setting up a new Next.js project.

CONTEXT
Project: {{productName}}
Description: {{brief product description}}
Stack: Next.js 14+, TypeScript strict, Tailwind CSS, Supabase.

OBJECTIVE
Initialize a production-ready Next.js project with proper configuration.

REQUIREMENTS

1. Create Next.js project with these options:
   - TypeScript: Yes (strict mode enabled)
   - ESLint: Yes (with recommended rules)
   - Tailwind CSS: Yes
   - App Router: Yes (src/ directory)
   - Import alias: @/* for src/*

2. Create folder structure inside src/:
   - app/ (pages and layouts)
   - components/ (UI components, organized by feature)
   - lib/ (utilities, helpers, Supabase clients)
   - types/ (TypeScript type definitions)
   - hooks/ (custom React hooks)

3. Configure TypeScript (tsconfig.json):
   - strict: true
   - noUncheckedIndexedAccess: true
   - forceConsistentCasingInFileNames: true

4. Create environment template (.env.local.example):
   - NEXT_PUBLIC_SUPABASE_URL=
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=
   - SUPABASE_SERVICE_ROLE_KEY=
   - Add .env.local to .gitignore

5. Initialize Git and create initial commit:
   - git init
   - Create meaningful .gitignore
   - Initial commit with message "Initial project setup"

6. Create project docs folder structure:
   - docs/specs/ (for SPEC documents)
   - docs/contracts/ (for Build Contract)
   - docs/architecture/decisions/ (for ADRs)
   - docs/checklists/ (for quality gates)
   - Copy SPEC template to docs/specs/

VERIFICATION
Run: npm run dev — app should start without errors on localhost:3000
Run: npm run build — should complete with no TypeScript errors
Run: npm run lint — should pass with no warnings
```

## 28.4 Verification

> **Expected Outcome**
>
> **What you should have:** A Next.js 14+ project with TypeScript strict mode, Tailwind CSS, ESLint configured, and the standard folder structure (src/app, components, lib, types, hooks), plus a docs folder for project documentation.
>
> **How to validate:**
>
> - `npm run dev` starts without errors
> - `npm run build` completes with no TypeScript errors
> - `npm run lint` passes
> - docs/ folder exists with specs/, contracts/, architecture/, checklists/ subfolders

## 28.5 Chapter Summary

You've completed Milestone 1. Your project now has:

- Next.js 14+ with App Router
- TypeScript in strict mode
- Tailwind CSS configured
- Standard folder structure
- Environment template
- Git initialized
- Project docs folder structure

**Next:** Chapter 29 (Milestone 2) - Configure your design system with shadcn/ui components.
