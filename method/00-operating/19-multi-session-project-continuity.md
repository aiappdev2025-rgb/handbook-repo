---
part: 0
part_name: "Operating"
chapter: 19
title: "Multi-Session Project Continuity"
slug: "19-multi-session-project-continuity"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 19. Multi-Session Project Continuity

In this chapter, you'll learn how to maintain continuity across multiple sessions spanning days or weeks. Session logs provide detailed history beyond what STATE.md captures. By the end of this chapter, you'll know how to structure and use session logs effectively.

## 19.1 Session Log Format

Large projects span many sessions across days or weeks. Create session logs in docs/sessions/ for detailed continuity:

**`docs/sessions/2026-01-04-database-setup.md`**

```text
# Session: 2026-01-04 Database Setup

**Duration:** 10:00 - 14:30
**Milestone:** 3 - Database
**Context clears:** 2

## Completed
- [x] Created Supabase dev project
- [x] Defined schema for profiles, subscriptions
- [x] Wrote initial migration
- [~] Configure RLS policies (in progress)

## Decisions Made
- Using soft deletes (deleted_at timestamp) instead of hard deletes
- Admin role stored in profiles.role column

## Next Session Should
1. Complete subscription RLS policies
2. Generate TypeScript types from schema
3. Run Milestone 3 quality gate
```

> **Expected Outcome**
>
> **What you should have:** A session log template and understanding of when to create detailed session logs.
>
> **How to validate:** You can create a session log file with Duration, Milestone, Completed tasks, Decisions, and Next Session items.
>
> **Next:** Part VI — Learn how to integrate these patterns with the Build Phase Guide.

## Chapter 19 Summary

- Session logs live in docs/sessions/ with date-based naming
- Include: Duration, Milestone, Context clears, Completed tasks, Decisions, Next session items
- Create logs for significant sessions (not every small session)
- Reference logs when resuming after long breaks

---
