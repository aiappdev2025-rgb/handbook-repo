---
part: 0
part_name: "Operating"
chapter: 1
title: "The Context Window Mental Model"
slug: "01-the-context-window-mental-model"
section: "PART I: FOUNDATION"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 1. The Context Window Mental Model

In this chapter, you'll learn how Claude Code's context window works and why it matters for your productivity. Understanding this mental model is the foundation for all efficient Claude Code usage. By the end of this chapter, you'll know exactly what competes for Claude's attention and how to manage it.

## 1.1 What's In the Context Window

Every interaction with Claude Code happens within a context window - a fixed-size memory space that holds everything Claude can "see" at any moment. Understanding this constraint is fundamental to working efficiently.

The context window contains three types of content, all competing for the same limited space:

```text

+-----------------------------------------------------------------------------+
|                     CONTEXT WINDOW (200K tokens max)                        |
+-----------------------------------------------------------------------------+
|                                                                             |
|  +---------------------+  +---------------------+  +---------------------+  |
|  |   SYSTEM PROMPT     |  |   CONVERSATION      |  |    FILE CONTENTS    |  |
|  |                     |  |      HISTORY        |  |                     |  |
|  |  - CLAUDE.md        |  |                     |  |  - Code you're      |  |
|  |  - Tool definitions |  |  - Your messages    |  |    editing          |  |
|  |  - Base instructions|  |  - Claude responses |  |  - Files Claude     |  |
|  |                     |  |  - Tool calls/results|  |    reads            |  |
|  |                     |  |                     |  |                     |  |
|  |  ~5-15K tokens      |  |  GROWS OVER TIME    |  |  Variable size      |  |
|  |  (relatively fixed) |  |  (this is the       |  |  (loaded on demand) |  |
|  |                     |  |   problem area)     |  |                     |  |
|  +---------------------+  +---------------------+  +---------------------+  |
|                                                                             |
|  When total exceeds limit --> Auto-compaction --> Details get lost          |
|                                                                             |
+-----------------------------------------------------------------------------+
```

## 1.2 The Problem: Context Grows, Quality Degrades

As you work, the conversation history grows with every exchange. This growth is the core challenge you'll face in longer sessions. A typical work pattern looks like this:

```text

Session Start          After 30 min           After 2 hours          Danger Zone
-------------------------------------------------------------------------------

     +----+               +----+               +----+               +----+
     |####| System        |####|               |####|               |####|
     |    |               |####|               |####|               |####|
     |    |               |####| Conversation  |####|               |####|
     |    |               |####|               |####|               |####|
     |    |               |    |               |####|               |####|
     |    |               |    |               |####|               |####|
     |    |               |    |               |    |               |####|
     +----+               +----+               +----+               +----+
     
     15K/200K            45K/200K            120K/200K            180K/200K
     (Fresh, focused)    (Still good)        (Getting noisy)      (Auto-compact
                                                                   imminent)
```

When context fills up, Claude Code automatically "compacts" the history - summarizing earlier parts of the conversation. This is lossy compression: specific details, exact code snippets, and nuanced decisions get reduced to summaries. The result is Claude "forgetting" what you discussed earlier.

## 1.3 The Solution: Externalize State to the Filesystem

The solution to context limitations isn't fighting them—it's working with them. The core insight that makes large projects manageable:

> **Expected Outcome**
>
> The Golden Rule of Context Management
>
> Conversation context is volatile, but the filesystem is persistent. Design your workflow to keep critical information in files, not in conversation history.

> **Expected Outcome**
>
> **What you should understand:** The three types of content competing for context space (system prompt, conversation history, file contents) and why conversation history is the "problem area."
>
> **How to validate:** You can explain why Claude might "forget" earlier discussions and why files are more reliable than conversation memory.
>
> **Next:** Chapter 2 — Learn the token economics that drive context decisions.

## Chapter 1 Summary

- Claude Code has a 200K token context window shared by system prompts, conversation, and files
- Conversation history grows over time and eventually triggers auto-compaction
- Auto-compaction loses details—Claude "forgets" specific discussions
- The solution is externalizing state to files, which persist across sessions

---
