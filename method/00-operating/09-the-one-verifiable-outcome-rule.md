---
part: 0
part_name: "Operating"
chapter: 9
title: "The \"One Verifiable Outcome\" Rule"
slug: "09-the-one-verifiable-outcome-rule"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 9. The "One Verifiable Outcome" Rule

In this chapter, you'll learn how to define clear completion criteria for every task. The "One Verifiable Outcome" rule prevents scope creep and makes it obvious when a task is done. By the end of this chapter, you'll know the five verification types and when to use each.

## 9.1 Verification Types

Every task should have exactly one way to verify it's complete. This prevents scope creep and makes it clear when to commit and clear context:

| Verification Type | Example | When to Use |
| --- | --- | --- |
| Visual | "Page renders at /login with email and password fields" | UI components, layouts |
| Functional | "Can log in with test credentials, redirects to /dashboard" | Features, flows |
| File exists | "File exists at src/lib/supabase/client.ts" | Setup, configuration |
| Test passes | "npm run test:auth passes all 5 test cases" | Logic, edge cases |
| Command succeeds | "npm run build completes without errors" | Integration, deployment |

> **Expected Outcome**
>
> **What you should understand:** The five verification types (Visual, Functional, File exists, Test passes, Command succeeds) and when to use each.
>
> **How to validate:** For any task, you can write a single, clear verification statement.
>
> **Next:** Chapter 10 — Learn how to track tasks in state files.

## Chapter 9 Summary

- Every task needs exactly one verifiable outcome
- Visual verification: For UI components and layouts
- Functional verification: For features and user flows
- File/Test/Command verification: For setup, logic, and integration
- Clear verification prevents scope creep

---
