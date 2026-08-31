---
part: 0
part_name: "Operating"
chapter: 8
title: "Breaking Large Projects into Subtasks"
slug: "08-breaking-large-projects-into-subtasks"
section: "PART III: TASK DECOMPOSITION"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 8. Breaking Large Projects into Subtasks

In this chapter, you'll learn the task decomposition methodology that makes large projects manageable. Large projects fail when you try to hold too much in context at once. By the end of this chapter, you'll know how to break any project into right-sized tasks.

## 8.1 The Decomposition Principle

Large projects fail in Claude Code when you try to hold too much in context at once. The solution is aggressive decomposition into small, independently verifiable tasks:

```text

WRONG: One Giant Task                   RIGHT: Decomposed Tasks
------------------------                ----------------------------------------

"Build the authentication system"       Task 1: Create Supabase client config
                                        Task 2: Create login page UI  
   +----------------------------+       Task 3: Implement login server action
   |                            |       Task 4: Create signup page UI
   |   TOO BIG                  |       Task 5: Implement signup server action
   |   Unclear completion       |       Task 6: Create auth middleware
   |   Multiple concerns        |       Task 7: Add password reset flow
   |   Context grows too large  |       Task 8: Test all auth flows
   |                            |
   +----------------------------+       Each task: 20-50K tokens
                                        Each task: Clear completion criteria
                                        Each task: Independent verification
```

## 8.2 Task Size Guidelines

Use these criteria to determine if your task is the right size. A well-sized task should:

- Complete in 20-50K tokens of context
- Take 15-45 minutes of focused work
- Touch 1-3 files primarily
- Have one clear verification step
- Be committable on its own

> **Expected Outcome**
>
> **What you should understand:** Why large monolithic tasks fail and the characteristics of a well-sized task (20-50K tokens, 15-45 minutes, 1-3 files, one verification step).
>
> **How to validate:** You can look at a large feature and break it into 5-10 independent subtasks.
>
> **Next:** Chapter 9 — Learn the "One Verifiable Outcome" rule for task definition.

## Chapter 8 Summary

- Large monolithic tasks fail because context grows too large
- Break projects into tasks that complete in 20-50K tokens
- Each task should touch 1-3 files and take 15-45 minutes
- Tasks must be independently verifiable and committable

---
