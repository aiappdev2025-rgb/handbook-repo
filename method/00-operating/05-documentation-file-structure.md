---
part: 0
part_name: "Operating"
chapter: 5
title: "Documentation File Structure"
slug: "05-documentation-file-structure"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 5. Documentation File Structure

In this chapter, you'll learn the recommended documentation structure for Claude Code projects. This structure enables selective loading—read only what you need for the current task. By the end of this chapter, you'll have a clear folder organization that supports efficient context management.

## 5.1 Recommended Structure

A consistent documentation structure lets you and Claude quickly find information without loading unnecessary files into context:

```text
project-root/
|-- CLAUDE.md                    # Always read (keep lean!)
|-- docs/
|   |-- STATE.md                 # Current project state (read each session)
|   |-- TASKS.md                 # Task backlog with status
|   |-- ARCHITECTURE.md          # Technical decisions (from Handbook Stage 5.0)
|   |-- MEMORY.md                # Learnings, patterns, things that didn't work
|   |-- sessions/                # Session logs for continuity
|   |   |-- 2026-01-04-auth.md
|   |   +-- ...
|   +-- specs/                   # Feature specifications
|       |-- authentication.md
|       +-- payments.md
|-- src/                         # Your application code
+-- ...
```

## 5.2 File Purposes

Each file serves a specific purpose with clear read and update patterns:

| File | Purpose | When to Read | Update Frequency |
| --- | --- | --- | --- |
| CLAUDE.md | Project rules, commands, pointers | Automatic | Rarely |
| STATE.md | Current sprint, active task, blockers | Start of each session | End of each session |
| TASKS.md | Full backlog with completion status | When planning work | After completing tasks |
| ARCHITECTURE.md | Data model, APIs, integrations | When working on related area | After architectural changes |
| MEMORY.md | Patterns, decisions, failures | When stuck or making decisions | When learning something new |

> **Expected Outcome**
>
> **What you should have:** A clear mental model of the docs/ folder structure and when each file should be read or updated.
>
> **How to validate:** You can name all five key documentation files and explain their purpose and update frequency.
>
> **Next:** Chapter 6 — Understand when to use Skills versus CLAUDE.md.

## Chapter 5 Summary

- CLAUDE.md (automatic): Project rules and pointers—keep lean
- STATE.md: Current session focus—read at start, update at end
- TASKS.md: Full backlog—read when planning, update after completing tasks
- ARCHITECTURE.md: Technical decisions—read when working on related areas
- MEMORY.md: Learnings and patterns—read when stuck, update when learning

---
