---
part: 0
part_name: "Operating"
chapter: 14
title: "The Session Rhythm"
slug: "14-the-session-rhythm"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 14. The Session Rhythm

In this chapter, you'll learn the five-step session rhythm that ensures consistent productivity. This rhythm keeps context fresh and prevents work loss. By the end of this chapter, you'll have a repeatable workflow for every Claude Code session.

## 14.1 The Five-Step Rhythm

A consistent rhythm for each work session ensures you never lose progress and always maintain context quality:

```text

+------------------------------------------------------------------------------+
|                         THE SESSION RHYTHM                                    |
+------------------------------------------------------------------------------+
|                                                                               |
|  +=========================================================================+  |
|  |  1. START SESSION                                                       |  |
|  |     - Claude reads CLAUDE.md automatically                              |  |
|  |     - You: "Read docs/STATE.md and docs/TASKS.md"                       |  |
|  |     - Claude now has full project context (~5-10K tokens)               |  |
|  +=========================================================================+  |
|                                      |                                        |
|                                      v                                        |
|  +=========================================================================+  |
|  |  2. WORK ON ONE TASK                                                    |  |
|  |     - Focus on single verifiable outcome                                |  |
|  |     - Target: Complete in 20-50K tokens                                 |  |
|  |     - Check /status periodically                                        |  |
|  +=========================================================================+  |
|                                      |                                        |
|                                      v                                        |
|  +=========================================================================+  |
|  |  3. VERIFY and COMMIT                                                   |  |
|  |     - Test the outcome manually                                         |  |
|  |     - git add . && git commit -m "feat: [description]"                  |  |
|  |     - Update docs/TASKS.md (mark complete)                              |  |
|  +=========================================================================+  |
|                                      |                                        |
|                                      v                                        |
|  +=========================================================================+  |
|  |  4. DECIDE: CONTINUE OR CLEAR                                           |  |
|  |                                                                          |  |
|  |     Context < 80K?  --------------------------------> Continue to step 2 |  |
|  |     Context > 80K?  --------------------------------> Clear (step 5)     |  |
|  |     Done for the day? -------------------------------> End session       |  |
|  +=========================================================================+  |
|                                      |                                        |
|                                      v                                        |
|  +=========================================================================+  |
|  |  5. CLEAR and CONTINUE                                                  |  |
|  |     - "Update docs/STATE.md with current status"                        |  |
|  |     - git commit -m "checkpoint: [description]"                         |  |
|  |     - /clear                                                            |  |
|  |     - Return to step 1                                                  |  |
|  +=========================================================================+  |
|                                                                               |
+------------------------------------------------------------------------------+
```

## 14.2 Session Prompts

Use these standard prompts for consistent session start and end:

### Prompt: Session Start (Standard)

> Prompt file: [`prompts/W-14-1-prompt-session-start-standard.md`](../../prompts/W-14-1-prompt-session-start-standard.md)

```text
Read docs/STATE.md and docs/TASKS.md to restore project context.
Then let me know:
1. Where we left off
2. What the next task is
3. Any blockers or notes from last session
```

### Prompt: Session End (Standard)

> Prompt file: [`prompts/W-14-2-prompt-session-end-standard.md`](../../prompts/W-14-2-prompt-session-end-standard.md)

```text
I'm ending this session. Before I clear context:

1. Update docs/STATE.md with:
   - What we accomplished
   - Current status
   - What's next
   - Any important notes for next session

2. Update docs/TASKS.md:
   - Mark completed tasks with [x]
   - Mark in-progress tasks with [~]

3. If we learned anything important, add it to docs/MEMORY.md
```

> **Expected Outcome**
>
> **What you should understand:** The five-step session rhythm (Start, Work, Verify/Commit, Decide, Clear) and when to use each session prompt.
>
> **How to validate:** You can execute a complete session following the rhythm diagram.
>
> **Next:** Chapter 15 — Learn how to recover context after clearing.

## Chapter 14 Summary

- Step 1: Start session by reading STATE.md and TASKS.md
- Step 2: Work on one task at a time (20-50K tokens)
- Step 3: Verify and commit after each task
- Step 4: Decide to continue (<80K) or clear (>80K)
- Step 5: Clear and return to Step 1

---
