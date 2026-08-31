---
part: 0
part_name: "Operating"
chapter: 11
title: "Checkpoint and Recovery Strategy"
slug: "11-checkpoint-and-recovery-strategy"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 11. Checkpoint and Recovery Strategy

In this chapter, you'll learn checkpoint and recovery strategies for maintaining progress. Checkpoints are natural breakpoints where you commit work and can safely clear context. By the end of this chapter, you'll know the four checkpoint types and the recovery protocol.

## 11.1 Checkpoint Types

Checkpoints are natural breakpoints where you commit your work and can safely clear context:

| Checkpoint | When | Actions |
| --- | --- | --- |
| Task Checkpoint | After each task completes | Verify > Commit > Optionally clear |
| Session Checkpoint | End of work session | Update STATE.md > Commit > Always clear |
| Milestone Checkpoint | After completing a milestone | Run quality gate > Commit > Always clear |
| Recovery Checkpoint | When stuck or confused | Save learnings > Commit > Clear > Fresh start |

## 11.2 The Recovery Protocol

When things aren't working, use this recovery protocol to save your progress and get a fresh start:

### Prompt: Recovery Protocol

> Prompt file: [`prompts/W-11-1-prompt-recovery-protocol.md`](../../prompts/W-11-1-prompt-recovery-protocol.md)

```text
Something isn't working right. Before we continue, let's checkpoint:

1. Update docs/MEMORY.md with what we tried that didn't work
2. Update docs/STATE.md with current status and blockers
3. Commit current state: "WIP: [description of current state]"
4. Then I'll clear context and we'll approach fresh

Please make those updates now.
```

> **Expected Outcome**
>
> **What you should understand:** The four checkpoint types (Task, Session, Milestone, Recovery) and when to use the recovery protocol.
>
> **How to validate:** You know when to checkpoint and the specific actions for each checkpoint type.
>
> **Next:** Part IV — Learn tactical context management approaches.

## Chapter 11 Summary

- Task Checkpoint: After completing a task—verify, commit, optionally clear
- Session Checkpoint: End of work session—update STATE.md, commit, always clear
- Milestone Checkpoint: After completing a milestone—run quality gate, commit, clear
- Recovery Checkpoint: When stuck—save learnings, commit, clear, fresh start

---
