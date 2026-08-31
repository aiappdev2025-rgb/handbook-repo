---
chapter: 13
title: "Stage 5.0 — Solution Architecture"
slug: "architecture"
phase: 3
phase_name: "Architect"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "new-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase3/chapter-13-architecture.html"
---

# Chapter 13: Stage 5.0 — Solution Architecture

In this chapter, you'll create the Solution Architecture document—the technical blueprint for your entire application. This document captures all the decisions about technology choices, system structure, and integration patterns before you write any code. By the end of this chapter, you'll have a comprehensive architecture document that Claude Code will reference throughout implementation.

## 13.1 Purpose

The Solution Architecture bridges your design artifacts (Design Brief, UX Package) with actual implementation. It translates product requirements into technical decisions: which technologies to use, how components interact, what the data model looks like, and how security is handled. Creating this document before coding prevents costly mid-project pivots and ensures all technical decisions are made deliberately rather than ad-hoc.

**What you'll accomplish:** Generate a complete architecture document covering system design, database schema, API routes, authentication, and project structure.

## 13.2 Architecture Prompt

This prompt generates a comprehensive architecture document using Claude Chat. The output covers all technical aspects of your application, from high-level system diagrams to specific folder structures. Start a fresh chat to give Claude full context for technical planning.

> **Run in:** Claude Chat · **Session:** New Chat · start fresh for technical planning

> Prompt file: [`prompts/X-13-1-stage-5-0-solution-architecture.md`](../../prompts/X-13-1-stage-5-0-solution-architecture.md)

```text
Create a Solution Architecture document for [PRODUCT NAME].

Technology Stack (recommended for AI SaaS):
- Frontend: Next.js 14+ with App Router
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL + Auth + Storage)
- AI: Claude API (Anthropic)
- Payments: Stripe
- Hosting: Vercel

The Architecture document should include:
1. System Overview (architecture diagram, component responsibilities)
2. Database Schema (tables, columns, constraints, RLS policies)
3. API Design (routes, methods, request/response schemas)
4. Authentication and Authorization
5. AI Integration (prompts, error handling, cost management)
6. Third-Party Integrations
7. Security Considerations
8. Project Structure (folder organization, route groups, component folders)

Output the complete document in markdown format, ready to save as docs/architecture.md.
```

> **Customizing the Technology Stack**
>
> The recommended stack (Next.js, Supabase, Stripe, Vercel) is optimized for AI SaaS applications. If you're using different technologies, modify the prompt accordingly. The architecture sections remain the same regardless of stack choices.

> **Expected Outcome**
>
> **What you should have:** A complete architecture document (typically 2,000-4,000 words) in markdown format covering all eight sections.
>
> **How to validate:** The document should include: a system diagram (ASCII or description), at least 3-5 database tables with columns defined, API routes with methods, and a folder structure with route groups.
>
> **Next:** Save the architecture document to your project.

## 13.3 Save the Architecture Document

The architecture document must be saved as a file in your project so Claude Code can access it during implementation. This is a critical step—without this file, Claude Code won't have the context needed to set up your project correctly.

> **⚠ Warning:** Critical Step for Claude Code Integration The Architecture document will be referenced during implementation in Claude Code. Save it now so Claude Code can access it.

### Instructions

1. Create a `docs/` folder in your project directory (if it doesn't exist)
2. Copy the complete Architecture output from Claude Chat
3. Save as `docs/architecture.md`

This file becomes part of your project's context system. Claude Code will read it when initializing your project structure (Chapter 16) and reference it throughout the build phase.

### Architecture Document Validation

- [ ] `docs/architecture.md` exists with complete Architecture output
- [ ] Project Structure section includes folder organization and route groups
- [ ] Database Schema section lists all tables and relationships
- [ ] API Design section defines routes and methods

> **Expected Outcome**
>
> **What you should have:** A file at `docs/architecture.md` containing your complete architecture document.
>
> **How to validate:** Open the file and verify it contains all eight architecture sections. The file should be 100+ lines of markdown.
>
> **Next:** Chapter 14 — Generate the detailed database schema from your architecture.

## 13.4 Chapter Summary

You've completed the Solution Architecture phase. Here's what you accomplished:

- Generated a comprehensive technical architecture document
- Defined your technology stack and system components
- Outlined database tables, API routes, and security approach
- Saved the architecture for Claude Code to reference

Your technical blueprint is ready. In the next chapter, you'll generate the detailed, SQL-ready database schema based on this architecture.
