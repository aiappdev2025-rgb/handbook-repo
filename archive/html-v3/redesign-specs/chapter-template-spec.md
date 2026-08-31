# Chapter Template Format Specification

## MOAI Handbook v3.1 Redesign
**Task 1.2** | Phase 1: Architecture | Claude Chat

---

## Overview

Every chapter in the handbook MUST follow this standardized template to address the UX issues identified in the review:
- **Timing ambiguity** → "When to Use" callout
- **Action vs concept mixing** → Clear separation of steps from explanations
- **Missing decision criteria** → Prerequisites checklist with gates

---

## Template Structure

```
┌─────────────────────────────────────────────────────────────┐
│  CHAPTER HEADER                                             │
│  ├── Title (H1)                                             │
│  ├── Subtitle (optional)                                    │
│  └── Reading time estimate                                  │
├─────────────────────────────────────────────────────────────┤
│  TL;DR BOX                                                  │
│  3-sentence summary: What + Why + Outcome                   │
├─────────────────────────────────────────────────────────────┤
│  WHEN TO USE CALLOUT                                        │
│  ├── ✅ Use this when: [triggers]                           │
│  ├── ⏳ Not yet if: [prerequisites not met]                 │
│  └── ⏭️ Skip if: [conditions to skip]                       │
├─────────────────────────────────────────────────────────────┤
│  PREREQUISITES CHECKLIST                                    │
│  ☐ Artifact 1 complete                                      │
│  ☐ Artifact 2 complete                                      │
│  ☐ Tool/access requirement                                  │
├─────────────────────────────────────────────────────────────┤
│  MAIN CONTENT                                               │
│  ├── Concept sections (collapsible "Learn More")            │
│  ├── Action Steps (numbered, concrete)                      │
│  ├── Code blocks / Templates (with copy button)             │
│  └── Decision points (if/then guidance)                     │
├─────────────────────────────────────────────────────────────┤
│  EXPECTED OUTPUT                                            │
│  What artifact/state exists after completing this chapter   │
├─────────────────────────────────────────────────────────────┤
│  VERIFICATION CHECKLIST                                     │
│  ☐ Check 1: How to confirm correctness                      │
│  ☐ Check 2: Quality criteria met                            │
│  ☐ Check 3: Ready for next step                             │
├─────────────────────────────────────────────────────────────┤
│  NEXT STEPS                                                 │
│  → Next Chapter: [Title]                                    │
│  → Related: [Optional cross-references]                     │
├─────────────────────────────────────────────────────────────┤
│  CHAPTER NAVIGATION                                         │
│  ← Previous: [Chapter N-1]    [N/43]    Next: [Chapter N+1] →│
└─────────────────────────────────────────────────────────────┘
```

---

## MDX Template

```mdx
---
sidebar_position: {CHAPTER_NUMBER}
title: "{CHAPTER_TITLE}"
description: "{SEO_DESCRIPTION}"
---

import { TldrBox, WhenToUse, Prerequisites, ExpectedOutput, Verification, NextSteps } from '@site/src/components/ChapterComponents';

# {CHAPTER_TITLE}

<span className="reading-time">⏱️ {X} min read</span>

<TldrBox>
**What:** One sentence describing what this chapter teaches.

**Why:** One sentence explaining why this matters for your SaaS.

**Outcome:** One sentence stating what you'll have after completing this.
</TldrBox>

<WhenToUse
  useWhen={[
    "You've completed [previous chapter/artifact]",
    "You're ready to [specific trigger]",
    "Your project needs [specific capability]"
  ]}
  notYetIf={[
    "You haven't completed [prerequisite]",
    "[Dependency] is not configured"
  ]}
  skipIf={[
    "Your project doesn't require [feature]",
    "You're using [alternative approach]"
  ]}
/>

<Prerequisites
  items={[
    { text: "Design Brief complete", link: "/phase1/design-brief" },
    { text: "UX Package complete", link: "/phase2/ux-package" },
    { text: "GitHub repository created", link: null }
  ]}
  gate={false} // Set true for GATE chapters
/>

## Section Title

Regular content goes here. Keep explanatory content concise.

<details>
<summary>💡 Learn More: Why This Matters</summary>

Expanded explanation for users who want deeper understanding.
This keeps the main flow clean while preserving depth.

</details>

### Action Steps

1. **First concrete action**
   
   Brief explanation if needed.
   
   ```bash
   # Command or code example
   example command here
   ```

2. **Second concrete action**
   
   Continue with numbered steps...

3. **Third concrete action**

### Decision Point

:::tip Choose Your Path
**If** your project has [condition A]:
→ Do [Action X]

**If** your project has [condition B]:
→ Do [Action Y]

**Default recommendation:** [Most common choice] for most bootstrapped SaaS projects.
:::

<ExpectedOutput>
After completing this chapter, you should have:

- **Artifact:** `{filename}` in your `docs/` folder
- **State:** [Description of project state]
- **Capability:** [What you can now do]
</ExpectedOutput>

<Verification
  checks={[
    "Artifact exists and contains all required sections",
    "[Specific quality criterion]",
    "[Testable condition]"
  ]}
/>

<NextSteps
  next={{
    chapter: {NEXT_CHAPTER_NUMBER},
    title: "{NEXT_CHAPTER_TITLE}",
    path: "/phase{X}/{slug}"
  }}
  related={[
    { title: "Related Topic", path: "/path" }
  ]}
/>
```

---

## Component Specifications

### 1. TldrBox

**Purpose:** Immediate context for scanning users

**Visual Design (Geometric Grid):**
```css
.tldr-box {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 0; /* Geometric = sharp corners */
  padding: 24px;
  margin: 24px 0;
  display: grid;
  grid-template-columns: 4px 1fr;
  gap: 16px;
}
.tldr-box::before {
  content: '';
  background: #0ea5e9;
  width: 4px;
}
```

### 2. WhenToUse

**Purpose:** Answer "Is this chapter relevant to me right now?"

**Visual Design:**
```css
.when-to-use {
  background: #fefce8;
  border: 2px solid #eab308;
  padding: 20px;
  margin: 24px 0;
}
.when-to-use .use-when { color: #16a34a; }
.when-to-use .not-yet { color: #ea580c; }
.when-to-use .skip-if { color: #6b7280; }
```

### 3. Prerequisites

**Purpose:** Gate check before starting

**Visual Design:**
```css
.prerequisites {
  background: #f8fafc;
  border: 2px solid #cbd5e1;
  padding: 20px;
}
.prerequisites.gate {
  border-color: #f59e0b;
  background: #fffbeb;
}
.prerequisites input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #10b981;
}
```

**Behavior:**
- Checkboxes persist to localStorage
- GATE chapters block "Next" button until all checked
- Links to prerequisite chapters

### 4. ExpectedOutput

**Purpose:** Clear definition of done

**Visual Design:**
```css
.expected-output {
  background: #f0fdf4;
  border: 2px solid #22c55e;
  padding: 20px;
}
```

### 5. Verification

**Purpose:** Self-assessment before moving on

**Visual Design:**
```css
.verification {
  background: #faf5ff;
  border: 2px solid #a855f7;
  padding: 20px;
}
```

### 6. NextSteps

**Purpose:** Clear path forward + cross-references

**Visual Design:**
```css
.next-steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  padding: 24px;
  background: #1e293b;
  color: white;
  margin-top: 48px;
}
```

---

## Chapter Navigation Component

Every chapter gets automatic Previous/Next navigation:

```jsx
// Auto-generated from sidebars.js
<ChapterNav
  previous={{ num: 6, title: "MVP Scoping", path: "/phase1/mvp-scoping" }}
  current={{ num: 7, title: "Design Brief", total: 43 }}
  next={{ num: 8, title: "Design Philosophy", path: "/phase2/design-philosophy" }}
/>
```

**Visual Design:**
```css
.chapter-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #0f172a;
  border-top: 1px solid #334155;
  position: sticky;
  bottom: 0;
}
.chapter-nav .prev, .chapter-nav .next {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}
.chapter-nav .prev:hover, .chapter-nav .next:hover {
  background: #1e293b;
  color: white;
}
.chapter-nav .progress {
  font-size: 14px;
  color: #64748b;
}
```

---

## Example: Chapter 7 - Design Brief

```mdx
---
sidebar_position: 7
title: "Design Brief"
description: "Create a comprehensive design brief that defines your product's scope, features, and success criteria"
---

import { TldrBox, WhenToUse, Prerequisites, ExpectedOutput, Verification, NextSteps } from '@site/src/components/ChapterComponents';

# Design Brief

<span className="reading-time">⏱️ 25 min read</span>

<TldrBox>
**What:** Create a structured document defining your product's features, user stories, and acceptance criteria.

**Why:** The Design Brief is the contract between planning and design—it ensures everyone agrees on what's being built before investing in UX/UI work.

**Outcome:** A complete `design-brief.md` artifact ready to drive your UX Package creation.
</TldrBox>

<WhenToUse
  useWhen={[
    "You've validated your business idea (Chapters 1-6)",
    "You have a clear MVP scope defined",
    "You're ready to move from 'what problem' to 'what solution'"
  ]}
  notYetIf={[
    "You haven't completed the Business One-Pager",
    "Your MVP scope is still unclear",
    "You're still validating product-market fit"
  ]}
  skipIf={[
    "You already have detailed PRD from another source",
    "You're iterating on an existing product (use existing specs)"
  ]}
/>

<Prerequisites
  items={[
    { text: "Business One-Pager complete", link: "/phase1/business-one-pager" },
    { text: "MVP Scoping complete", link: "/phase1/mvp-scoping" },
    { text: "Competitive Analysis complete", link: "/phase1/competitive-analysis" }
  ]}
/>

## What is a Design Brief?

A Design Brief bridges business strategy and product design...

<details>
<summary>💡 Learn More: Design Brief vs PRD vs Spec</summary>

**Design Brief** (this chapter): High-level features and user stories. Written in Claude Chat.

**PRD (Product Requirements Doc)**: More detailed, often includes wireframes. We fold this into UX Package.

**SPEC Document**: Implementation-level detail for Claude Code. Created in Phase 4.

</details>

### Action Steps

1. **Copy the Design Brief template**
   
   ```bash
   # From templates folder
   cp templates/design-brief-template.md docs/design-brief.md
   ```
   
   <a href="/templates/design-brief" className="template-download">📋 Download Template</a>

2. **Fill in the Product Overview section**
   
   Use your Business One-Pager to populate...

3. **Define Core Features (MVP)**
   
   List 3-5 features maximum...

4. **Write User Stories**
   
   Format: "As a [user], I want to [action] so that [benefit]"

5. **Set Acceptance Criteria**
   
   Each feature needs testable criteria...

<ExpectedOutput>
After completing this chapter, you should have:

- **Artifact:** `docs/design-brief.md` (2-4 pages)
- **Sections:** Product Overview, Core Features, User Stories, Acceptance Criteria, Out of Scope
- **Ready for:** UX Package creation in Phase 2
</ExpectedOutput>

<Verification
  checks={[
    "Design Brief contains 3-5 core MVP features (not more)",
    "Each feature has at least 2 user stories",
    "Each user story has testable acceptance criteria",
    "Out of Scope section explicitly lists deferred features"
  ]}
/>

<NextSteps
  next={{
    chapter: 8,
    title: "Design Philosophy",
    path: "/phase2/design-philosophy"
  }}
  related={[
    { title: "UX Package", path: "/phase2/ux-package" },
    { title: "Build Contract", path: "/phase3/build-contract" }
  ]}
/>
```

---

## Implementation Notes for Claude Code

When you scaffold Docusaurus, create these component files:

```
docusaurus/
└── src/
    └── components/
        └── ChapterComponents/
            ├── index.js          # Export all
            ├── TldrBox.jsx
            ├── WhenToUse.jsx
            ├── Prerequisites.jsx
            ├── ExpectedOutput.jsx
            ├── Verification.jsx
            ├── NextSteps.jsx
            └── ChapterNav.jsx
```

---

## Task 1.2 Checklist

- [x] Define template structure
- [x] Specify all component types
- [x] Provide visual design specs (Geometric Grid aligned)
- [x] Include MDX code template
- [x] Show real example (Chapter 7)
- [x] Document implementation path for Claude Code

---

**Status:** ✅ Task 1.2 Complete
**Next:** Task 1.3 - Create "When to Use" criteria for each chapter
