# Component Design Specifications

## MOAI Handbook v3.1 Redesign
**Task 1.4** | Phase 1: Architecture | Claude Chat

---

## Design System: Geometric Grid

### Core Principles

1. **Mathematical Precision** — All spacing uses 8px base grid
2. **Sharp Edges** — No border-radius (0px) except for interactive states
3. **Visible Structure** — Grid lines, borders, and separators are design elements
4. **Monochrome + Accent** — Primarily grayscale with strategic color accents
5. **Typography Hierarchy** — Clear size/weight distinctions

### Base Grid

```
8px  = 0.5rem  (micro spacing)
16px = 1rem   (standard)
24px = 1.5rem (comfortable)
32px = 2rem   (section gap)
48px = 3rem   (major section)
64px = 4rem   (page section)
```

### Color Palette

```css
:root {
  /* Grayscale */
  --gray-950: #0a0a0a;  /* Darkest background */
  --gray-900: #171717;  /* Dark background */
  --gray-800: #262626;  /* Card background */
  --gray-700: #404040;  /* Borders */
  --gray-600: #525252;  /* Muted text */
  --gray-500: #737373;  /* Secondary text */
  --gray-400: #a3a3a3;  /* Placeholder */
  --gray-300: #d4d4d4;  /* Body text */
  --gray-200: #e5e5e5;  /* Light borders */
  --gray-100: #f5f5f5;  /* Light background */
  --gray-50:  #fafafa;  /* Lightest background */
  --white:    #ffffff;
  
  /* Accent Colors */
  --accent-blue:    #3b82f6;  /* Primary actions, links */
  --accent-green:   #22c55e;  /* Success, complete */
  --accent-amber:   #f59e0b;  /* Warning, in-progress */
  --accent-red:     #ef4444;  /* Error, critical */
  --accent-purple:  #a855f7;  /* Interactive tools */
  
  /* Phase Colors */
  --phase-1: #3b82f6;  /* Validate - Blue */
  --phase-2: #ec4899;  /* Design - Pink */
  --phase-3: #22c55e;  /* Architect - Green */
  --phase-4: #a855f7;  /* Build - Purple */
  --phase-5: #f59e0b;  /* Launch - Amber */
}
```

### Typography

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Scale */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
}
```

---

## Component Specifications

### 1. TL;DR Box

**Purpose:** Immediate chapter context

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ ▌ TL;DR                                                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ **What:** One sentence description                           │
│                                                              │
│ **Why:** One sentence rationale                              │
│                                                              │
│ **Outcome:** One sentence deliverable                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.tldr-box {
  background: var(--gray-900);
  border: 1px solid var(--gray-700);
  border-left: 4px solid var(--accent-blue);
  padding: 0;
  margin: 32px 0;
}

.tldr-box__header {
  background: var(--gray-800);
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-700);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent-blue);
}

.tldr-box__content {
  padding: 24px;
  display: grid;
  gap: 16px;
}

.tldr-box__item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
}

.tldr-box__label {
  font-weight: 600;
  color: var(--gray-400);
}

.tldr-box__value {
  color: var(--gray-200);
}
```

---

### 2. When To Use Callout

**Purpose:** Timing guidance

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ WHEN TO USE                                                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ✓ USE WHEN                     │ ⏳ NOT YET IF               │
│ ─────────────────────────────  │ ─────────────────────────── │
│ • Trigger condition 1          │ • Prerequisite 1            │
│ • Trigger condition 2          │ • Prerequisite 2            │
│                                │                             │
│ ───────────────────────────────────────────────────────────  │
│ ⏭️ SKIP IF: Condition where chapter isn't needed             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.when-to-use {
  background: var(--gray-900);
  border: 1px solid var(--gray-700);
  margin: 32px 0;
}

.when-to-use__header {
  background: var(--gray-800);
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-700);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--gray-400);
}

.when-to-use__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--gray-700);
}

.when-to-use__column {
  padding: 24px;
}

.when-to-use__column:first-child {
  border-right: 1px solid var(--gray-700);
}

.when-to-use__column-title {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.when-to-use__column--use .when-to-use__column-title {
  color: var(--accent-green);
}

.when-to-use__column--not .when-to-use__column-title {
  color: var(--accent-amber);
}

.when-to-use__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.when-to-use__list li {
  padding: 6px 0 6px 20px;
  position: relative;
  color: var(--gray-300);
  font-size: var(--text-sm);
}

.when-to-use__list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--gray-500);
}

.when-to-use__skip {
  padding: 16px 24px;
  background: var(--gray-950);
  font-size: var(--text-sm);
  color: var(--gray-400);
}

.when-to-use__skip-label {
  color: var(--gray-500);
  font-weight: 600;
  margin-right: 8px;
}
```

---

### 3. Prerequisites Checklist

**Purpose:** Gate verification before starting

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ ☐ PREREQUISITES                                    [0/3]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ☐ Design Brief complete                      [→ Chapter 7]   │
│ ☐ UX Package complete                        [→ Chapter 9]   │
│ ☐ GitHub repository created                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**GATE variant (amber border):**
```
┌──────────────────────────────────────────────────────────────┐
│▌🚪 GATE: Complete all items before proceeding        [0/3]   │
├──────────────────────────────────────────────────────────────┤
```

**CSS:**
```css
.prerequisites {
  background: var(--gray-900);
  border: 1px solid var(--gray-700);
  margin: 32px 0;
}

.prerequisites--gate {
  border-color: var(--accent-amber);
  border-left-width: 4px;
}

.prerequisites__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--gray-800);
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-700);
}

.prerequisites__title {
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--gray-400);
  display: flex;
  align-items: center;
  gap: 8px;
}

.prerequisites--gate .prerequisites__title {
  color: var(--accent-amber);
}

.prerequisites__count {
  font-size: var(--text-xs);
  color: var(--gray-500);
  font-family: var(--font-mono);
}

.prerequisites__list {
  padding: 16px 24px;
}

.prerequisites__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--gray-800);
}

.prerequisites__item:last-child {
  border-bottom: none;
}

.prerequisites__checkbox {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.prerequisites__checkbox input {
  width: 20px;
  height: 20px;
  accent-color: var(--accent-green);
  cursor: pointer;
}

.prerequisites__checkbox input:checked + span {
  color: var(--accent-green);
  text-decoration: line-through;
}

.prerequisites__link {
  font-size: var(--text-xs);
  color: var(--accent-blue);
  text-decoration: none;
  font-family: var(--font-mono);
}

.prerequisites__link:hover {
  text-decoration: underline;
}
```

**JavaScript Behavior:**
```javascript
// Persist to localStorage
// Block "Next" button on GATE chapters until all checked
// Update count display on change
```

---

### 4. Code Block

**Purpose:** Copyable code snippets

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ FILENAME.EXT                                        [COPY]   │
├──────────────────────────────────────────────────────────────┤
│ 1 │ const example = {                                        │
│ 2 │   property: 'value',                                     │
│ 3 │ };                                                       │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.code-block {
  background: var(--gray-950);
  border: 1px solid var(--gray-700);
  margin: 24px 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}

.code-block__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: var(--gray-800);
  border-bottom: 1px solid var(--gray-700);
}

.code-block__filename {
  font-size: var(--text-xs);
  color: var(--gray-400);
  letter-spacing: 0.05em;
}

.code-block__copy {
  font-size: var(--text-xs);
  color: var(--accent-blue);
  background: transparent;
  border: 1px solid var(--accent-blue);
  padding: 4px 12px;
  cursor: pointer;
  transition: all 0.15s;
}

.code-block__copy:hover {
  background: var(--accent-blue);
  color: var(--white);
}

.code-block__copy--copied {
  border-color: var(--accent-green);
  color: var(--accent-green);
}

.code-block__content {
  padding: 16px;
  overflow-x: auto;
  display: grid;
  grid-template-columns: auto 1fr;
}

.code-block__lines {
  color: var(--gray-600);
  text-align: right;
  padding-right: 16px;
  border-right: 1px solid var(--gray-800);
  user-select: none;
}

.code-block__code {
  padding-left: 16px;
  color: var(--gray-200);
}
```

---

### 5. Expected Output

**Purpose:** Definition of done

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ ✓ EXPECTED OUTPUT                                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ After completing this chapter, you should have:              │
│                                                              │
│ • Artifact: `design-brief.md` in your `docs/` folder         │
│ • State: MVP scope locked and documented                     │
│ • Capability: Ready to begin UX Package                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.expected-output {
  background: var(--gray-900);
  border: 1px solid var(--accent-green);
  border-left-width: 4px;
  margin: 32px 0;
}

.expected-output__header {
  background: rgba(34, 197, 94, 0.1);
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-700);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent-green);
}

.expected-output__content {
  padding: 24px;
}

.expected-output__intro {
  color: var(--gray-400);
  margin-bottom: 16px;
}

.expected-output__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.expected-output__list li {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--gray-800);
}

.expected-output__list li:last-child {
  border-bottom: none;
}

.expected-output__label {
  font-weight: 600;
  color: var(--gray-500);
  font-size: var(--text-sm);
}

.expected-output__value {
  color: var(--gray-200);
}

.expected-output__value code {
  background: var(--gray-800);
  padding: 2px 6px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--accent-blue);
}
```

---

### 6. Verification Checklist

**Purpose:** Self-assessment before proceeding

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ ✓ VERIFICATION                                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ☐ Design Brief contains 3-5 core MVP features                │
│ ☐ Each feature has at least 2 user stories                   │
│ ☐ Out of Scope section explicitly lists deferred features    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.verification {
  background: var(--gray-900);
  border: 1px solid var(--accent-purple);
  border-left-width: 4px;
  margin: 32px 0;
}

.verification__header {
  background: rgba(168, 85, 247, 0.1);
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-700);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent-purple);
}

.verification__list {
  padding: 16px 24px;
}

.verification__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-800);
}

.verification__item:last-child {
  border-bottom: none;
}

.verification__item input {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--accent-purple);
}

.verification__item label {
  color: var(--gray-300);
  font-size: var(--text-sm);
  line-height: 1.5;
}
```

---

### 7. Chapter Navigation

**Purpose:** Previous/Next navigation + progress

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│ ← Chapter 6                               Chapter 8 →        │
│   MVP Scoping              7 / 43         Design Philosophy  │
│                           ═══════                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.chapter-nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 32px;
  padding: 24px 32px;
  background: var(--gray-950);
  border-top: 1px solid var(--gray-700);
  margin-top: 64px;
}

.chapter-nav__prev,
.chapter-nav__next {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
  padding: 16px;
  transition: background 0.15s;
}

.chapter-nav__prev:hover,
.chapter-nav__next:hover {
  background: var(--gray-900);
}

.chapter-nav__prev {
  align-items: flex-start;
}

.chapter-nav__next {
  align-items: flex-end;
  text-align: right;
}

.chapter-nav__label {
  font-size: var(--text-xs);
  color: var(--gray-500);
  display: flex;
  align-items: center;
  gap: 4px;
}

.chapter-nav__title {
  font-size: var(--text-base);
  color: var(--gray-200);
  font-weight: 500;
}

.chapter-nav__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.chapter-nav__progress-text {
  font-size: var(--text-sm);
  color: var(--gray-500);
  font-family: var(--font-mono);
}

.chapter-nav__progress-bar {
  width: 120px;
  height: 4px;
  background: var(--gray-800);
}

.chapter-nav__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-purple));
}
```

---

### 8. Sidebar Navigation

**Purpose:** Persistent chapter navigation

**Structure:**
```
┌─────────────────────────┐
│ MOAI HANDBOOK           │
│ ═══════════════════════ │
│                         │
│ ▼ Getting Started       │
│   ├─ Quick Start       │
│   └─ I Need To...       │
│                         │
│ ▶ Phase 1: Validate     │
│ ▶ Phase 2: Design       │
│ ▼ Phase 3: Architect    │
│   ├─ 13. Architecture   │
│   ├─ 14. Data Model     │
│   ├─ ...                │
│   ├─ 21. Build Contract │ 🚪
│   └─ 22. Dev Setup      │ 🚪
│                         │
│ ▶ Phase 4: Build        │
│ ▶ Phase 5: Launch       │
│                         │
│ ─────────────────────── │
│ ▶ Reference Guides      │
│ ▶ Templates             │
│ ▶ Tools                 │
└─────────────────────────┘
```

**CSS:**
```css
.sidebar {
  width: 280px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: var(--gray-900);
  border-right: 1px solid var(--gray-700);
  overflow-y: auto;
  padding: 24px 0;
}

.sidebar__logo {
  padding: 0 24px 24px;
  border-bottom: 1px solid var(--gray-700);
  margin-bottom: 16px;
}

.sidebar__logo-text {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--white);
  letter-spacing: -0.025em;
}

.sidebar__section {
  margin-bottom: 8px;
}

.sidebar__section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  cursor: pointer;
  transition: background 0.15s;
}

.sidebar__section-header:hover {
  background: var(--gray-800);
}

.sidebar__section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--gray-300);
}

.sidebar__section-icon {
  font-size: var(--text-base);
}

.sidebar__section-count {
  font-size: var(--text-xs);
  color: var(--gray-500);
  font-family: var(--font-mono);
}

.sidebar__section-items {
  border-left: 1px solid var(--gray-700);
  margin-left: 32px;
  padding-left: 16px;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 0;
  font-size: var(--text-sm);
  color: var(--gray-400);
  text-decoration: none;
  transition: color 0.15s;
}

.sidebar__item:hover {
  color: var(--white);
}

.sidebar__item--active {
  color: var(--accent-blue);
  font-weight: 500;
}

.sidebar__item-number {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--gray-600);
  min-width: 24px;
}

.sidebar__item-gate {
  font-size: var(--text-xs);
  color: var(--accent-amber);
}

.sidebar__divider {
  height: 1px;
  background: var(--gray-700);
  margin: 16px 24px;
}
```

---

### 9. Progress Tracker (Header)

**Purpose:** Global progress visibility

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ VALIDATE ████████░░ DESIGN ████░░░░░░ ARCHITECT ░░░░░░░░░░   │
│ 7/7 ✓           5/5 ✓              3/10                      │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.progress-tracker {
  display: flex;
  gap: 4px;
  padding: 16px 24px;
  background: var(--gray-950);
  border-bottom: 1px solid var(--gray-700);
}

.progress-tracker__phase {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-tracker__label {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--gray-500);
}

.progress-tracker__name {
  font-weight: 600;
  letter-spacing: 0.05em;
}

.progress-tracker__count {
  font-family: var(--font-mono);
}

.progress-tracker__bar {
  height: 4px;
  background: var(--gray-800);
}

.progress-tracker__fill {
  height: 100%;
  transition: width 0.3s;
}

.progress-tracker__phase--validate .progress-tracker__fill { background: var(--phase-1); }
.progress-tracker__phase--design .progress-tracker__fill { background: var(--phase-2); }
.progress-tracker__phase--architect .progress-tracker__fill { background: var(--phase-3); }
.progress-tracker__phase--build .progress-tracker__fill { background: var(--phase-4); }
.progress-tracker__phase--launch .progress-tracker__fill { background: var(--phase-5); }
```

---

### 10. Template Download Button

**Purpose:** Inline template access at point-of-use

**Structure:**
```
┌──────────────────────────────────────────────────────────────┐
│ 📋 SPEC-TEMPLATE.MD                               [DOWNLOAD] │
│    SPEC document template for feature implementation         │
└──────────────────────────────────────────────────────────────┘
```

**CSS:**
```css
.template-download {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--gray-900);
  border: 1px solid var(--gray-700);
  padding: 16px 20px;
  margin: 16px 0;
  transition: border-color 0.15s;
}

.template-download:hover {
  border-color: var(--accent-blue);
}

.template-download__info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.template-download__icon {
  font-size: var(--text-xl);
}

.template-download__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.template-download__name {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--gray-200);
}

.template-download__desc {
  font-size: var(--text-xs);
  color: var(--gray-500);
}

.template-download__button {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--accent-blue);
  background: transparent;
  border: 1px solid var(--accent-blue);
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.15s;
}

.template-download__button:hover {
  background: var(--accent-blue);
  color: var(--white);
}
```

---

## Task 1.4 Checklist

- [x] Define design system (Geometric Grid principles)
- [x] Color palette with phase colors
- [x] Typography scale
- [x] TL;DR Box component
- [x] When To Use component
- [x] Prerequisites component (with GATE variant)
- [x] Code Block component
- [x] Expected Output component
- [x] Verification Checklist component
- [x] Chapter Navigation component
- [x] Sidebar Navigation component
- [x] Progress Tracker component
- [x] Template Download component

---

**Status:** ✅ Task 1.4 Complete
**Next:** Task 1.5 - Output Architecture Spec document for Claude Code (DOCUSAURUS-SETUP-SPEC.md)
