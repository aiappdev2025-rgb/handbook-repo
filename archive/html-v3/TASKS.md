# AI SaaS Handbook - Current Tasks

This file tracks the current restructuring work. Use this to maintain context across Claude Code sessions.

---

## Current Project: Phase-Based Restructuring

**Goal**: Consolidate the handbook into a unified, sequential guide using Phase-based organization with the Build Guide integrated as individual milestone chapters.

**Started**: 2026-01-06

---

## Approved Structure

```
THE AI SAAS HANDBOOK
A Complete Guide from Idea to Production

PHASE 1: VALIDATE (7 chapters)
├── Ch 1: Introduction
├── Ch 2: The Quality Crisis
├── Ch 3: Quality Framework
├── Ch 4: Claude Tools
├── Ch 5: Research
├── Ch 6: One-Pager
└── Ch 7: Design Brief

PHASE 2: DESIGN (5 chapters)
├── Ch 8: Design Philosophy
├── Ch 9: UX Package
├── Ch 10: UX Critique
├── Ch 11: UI System
└── Ch 12: Visual Direction

PHASE 3: ARCHITECT (10 chapters)
├── Ch 13: Architecture Overview
├── Ch 14: Database Schema
├── Ch 15: GitHub Setup
├── Ch 16: Supabase Setup
├── Ch 17: Vercel Setup
├── Ch 18: Multi-Environment
├── Ch 19: Build Contract Introduction
├── Ch 20: Contract Structure
├── Ch 21: Generating the Contract
└── Ch 22: Development Environment

PHASE 4: BUILD (19 chapters) ← Build Guide content integrated
├── Ch 23: MOAI Methodology Overview
├── Ch 24: SPEC-First Development
├── Ch 25: TDD Workflow
├── Ch 26: Technical Debt Management
├── Ch 27: Build Milestones Overview
├── Ch 28: M1 - Project Setup          ← Includes Project Scaffolding Prompt
├── Ch 29: M2 - Design System
├── Ch 30: M3 - Database
├── Ch 31: Checkpoint A - Foundation Audit
├── Ch 32: M4 - Layouts
├── Ch 33: M5 - Authentication
├── Ch 34: M6 - Core Feature
├── Ch 35: Checkpoint B - Feature Complete Audit
├── Ch 36: M7 - Admin Console
├── Ch 37: M8 - Supporting Features
├── Ch 38: M9 - Payments
├── Ch 39: M10 - Polish
├── Ch 40: Checkpoint C - Pre-Launch Audit
└── Ch 41: M11 - Testing

PHASE 5: LAUNCH (2 chapters)
├── Ch 42: QA & Deployment
└── Ch 43: File Structure Reference

APPENDICES
├── A: SPEC Template
├── B: Quality Gate Checklists
├── C: Post-MVP Admin Roadmap
├── D: Admin Database Schema
└── E: Prompt Usage Guide

COMPANION: Workflow Reference (separate, linked in nav)
```

---

## User Decisions

| Decision | Choice |
|----------|--------|
| Naming convention | Phases (journey-oriented) |
| Milestone granularity | Individual chapters (Ch 28-41) |
| Chapter numbering | Sequential (1-43) |
| Folder structure | `handbook/phase1/`, `handbook/phase2/`, etc. |
| Old Build Guide | Archive (don't delete) |
| Workflow Guide | Options A + C (reference links + quick reference card) |
| Project Scaffolding | Include in Ch 28 (M1 - Project Setup) |

---

## Task List

### Phase 1: Preparation
- [x] Create ROADMAP.md for future developments
- [x] Create TASKS.md for context persistence
- [x] Update navigation-data.json with Phase structure
- [x] Create archive/ folder and move build-guide-v3.html

### Phase 2: Folder Restructuring
- [x] Rename `handbook/part1/` → `handbook/phase1/`
- [x] Rename `handbook/part2/` → `handbook/phase3/` (Architecture = Phase 3)
- [x] Rename `handbook/part3/` → Split between phase4/ and phase5/
- [x] Create `handbook/phase2/` for Design chapters
- [x] Create `handbook/phase4/` for Build chapters
- [x] Create `handbook/phase5/` for Launch chapters

### Phase 3: Build Guide Splitting
- [x] Extract M1 content → `phase4/chapter-28-m1-project-setup.html`
- [x] Extract M2 content → `phase4/chapter-29-m2-design-system.html`
- [x] Extract M3 content → `phase4/chapter-30-m3-database.html`
- [x] Create Checkpoint A → `phase4/chapter-31-checkpoint-a.html`
- [x] Extract M4 content → `phase4/chapter-32-m4-layouts.html`
- [x] Extract M5 content → `phase4/chapter-33-m5-authentication.html`
- [x] Extract M6 content → `phase4/chapter-34-m6-core-feature.html`
- [x] Create Checkpoint B → `phase4/chapter-35-checkpoint-b.html`
- [x] Extract M7 content → `phase4/chapter-36-m7-admin-console.html`
- [x] Extract M8 content → `phase4/chapter-37-m8-supporting-features.html`
- [x] Extract M9 content → `phase4/chapter-38-m9-payments.html`
- [x] Extract M10 content → `phase4/chapter-39-m10-polish.html`
- [x] Create Checkpoint C → `phase4/chapter-40-checkpoint-c.html`
- [x] Extract M11 content → `phase4/chapter-41-m11-testing.html`

### Phase 4: Chapter Renumbering
- [ ] Update all chapter titles and IDs in phase1/ (no changes needed, already 1-7)
- [ ] Move chapters 8-12 to phase2/ (Design)
- [ ] Update chapters 13-22 in phase3/ (Architecture)
- [ ] Update chapters 23-41 in phase4/ (Build)
- [ ] Update chapters 42-43 in phase5/ (Launch)

### Phase 5: Navigation Updates
- [x] Update navigation.js with new NAV_DATA
- [x] Update navigation-data.json
- [x] Update index.html links
- [x] Add Workflow Guide reference links in milestone chapters

### Phase 6: Validation
- [x] Test all navigation paths
- [x] Verify Previous/Next flow through all 43 chapters
- [x] Check all internal links
- [x] Validate on file:// protocol

### Phase 7: Current Sprint (COMPLETED)
- [x] Add colorful phase navigation bar to chapter pages (like index.html)
- [x] Review and clarify Chapter 42 actions (fix section IDs, clarify DO vs VERIFY)
- [x] Create Project Workspace app (interactive form + artifact storage + logging)

### Phase 8: Remaining Work (Future)
- [ ] Add workflow tip callouts in milestone chapters (Option A)
- [ ] Create Workflow Quick Reference Card (Option C)
- [ ] Add Project Scaffolding Prompt to Chapter 28

### Phase 9: Handbook v4 - Combined Files (COMPLETED)
- [x] Create `handbook-v4/` folder at repository root
- [x] Generate phase1-validate.html (47 KB, chapters 1-7)
- [x] Generate phase2-design.html (38 KB, chapters 8-12)
- [x] Generate phase3-architect.html (74 KB, chapters 13-22)
- [x] Generate phase4-build.html (135 KB, chapters 23-41 + appendices A-B)
- [x] Generate phase5-launch.html (34 KB, chapters 42-43)

Each combined file includes:
- Embedded CSS (no external dependencies)
- Table of contents with anchor links to all chapters
- Full content from all chapters in the phase
- Standalone, self-contained HTML files

**Location**: `/handbook-v4/` (328 KB total across 5 files)

---

## File Mapping Reference

### Current → New Location

| Current File | New Location |
|--------------|--------------|
| `handbook/part1/chapter-01-introduction.html` | `handbook/phase1/chapter-01-introduction.html` |
| `handbook/part1/chapter-02-quality-crisis.html` | `handbook/phase1/chapter-02-quality-crisis.html` |
| ... (chapters 1-7 stay in phase1) | |
| `handbook/part1/chapter-08-design-philosophy.html` | `handbook/phase2/chapter-08-design-philosophy.html` |
| ... (chapters 8-12 move to phase2) | |
| `handbook/part2/chapter-13-architecture.html` | `handbook/phase3/chapter-13-architecture.html` |
| ... (chapters 13-22 move to phase3) | |
| `handbook/part3/chapter-23-moai-overview.html` | `handbook/phase4/chapter-23-moai-overview.html` |
| ... (chapters 23-27 move to phase4) | |
| `build-guide-v3.html` (M1 section) | `handbook/phase4/chapter-28-m1-project-setup.html` |
| `build-guide-v3.html` (M2 section) | `handbook/phase4/chapter-29-m2-design-system.html` |
| ... (milestones become chapters 28-41) | |
| `handbook/part3/chapter-28-qa-launch.html` | `handbook/phase5/chapter-42-qa-deployment.html` |
| `handbook/part3/chapter-29-file-structure.html` | `handbook/phase5/chapter-43-file-structure.html` |
| `build-guide-v3.html` | `archive/build-guide-v3.html` |

---

## Notes

- Workflow Guide stays as separate companion document
- Appendices A-B already exist, C-E come from Build Guide
- Chapter 28 will include the new Project Scaffolding Prompt
- All milestone chapters will include Workflow Guide reference tips

---

*Last Updated: 2026-02-05 (Handbook v4 combined files complete)*
