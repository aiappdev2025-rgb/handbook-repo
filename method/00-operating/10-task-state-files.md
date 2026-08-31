---
part: 0
part_name: "Operating"
chapter: 10
title: "Task State Files"
slug: "10-task-state-files"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 10. Task State Files

In this chapter, you'll learn how to track task progress using state files. These files enable continuity across sessions and give you a clear view of project status. By the end of this chapter, you'll know the TASKS.md format and status conventions.

## 10.1 The TASKS.md Format

Task state files track progress and enable continuity across sessions. Use this format for clear status tracking:

**`docs/TASKS.md`**

```text
# Task Backlog

## Milestone 1: Project Setup
- [x] Initialize Next.js project with TypeScript
- [x] Configure Tailwind CSS
- [x] Set up ESLint and Prettier
- [ ] Configure environment variables

## Milestone 2: Design System
- [ ] Create color tokens in tailwind.config.ts
- [ ] Create typography scale
- [ ] Build Button component with variants
- [ ] Build Input component with validation states

## Legend
- [x] Complete
- [ ] Not started
- [~] In progress
- [!] Blocked
```

> **Expected Outcome**
>
> **What you should have:** Understanding of the TASKS.md format with milestones, subtasks, and status markers.
>
> **How to validate:** You can create a TASKS.md file for your project with proper milestone structure and status legend.
>
> **Next:** Chapter 11 — Learn checkpoint and recovery strategies.

## Chapter 10 Summary

- TASKS.md tracks your full backlog with completion status
- Organize by milestone, then by subtask
- Use status markers: [x] complete, [ ] not started, [~] in progress, [!] blocked
- Update after completing each task

---
