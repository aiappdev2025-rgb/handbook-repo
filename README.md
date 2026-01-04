# AI SaaS Handbook Documentation System

A complete methodology for building production-quality SaaS products with AI-assisted development.

## Current Version

**v3.0 - MOAI Integration Edition** (January 2026)

## Repository Structure

```
ai-saas-handbook/
├── docs/                    # The actual handbook documents
│   ├── index.html          # Landing page / navigation hub
│   ├── handbook-v3.html    # Main handbook (strategic hub)
│   ├── build-guide-v3.html # Build phase companion guide
│   ├── workflow-guide-v1.html # Context management guide
│   └── navigation-guide.html  # Quick reference
├── archive/                 # Previous versions (for reference)
│   └── v2.2/               # Archived v2.2 files
├── templates/              # Reusable templates extracted from handbook
│   ├── build-contract-template.md
│   ├── spec-template.md
│   └── quality-checklist.md
├── CHANGELOG.md            # Version history and changes
├── WORKFLOW.md             # How to maintain these docs (detailed)
├── .gitignore
└── README.md               # This file
```

## Quick Start

### Viewing the Documentation

Open `docs/index.html` in your browser. All internal links work when served from the same directory.

For the best experience, you can serve locally:
```bash
cd docs
python -m http.server 8000
# Then open http://localhost:8000
```

### Making Updates

See [WORKFLOW.md](WORKFLOW.md) for the complete maintenance workflow, but here's the short version:

1. **Start a conversation** in your Claude Project (which has these docs loaded)
2. **Describe the changes** you want to make
3. **Download the updated files** Claude produces
4. **Replace files** in this repo's `docs/` folder
5. **Commit with a descriptive message** following the convention below
6. **Update CHANGELOG.md** for significant changes
7. **Sync to Claude Project** by re-uploading to your project's knowledge base

## Commit Message Convention

Follow this format for clear version history:

```
[type]: Brief description

Longer explanation if needed.
```

**Types:**
- `docs`: Content changes to handbook (new sections, rewrites, corrections)
- `fix`: Fixing errors, broken links, typos
- `style`: Visual/formatting changes only
- `structure`: Reorganizing content, moving sections
- `version`: Version bumps (v3.0 → v3.1)

**Examples:**
```
docs: Add section on API rate limiting to Build Guide

fix: Correct broken link to SPEC template in handbook

style: Update code block styling for better readability

version: Bump to v3.1 with enhanced TDD section
```

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

| Version | Date | Highlights |
|---------|------|------------|
| v3.0 | Jan 2026 | MOAI-ADK integration, Build Contract, File Control System |
| v2.2 | Dec 2025 | Multi-environment config, enhanced UX methodology |
| v2.0 | Nov 2025 | Build Phase Guide separated, quality gates |

## Claude Project Sync

This repository is designed to stay in sync with a Claude Project. The workflow is:

```
┌─────────────────┐         ┌─────────────────┐
│   Git Repo      │         │  Claude Project │
│   (Source of    │ ◄─────► │  (Working       │
│    Truth)       │  sync   │   Environment)  │
└─────────────────┘         └─────────────────┘
        │                           │
        │                           │
        ▼                           ▼
   Version History            AI-Assisted Editing
   Backup & Recovery          Context Awareness
   Collaboration              Smart Updates
```

**Git Repo** is authoritative for version history. **Claude Project** is where you do the actual editing work with AI assistance.

## License

Personal use. Part of the AI SaaS methodology for bootstrapped founders.
