---
chapter: 47
title: "Component Library Spec"
slug: "47-component-library"
phase: 2
phase_name: "Design"
milestone: null
checkpoint: null
tool: "claude-chat"
session: "continue"
estimated_time: "20 min read"
description: "Document component states, variants, and implementation details for development"
prerequisites:
  - "UI System complete"
  - "UX Package validated"
when_to_use:
  - "UI System is defined with design tokens"
  - "Preparing for implementation phase"
  - "Need to document component states and variants"
skip_if: "Using a component library with existing documentation (shadcn/ui, Radix)"
source_mdx: "archive/docusaurus/docs/phase-2-design/component-library.mdx"
---

# Chapter 47: Component Library Spec

> **TL;DR**
> Document detailed component specifications including states, variants, props, and accessibility requirements.
>
> **Why:** Detailed specs ensure developers build components that match design intent exactly—no guessing required.
>
> **Outcome:** A complete component spec document ready for implementation in Phase 4.

> **When to use**
>
> - UI System is defined with design tokens
> - Preparing for implementation phase
> - Need to document component states and variants
>
> **Skip if:** Using a component library with existing documentation (shadcn/ui, Radix)

**Prerequisites**

- [ ] UI System complete
- [ ] UX Package validated

## Why Detailed Component Specs?

The UI System defines design tokens and visual direction. The Component Library Spec goes deeper—documenting every state, variant, and behavior so developers have no questions.

## Component Documentation Template

For each component, document:

```markdown
## [Component Name]

### Purpose
What this component is for and when to use it.

### Variants
| Variant | Use Case |
|---------|----------|
| variant-1 | When to use this variant |
| variant-2 | When to use this variant |

### Sizes
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px | 12px | 14px |
| md | 40px | 16px | 16px |
| lg | 48px | 24px | 18px |

### States
| State | Appearance | Trigger |
|-------|------------|---------|
| default | Normal | Initial |
| hover | Highlight | Mouse over |
| active | Pressed | Mouse down |
| focus | Ring | Keyboard focus |
| disabled | Muted | disabled prop |
| loading | Spinner | loading prop |
| error | Red border | error prop |

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Visual variant |
| size | string | 'md' | Component size |
| disabled | boolean | false | Disable interaction |
| loading | boolean | false | Show loading state |

### Accessibility
- Role: `button`
- Keyboard: Enter/Space to activate
- ARIA: `aria-disabled` when disabled
- Focus: Visible focus ring
```

## Core Components to Document

### 1. Button

```markdown
## Button

### Variants
- **Primary**: Main call-to-action (one per screen)
- **Secondary**: Supporting actions
- **Ghost**: Tertiary actions, in toolbars
- **Destructive**: Delete, remove actions
- **Link**: Navigation that looks like text

### States
Default → Hover (darken 10%) → Active (darken 20%) → Disabled (opacity 50%)

### Loading State
- Spinner replaces text
- Minimum 500ms display (prevent flash)
- `aria-busy="true"` when loading
```

### 2. Form Input

```markdown
## Input

### Variants
- **Default**: Standard text input
- **With Icon**: Leading or trailing icon
- **With Addon**: Prefix/suffix text (e.g., "$", ".com")

### States
- **Default**: Gray border
- **Focus**: Blue border, subtle shadow
- **Error**: Red border, error message below
- **Disabled**: Gray background, no interaction

### Validation
- Validate on blur (not on every keystroke)
- Show error message below field
- Preserve user input on error
```

### 3. Modal/Dialog

```markdown
## Modal

### Behavior
- Trap focus within modal
- Close on Escape key
- Close on backdrop click (optional)
- Prevent body scroll when open

### Sizes
- **sm**: 400px max-width (confirmations)
- **md**: 500px max-width (forms)
- **lg**: 700px max-width (complex content)
- **full**: 90vw (large tables/editors)

### Accessibility
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby` pointing to title
- Return focus to trigger on close
```

### 4. Toast/Notification

```markdown
## Toast

### Variants
- **Success**: Green, checkmark icon
- **Error**: Red, X icon
- **Warning**: Yellow, warning icon
- **Info**: Blue, info icon

### Behavior
- Stack from bottom-right
- Auto-dismiss: 5s (success), manual (error)
- Max 3 visible at once
- Swipe to dismiss on mobile

### Accessibility
- `role="status"` (or `alert` for errors)
- `aria-live="polite"` (or `assertive` for errors)
```

### 5. Table

```markdown
## Table

### Features
- Sortable columns (click header)
- Row selection (checkbox column)
- Pagination (bottom)
- Empty state (centered message)

### States
- **Loading**: Skeleton rows
- **Empty**: Centered message + CTA
- **Error**: Retry message

### Responsive
- Horizontal scroll below 768px
- Or stack to cards on mobile
```

## Visual Direction Options

Before finalizing, consider exploring alternatives:

### Exploration Prompt

### Component Library Prompt

> Prompt file: [`prompts/S-component-library.md`](../../prompts/S-component-library.md)

```text
Specify component library for [PRODUCT_NAME].

**UI System**: Reference the design tokens from ui-system.md
**Core Features**: [CORE_FEATURES]

For each component, define:

1. **Component Name**: Clear identifier
2. **Purpose**: When and why to use this component
3. **Props/Variants**: All configuration options
   - variant: primary, secondary, ghost, destructive
   - size: sm, md, lg
   - state: default, loading, disabled
4. **States**: Visual appearance for each state
   - default, hover, active, focus, disabled, error, loading
5. **Responsive Behavior**: How it adapts to screen sizes
6. **Accessibility Requirements**:
   - ARIA attributes
   - Keyboard navigation
   - Focus management

Document these components:
- Button, IconButton, ButtonGroup
- Input, Textarea, Select, Checkbox, Radio, Switch
- Card, Modal, Drawer, Popover
- Toast, Alert, Badge
- Table, List, Pagination
- Avatar, Tooltip, Skeleton

Output as component-library.md
```

### When to Explore

| Explore | Skip |
|---------|------|
| Consumer products | Internal tools |
| Brand-driven products | B2B utilities |
| Design as differentiator | Time-constrained MVPs |

## Phase 2 Complete

You've now completed Phase 2: Design. Your artifacts:

- **Design Brief**: Product vision and vocabulary
- **Design Philosophy**: UX principles
- **UX Package**: Complete screen and flow specs
- **UI System**: Visual design tokens
- **Component Library Spec**: Detailed component documentation

These artifacts form the foundation for technical implementation in Phase 3.
