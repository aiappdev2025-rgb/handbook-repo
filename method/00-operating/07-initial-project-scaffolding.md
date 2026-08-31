---
part: 0
part_name: "Operating"
chapter: 7
title: "Initial Project Scaffolding"
slug: "07-initial-project-scaffolding"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 7. Initial Project Scaffolding

In this chapter, you'll learn how to initialize your project's documentation structure using a single prompt. This scaffolding creates all the files discussed in previous chapters. By the end of this chapter, you'll have a ready-to-use documentation setup for your new project.

## 7.1 The Scaffolding Prompt

When starting a new project with the AI SaaS Handbook methodology, set up your documentation structure before writing code. Use this prompt to create everything at once:

### Prompt: Initialize Project Documentation

> Prompt file: [`prompts/W-07-1-prompt-initialize-project-documentation.md`](../../prompts/W-07-1-prompt-initialize-project-documentation.md)

```text
I'm starting a new project following the AI SaaS Handbook methodology.

Project: [Name]
Stack: Next.js 14, Supabase, Stripe, Tailwind

Please create the initial documentation structure:

1. Create CLAUDE.md with:
   - Quick context from my design brief
   - Standard commands for this stack
   - Pointers to documentation files
   - Hard rules for this project

2. Create docs/STATE.md with:
   - Current phase: "Build Phase - Milestone 1"
   - Active task: "Project Setup"

3. Create docs/TASKS.md with:
   - All 11 milestones from the Build Phase Guide
   - Each broken into subtasks
   - Status: [ ] not started

4. Create docs/ARCHITECTURE.md with:
   - System overview from Stage 5.0
   - Data model summary

5. Create docs/MEMORY.md with:
   - Initial section headers only
```

> **Expected Outcome**
>
> **What you should have:** A complete documentation structure with CLAUDE.md, STATE.md, TASKS.md, ARCHITECTURE.md, and MEMORY.md all initialized.
>
> **How to validate:** Run `ls docs/` and verify all five files exist. Open CLAUDE.md and confirm it has your project context.
>
> **Next:** Part III — Learn how to break large projects into manageable tasks.

## Chapter 7 Summary

- Set up documentation structure before writing code
- Use the scaffolding prompt to create all files at once
- CLAUDE.md should include project context and pointers to other docs
- STATE.md starts with current phase and active task
- TASKS.md contains all milestones broken into subtasks

---
