---
chapter: 11
title: "UI System"
slug: "ui-system"
phase: 2
phase_name: "Design"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "same-chat"
estimated_time: null
prompts: []
deliverables: null
prerequisites:
  - "**Revised UX Package** — Complete Chapter 10 including the UX Critique and Revision workflow. The UI System should be based on your *revised* UX Package (post-critique), not the original draft."
  - "**Design Brief** — From Chapter 7, defining brand direction and target audience."
when_to_use: []
gate: null
source_html: "archive/html-v3/handbook/phase2/chapter-11-ui-system.html"
---

# Chapter 11: UI System

In this chapter, you'll create the UI System—your application's visual design language. This document defines colors, typography, spacing, and component specifications that ensure visual consistency across every screen. By the end of this chapter, you'll have a complete design system ready to guide implementation.

## 11.1 UI System Purpose

The UI System defines the visual language: colors, typography, spacing, components. It ensures visual consistency across the entire application. Without a defined system, each screen risks becoming visually inconsistent, making the product feel unprofessional.

**What you'll accomplish:** Create a comprehensive UI System covering design tokens, component library, layout system, and visual direction.

## 11.2 UI System Prompt

Continue in the same Claude Chat session where you created the UX Package. This ensures the UI components align with the screens and flows you've already defined. Claude will create visual specifications for every component your UX requires.

> **Run in:** Claude Chat · **Session:** Same Chat · continues UX/UI work

> Prompt file: [`prompts/D-11-1-ui-system.md`](../../prompts/D-11-1-ui-system.md)

```text
Create a UI System for [PRODUCT NAME].

**Design Brief**: [ATTACH]
**UX Package**: [ATTACH]

The UI System should define:

**SECTION 1: Design Tokens**
- Color palette (primary, secondary, semantic, neutrals)
- Typography scale (font families, sizes, weights, line heights)
- Spacing scale (4px base recommended)
- Border radius scale
- Shadow scale

**SECTION 2: Component Library**
For each component:
- Visual design (all states)
- Variants (sizes, styles)
- Behavior specifications
- Accessibility requirements

Components needed:
- Button (primary, secondary, ghost, destructive)
- Input (text, email, password, textarea)
- Select
- Checkbox, Radio
- Card
- Modal
- Toast/Notification
- Table
- Form field (with label, error, helper text)

**SECTION 3: Layout System**
- Grid system
- Container widths
- Page layouts
- Responsive breakpoints

**SECTION 4: Visual Direction**
- Overall aesthetic (minimal, bold, playful, professional)
- Photography/illustration style
- Icon style
- Motion principles

Output in markdown format, ready to save as docs/ui-system.md.
```

> **Expected Outcome**
>
> **What you should have:** A comprehensive UI System document (typically 1,500-3,000 words) covering all four sections: design tokens, component library, layout system, and visual direction.
>
> **How to validate:** Design tokens should include specific values (hex codes, pixel sizes). Component library should define all states for each component (default, hover, active, disabled, error).
>
> **Next:** Save the UI System to your project.

## 11.3 Save the UI System

Save the UI System so it can be referenced during implementation. Developers will use these specifications to build components that match your design vision exactly.

### Instructions

1. Copy the complete UI System output from Claude Chat
2. Save as `docs/ui-system.md`

> **Expected Outcome**
>
> **What you should have:** A file at `docs/ui-system.md` containing your complete UI System.
>
> **How to validate:** Open the file and verify all four sections are present. Design tokens should have copy-pasteable values (e.g., `#1a365d`, `16px`, `1.5rem`).
>
> **Next:** Chapter 12 — Optionally explore visual direction alternatives.

## 11.4 Chapter Summary

You've created your UI System. What you accomplished:

- Defined design tokens for colors, typography, spacing, and shadows
- Created component library with specifications for all UI elements
- Established layout system with grid and breakpoints
- Set visual direction for overall aesthetic

In the next chapter, you can optionally explore alternative visual directions before committing to a final design.
