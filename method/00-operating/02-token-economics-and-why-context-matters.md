---
part: 0
part_name: "Operating"
chapter: 2
title: "Token Economics and Why Context Matters"
slug: "02-token-economics-and-why-context-matters"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 2. Token Economics and Why Context Matters

In this chapter, you'll learn the practical economics of token usage—what consumes tokens, how to budget them, and how to monitor your usage. By the end of this chapter, you'll be able to make informed decisions about when to clear context and how to structure your work sessions.

## 2.1 What Consumes Tokens

Understanding token usage helps you make informed decisions about when to clear context and how to structure your work. Every piece of content has a token cost:

| Content Type | Approximate Token Cost | Notes |
| --- | --- | --- |
| Your message | ~1 token per 4 characters | Prompts, questions, instructions |
| Claude's response | ~1 token per 4 characters | Explanations, code, analysis |
| File read operations | Full file size in tokens | Every time Claude reads a file |
| Tool call results | Full output included | Command output, search results |
| Error messages | Full stack traces | Can be surprisingly large |

## 2.2 Token Budget Guidelines

These guidelines help you know when to take action based on your current context size:

| Context Level | Token Range | Quality | Action |
| --- | --- | --- | --- |
| Fresh | 0-50K | Excellent | Work normally |
| Working | 50-100K | Good | Consider clearing after current task |
| Heavy | 100-150K | Declining | Finish task, then clear |
| Critical | 150K+ | Poor | Clear immediately after commit |

## 2.3 Monitoring Token Usage

You can't manage what you don't measure. Check your current token usage with:

```text
/status
```

This shows current context size. If you're above 100K tokens and have more work to do, plan for a context clear.

> **Expected Outcome**
>
> **What you should understand:** The token costs of different content types and the action thresholds for each context level (Fresh, Working, Heavy, Critical).
>
> **How to validate:** You can check your context size with /status and know what action to take based on the result.
>
> **Next:** Chapter 3 — Learn how to use the filesystem as your persistent memory system.

## Chapter 2 Summary

- Every message, response, file read, and tool output consumes tokens
- Fresh context (0-50K): Work normally with excellent quality
- Working context (50-100K): Good quality, consider clearing after current task
- Heavy/Critical context (100K+): Clear after committing current work
- Use /status to monitor your current token usage

---
