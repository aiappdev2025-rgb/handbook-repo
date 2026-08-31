---
part: 0
part_name: "Operating"
chapter: 16
title: "Understanding Sub-Agents"
slug: "16-understanding-sub-agents"
section: "PART V: AGENTIC PATTERNS"
source_html: "archive/html-v3/workflow-guide-v1.html"
---

# 16. Understanding Sub-Agents

In this chapter, you'll learn how Claude Code uses sub-agents for parallel task execution. Understanding this architecture helps you structure prompts for optimal performance. By the end of this chapter, you'll know when and how sub-agents are invoked.

## 16.1 The Sub-Agent Architecture

Claude Code can spawn sub-agents to handle specific tasks in parallel:

```text

                    +---------------------+
                    |   Main Claude       |
                    |   (Orchestrator)    |
                    +---------+-----------+
                              |
            +-----------------+-----------------+
            |                 |                 |
            v                 v                 v
   +----------------+ +----------------+ +----------------+
   |  Sub-Agent 1   | |  Sub-Agent 2   | |  Sub-Agent 3   |
   |  Read files    | |  Write code    | |  Run tests     |
   +----------------+ +----------------+ +----------------+
            |                 |                 |
            +-----------------+-----------------+
                              |
                              v
                    +---------------------+
                    |   Main Claude       |
                    |   (Consolidate)     |
                    +---------------------+
```

## 16.2 When Sub-Agents Are Used

Sub-agents are automatically invoked in these situations:

- Reading multiple files simultaneously
- Running multiple commands in parallel
- Complex file operations across many files
- Tasks explicitly structured for parallel execution

> **Expected Outcome**
>
> **What you should understand:** How sub-agents work (orchestrator spawns workers, workers return results) and when they're automatically used.
>
> **How to validate:** You can identify which tasks will trigger sub-agent usage.
>
> **Next:** Chapter 17 — Learn about MCP tools and integration.

## Chapter 16 Summary

- Sub-agents are spawned by the main Claude orchestrator
- They handle tasks like reading files, writing code, and running tests in parallel
- Results are consolidated back to the main orchestrator
- Sub-agents are used for file operations, command execution, and parallel tasks

---
