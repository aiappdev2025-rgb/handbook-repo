# DOCUSAURUS SETUP SPEC

## MOAI Handbook v3.1 Redesign
**Build Contract for Phase 2: Scaffold**

---

## Overview

This spec document provides Claude Code with everything needed to scaffold the Docusaurus project for the MOAI Handbook redesign.

**Source Documents:**
- IA Diagram: `handbook-ia-tracker.jsx`
- Chapter Template: `chapter-template-spec.md`
- When to Use Criteria: `when-to-use-criteria.md`
- Component Specs: `component-design-specs.md`

---

## Project Structure

```
handbook-repo/
├── docs/                    # CURRENT: Keep as archive reference
├── templates/               # CURRENT: Keep as-is
├── archive/v2.2/           # CURRENT: Keep as-is
├── CLAUDE.md               # CURRENT: Update with new project context
├── README.md               # UPDATE: Point to new docs site
│
└── docusaurus/             # NEW: Docusaurus project
    ├── docs/               # NEW: MDX content
    │   ├── getting-started/
    │   │   ├── quick-start.mdx
    │   │   └── quick-reference.mdx
    │   ├── phase-1-validate/
    │   │   ├── _category_.json
    │   │   ├── 01-introduction.mdx
    │   │   ├── 02-market-research.mdx
    │   │   ├── 03-opportunity-assessment.mdx
    │   │   ├── 04-business-one-pager.mdx
    │   │   ├── 05-competitive-analysis.mdx
    │   │   ├── 06-mvp-scoping.mdx
    │   │   └── 07-design-brief.mdx
    │   ├── phase-2-design/
    │   │   ├── _category_.json
    │   │   ├── 08-design-philosophy.mdx
    │   │   ├── 09-ux-package.mdx
    │   │   ├── 10-user-flows.mdx
    │   │   ├── 11-ui-system.mdx
    │   │   └── 12-component-library.mdx
    │   ├── phase-3-architect/
    │   │   ├── _category_.json
    │   │   ├── 13-solution-architecture.mdx
    │   │   ├── 14-data-model.mdx
    │   │   ├── 15-api-specification.mdx
    │   │   ├── 16-security.mdx
    │   │   ├── 17-infrastructure.mdx
    │   │   ├── 18-multi-environment.mdx
    │   │   ├── 19-adr-templates.mdx
    │   │   ├── 20-test-strategy.mdx
    │   │   ├── 21-build-contract.mdx
    │   │   └── 22-dev-environment.mdx
    │   ├── phase-4-build/
    │   │   ├── _category_.json
    │   │   ├── 23-moai-overview.mdx
    │   │   ├── 24-spec-first.mdx
    │   │   ├── 25-tdd-workflow.mdx
    │   │   ├── 26-quality-gates.mdx
    │   │   ├── 27-m1-foundation.mdx
    │   │   ├── ... (milestones 2-11)
    │   │   └── 41-m11-prelaunch.mdx
    │   ├── phase-5-launch/
    │   │   ├── _category_.json
    │   │   ├── 42-qa-deployment.mdx
    │   │   └── 43-launch-checklist.mdx
    │   ├── reference/
    │   │   ├── _category_.json
    │   │   ├── workflow-guide.mdx
    │   │   ├── claude-code-timing.mdx
    │   │   ├── ears-syntax.mdx
    │   │   └── troubleshooting.mdx
    │   └── templates/
    │       ├── _category_.json
    │       ├── claude-md.mdx
    │       ├── spec-template.mdx
    │       ├── build-contract.mdx
    │       ├── quality-checklist.mdx
    │       └── tech-debt.mdx
    │
    ├── src/
    │   ├── components/
    │   │   └── ChapterComponents/
    │   │       ├── index.js
    │   │       ├── TldrBox.jsx
    │   │       ├── WhenToUse.jsx
    │   │       ├── Prerequisites.jsx
    │   │       ├── ExpectedOutput.jsx
    │   │       ├── Verification.jsx
    │   │       ├── NextSteps.jsx
    │   │       ├── ChapterNav.jsx
    │   │       └── TemplateDownload.jsx
    │   ├── css/
    │   │   └── custom.css           # Geometric Grid theme
    │   ├── pages/
    │   │   └── index.js             # Landing page
    │   └── theme/
    │       └── DocItem/             # Custom chapter layout
    │
    ├── static/
    │   ├── img/
    │   └── templates/               # Downloadable template files
    │       ├── CLAUDE.md
    │       ├── spec-template.md
    │       ├── build-contract-template.md
    │       ├── quality-checklist.md
    │       └── tech-debt-audit.md
    │
    ├── docusaurus.config.js
    ├── sidebars.js
    ├── package.json
    └── tsconfig.json
```

---

## Step 1: Initialize Project

```bash
# From handbook-repo root
npx create-docusaurus@latest docusaurus classic --typescript

cd docusaurus

# Install additional dependencies
npm install @docusaurus/plugin-ideal-image
npm install @mdx-js/react
npm install clsx
```

---

## Step 2: Configure docusaurus.config.js

```javascript
// docusaurus.config.js
const config = {
  title: 'MOAI Handbook',
  tagline: 'Complete Methodology for Building Production-Quality SaaS with AI',
  favicon: 'img/favicon.ico',
  url: 'https://handbook.yourdomain.com',
  baseUrl: '/',
  organizationName: 'aiappdev2025-rgb',
  projectName: 'handbook-repo',
  
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Docs at root
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/aiappdev2025-rgb/handbook-repo/tree/main/docusaurus/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    
    navbar: {
      title: 'MOAI Handbook',
      logo: {
        alt: 'MOAI',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'handbookSidebar',
          position: 'left',
          label: 'Handbook',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/aiappdev2025-rgb/handbook-repo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      copyright: `MOAI Handbook v3.1 • ${new Date().getFullYear()}`,
    },

    prism: {
      theme: require('prism-react-renderer').themes.vsDark,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'mdx'],
    },
  },
};

module.exports = config;
```

---

## Step 3: Configure sidebars.js

```javascript
// sidebars.js
const sidebars = {
  handbookSidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'getting-started/quick-start',
        'getting-started/quick-reference',
      ],
    },
    {
      type: 'category',
      label: '🔍 Phase 1: Validate',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 1: Validate',
        description: 'Research, planning, and business validation',
        slug: '/phase-1-validate',
      },
      items: [
        'phase-1-validate/01-introduction',
        'phase-1-validate/02-market-research',
        'phase-1-validate/03-opportunity-assessment',
        'phase-1-validate/04-business-one-pager',
        'phase-1-validate/05-competitive-analysis',
        'phase-1-validate/06-mvp-scoping',
        'phase-1-validate/07-design-brief',
      ],
    },
    {
      type: 'category',
      label: '🎨 Phase 2: Design',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 2: Design',
        description: 'UX/UI design and component specification',
        slug: '/phase-2-design',
      },
      items: [
        'phase-2-design/08-design-philosophy',
        'phase-2-design/09-ux-package',
        'phase-2-design/10-user-flows',
        'phase-2-design/11-ui-system',
        'phase-2-design/12-component-library',
      ],
    },
    {
      type: 'category',
      label: '🏗️ Phase 3: Architect',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 3: Architect',
        description: 'Technical architecture and build preparation',
        slug: '/phase-3-architect',
      },
      items: [
        'phase-3-architect/13-solution-architecture',
        'phase-3-architect/14-data-model',
        'phase-3-architect/15-api-specification',
        'phase-3-architect/16-security',
        'phase-3-architect/17-infrastructure',
        'phase-3-architect/18-multi-environment',
        'phase-3-architect/19-adr-templates',
        'phase-3-architect/20-test-strategy',
        {
          type: 'doc',
          id: 'phase-3-architect/21-build-contract',
          label: '21. Build Contract 🚪',
        },
        {
          type: 'doc',
          id: 'phase-3-architect/22-dev-environment',
          label: '22. Dev Environment 🚪',
        },
      ],
    },
    {
      type: 'category',
      label: '🔨 Phase 4: Build',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Phase 4: Build',
        description: 'MOAI-powered implementation with TDD',
        slug: '/phase-4-build',
      },
      items: [
        'phase-4-build/23-moai-overview',
        'phase-4-build/24-spec-first',
        'phase-4-build/25-tdd-workflow',
        'phase-4-build/26-quality-gates',
        {
          type: 'category',
          label: 'Milestones 1-4',
          items: [
            'phase-4-build/27-m1-foundation',
            'phase-4-build/28-m2-database',
            'phase-4-build/29-m3-api',
            'phase-4-build/30-m4-ui-shell',
          ],
        },
        {
          type: 'doc',
          id: 'phase-4-build/31-checkpoint-1',
          label: 'Checkpoint 1 🚪',
        },
        {
          type: 'category',
          label: 'Milestones 5-7',
          items: [
            'phase-4-build/32-m5-auth',
            'phase-4-build/33-m5-implementation',
            'phase-4-build/34-m6-core-features',
            'phase-4-build/35-m7-admin',
            'phase-4-build/36-m7-implementation',
          ],
        },
        {
          type: 'doc',
          id: 'phase-4-build/37-checkpoint-2',
          label: 'Checkpoint 2 🚪',
        },
        {
          type: 'category',
          label: 'Milestones 8-11',
          items: [
            'phase-4-build/38-m8-advanced',
            'phase-4-build/39-m9-payments',
            'phase-4-build/40-m10-polish',
            'phase-4-build/41-m11-prelaunch',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🚀 Phase 5: Launch',
      collapsible: true,
      collapsed: true,
      items: [
        'phase-5-launch/42-qa-deployment',
        'phase-5-launch/43-launch-checklist',
      ],
    },
    {
      type: 'html',
      value: '<hr class="sidebar-divider" />',
    },
    {
      type: 'category',
      label: '📚 Reference Guides',
      collapsible: true,
      collapsed: true,
      items: [
        'reference/workflow-guide',
        'reference/claude-code-timing',
        'reference/ears-syntax',
        'reference/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: '📋 Templates',
      collapsible: true,
      collapsed: true,
      items: [
        'templates/claude-md',
        'templates/spec-template',
        'templates/build-contract',
        'templates/quality-checklist',
        'templates/tech-debt',
      ],
    },
  ],
};

module.exports = sidebars;
```

---

## Step 4: Create Custom CSS (Geometric Grid Theme)

```css
/* src/css/custom.css */

/* ============================================
   GEOMETRIC GRID DESIGN SYSTEM
   MOAI Handbook v3.1
   ============================================ */

/* CSS Variables */
:root {
  /* Grayscale */
  --gray-950: #0a0a0a;
  --gray-900: #171717;
  --gray-800: #262626;
  --gray-700: #404040;
  --gray-600: #525252;
  --gray-500: #737373;
  --gray-400: #a3a3a3;
  --gray-300: #d4d4d4;
  --gray-200: #e5e5e5;
  --gray-100: #f5f5f5;
  --gray-50: #fafafa;
  
  /* Accents */
  --accent-blue: #3b82f6;
  --accent-green: #22c55e;
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;
  --accent-purple: #a855f7;
  
  /* Phase Colors */
  --phase-1: #3b82f6;
  --phase-2: #ec4899;
  --phase-3: #22c55e;
  --phase-4: #a855f7;
  --phase-5: #f59e0b;
  
  /* Docusaurus Overrides */
  --ifm-color-primary: #3b82f6;
  --ifm-color-primary-dark: #2563eb;
  --ifm-color-primary-darker: #1d4ed8;
  --ifm-color-primary-darkest: #1e40af;
  --ifm-color-primary-light: #60a5fa;
  --ifm-color-primary-lighter: #93c5fd;
  --ifm-color-primary-lightest: #bfdbfe;
  
  --ifm-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --ifm-font-family-monospace: 'JetBrains Mono', 'Fira Code', monospace;
  
  --ifm-global-radius: 0; /* Geometric = sharp corners */
  --ifm-code-border-radius: 0;
  
  --ifm-spacing-horizontal: 1.5rem;
}

/* Dark Mode (Primary) */
[data-theme='dark'] {
  --ifm-background-color: var(--gray-950);
  --ifm-background-surface-color: var(--gray-900);
  --ifm-navbar-background-color: var(--gray-900);
  --ifm-footer-background-color: var(--gray-950);
  --ifm-toc-border-color: var(--gray-700);
  --ifm-color-content: var(--gray-200);
  --ifm-color-content-secondary: var(--gray-400);
  --ifm-heading-color: var(--gray-100);
}

/* Sidebar */
.theme-doc-sidebar-container {
  border-right: 1px solid var(--gray-700) !important;
}

.menu__link {
  font-size: 0.875rem;
  border-radius: 0;
}

.menu__link--active {
  background: var(--gray-800);
  border-left: 3px solid var(--ifm-color-primary);
}

.sidebar-divider {
  border: none;
  border-top: 1px solid var(--gray-700);
  margin: 1rem 0;
}

/* Content */
.markdown h1:first-child {
  font-size: 2.25rem;
  font-weight: 700;
  border-bottom: 3px solid var(--ifm-color-primary);
  padding-bottom: 0.5rem;
}

.markdown h2 {
  font-size: 1.5rem;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-700);
}

.markdown h3 {
  font-size: 1.25rem;
  color: var(--gray-300);
}

/* Code Blocks */
pre {
  border: 1px solid var(--gray-700);
  border-radius: 0;
}

code {
  border-radius: 0;
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
}

/* Tables */
table {
  border-collapse: collapse;
  border: 1px solid var(--gray-700);
}

th {
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

td {
  border: 1px solid var(--gray-700);
}

/* Reading Time */
.reading-time {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin-bottom: 2rem;
  display: block;
}

/* Admonitions / Callouts */
.alert {
  border-radius: 0;
  border-width: 1px;
  border-left-width: 4px;
}

/* Custom Components - see component-design-specs.md for full CSS */
```

---

## Step 5: Create Chapter Components

Create `/src/components/ChapterComponents/index.js`:

```javascript
// src/components/ChapterComponents/index.js
export { default as TldrBox } from './TldrBox';
export { default as WhenToUse } from './WhenToUse';
export { default as Prerequisites } from './Prerequisites';
export { default as ExpectedOutput } from './ExpectedOutput';
export { default as Verification } from './Verification';
export { default as NextSteps } from './NextSteps';
export { default as TemplateDownload } from './TemplateDownload';
```

**TldrBox.jsx:**
```jsx
import React from 'react';
import styles from './styles.module.css';

export default function TldrBox({ children }) {
  return (
    <div className={styles.tldrBox}>
      <div className={styles.tldrHeader}>TL;DR</div>
      <div className={styles.tldrContent}>{children}</div>
    </div>
  );
}
```

**WhenToUse.jsx:**
```jsx
import React from 'react';
import styles from './styles.module.css';

export default function WhenToUse({ useWhen = [], notYetIf = [], skipIf = '' }) {
  return (
    <div className={styles.whenToUse}>
      <div className={styles.whenHeader}>WHEN TO USE</div>
      <div className={styles.whenGrid}>
        <div className={styles.whenColumn}>
          <div className={styles.whenTitle} style={{ color: '#22c55e' }}>✓ USE WHEN</div>
          <ul className={styles.whenList}>
            {useWhen.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className={styles.whenColumn}>
          <div className={styles.whenTitle} style={{ color: '#f59e0b' }}>⏳ NOT YET IF</div>
          <ul className={styles.whenList}>
            {notYetIf.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
      {skipIf && (
        <div className={styles.whenSkip}>
          <span className={styles.whenSkipLabel}>⏭️ SKIP IF:</span> {skipIf}
        </div>
      )}
    </div>
  );
}
```

**Prerequisites.jsx:**
```jsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function Prerequisites({ items = [], gate = false }) {
  const [checked, setChecked] = useState({});
  const storageKey = `prereq-${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecked(JSON.parse(saved));
    }
  }, []);
  
  const toggle = (index) => {
    const newChecked = { ...checked, [index]: !checked[index] };
    setChecked(newChecked);
    localStorage.setItem(storageKey, JSON.stringify(newChecked));
  };
  
  const completedCount = Object.values(checked).filter(Boolean).length;
  
  return (
    <div className={`${styles.prerequisites} ${gate ? styles.prerequisitesGate : ''}`}>
      <div className={styles.prereqHeader}>
        <span className={styles.prereqTitle}>
          {gate && '🚪 '}{gate ? 'GATE: Complete all items' : '☐ PREREQUISITES'}
        </span>
        <span className={styles.prereqCount}>[{completedCount}/{items.length}]</span>
      </div>
      <div className={styles.prereqList}>
        {items.map((item, i) => (
          <div key={i} className={styles.prereqItem}>
            <label className={styles.prereqCheckbox}>
              <input 
                type="checkbox" 
                checked={checked[i] || false}
                onChange={() => toggle(i)}
              />
              <span style={{ textDecoration: checked[i] ? 'line-through' : 'none' }}>
                {item.text}
              </span>
            </label>
            {item.link && <a href={item.link} className={styles.prereqLink}>→</a>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

*(Continue with ExpectedOutput, Verification, NextSteps, TemplateDownload following component-design-specs.md)*

---

## Step 6: Create Sample Chapter

Create `/docs/phase-1-validate/07-design-brief.mdx`:

```mdx
---
sidebar_position: 7
title: "Design Brief"
description: "Create a comprehensive design brief that defines your product scope"
---

import { TldrBox, WhenToUse, Prerequisites, ExpectedOutput, Verification, NextSteps } from '@site/src/components/ChapterComponents';

# Design Brief

<span className="reading-time">⏱️ 25 min read</span>

<TldrBox>

**What:** Create a structured document defining features, user stories, and acceptance criteria.

**Why:** The Design Brief is the contract between planning and design—ensures alignment before UX/UI investment.

**Outcome:** A complete `design-brief.md` artifact ready to drive UX Package creation.

</TldrBox>

<WhenToUse
  useWhen={[
    "You've validated your business idea (Chapters 1-6)",
    "You have a clear MVP scope defined",
    "You're ready to move from 'what problem' to 'what solution'"
  ]}
  notYetIf={[
    "You haven't completed the Business One-Pager",
    "Your MVP scope is still unclear"
  ]}
  skipIf="You already have detailed PRD from another source"
/>

<Prerequisites
  items={[
    { text: "Business One-Pager complete", link: "/phase-1-validate/04-business-one-pager" },
    { text: "MVP Scoping complete", link: "/phase-1-validate/06-mvp-scoping" },
    { text: "Competitive Analysis complete", link: "/phase-1-validate/05-competitive-analysis" }
  ]}
/>

## What is a Design Brief?

A Design Brief bridges business strategy and product design. It captures the "what" without prescribing the "how."

<details>
<summary>💡 Learn More: Design Brief vs PRD vs SPEC</summary>

**Design Brief** (this chapter): High-level features and user stories. Written in Claude Chat.

**PRD**: More detailed, often includes wireframes. We fold this into UX Package.

**SPEC Document**: Implementation-level detail for Claude Code. Created in Phase 4.

</details>

### Action Steps

1. **Copy the Design Brief template**
   
   ```bash
   cp templates/design-brief-template.md docs/design-brief.md
   ```

2. **Fill in the Product Overview section**

3. **Define Core Features (3-5 maximum for MVP)**

4. **Write User Stories for each feature**

5. **Set Acceptance Criteria**

<ExpectedOutput>

After completing this chapter, you should have:

- **Artifact:** `docs/design-brief.md` (2-4 pages)
- **State:** MVP scope locked and documented
- **Capability:** Ready to begin UX Package

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
    path: "/phase-2-design/08-design-philosophy"
  }}
  related={[
    { title: "UX Package", path: "/phase-2-design/09-ux-package" }
  ]}
/>
```

---

## Step 7: Git Commands

```bash
# From handbook-repo root
git checkout -b redesign/v3.1

# After completing Docusaurus setup
git add docusaurus/
git commit -m "feat: initialize docusaurus with navigation structure

- Configured sidebar with 5 phases + reference + templates
- Added Geometric Grid custom theme
- Created chapter component library
- Set up MDX content structure"

git push origin redesign/v3.1
```

---

## Verification Checklist

Before marking Phase 2 complete:

- [ ] `npm run build` succeeds without errors
- [ ] All sidebar links resolve correctly
- [ ] Dark mode renders properly
- [ ] Sample chapter (07-design-brief.mdx) displays all components
- [ ] Prerequisites checkboxes persist across page loads
- [ ] Mobile responsive at 768px breakpoint

---

## Next Phase

After scaffold verification:
- **Phase 3: Theme** — Full Geometric Grid CSS implementation
- **Phase 4: Content Migration** — Convert 43 chapters from HTML to MDX

---

**Document Version:** 1.0
**Created:** January 6, 2026
**For:** Claude Code execution
