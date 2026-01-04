# Changelog

All notable changes to the AI SaaS Handbook documentation system are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

Nothing yet.

---

## [3.0.0] - 2026-01-04

### Added
- **MOAI-ADK Integration**: Complete integration of Methodology for Organized AI-Driven Development Kit throughout Build Phase
- **Part IV-B: Build Contract**: New bridge artifact that compresses design documents into implementation-ready reference (Chapters 20-22)
- **Part VII: File Control System**: Structured approach to artifact and code management (Chapters 32-33)
- **Workflow Guide v1**: New companion document for context management and Claude Code patterns
- **EARS Requirements Syntax**: Structured requirement patterns (Ubiquitous, State-Driven, Event-Driven, Optional, Unwanted)
- **SPEC Templates**: Complete specification document templates with test case format
- **Quality Gate Automation**: Explicit checklists for SPEC Ready and Implementation Done gates
- **TDD Workflow Documentation**: RED-GREEN-REFACTOR cycle with specific prompts for each phase

### Changed
- Version bump from v2.2 to v3.0 across all documents
- Part V (Build Phase) completely enhanced with MOAI methodology
- Navigation links updated to reference `handbook-v3.html` instead of `handbook-v2.2.html`
- Table of Contents expanded to include new Parts IV-B and VII
- Landing page (index.html) redesigned with "What's New in v3.0" section

### Fixed
- All special character encoding issues (mojibake) resolved
- Internal navigation links corrected for consistent filenames
- Cross-document references validated and working

### Deprecated
- Legacy files with encoding issues moved to archive (AI_SaaS_Handbook_v2_2.html, etc.)

---

## [2.2.0] - 2025-12-XX

### Added
- Multi-Environment Configuration (Chapter 19): Local → Preview → Production workflow
- Environment-specific Supabase projects and branch strategies
- CI/CD pipelines with environment promotion workflow
- Expanded UX methodology with multiple design exploration techniques
- Enhanced UI system with visual direction options
- Design critique and validation prompts

### Changed
- Quality gates now have explicit verification criteria
- Refactoring checkpoints added to Build Phase
- Code review protocols enhanced

---

## [2.0.0] - 2025-11-XX

### Added
- Build Phase Guide v3 separated as companion document
- Quality gates at each milestone
- Admin console implementation guide
- Stripe payments integration guide

### Changed
- Main handbook restructured as strategic hub
- Build Phase moved to companion guide for tactical execution

---

## [1.0.0] - 2025-10-XX

### Added
- Initial release of AI SaaS Handbook
- Parts I-VI covering full development lifecycle
- Claude Tools Guide (Chat vs Code CLI)
- Infrastructure setup guides

---

## Version Numbering

This project uses a simplified semantic versioning:

- **MAJOR** (3.x.x): Significant methodology changes, major restructuring
- **MINOR** (x.1.x): New sections, substantial content updates
- **PATCH** (x.x.1): Bug fixes, typo corrections, minor clarifications

## How to Update This File

When making changes to the handbook:

1. Add entries under `[Unreleased]` as you make changes
2. When ready to "release" a version, rename `[Unreleased]` to the new version number with date
3. Create a new empty `[Unreleased]` section at the top
4. Use these categories:
   - **Added**: New features, sections, or documents
   - **Changed**: Updates to existing content
   - **Deprecated**: Content that will be removed in future
   - **Removed**: Content that has been removed
   - **Fixed**: Bug fixes, corrections
   - **Security**: Security-related changes
