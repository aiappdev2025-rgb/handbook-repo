---
chapter: 9
title: "UX Package"
slug: "ux-package"
phase: 2
phase_name: "Design"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "same-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites: []
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase2/chapter-09-ux-package.html"
---

# Chapter 9: UX Package

In this chapter, you'll create the UX Package—a comprehensive document that defines every screen, flow, and interaction state in your application. This serves as the blueprint for UI design and development. By the end of this chapter, you'll have a complete user experience specification that answers every "what happens when..." question a developer might have.

## 9.1 UX Package Purpose

The UX Package defines the complete user experience: all screens, all flows, all states. It serves as the blueprint for UI design and development. This document answers every question a developer might have about "what happens when..." scenarios.

**What you'll accomplish:** Create a comprehensive UX specification covering information architecture, screen inventory, user flows, component behaviors, and responsive behavior.

## 9.2 UX Package Prompt

Continue in the same Claude Chat session where you created the Design Brief. This ensures the UX Package uses the exact vocabulary and flows defined in your brief. Claude will expand on the core flows to define every screen and state.

> **Run in:** Claude Chat · **Session:** Same Chat · continues from Design Brief

> Prompt file: [`prompts/D-09-1-ux-package.md`](../../prompts/D-09-1-ux-package.md)

```text
Create a UX Package for [PRODUCT NAME].

**Design Brief**: [ATTACH OR REFERENCE]

The UX Package should include:

**SECTION 1: Information Architecture**
- Site map showing all screens/routes
- Navigation structure
- User flow diagrams

**SECTION 2: Screen Inventory**
For each screen:
- Screen name and route
- Purpose (what user accomplishes)
- Entry points (how user arrives)
- Exit points (where user goes next)
- Key components
- Data displayed/collected
- Actions available
- Error states
- Loading states
- Empty states

**SECTION 3: User Flows**
For each core flow from Design Brief:
- Step-by-step sequence
- Decision points
- Error recovery paths
- Success confirmation

**SECTION 4: Component Behaviors**
- Form validation rules
- Confirmation dialogs (when and what)
- Notification patterns
- Loading indicators

**SECTION 5: Responsive Behavior**
- Breakpoints
- What changes at each breakpoint
- Mobile-specific interactions

Output in markdown format, ready to save as docs/ux-package.md.
```

> **Expected Outcome**
>
> **What you should have:** A comprehensive UX Package document (typically 2,000-4,000 words) covering all five sections: information architecture, screen inventory, user flows, component behaviors, and responsive behavior.
>
> **How to validate:** The Screen Inventory should list every screen in your app with all states defined (loading, empty, error). User Flows should trace complete paths from entry to success.
>
> **Next:** Save the UX Package, then critique it for issues.

## 9.3 Save the UX Package

Save the initial UX Package before the critique phase. You'll update this same file after incorporating feedback from the critique.

### Instructions

1. Copy the complete UX Package output from Claude Chat
2. Save as `docs/ux-package.md`

> **Expected Outcome**
>
> **What you should have:** A file at `docs/ux-package.md` containing your initial UX Package.
>
> **How to validate:** Open the file and verify all five sections are present. Count the screens in your Screen Inventory—a typical MVP has 8-15 screens.
>
> **Next:** Chapter 10 — Run the UX Critique to identify issues before they become implementation problems.

## 9.4 Chapter Summary

You've created your UX Package. What you accomplished:

- Defined information architecture with site map and navigation
- Created screen inventory with all states (loading, empty, error)
- Documented complete user flows with error recovery paths
- Specified component behaviors and responsive breakpoints

In the next chapter, you'll critique this UX Package to catch issues before they become expensive implementation problems.
