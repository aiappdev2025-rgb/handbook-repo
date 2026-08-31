---
chapter: 29
title: "Milestone 2 — Design System"
slug: "m2-design-system"
phase: 4
phase_name: "Build"
milestone: "M2"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "2.1"
deliverables: "Component library, design tokens, test page rendering correctly."
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-29-m2-design-system.html"
---

# Chapter 29: Milestone 2 — Design System

In this chapter, you'll configure shadcn/ui with design tokens and install core components. By the end, you'll have a consistent component library ready for building your UI.

> **Workflow tip:** **Workflow Tip:** This milestone works well with Claude Code's agentic mode. See [Agentic Patterns](../00-operating/16-understanding-sub-agents.md) in the Workflow Reference.

## 29.1 Overview

Establishing a design system early ensures visual consistency throughout your application. shadcn/ui provides accessible, customizable components that integrate seamlessly with Tailwind CSS.

## 29.2 Implementation Prompt

Configure shadcn/ui with design tokens. Install core components (button, card, input, label, form, toast, dropdown-menu, avatar, skeleton). Create test page to verify styling.

### Prompt 2.1 — Design System Setup

> Prompt file: [`prompts/B-2.1-design-system-setup.md`](../../prompts/B-2.1-design-system-setup.md)

```text
ROLE
Frontend Developer configuring the design system.

CONTEXT
Project: {{productName}}
Next.js project initialized (Milestone 1 complete).
Tailwind CSS already configured.

OBJECTIVE
Set up shadcn/ui component library with design tokens.

REQUIREMENTS

1. Initialize shadcn/ui:
   - Run npx shadcn-ui@latest init
   - Choose: TypeScript, Default style, CSS variables
   - Configure components.json with @/components path

2. Configure design tokens in globals.css:
   - Primary color (brand color)
   - Secondary color
   - Accent color
   - Background and foreground
   - Muted colors for secondary text
   - Destructive color for errors/warnings
   - Border radius scale

3. Install core components:
   - button (primary actions)
   - card (content containers)
   - input, label (form fields)
   - form (react-hook-form integration)
   - toast (notifications)
   - dropdown-menu (navigation, actions)
   - avatar (user display)
   - skeleton (loading states)

4. Create test page (src/app/design-test/page.tsx):
   - Display all installed components
   - Show color palette with design tokens
   - Test light/dark mode if applicable
   - NOTE: Remove this page before production

5. Add utility styles:
   - cn() helper function (lib/utils.ts)
   - Common spacing/layout utilities if needed

VERIFICATION
Visit /design-test — all components render correctly
Colors match design tokens in CSS variables
Run: npm run build — no TypeScript errors
```

## 29.3 Verification

> **Expected Outcome**
>
> **What you should have:** shadcn/ui initialized with design tokens configured, core components installed (button, card, input, label, form, toast, dropdown-menu, avatar, skeleton), and a test page displaying all components.
>
> **How to validate:**
>
> - Visit `/design-test` - all components render with correct colors and styling
> - `npm run build` completes without errors
> - Design tokens visible in globals.css

## 29.4 Chapter Summary

You've completed Milestone 2. Your project now has:

- shadcn/ui initialized and configured
- Design tokens defined in CSS variables
- Core components installed
- Test page verifying component rendering
- cn() utility function

**Next:** Chapter 30 (Milestone 3) - Create your database schema with RLS policies.
