---
part: 0
part_name: "Operating"
chapter: 12
title: "When and How to Use /clear"
slug: "12-when-and-how-to-use-clear"
section: "PART IV: CONTEXT MANAGEMENT"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 12. When and How to Use /clear

In this chapter, you'll learn when and how to use the /clear command effectively. This command resets your conversation context—used strategically, it keeps Claude focused and prevents quality degradation. By the end of this chapter, you'll know exactly when to clear and what to do first.

## 12.1 When to Clear

The /clear command resets your conversation context. Use this guide to decide when clearing is required, recommended, or optional:

| Situation | Action | Reason |
| --- | --- | --- |
| Task completed successfully | Clear | Fresh context for next task |
| Context exceeds 100K tokens | Clear | Prevent auto-compaction |
| Stuck in a reasoning loop | Clear | Break out of bad patterns |
| Switching to different codebase area | Clear | Remove irrelevant context |
| After major refactoring | Clear | Old file states are now wrong |
| End of work session | Clear | Clean start next session |

## 12.2 Pre-Clear Checklist

Never clear context without completing this checklist first—doing so risks losing work:

### Pre-Clear Checklist

- [ ] Current task is either complete or at a safe stopping point
- [ ] All important code changes are saved to files
- [ ] docs/STATE.md is updated with current status
- [ ] Any learnings are captured in docs/MEMORY.md
- [ ] Changes are committed to Git

> **Expected Outcome**
>
> **What you should understand:** When to clear context (required vs. recommended) and the five pre-clear checklist items.
>
> **How to validate:** You can recite the pre-clear checklist from memory.
>
> **Next:** Chapter 13 — Configure auto-compact and token limit settings.

## Chapter 12 Summary

- Clear after task completion (recommended), context >100K (required), or end of session (required)
- Always complete the pre-clear checklist before running /clear
- Pre-clear: task complete, code saved, STATE.md updated, learnings captured, changes committed

---
