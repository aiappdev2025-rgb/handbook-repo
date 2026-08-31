---
part: 0
part_name: "Operating"
chapter: 3
title: "Filesystem as Persistent Memory"
slug: "03-filesystem-as-persistent-memory"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 3. Filesystem as Persistent Memory

In this chapter, you'll learn how to use the filesystem as your persistent memory system. This is the practical application of the Golden Rule from Chapter 1. By the end of this chapter, you'll know exactly what information to store in files versus keeping in conversation.

## 3.1 The Persistence Advantage

The filesystem is your ally in managing long projects. Unlike conversation context, files persist between sessions and can be selectively loaded:

```text

CONVERSATION CONTEXT                    FILESYSTEM
---------------------                   --------------------------------------

+---------------------+                 +---------------------+
| Session 1           |                 | CLAUDE.md           | <-- Always read
| "Let's build auth"  |                 | docs/STATE.md       | <-- Read on demand
| [50K tokens of work]|                 | docs/TASKS.md       | <-- Read on demand
+---------------------+                 | src/...             | <-- Your code
         |                              +---------------------+
         | /clear                                |
         v                                       |
+---------------------+                          |
| Session 2           |                          |
| (Context cleared)   |<------- "Read STATE.md" -+
| "Continue auth..."  |
+---------------------+

Result: Full continuity despite context reset
```

## 3.2 What to Store in Files vs. Conversation

Not everything belongs in files. Use this guide to decide where information should live:

| Store in Files | Keep in Conversation |
| --- | --- |
| Project rules and conventions | Current task discussion |
| Architectural decisions | Debugging back-and-forth |
| Task backlog and status | Questions about current code |
| Current project state | Iterative refinements |
| Things that didn't work | Temporary experiments |

> **Expected Outcome**
>
> **What you should understand:** The difference between volatile conversation context and persistent filesystem storage, and when to use each.
>
> **How to validate:** You can identify which types of information should be saved to files (project rules, decisions, task status) versus kept in conversation (current debugging, iterative refinements).
>
> **Next:** Part II — Set up your project structure for efficient agentic work.

## Chapter 3 Summary

- Files persist across sessions; conversation context is cleared
- Store project rules, architectural decisions, and task status in files
- Keep current task discussions and temporary experiments in conversation
- After clearing context, read files to restore project knowledge

---
