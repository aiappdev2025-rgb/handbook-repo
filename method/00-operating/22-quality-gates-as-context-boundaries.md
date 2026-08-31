---
part: 0
part_name: "Operating"
chapter: 22
title: "Quality Gates as Context Boundaries"
slug: "22-quality-gates-as-context-boundaries"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 22. Quality Gates as Context Boundaries

In this chapter, you'll learn how to use the Build Phase Guide's quality gates as natural context boundaries. Quality gates verify milestone completion before moving forward. By the end of this chapter, you'll understand how quality gates integrate with context management.

## 22.1 The Milestone Completion Flow

The Build Phase Guide includes quality gates after each milestone. These are natural points to clear context:

```text

+-----------------------------------------------------------------------------+
|                    MILESTONE COMPLETION FLOW                                 |
+-----------------------------------------------------------------------------+
|                                                                              |
|  Complete all          Run Quality Gate        Pass?          Clear Context |
|  milestone tasks  ---> from Build Guide   ---> ------------>  for next      |
|                                                     |         milestone     |
|                                                     |                       |
|                                                     v No                    |
|                                                                             |
|                                              Fix issues                     |
|                                              (same context)                 |
|                                                     |                       |
|                                                     v                       |
|                                              Re-run gate ------------------+|
|                                                                              |
+-----------------------------------------------------------------------------+
```

> **Expected Outcome**
>
> **What you should understand:** How quality gates create natural context boundaries—always clear after passing a milestone's quality gate.
>
> **How to validate:** You follow the flow: complete tasks → run quality gate → pass → clear context for next milestone.
>
> **Next:** Appendices — Reference templates and checklists.

## Chapter 22 Summary

- Quality gates verify milestone completion before proceeding
- Complete all tasks → Run quality gate → Fix issues if needed → Clear context
- Only clear context after quality gate passes
- Quality gates are natural boundaries between context sessions

---
