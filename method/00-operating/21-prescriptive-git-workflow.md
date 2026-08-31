---
part: 0
part_name: "Operating"
chapter: 21
title: "Prescriptive Git Workflow"
slug: "21-prescriptive-git-workflow"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 21. Prescriptive Git Workflow

In this chapter, you'll learn a prescriptive Git workflow optimized for Claude Code development. Consistent commits ensure your work is always recoverable. By the end of this chapter, you'll have clear rules for when and how to commit.

## 21.1 Commit Frequency

A consistent Git workflow ensures your work is always recoverable. Commit at these events:

| Event | Commit? | Commit Message Format |
| --- | --- | --- |
| Task completed | Yes | feat: [description] |
| Bug fixed | Yes | fix: [description] |
| Before context clear | Yes | checkpoint: [description] |
| Milestone complete | Yes | milestone-N: [name] complete |
| End of session | Yes | session-end: [summary] |

## 21.2 Conventional Commits Standard

Use conventional commits for clear, parseable history:

```text
# Format
type: description

# Types
feat:       New feature
fix:        Bug fix
docs:       Documentation only
refactor:   Code change that neither fixes nor adds
test:       Adding tests
chore:      Maintenance tasks

# Examples
feat: add login page with email/password form
fix: correct validation message on signup form
docs: update STATE.md with session progress
checkpoint: auth flow complete, ready for testing
milestone-5: authentication complete
```

> **Expected Outcome**
>
> **What you should have:** Understanding of when to commit (task complete, bug fixed, context clear, milestone, session end) and how to format messages.
>
> **How to validate:** Your git log shows conventional commit messages with clear types and descriptions.
>
> **Next:** Chapter 22 — Use quality gates as natural context boundaries.

## Chapter 21 Summary

- Commit after: task complete, bug fixed, before context clear, milestone complete, session end
- Use conventional commits: feat, fix, docs, refactor, test, chore
- Checkpoint commits mark safe points for context clearing
- Milestone commits mark completion of major project phases

---
