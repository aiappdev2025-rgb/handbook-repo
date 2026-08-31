---
part: 0
part_name: "Operating"
chapter: 18
title: "Memory Persistence Strategies"
slug: "18-memory-persistence-strategies"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 18. Memory Persistence Strategies

In this chapter, you'll learn multiple strategies for maintaining project memory across sessions. While MCP provides one approach, filesystem-based strategies are simpler and more reliable. By the end of this chapter, you'll know which strategy fits your needs.

## 18.1 Strategy Comparison

Beyond MCP, there are several strategies for maintaining "memory" across sessions:

| Strategy | Complexity | Reliability | Best For |
| --- | --- | --- | --- |
| Filesystem (docs/*.md) | Low | High | All projects (recommended baseline) |
| Memory MCP | Medium | Medium | Quick facts, decisions |
| Vector database | High | High | Large codebases, semantic search |
| Git history | Low | High | Code evolution, blame context |

## 18.2 The MEMORY.md Pattern

The filesystem approach using MEMORY.md is the recommended baseline. Here's the format:

**`docs/MEMORY.md`**

```text
# Project Memory

## Key Decisions
- 2026-01-03: Chose flat-rate pricing ($29/mo) over usage-based
  - Reason: Simpler billing, predictable revenue, SMB preference

- 2026-01-04: Using server actions instead of API routes
  - Reason: Better type safety, simpler code, Next.js 14 best practice

## Patterns Established
- Form validation: zod schemas in src/lib/validations/
- Error handling: Always return { success, data?, error? } shape

## Things That Didn't Work
- 2026-01-04: Tried useFormState for forms
  - Problem: Confusing UX, loading states not smooth
  - Solution: Using react-hook-form with server action submission
```

> **Expected Outcome**
>
> **What you should understand:** The four memory strategies (filesystem, MCP, vector DB, git history) and their trade-offs.
>
> **How to validate:** You have a MEMORY.md file with Key Decisions, Patterns, and Things That Didn't Work sections.
>
> **Next:** Chapter 19 — Learn multi-session project continuity with session logs.

## Chapter 18 Summary

- Filesystem (MEMORY.md) is the recommended baseline: simple and reliable
- MCP memory servers add complexity but enable semantic queries
- MEMORY.md sections: Key Decisions, Patterns Established, Things That Didn't Work
- Update MEMORY.md whenever you learn something important

---
