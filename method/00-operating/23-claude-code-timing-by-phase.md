---
part: 0
part_name: "Operating"
chapter: 23
title: "Claude Code Timing by Phase"
slug: "23-claude-code-timing-by-phase"
section: null
source_html: "archive/html-v3/claude-code-integration.html"
---

# 23. Claude Code Timing by Phase

> **The Question This Answers**
>
> The Workflow Guide explains *how* to manage context, set up CLAUDE.md, and structure sessions. But **when** do these activities happen in the overall process? This document maps every Claude Code setup step to specific points in the handbook methodology.

In this guide, you'll learn exactly when to set up and use Claude Code during your project lifecycle. By the end, you'll have a clear map of which workflow activities belong at each phase and how to avoid common timing mistakes.

## 1.1 The Complete Timeline

The handbook methodology has distinct phases, and Claude Code setup activities are concentrated at specific transition points. Understanding this timeline prevents you from setting up Claude Code too early or missing critical configuration steps.

## Phase 1: Research & Planning

Handbook Parts I-III

Claude Chat Primary tool for this phase

During research, opportunity assessment, and business planning, you're working in Claude Chat (web interface), not Claude Code. The Workflow Guide doesn't apply yet.

- Market research and competitive analysis
- Business one-pager creation
- Initial opportunity scoring

Workflow Guide Reference:

None — Claude Code setup hasn't started yet.

Phase 2: Design Phase

Handbook Part III (Design Brief, UX, UI)

Claude Chat Still the primary tool

Design work (Design Brief, UX Package, UI System) is still done in Claude Chat. These artifacts will later feed into your Claude Code setup, but you're not coding yet.

- Create Shared Design Brief with Vocabulary
- Develop UX Package with user flows
- Create UI System and visual direction

Workflow Guide Reference:

None yet — but

save these artifacts

. They'll be converted to Build Contract in Phase 3.

🔧 Phase 3: Architecture & Build Contract

Handbook Part IV + IV-B

Claude Chat For document generation Claude Code Setup begins here!

Key Transition Point:

This is where Claude Code setup begins. After generating the Architecture document and Build Contract (still in Claude Chat), you're ready to scaffold the actual project.

#### What Happens in This Phase:

- **Generate Architecture Document** (Claude Chat) — defines tech stack, database schema, API design
- **Generate Build Contract** (Claude Chat) — compresses design artifacts into implementation reference
- **Create project repository** — `npx create-next-app` or similar
- **Create CLAUDE.md file** — this is the first Claude Code workflow step
- **Set up docs/ folder structure** — place Build Contract and architecture here
- **Initial Git commit** — foundation is now version controlled

Workflow Guide References:

• Chapter 4: The CLAUDE.md File — create and configure now

• Chapter 5: Documentation File Structure — set up docs/ folder

• Chapter 7: Initial Project Scaffolding — follows this structure

🔧 Phase 4: Build Phase Start (M1-M4)

Build Guide Milestones 1-4

Claude Code Primary tool from here forward

Session Patterns Begin:

Now you're actively using Claude Code for implementation. This is when context management, session rhythm, and task decomposition become critical.

#### What Happens in This Phase:

- **M1: Project initialization** — dependencies, configuration, environment setup
- **M2: Design system** — Tailwind config, base components
- **M3: Database schema** — Supabase setup, migrations, RLS policies
- **M4: Layout structure** — app shell, navigation, protected routes
- **Write first SPECs** — using SPEC template from Build Contract references
- **Configure session rhythm** — plan when to /clear and checkpoint

Workflow Guide References:

• Chapter 8-9: Task Decomposition — break milestones into subtasks

• Chapter 10: Task State Files — track progress across sessions

• Chapter 12-14: Context Management — when to /clear, session rhythm

• Chapter 20: Mapping Milestones to Sessions

Phase 5: Core Development (M5-M6)

Build Guide Milestones 5-6 + Checkpoints A/B

Claude Code Heavy implementation work

#### What Happens in This Phase:

- **M5: Authentication** — sign up, login, sessions
- **Checkpoint A: Code Audit** — quality gate, potential context clear
- **M6: Core Feature** — primary value delivery
- **Checkpoint B: Feature Complete** — quality gate before polish
- **Multiple sessions likely** — context management is critical here

Workflow Guide References:

• Chapter 11: Checkpoint and Recovery Strategy

• Chapter 15: Context Recovery After Clearing

• Chapter 22: Quality Gates as Context Boundaries

• Chapter 19: Multi-Session Project Continuity

Phase 6: Polish & Launch (M7-M11)

Build Guide Milestones 7-11

Claude Code Refinement and deployment

#### What Happens in This Phase:

- **M7-M8:** Admin features, edge cases, error handling
- **M9:** Billing integration (Stripe)
- **M10:** Performance optimization
- **M11:** Launch preparation, production deployment
- **Update CLAUDE.md** — reflect final architecture decisions

Workflow Guide References:

• Chapter 21: Prescriptive Git Workflow — clean history for launch

• Appendix C: Session Checklist — final verification

## 1.2 Quick Reference: When to Do What

Use this table for quick lookups when you need to know exactly when a specific activity should happen and which tool to use.

| Activity | When | Tool | Workflow Guide Chapter |
| --- | --- | --- | --- |
| Generate design artifacts | Before coding (Phase 1-2) | Claude Chat | N/A |
| Generate Build Contract | After design, before coding (Phase 3) | Claude Chat | N/A (Handbook Part IV-B) |
| Create CLAUDE.md file | After Build Contract, before M1 | Claude Code | Chapter 4 |
| Set up docs/ folder structure | Same time as CLAUDE.md | Claude Code | Chapter 5 |
| Configure context settings | Before starting M1 | Claude Code config | Chapter 13 |
| Write first SPEC | Start of each milestone | Claude Code | Chapter 8-9 |
| Use task state files | Multi-session work (M5-M6+) | Claude Code | Chapter 10 |
| Execute /clear | After checkpoints, when context fills | Claude Code | Chapter 12 |
| Context recovery | After /clear or new session | Claude Code | Chapter 15 |

## 1.3 The Critical Setup Moment

The single most important setup moment happens at the transition between Phase 3 (Architecture) and Phase 4 (Build). Getting this right sets the foundation for efficient development sessions.

> **Setup Checklist: Before Starting Milestone 1**
>
> 1. **Have these documents ready** (from Claude Chat sessions):
>   - Design Brief with Vocabulary section
>   - UX Package with user flows
>   - UI System with components
>   - Architecture Document with schema and API design
>   - Build Contract (compressed reference)
> 2. **Create project repository:** npx create-next-app@latest my-saas-project --typescript --tailwind --app cd my-saas-project git init
> 3. **Create CLAUDE.md** (see Workflow Guide Chapter 4 for template)
> 4. **Set up docs/ folder:** mkdir -p docs/specs # Copy your Build Contract here cp ~/path/to/build-contract.md docs/ # Architecture doc too cp ~/path/to/architecture.md docs/
> 5. **Initial commit:** git add . git commit -m "Initial project setup with CLAUDE.md and Build Contract"
> 6. **Configure Claude Code** (see Workflow Guide Chapter 13)
> 7. **Now you're ready for M1!**

> **Note:** Using Claude Projects?
>
> If you've been using Claude Chat's Projects feature to store your design artifacts, this is when you export them to your repository's docs/ folder. See
>
> Handbook Chapter 23.8
>
> for the complete Projects-to-Code workflow.

## 1.4 Common Mistakes to Avoid

These timing mistakes are the most common causes of friction when integrating Claude Code into your workflow. Avoid them to maximize productivity.

### ❌ Starting Claude Code too early

Don't jump into Claude Code during research or design phases. Use Claude Chat for document generation — it's better for exploratory, creative work. Claude Code is optimized for implementation.

### ❌ Skipping the CLAUDE.md file

Without CLAUDE.md, every session starts from scratch. Claude won't know your project conventions, architecture decisions, or quality standards. Set it up once before M1, update it as the project evolves.

### ❌ Not placing Build Contract in docs/

If your Build Contract isn't in the project filesystem, Claude Code can't reference it. SPECs should cite "Build Contract Section 2.1" — that only works if the file is accessible.

### ❌ Ignoring context limits during long milestones

M5 (Auth) and M6 (Core Feature) are large. Plan for multiple sessions. Use task state files to track progress. Clear context at natural checkpoints.

> **Expected Outcome**
>
> **What you should have:** A clear understanding of when each Claude Code workflow activity belongs in your project timeline.
>
> **How to validate:** You can answer "What should I have set up before starting Milestone X?" for any milestone.
>
> **Next:** If starting a new project, complete Handbook Parts I-III first. If ready to set up Claude Code, follow the checklist in [Section 1.3](#section-1-3).

## Key Takeaways

- **Phases 1-2** (Research, Design) use Claude Chat — Claude Code setup hasn't started yet
- **Phase 3** (Architecture) is the critical transition — create CLAUDE.md and docs/ folder here
- **Phases 4-6** (Build) use Claude Code exclusively — context management becomes critical
- The **Setup Checklist** in Section 1.3 is your pre-M1 verification
- Don't start Claude Code too early — use the right tool for each phase

**Claude Code Integration Timeline** Part of AI SaaS Handbook v3.0 Documentation System January 2026

[Back to Documentation Home](../README.md)
