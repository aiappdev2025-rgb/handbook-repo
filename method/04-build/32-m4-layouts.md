---
chapter: 32
title: "Milestone 4 — Layouts"
slug: "m4-layouts"
phase: 4
phase_name: "Build"
milestone: "M4"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "4.1"
deliverables: "Layout components, navigation, responsive design verified."
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase4/chapter-32-m4-layouts.html"
---

# Chapter 32: Milestone 4 — Layouts

In this chapter, you'll create the layout architecture for your application. By the end, you'll have marketing and app layouts with responsive navigation.

> **Workflow tip:** **Workflow Tip:** Layouts involve multiple files. Use [Context Management](../00-operating/12-when-and-how-to-use-clear.md) to keep Claude Code focused on related components.

## 32.1 Overview

Layouts define the visual structure that users experience on every page. Separating marketing and authenticated layouts ensures appropriate navigation and styling for each context while maintaining code reusability.

## 32.2 Implementation Prompt

Create root layout, marketing layout (public pages), and app layout (authenticated pages). Build navigation components with responsive behavior.

### Prompt 4.1 — Application Layouts

> Prompt file: [`prompts/B-4.1-application-layouts.md`](../../prompts/B-4.1-application-layouts.md)

```text
ROLE
Frontend Developer creating the layout architecture.

CONTEXT
Project: {{productName}}
Design system ready (Milestone 2 complete).
Database schema ready (Milestone 3 complete).

OBJECTIVE
Create layout components for marketing and authenticated pages.

REQUIREMENTS

1. Root layout (src/app/layout.tsx):
   - HTML lang attribute
   - Meta tags for SEO
   - Font configuration
   - Toast provider (for notifications)
   - Theme provider if using dark mode

2. Marketing layout (src/app/(marketing)/layout.tsx):
   - Header with logo and navigation
   - Navigation links: Features, Pricing, Login, Sign Up
   - Footer with links and copyright
   - Max-width container for content

3. App layout (src/app/(app)/layout.tsx):
   - Sidebar navigation (collapsible on mobile)
   - Header with user menu and notifications
   - Main content area with proper padding
   - Protected route wrapper (checks auth)

4. Navigation components:
   - MarketingNav: Public navigation bar
   - AppNav: Authenticated sidebar/header
   - UserMenu: Dropdown with profile, settings, logout
   - MobileNav: Hamburger menu for mobile

5. Responsive behavior:
   - Mobile: Hamburger menu, stacked layout
   - Tablet: Collapsible sidebar
   - Desktop: Full sidebar, expanded navigation

VERIFICATION
Test at 320px, 768px, 1024px, 1440px widths
Navigation works on mobile (tap, no hover)
Run: npm run build — no errors
```

## 32.3 Verification

> **Expected Outcome**
>
> **What you should have:** Root layout with providers, marketing layout with header/footer, app layout with sidebar navigation, responsive navigation components working at all breakpoints.
>
> **How to validate:**
>
> - Test navigation at 320px, 768px, 1024px, and 1440px widths
> - Mobile navigation opens/closes properly
> - All layouts render without errors
> - `npm run build` completes successfully

## 32.4 Chapter Summary

You've completed Milestone 4. Your project now has:

- Root layout with providers
- Marketing layout with header/footer
- App layout with sidebar navigation
- Responsive navigation components
- Mobile-friendly hamburger menu
- User menu with dropdown

**Next:** Chapter 33 (Milestone 5) - Implement authentication with Supabase Auth.
