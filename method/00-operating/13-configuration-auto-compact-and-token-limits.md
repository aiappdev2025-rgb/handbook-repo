---
part: 0
part_name: "Operating"
chapter: 13
title: "Configuration: Auto-Compact and Token Limits"
slug: "13-configuration-auto-compact-and-token-limits"
section: null
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 13. Configuration: Auto-Compact and Token Limits

In this chapter, you'll learn Claude Code's configuration options for context management. These settings let you customize how context is handled. By the end of this chapter, you'll know how to configure auto-compact behavior and understand the trade-offs.

## 13.1 Disabling Auto-Compact

Claude Code has configuration options that affect context management. Here's how to disable automatic compaction:

```text
# In your Claude Code config
/config

# Set autoCompact to false
# This prevents automatic context summarization
```

> **⚠ Warning:** **Trade-off Warning** With auto-compact disabled, you must manually manage context. If you exceed the limit, Claude Code will error rather than summarize.

> **Expected Outcome**
>
> **What you should understand:** How to disable auto-compact and the trade-offs involved (manual management required, hard errors instead of summarization).
>
> **How to validate:** You can access /config and understand what auto-compact does.
>
> **Next:** Chapter 14 — Learn the session rhythm for consistent productivity.

## Chapter 13 Summary

- Auto-compact can be disabled via /config
- With auto-compact on: Claude summarizes old context when limits approach
- With auto-compact off: You must manually clear; errors occur if limits exceeded
- Most users should keep auto-compact on and clear proactively

---
