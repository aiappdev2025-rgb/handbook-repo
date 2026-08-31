---
chapter: 23
title: "MOAI-ADK Overview"
slug: "moai-overview"
phase: 4
phase_name: "Build"
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
source_html: "archive/html-v3/handbook/phase4/chapter-23-moai-overview.html"
---

# Chapter 23: MOAI-ADK Overview

In this chapter, you'll learn the MOAI-ADK methodology—how design artifacts flow into implementation through SPECs and TDD. Understanding this flow is essential before executing any milestones. By the end of this chapter, you'll know how all the pieces connect.

> **Note:** Read for Understanding
>
> — This chapter explains the MOAI methodology. No action required yet. You'll apply these concepts when executing milestones in the Build Guide.

## 23.1 The Integration Flow

MOAI-ADK (Methodology for Organized AI-Driven Development Kit) structures AI-assisted implementation through SPEC-First Development, EARS Requirements, TDD Workflow, and Documentation Sync.

```text

HANDBOOK + MOAI INTEGRATION
===========================

Design Brief      ----+
UX Package        ----|---> Build Contract ---> SPEC ---> TDD Cycle
UI System         ----|                              |
Architecture      ----+                              v
                                              Tested Code + Docs
```

> **What You Need to Do**
>
> 1. **Create the Build Contract** — Use the Build Contract prompt (Chapter 21) to synthesize your design artifacts into a single reference document
> 2. **Set up SPEC folder structure** — Create `docs/specs/` in your project root
> 3. **Configure testing framework** — Install Jest and React Testing Library: npm install -D jest @testing-library/react @testing-library/jest-dom
> 4. **Create CLAUDE.md** — Set up your AI context file following Chapter 22

> **Expected Outcome**
>
> **What you should understand:** How design artifacts (Design Brief, UX Package, UI System, Architecture) flow through the Build Contract into SPECs and finally into tested code.
>
> **What you should have ready:** Build Contract created, docs/specs/ folder created, testing framework installed, CLAUDE.md configured.
>
> **Next:** Chapter 24 — Learn the SPEC-First Development approach and EARS requirements format.

## 23.2 Chapter Summary

You've learned the MOAI-ADK integration methodology. Key takeaways:

- Design artifacts feed into the Build Contract
- Build Contract informs SPEC documents
- SPECs drive TDD implementation
- The result is tested, documented code

In the next chapter, you'll learn the SPEC-First Development approach that ensures every feature starts with requirements and test cases.
