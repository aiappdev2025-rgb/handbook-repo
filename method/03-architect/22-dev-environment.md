---
chapter: 22
title: "The Critical Transition"
slug: "dev-environment"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-code"
session: "new-session"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase3/chapter-22-dev-environment.html"
---

# Chapter 22: The Critical Transition

In this chapter, you'll transition from design exploration to implementation. This is the most important setup moment in the entire project—you'll configure your development environment, create the CLAUDE.md file, set up your documentation structure, and verify everything is ready for Claude Code. By the end of this chapter, you'll be ready to begin the Build Phase.

You've completed all planning artifacts: Design Brief, UX Package, UI System, Architecture Document, and Build Contract. **Now you're transitioning from exploration to implementation.**

> **⚠ Warning:** Tool Transition Point Everything before this point was done in **Claude Chat** (web interface) — it's optimized for exploration, iteration, and document generation. Everything after this point will be done in **Claude Code** (CLI tool) — it's optimized for implementation, file editing, and test execution. **Do not skip this setup.** Without proper environment configuration, Claude Code won't have the context it needs to implement your design correctly.

> **Note:** See Also:
>
> Claude Code Integration Timeline
>
> — A visual guide showing exactly when each Claude Code setup activity happens across all phases of the methodology.

## 22.1 What You Should Have Ready

Before proceeding with environment setup, verify you have all the artifacts from previous chapters. Missing artifacts will cause problems during implementation. Confirm you have these artifacts saved in your `docs/` folder:

### Pre-Implementation Checklist

- [ ] `docs/one-pager.md` — Business One-Pager (Chapter 6)
- [ ] `docs/design-brief.md` — Design Brief with Vocabulary section (Chapter 7)
- [ ] `docs/ux-package.md` — UX Package with user flows and screens (Chapters 9-10)
- [ ] `docs/ui-system.md` — UI System with component specs (Chapters 11-12)
- [ ] `docs/architecture.md` — Architecture with schema and API design (Chapter 13)
- [ ] `docs/build-contract.md` — Build Contract (Chapter 21)

```text
docs/
├── one-pager.md        # Business model and strategy
├── design-brief.md     # Product vision and vocabulary
├── ux-package.md       # User flows and screen inventory
├── ui-system.md        # Visual design system
├── architecture.md     # Technical architecture
└── build-contract.md   # Implementation reference
```

If any of these are missing or incomplete, go back to the relevant chapter and complete them. The Build Phase assumes all design decisions have been made.

> **Expected Outcome**
>
> **What you should have:** All six design artifacts saved in your docs/ folder, ready to be referenced by Claude Code.
>
> **How to validate:** Run `ls docs/` in your project directory. You should see all six .md files listed.
>
> **Next:** Create the project repository if you haven't already.

## 22.2 Project Repository Setup

In this section, you'll create the Next.js project and initialize Git. If you already completed Chapter 15 (GitHub Repository Setup), you can skip to section 22.3.

### Step 1: Create the Project

Open your terminal and create a new Next.js project with the recommended stack:

```text
npx create-next-app@latest my-saas-project --typescript --tailwind --eslint --app --src-dir
cd my-saas-project
```

When prompted, accept the defaults. This gives you Next.js 14+ with App Router, TypeScript, Tailwind CSS, and ESLint — the stack recommended throughout this handbook.

### Step 2: Initialize Git

```text
git init
git add .
git commit -m "Initial Next.js project setup"
```

> **Expected Outcome**
>
> **What you should have:** A Next.js project with TypeScript, Tailwind CSS, and App Router, with an initial Git commit.
>
> **How to validate:** Run `npm run dev` — the app should start at localhost:3000. Run `git log` — you should see your initial commit.
>
> **Next:** Create the CLAUDE.md file that provides context to Claude Code.

## 22.3 The CLAUDE.md File

In this section, you'll create the CLAUDE.md file—Claude Code's primary context file. This file tells Claude about your project's architecture, conventions, and quality standards. **Without this file, every Claude Code session starts from scratch with no project knowledge.**

### Why CLAUDE.md Matters

| Without CLAUDE.md | With CLAUDE.md |
| --- | --- |
| Claude guesses at conventions | Claude follows your established patterns |
| You repeat context every session | Context persists across sessions |
| Inconsistent code style | Consistent with your standards |
| No awareness of your architecture | Knows your stack, schema, API patterns |

### Generate CLAUDE.md

Rather than manually creating CLAUDE.md, generate it from your design artifacts. This ensures consistency between your documentation and Claude Code's context.

> **Run in:** Claude Code · **Session:** New Session · first Claude Code task

> Prompt file: [`prompts/X-22-1-the-critical-transition.md`](../../prompts/X-22-1-the-critical-transition.md)

```text
Generate a CLAUDE.md file for this project by reading the design artifacts in docs/.

Read these files:
- docs/design-brief.md (for vocabulary, user types, product overview)
- docs/architecture.md (for tech stack, folder structure, API patterns, database conventions)
- docs/build-contract.md (for quality standards, component specs)

Generate CLAUDE.md at project root with these sections:

1. **Project Overview**: Brief description from design-brief.md
2. **Technology Stack**: Extract from architecture.md
3. **Project Structure**: Folder layout from architecture.md Project Structure section
4. **Code Standards**: Quality requirements from build-contract.md
5. **Database Conventions**: Naming, RLS policies from architecture.md
6. **API Conventions**: Route patterns, validation from architecture.md
7. **Key Commands**: Standard npm scripts (dev, build, test, lint, type-check)
8. **Vocabulary**: Canonical terms from design-brief.md Section 2
9. **Current Sprint Focus**: Set to "M1 - Project Setup"
10. **Project Artifacts**: List all docs/*.md files with descriptions
11. **SPEC Convention**: Note that test files must include `// SPEC: SPEC-XXX-NNN` comment

Keep the file concise (~2-5K tokens). Focus on actionable context, not prose.
```

### CLAUDE.md Structure

The generated file should follow this structure:

```text
# CLAUDE.md

## Project Overview
[Generated from design-brief.md]

## Technology Stack
[Generated from architecture.md]

## Project Structure
[Generated from architecture.md Project Structure section]

## Code Standards
[Generated from build-contract.md Quality Standards]

## Database Conventions
[Generated from architecture.md]

## API Conventions
[Generated from architecture.md]

## Key Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript check

## Vocabulary
[Generated from design-brief.md Section 2 - canonical terms]

## Current Sprint Focus
- Currently working on: M1 - Project Setup
- Next milestone: M2 - Design System

## Project Artifacts
- `docs/design-brief.md` - Canonical vocabulary and product definition
- `docs/ux-package.md` - User flows and screen descriptions
- `docs/ui-system.md` - Component specs and visual direction
- `docs/architecture.md` - Database schema and API design
- `docs/build-contract.md` - Implementation reference

## SPEC Convention
Test files must include a comment linking to their SPEC:
`// SPEC: SPEC-AUTH-001`
This enables automated verification that SPECs match implementation.
```

> **Note:** Keep CLAUDE.md Updated:
>
> As your project evolves, update this file. Add new patterns you establish, document decisions, and update the "Current Sprint Focus" section when you change milestones.

> **Expected Outcome**
>
> **What you should have:** A CLAUDE.md file at your project root containing project-specific context generated from your design artifacts.
>
> **How to validate:** Run `claude "Read CLAUDE.md and summarize the project"` — Claude should correctly describe your project's purpose, tech stack, and key terminology.
>
> **Next:** Set up the documentation folder structure.

## 22.4 Documentation Folder Structure

In this section, you'll organize your documentation folder to house design artifacts and SPECs. This structure keeps implementation-relevant documents where Claude Code can access them. Create the folders with:

```text
mkdir -p docs/specs
```

### Place Your Artifacts

Copy your design artifacts into the docs folder. You can use markdown exports or keep the key sections:

```text

docs/
├── build-contract.md      # The bridge document (REQUIRED)
├── architecture.md        # Technical architecture reference
├── design-brief.md        # Vocabulary and product vision (optional)
├── ux-summary.md          # Key user flows (optional)
└── specs/                 # SPEC documents go here
    └── (empty for now)

project-root/
├── CLAUDE.md              # AI context (REQUIRED)
├── TECH-DEBT.md           # Technical debt tracking (RECOMMENDED)
└── ...
```

> **Note:** TECH-DEBT.md:
>
> Create this file at project root to track technical debt throughout development. Update at each checkpoint with debt scores and active debt items.

> **Why Build Contract in docs/?**
>
> SPECs reference the Build Contract: "See Build Contract Section 2.1 for User Model." If the Build Contract isn't in your project filesystem, Claude Code can't look up these references. Place it in docs/ so references work correctly.

> **Expected Outcome**
>
> **What you should have:** A docs/ folder containing your design artifacts and an empty specs/ subfolder for future SPEC documents.
>
> **How to validate:** Run `ls -la docs/` — you should see build-contract.md and other artifacts. Run `ls docs/specs/` — the folder should exist (empty for now).
>
> **Next:** Commit your documentation structure.

## 22.5 Initial Commit

In this section, you'll create a foundation commit that captures your project structure and documentation. This commit marks the official start of your implementation phase. With your structure in place, create a foundation commit:

```text
git add .
git commit -m "Add CLAUDE.md, TECH-DEBT.md, and documentation structure

- CLAUDE.md with project context and standards
- TECH-DEBT.md for technical debt tracking
- docs/ folder with Build Contract
- Ready for Milestone 1"
```

> **Expected Outcome**
>
> **What you should have:** A clean commit containing CLAUDE.md, TECH-DEBT.md, and your docs/ folder structure.
>
> **How to validate:** Run `git log --oneline` — you should see your commit message. Run `git status` — working tree should be clean.
>
> **Next:** Install and configure Claude Code.

## 22.6 Claude Code Configuration

In this section, you'll install Claude Code and verify it's configured correctly for your project. Claude Code reads your CLAUDE.md automatically, providing project context without manual setup. Configure it for optimal development workflow:

### Install Claude Code

```text
npm install -g @anthropic-ai/claude-code
```

### Verify Installation

```text
claude --version
```

### Key Configuration Options

Claude Code reads your CLAUDE.md automatically. For large projects, you may also want to configure:

| Setting | Purpose | Recommendation |
| --- | --- | --- |
| Auto-compact | Automatically compresses context when full | Enable for long sessions |
| Token warnings | Warns when approaching context limits | Enable |
| File exclusions | Ignores node_modules, .git, etc. | Use defaults |

> **Expected Outcome**
>
> **What you should have:** Claude Code installed globally with version number confirmed.
>
> **How to validate:** Run `claude --version` — it should display a version number. Run `claude` from your project directory — it should start a session.
>
> **Next:** Complete the verification checklist to confirm everything is ready.

## 22.7 Verification Checklist

In this section, you'll verify your entire environment setup is complete. Every item must pass before starting Milestone 1—skipping verification risks implementation problems that are hard to debug later. Verify your environment is ready:

### Environment Ready Checklist

- [ ] **Project created**: Next.js app with TypeScript, Tailwind, App Router
- [ ] **Git initialized**: At least one commit with clean working tree
- [ ] **CLAUDE.md exists**: At project root with your project details filled in
- [ ] **TECH-DEBT.md exists**: At project root for tracking technical debt
- [ ] **docs/ folder exists**: Contains build-contract.md at minimum
- [ ] **docs/specs/ folder exists**: Empty, ready for SPECs
- [ ] **Claude Code installed**: `claude --version` returns version number
- [ ] **Test Claude Code**: Run `claude "Read CLAUDE.md and summarize the project"` — it should correctly describe your project

> **Ready for Build Phase**
>
> If all items are checked, you're ready to begin Milestone 1. Open your terminal in the project directory and start Claude Code. Your first task will be writing SPEC-SETUP-001 for project initialization.

### Quick Reference: Tool Usage by Phase

| Phase | Primary Tool | What You're Doing |
| --- | --- | --- |
| Parts I-III (Research, Design) | Claude Chat | Exploration, document generation, iteration |
| Part IV (Architecture) | Claude Chat | Technical design, schema planning |
| Part IV-B (Build Contract) | Claude Chat | Compressing design into implementation reference |
| **Part IV-C (Environment Setup)** | **Terminal + Claude Code** | **Repository creation, CLAUDE.md, folder structure** |
| Part V (Build Phase) | Claude Code | SPEC writing, TDD implementation, coding |
| Part VI (Launch) | Claude Code + Terminal | Deployment, monitoring setup |

## 22.8 Using Claude Projects Effectively

In this section, you'll learn how to leverage Claude Chat Projects throughout the handbook workflow and connect them to Claude Code. If you're using Claude Chat with **Projects** (the feature that lets you add persistent Project Knowledge), this workflow makes artifact management easier and maintains consistency across design sessions.

> **The Complete Flow**
>
> Claude Projects and Claude Code serve different phases but work together:
>
> Claude Chat Projects Your Repository Claude Code ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │ Project Knowledge│ ──► │ docs/ │ ──► │ Reads CLAUDE.md │ │ - Design Brief │ Export │ - design-brief.md│ │ which points to │ │ - UX Package │ as │ - ux-package.md │ │ docs/ files │ │ - UI System │ .md │ - ui-system.md │ │ │ │ - Architecture │ files │ - architecture.md│ │ Full context │ │ - Build Contract │ │ - build-contract.md│ │ for impl work │ └─────────────────┘ └─────────────────┘ └─────────────────┘

### Setting Up Your Project

Create a Claude Project for your SaaS product at the start of the handbook workflow:

1. Go to **claude.ai** and create a new Project
2. Name it after your product (e.g., "MyApp SaaS Development")
3. Add artifacts to **Project Knowledge** as you complete each stage

### The Handoff: Projects to Claude Code

At the Critical Transition (this chapter), you export artifacts from Claude Projects to your repository:

1. **Export each artifact** — Copy content from Project Knowledge into markdown files
2. **Place in docs/ folder** — Follow the structure in Section 22.4
3. **Update CLAUDE.md** — Add the Project Artifacts section so Claude Code knows where to find them
4. **Commit to git** — These files are now part of your codebase

> **Note:** Why Export?
>
> Claude Code can only read files in your repository. It cannot access Claude Chat's Project Knowledge. The export bridges this gap.

> **Expected Outcome**
>
> **What you should understand:** How to use Claude Projects to manage artifacts during design, and how to export them for Claude Code implementation.
>
> **Key insight:** Claude Projects helps during design exploration. Claude Code needs files in your repository. The export step bridges these two worlds.
>
> **Next:** You're ready for Part 3: Build & Launch!

## 22.9 Chapter Summary

You've completed the Critical Transition and Development Environment Setup. Here's what you accomplished:

- Verified all design artifacts are ready for implementation
- Created the Next.js project with recommended stack
- Generated CLAUDE.md to provide project context to Claude Code
- Set up the documentation folder structure for artifacts and SPECs
- Committed your foundation structure
- Installed and configured Claude Code
- Verified your environment passes all readiness checks
- Learned how to integrate Claude Projects with Claude Code workflow

Your development environment is fully configured. You're now ready to begin the Build Phase in Part 3, starting with Milestone 1: Project Setup and your first SPECs.
