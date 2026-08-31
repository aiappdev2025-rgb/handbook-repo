---
chapter: 39
title: "Milestone 10 — Polish"
slug: "m10-polish"
phase: 4
phase_name: "Build"
milestone: "M10"
checkpoint: null
tool: "claude-code"
session: null
estimated_time: null
prompts:
  - "10.1"
  - "10.2"
  - "10.3"
  - "10.4"
deliverables: "Error boundaries, loading states, empty states, edge case handling, WCAG compliance"
prerequisites: []
when_to_use:
  - "After M9 (Payments). All features complete - now make everything feel professional."
gate: "You must complete Checkpoint C (next chapter) before launching."
source_html: "archive/html-v3/handbook/phase4/chapter-39-m10-polish.html"
---

# Chapter 39: Milestone 10 — Polish

> **TL;DR** — Optimize performance and refine UX: error boundaries, loading states, empty states, and accessibility compliance.

> **When to use:** After M9 (Payments). All features complete - now make everything feel professional.

In this chapter, you'll polish your application with error handling, loading states, and accessibility improvements. By the end, your app will feel professional and production-ready.

> **Workflow tip:** **Workflow Tip:** Polish is systematic. Use [Task Decomposition](../00-operating/08-breaking-large-projects-into-subtasks.md) to audit each area methodically.

## 39.1 Overview

Polish transforms a working app into a professional product. Error handling, loading states, and accessibility are what separate amateur projects from production-ready software.

## 39.2 Implementation Prompts

### Prompt 10.1: Error Boundaries

### Prompt 10.1 — Error Boundaries

> Prompt file: [`prompts/B-10.1-error-boundaries.md`](../../prompts/B-10.1-error-boundaries.md)

```text
ROLE
Frontend Developer implementing error handling.

CONTEXT
Project: {{productName}}
All features complete.
Need graceful error handling throughout.

OBJECTIVE
Implement error boundaries and global error handling.

REQUIREMENTS

1. Global error boundary (src/components/error-boundary.tsx):
   - Catch unhandled React errors
   - Display user-friendly error message
   - Option to retry or go home
   - Log error to error logging service

2. Page-level error handling (src/app/**/error.tsx):
   - Error.tsx files for each route group
   - Reset button to try again
   - Link back to safe location

3. Not found pages (src/app/**/not-found.tsx):
   - Custom 404 pages for each section
   - Helpful messaging
   - Links to valid destinations

4. API error responses:
   - Consistent error format across all endpoints
   - Meaningful error messages
   - Proper HTTP status codes

VERIFICATION
Trigger error and see boundary catch it
404 pages display for invalid routes
API errors return consistent format
```

### Prompt 10.2: Loading States

### Prompt 10.2 — Loading States Audit

> Prompt file: [`prompts/B-10.2-loading-states-audit.md`](../../prompts/B-10.2-loading-states-audit.md)

```text
ROLE
Frontend Developer improving loading states.

CONTEXT
Project: {{productName}}
Features working but loading states incomplete.

OBJECTIVE
Audit and improve loading states throughout.

REQUIREMENTS

1. Page loading states (src/app/**/loading.tsx):
   - Skeleton screens for each page type
   - Match actual content layout
   - Smooth transition when content loads

2. Component loading states:
   - Button loading states (spinner + disabled)
   - Form submission loading
   - List loading skeletons

3. Async operation feedback:
   - Show loading during server actions
   - Optimistic updates where appropriate
   - Progress indicators for long operations

4. Suspense boundaries:
   - Wrap async components in Suspense
   - Provide fallback UI

VERIFICATION
All pages show loading skeleton during fetch
Buttons show loading during submission
No "flash of empty content"
```

### Prompt 10.3: Empty States

### Prompt 10.3 — Empty States

> Prompt file: [`prompts/B-10.3-empty-states.md`](../../prompts/B-10.3-empty-states.md)

```text
ROLE
Frontend Developer improving empty states.

CONTEXT
Project: {{productName}}
Need helpful empty states for new users.

OBJECTIVE
Create engaging empty states for all list/content areas.

REQUIREMENTS

1. List empty states:
   - Friendly illustration or icon
   - Helpful message explaining what goes here
   - CTA to create first item

2. Dashboard empty states:
   - Getting started guide for new users
   - Progress indicators
   - Quick actions

3. Search empty states:
   - "No results" with suggestions
   - Alternative actions

4. Error recovery states:
   - Failed to load with retry
   - Offline state with cached data option

VERIFICATION
New user sees helpful empty states
Empty states have clear CTAs
No blank white screens
```

### Prompt 10.4: Accessibility Audit

### Prompt 10.4 — Accessibility Audit

> Prompt file: [`prompts/B-10.4-accessibility-audit.md`](../../prompts/B-10.4-accessibility-audit.md)

```text
ROLE
Frontend Developer improving accessibility.

CONTEXT
Project: {{productName}}
Need WCAG 2.1 AA compliance.

OBJECTIVE
Audit and fix accessibility issues.

REQUIREMENTS

1. Keyboard navigation:
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order
   - Escape closes modals

2. Screen reader support:
   - Semantic HTML structure
   - ARIA labels on interactive elements
   - Meaningful alt text on images
   - Announce dynamic content changes

3. Color and contrast:
   - 4.5:1 contrast ratio for text
   - Don't rely on color alone
   - Focus indicators visible

4. Form accessibility:
   - Labels associated with inputs
   - Error messages announced
   - Required fields indicated

5. Testing:
   - Run axe DevTools
   - Test with keyboard only
   - Test with screen reader

VERIFICATION
axe DevTools reports no critical issues
All features work keyboard-only
Forms announce errors properly
```

## 39.3 Verification

> **Expected Output**
>
> After completing this milestone, you should have:
>
> - Error boundaries catching and displaying errors gracefully
> - Loading states on all async operations
> - Helpful empty states for new users
> - WCAG 2.1 AA accessibility compliance
> - Professional, polished user experience

### Verification Checklist

- [ ] Lighthouse accessibility score >= 90
- [ ] axe DevTools shows no critical issues
- [ ] All features work keyboard-only
- [ ] Loading states visible during data fetches
- [ ] Empty states have clear CTAs
- [ ] `npm run build` passes without errors

> **⛔ GATE:** You must complete Checkpoint C (next chapter) before launching.

## 39.4 Chapter Summary

You've completed Milestone 10. Your project now has:

- Error boundaries throughout
- Loading states on all pages
- Helpful empty states
- Accessibility compliance
- Professional polish

**Next:** Chapter 40 (Checkpoint C) - Pre-launch audit before going live.
