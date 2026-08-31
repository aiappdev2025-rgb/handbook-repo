---
part: 0
part_name: "Operating"
chapter: 4
title: "The CLAUDE.md File"
slug: "04-the-claude-md-file"
section: "PART II: PROJECT SETUP"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 4. The CLAUDE.md File

In this chapter, you'll learn how to create and maintain the CLAUDE.md file—your project's primary context file. This file is read automatically by Claude Code at every session start, making it the foundation of project continuity. By the end of this chapter, you'll know exactly what to include and what to exclude.

## 4.1 What Goes in CLAUDE.md

CLAUDE.md is a special file that Claude Code reads automatically at the start of every session. Keep it focused and lean—it's read every session, so bloat wastes tokens. Include only:

- **Quick context**: One paragraph describing the project
- **Essential commands**: How to run, test, lint
- **Hard rules**: Things Claude must always do or never do
- **Pointers to other docs**: Where to find detailed information

## 4.2 What Does NOT Go in CLAUDE.md

Keep detailed information in separate files that can be loaded on-demand. This keeps your automatic context cost low:

- Detailed architecture (put in docs/ARCHITECTURE.md)
- Task lists (put in docs/TASKS.md)
- Session notes (put in docs/sessions/)
- Code examples (they're in the codebase)

> **Expected Outcome**
>
> **What you should have:** Understanding of the four essential CLAUDE.md components: quick context, essential commands, hard rules, and pointers to other docs.
>
> **How to validate:** You can explain why CLAUDE.md should be lean and what information belongs in separate files instead.
>
> **Next:** Chapter 5 — Learn the complete documentation file structure.

## Chapter 4 Summary

- CLAUDE.md is read automatically at every session start
- Keep it lean: quick context, essential commands, hard rules, pointers
- Move detailed information to separate files (ARCHITECTURE.md, TASKS.md, etc.)
- Bloated CLAUDE.md wastes tokens on every session

---
