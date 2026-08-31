---
part: 0
part_name: "Operating"
chapter: 20
title: "Mapping Milestones to Sessions"
slug: "20-mapping-milestones-to-sessions"
section: "PART VI: BUILD PHASE INTEGRATION"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 20. Mapping Milestones to Sessions

In this chapter, you'll learn how to map the Build Phase Guide's 11 milestones to work sessions. This planning helps you estimate project duration and identify natural context clear points. By the end of this chapter, you'll have a session plan for your project.

## 20.1 Session Estimates by Milestone

The Build Phase Guide defines 11 milestones. Here's how to plan your sessions around them:

| Milestone | Est. Sessions | Context Clears | Key Clear Points |
| --- | --- | --- | --- |
| M1: Project Setup | 1 | 1 | After setup complete |
| M2: Design System | 2-3 | 2-3 | After tokens, after components |
| M3: Database | 2 | 2 | After schema, after RLS |
| M4: Layouts | 1-2 | 1-2 | After each layout type |
| M5: Authentication | 2-3 | 2-3 | After login, signup, middleware |
| M6: Core Feature | 3-5 | 3-5 | After data layer, actions, UI |
| M7: Admin Console | 3-4 | 3-4 | After each admin feature |
| M8: Supporting Features | 2-3 | 2-3 | After each feature |
| M9: Payments | 2-3 | 2-3 | After Stripe setup, webhooks, UI |
| M10: Polish | 2-3 | 2-3 | After each polish area |
| M11: Testing | 2-3 | 2-3 | After each test type |

**Total: 22-32 sessions** for a complete Build Phase.

> **Expected Outcome**
>
> **What you should have:** A session plan mapping milestones to estimated sessions and key clear points.
>
> **How to validate:** You can estimate how many sessions your project will take based on the milestone table.
>
> **Next:** Chapter 21 — Learn the prescriptive Git workflow for Claude Code projects.

## Chapter 20 Summary

- Build Phase has 11 milestones requiring 22-32 total sessions
- Complex milestones (M6, M7, M9) require more sessions
- Plan context clears after each logical unit within a milestone
- Use this table to estimate project timeline

---
