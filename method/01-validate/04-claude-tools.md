---
chapter: 4
title: "Claude Tools Guide"
slug: "claude-tools"
phase: 1
phase_name: "Validate"
milestone: null
checkpoint: null
tool: null
session: null
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase1/chapter-04-claude-tools.html"
---

# Chapter 4: Claude Tools Guide

In this chapter, you'll learn about the two Claude tools—Claude Chat and Claude Code—and when to use each one. Understanding their different strengths is critical for efficient workflow. By the end of this chapter, you'll know exactly which tool to reach for at each stage of development.

## 4.1 Two Tools, Different Purposes

Claude Chat and Claude Code CLI are optimized for different tasks. Using the right tool dramatically improves outcomes.

| Aspect | Claude Chat | Claude Code CLI |
| --- | --- | --- |
| **Best For** | Strategy, design, documentation, analysis | Implementation, file operations, testing |
| **Context** | Conversation-based, can reference attachments | File system access, can read/write code |
| **Output** | Documents, plans, designs, artifacts | Code files, test files, configuration |
| **Iteration** | Back-and-forth discussion | Execute → verify → adjust |

## 4.2 The Handoff Pattern

Design artifacts flow from Claude Chat to Claude Code in a structured handoff. Understanding this pattern helps you maintain context across the transition.

```text

HANDOFF PATTERN
===============

Claude Chat                          Claude Code CLI
-----------                          ---------------

1. Create Design Artifacts    --->
2. Create Architecture Doc    --->
3. Generate Build Contract    --->
4. Create SPEC Document       --->   5. Implement SPEC (TDD)
                                        - Write failing tests
                                        - Implement to pass
                                        - Refactor
6. Review Implementation      <---
7. Create Next SPEC           --->   8. Implement Next SPEC
```

## 4.3 Tool Selection by Stage

This table provides a quick reference for which tool to use at each stage. Bookmark this for quick reference as you work through the handbook.

| Stage | Task | Recommended Tool | Why |
| --- | --- | --- | --- |
| Research (0.1) | Market analysis | Chat | Web search, iterative exploration |
| Business (1.0) | Business strategy | Chat | Discussion, clarifying questions |
| Design (2.0-4.0) | Design documents | Chat | Iteration, exploration |
| Architecture (5.0) | Technical planning | Chat | Diagrams, trade-off analysis |
| Build Contract | Bridge document | Chat | Synthesis of design artifacts |
| Build (SPECs) | Write SPECs | Chat | Requirements analysis |
| Build (Code) | Implementation | Code | File operations, TDD cycle |

## 4.4 Setting Up Claude Projects (Recommended)

Before starting the prompts in Part II, we recommend setting up a **Claude Project** to organize your work. Claude Projects lets you store artifacts in persistent "Project Knowledge" that's available across all chats within that project.

> **Why Use Claude Projects?**
>
> - **No re-pasting:** Artifacts in Project Knowledge are automatically available - no need to paste your Design Brief into every chat
> - **Context preserved:** Start new chats without losing access to previous work
> - **Organized workflow:** All your SaaS project artifacts in one place

### Before Starting the Prompts

1. Go to **claude.ai** and create a new Project
2. Name it after your product (e.g., "MyApp - SaaS Development")
3. Add artifacts to Project Knowledge as you complete each stage (see table below)

### When to Add Artifacts

| After Completing... | Add to Project Knowledge |
| --- | --- |
| Stage 0.1 (Chapter 5) | Research findings |
| Stage 1.0 (Chapter 6) | Business One-Pager |
| Stage 2.0 (Chapter 7) | Design Brief |
| Stage 3.0 (Chapters 8-10) | UX Package |
| Stage 4.0 (Chapters 11-13) | UI System |
| Part IV (Architecture) | Architecture Document |
| Part IV-B (Build Contract) | Build Contract |

> **Note:** Full Guide:
>
> For the complete Claude Projects workflow—including when to start new chats, how to transition artifacts to Claude Code, and the Projects-to-Code handoff—see Chapter 22.8: Using Claude Projects Effectively in Part 2.

Not using Projects?

You can still follow the handbook. Save your artifacts locally as markdown files and paste relevant sections when Claude needs context. The workflow remains the same—Projects just makes it more convenient.

> **Expected Outcome**
>
> **What you should understand:** The strengths of each tool (Chat for exploration/design, Code for implementation), the handoff pattern, and when to use each at each stage.
>
> **What you should have:** A clear mental model of which tool to reach for at any point in the workflow.
>
> **Next:** Part II — Start creating your design artifacts with the Research phase.

## 4.5 Chapter Summary

You've learned about the two Claude tools. Key takeaways:

- Claude Chat excels at exploration, strategy, design, and document generation
- Claude Code excels at implementation, file operations, and TDD workflows
- Artifacts flow from Chat to Code through a structured handoff
- Using the right tool for each stage dramatically improves outcomes
- Claude Projects (optional) makes artifact management convenient

You've now completed Part I: Foundation. You understand the philosophy, the quality problems we're solving, the Five Pillars framework, and the tools we'll use. In Part II, you'll begin creating your product's design artifacts.
