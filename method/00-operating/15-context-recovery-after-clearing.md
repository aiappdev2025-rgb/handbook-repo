---
part: 0
part_name: "Operating"
chapter: 15
title: "Context Recovery After Clearing"
slug: "15-context-recovery-after-clearing"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 15. Context Recovery After Clearing

In this chapter, you'll learn how to efficiently recover context after clearing. Different situations require different recovery approaches. By the end of this chapter, you'll know when to use minimal versus full recovery prompts.

## 15.1 Recovery Prompts

After clearing context, you need to efficiently restore the information Claude needs. Use minimal recovery when continuing the same task, full recovery after a break:

### Prompt: Minimal Recovery (Same Task Area)

> Prompt file: [`prompts/W-15-1-prompt-minimal-recovery-same-task-area.md`](../../prompts/W-15-1-prompt-minimal-recovery-same-task-area.md)

```text
Read docs/STATE.md to see where we left off.
The next task is: [specific task description]
```

### Prompt: Full Recovery (After Break)

> Prompt file: [`prompts/W-15-2-prompt-full-recovery-after-break.md`](../../prompts/W-15-2-prompt-full-recovery-after-break.md)

```text
I'm resuming work after a break. Please read:
1. docs/STATE.md - Current state
2. docs/TASKS.md - Task backlog  
3. docs/MEMORY.md - Project learnings

Summarize where we are and what's next.
```

> **Expected Outcome**
>
> **What you should understand:** The difference between minimal recovery (same task area) and full recovery (after a break), and when to use each.
>
> **How to validate:** You can select the appropriate recovery prompt based on your situation.
>
> **Next:** Part V — Learn agentic patterns for leveraging Claude's autonomous capabilities.

## Chapter 15 Summary

- Minimal recovery: Read STATE.md only—use when continuing same task area
- Full recovery: Read STATE.md, TASKS.md, MEMORY.md—use after breaks
- Always specify what you want Claude to summarize after reading
- Good recovery prompts minimize token usage while restoring essential context

---
