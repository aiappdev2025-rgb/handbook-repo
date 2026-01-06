# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a documentation system for the AI SaaS Handbook - a methodology for building production-quality SaaS products with AI-assisted development using the MOAI (Milestone-Oriented AI Integration) framework.

## Repository Structure

```
handbook-repo/
├── docs/                     # HTML documentation (main output)
│   ├── index.html           # Landing page
│   ├── css/handbook.css     # Shared styles
│   ├── js/navigation.js     # Navigation system (inline NAV_DATA)
│   └── handbook/            # Per-chapter files by phase
│       ├── phase1/          # Validate (Ch 1-7)
│       ├── phase2/          # Design (Ch 8-12)
│       ├── phase3/          # Architect (Ch 13-22)
│       ├── phase4/          # Build (Ch 23-41 + Appendices)
│       └── phase5/          # Launch (Ch 42-43)
├── templates/               # Reusable templates (SPEC, Build Contract, etc.)
├── archive/                 # Previous versions for reference
├── TASKS.md                 # Current restructuring tasks (under docs/)
└── ROADMAP.md              # Future improvements (under docs/)
```

## Navigation System Architecture

The handbook uses a JavaScript-based navigation system that works with `file://` protocol (no server required):

- **`docs/js/navigation.js`** - Contains inline `NAV_DATA` object with all navigation structure
- **`docs/js/navigation-data.json`** - Reference copy (not used at runtime)
- Navigation renders: top nav bar, sidebar (phase-aware), Previous/Next buttons

When modifying navigation:
1. Edit `NAV_DATA` in `navigation.js` directly
2. Keep `navigation-data.json` in sync as reference
3. Update `pageOrder` array when adding/removing chapters

## Chapter File Convention

Each chapter follows this template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Chapter X: Title - AI SaaS Handbook</title>
  <link rel="stylesheet" href="../../css/handbook.css">
</head>
<body>
  <nav id="top-nav"></nav>
  <div class="layout">
    <aside id="sidebar"></aside>
    <main class="content">
      <article>
        <h1 id="chapter-X">Chapter X: Title</h1>
        <!-- Content -->
      </article>
      <nav id="page-nav"></nav>
    </main>
  </div>
  <script src="../../js/navigation.js"></script>
</body>
</html>
```

## Context Persistence

- **`docs/TASKS.md`** - Tracks current work, user decisions, and file mappings
- **`docs/ROADMAP.md`** - Tracks future improvements with priority and status
- Read these files first when resuming work across sessions

## Validation Workflow

Test navigation by opening `docs/index.html` in browser:
1. Verify phase cards link to correct first chapters
2. Test Previous/Next flow through all 43 chapters
3. Confirm sidebar shows correct phase chapters
4. Verify cross-phase transitions (Ch 7→8, 12→13, 22→23, 41→42)

## Commit Convention

```
[type]: Brief description
```
Types: `docs` (content), `fix` (errors), `style` (formatting), `structure` (reorganization), `version` (bumps)
