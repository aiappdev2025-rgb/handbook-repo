# Changelog

All notable changes to the AI SaaS Handbook documentation system are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

Nothing yet.

---

## [3.2.0] - 2026-01-04

### Changed
- **Handbook Split into 3 Parts** - Restructured for easier editing and navigation:
  - **Part 1: Strategy & Design** (`handbook-v3-part1-strategy.html`) - Parts I, II, III covering Foundation, Documentation Stages, and Design Excellence
  - **Part 2: Architecture & Setup** (`handbook-v3-part2-setup.html`) - Parts IV, IV-B, IV-C covering Technical Foundation, Build Contract, and Dev Environment Setup
  - **Part 3: Build & Launch** (`handbook-v3-part3-build.html`) - Parts V, VI, VII covering Build Phase with MOAI, Launch, File Control, and Appendices

- **Original handbook archived** - `handbook-v3.html` renamed to `handbook-v3-combined.html` as archive/reference

- **Updated Navigation** - All docs now have new 3-part navigation bar:
  - Links: 1: Strategy | 2: Setup | 3: Build | Build Guide | Workflow
  - Updated in: index.html, build-guide-v3.html, workflow-guide-v1.html, navigation-guide.html, claude-code-integration.html

- **Updated Cross-References** - All internal links updated to point to correct part files:
  - Parts I-III content → `handbook-v3-part1-strategy.html`
  - Parts IV, IV-B, IV-C content → `handbook-v3-part2-setup.html`
  - Parts V-VII content → `handbook-v3-part3-build.html`

- **index.html Homepage** - Handbook section now displays 3-card grid with direct links to each part

### Rationale
Three-part split provides:
- Smaller files (~600-1200 lines each vs 3000+ lines combined)
- Faster editing and loading
- Clearer workflow progression (Strategy → Setup → Build)
- Easier maintenance and version control

---

## [3.1.0] - 2026-01-04

### Added
- **Chapter 19: Multi-Environment Configuration** - Complete expansion from minimal table to comprehensive guide:
  - **19.1 Environment Strategy Overview**: Three-environment model (Local/Preview/Production), architecture diagram, cost breakdown
  - **19.2 Supabase Project Setup**: Step-by-step for creating Dev/Staging/Prod projects, auth configuration, RLS requirements, credential recording
  - **19.3 Local Development Setup**: Prerequisites, Vercel CLI linking, environment variable pulling, Supabase CLI setup, verification checklist
  - **19.4 Vercel Project Configuration**: Project import, environment scopes explanation, variable mapping table, dynamic URL handling code, domain setup
  - **19.5 Preview Deployments with Password Protection**: Preview workflow, password protection setup, tester sharing workflow, staging data management
  - **19.6 Stripe Environment Configuration**: Test/Live mode explanation, webhook setup for all environments, Stripe CLI local testing, launch checklist
  - **19.7 Database Migration Workflow**: Supabase CLI setup, migration creation, applying to Dev/Staging/Prod, best practices, schema drift handling
  - **19.8 Troubleshooting Common Issues**: Solutions for API key errors, auth redirects, RLS blocks, webhook failures, env var caching, connection issues
  - **19.9 Environment Setup Checklist**: Comprehensive checklists for Supabase, Vercel, Stripe, Local Development, and Migrations

### Changed
- **Table of Contents** - Part IV Technical Foundation now lists all 19.x subsections
- **Architecture decisions documented**: Three separate Supabase projects, connect-to-remote local development (no Docker), Supabase native migrations, Vercel-managed environment variables

---

## [3.0.4] - 2026-01-04

### Added
- **Technical Debt Scoring Framework** (Handbook Chapter 27) - Comprehensive debt management system:
  - 6 weighted debt categories (Complexity 25%, Error Handling 20%, Type Safety 20%, Test Coverage 20%, Doc Sync 10%, Dependencies 5%)
  - Scoring methodology with 1-10 scale per category
  - Score thresholds and gate decisions
  - Integration with build checkpoints

- **ESLint Debt Detection Configuration** (templates/eslint-debt-config.js) - Ready-to-use ESLint rules:
  - Complexity detection (max-lines, max-depth, complexity)
  - Error handling rules
  - Type safety rules for TypeScript projects
  - Code quality warnings
  - Test file overrides

- **GitHub Action Debt Check Workflow** (templates/github-debt-check.yml) - Automated PR debt analysis:
  - Runs ESLint with debt rules
  - Calculates weighted debt score
  - Posts detailed report as PR comment
  - Blocks PRs below threshold score

- **Checkpoint Debt Audit Templates** (templates/checkpoint-debt-audit.md) - Audit checklists for each checkpoint:
  - Checkpoint A: Database, Authentication, Infrastructure debt
  - Checkpoint B: Complexity, Error Handling, Type Safety, Coverage debt
  - Checkpoint C: Security, Performance, Dependencies, Monitoring debt
  - Score calculation tables for each checkpoint

- **TECH-DEBT.md Template** (templates/TECH-DEBT.md) - Project-level debt tracking:
  - Active debt items table by priority
  - Checkpoint audit history
  - Resolved debt log
  - Quick commands reference

- **Technical Debt Review Prompt** (Build Guide Part V) - AI-assisted debt analysis:
  - Category-by-category analysis
  - Prioritized debt item identification
  - Score calculation output
  - TECH-DEBT.md formatted entries

- **Debt Remediation Prompt** (Build Guide Part V) - AI-assisted debt fixing:
  - Category-specific remediation guidelines
  - Verification commands
  - Score impact estimation

### Changed
- **Part IV-C (Development Environment Setup)** - Added TECH-DEBT.md to initial setup:
  - Documentation folder structure updated
  - Verification checklist includes TECH-DEBT.md
  - Initial commit message template updated

- **Part VII (File Control System)** - Integrated debt tracking:
  - Standard structure includes TECH-DEBT.md
  - File naming conventions table updated
  - File maintenance triggers include TECH-DEBT.md

---

## [3.0.3] - 2026-01-04

### Added
- **Security Audit Prompt** (Build Guide Part V) - Comprehensive OWASP-aligned security audit covering:
  - Authentication & session management checks
  - Authorization & RLS policy verification
  - Injection prevention (SQL, XSS)
  - Input validation requirements
  - Secrets management verification
  - Security headers configuration
  - Rate limiting guidance
  - Dependency security (npm audit)

- **Security Requirements at Checkpoints** (Build Guide) - Each major checkpoint now includes mandatory security verification:
  - Checkpoint A: RLS policy testing, anon role verification
  - Checkpoint B: Full security audit, XSS testing, input validation
  - Checkpoint C: Security headers, rate limiting, final audit

- **OWASP-Based Security Verification** (Handbook PART VI) - Expanded launch security checks:
  - Authentication & session management testing
  - Authorization & access control verification
  - Input validation & injection prevention
  - Secrets & configuration audit
  - Security headers implementation guide
  - Dependency security scanning
  - Rate limiting requirements
  - CSRF protection verification

### Changed
- **Quality Framework Pillar 3.3 (Safety)** - Enhanced with OWASP-aligned security requirements:
  - Added specific requirements for Authentication, Authorization, Injection Prevention
  - Added XSS Prevention, CSRF Protection, Secrets Management guidance
  - Added Security Headers and Dependency Security requirements
  - Added "Security Checklist for Every Feature" quick reference

### Security
- All security gaps identified in audit now addressed:
  - CSRF protection guidance added
  - XSS prevention explicitly documented
  - Rate limiting requirements specified
  - Security headers with code examples
  - npm audit integration at checkpoints
  - SQL injection prevention clarified
  - Session management requirements added

---

## [3.0.2] - 2026-01-04

### Added
- **Appendix C: How to Use the Prompts** (Build Guide) - Complete workflow guide covering:
  - Step-by-step prompt usage from selection to verification
  - Prompt categories reference (Foundation, Feature, Quality)
  - Common mistakes to avoid
  - When to restart or retry guidance

- **How to Edit and Customize Prompts** section (Build Guide) - New section explaining:
  - Placeholder types ([BRACKET] and {{DOUBLE BRACE}})
  - What to customize vs what to keep unchanged
  - Before/after customization examples
  - Manual vs Claude Code execution methods

- **PART V: Build Phase with MOAI** - Enhanced with detailed user requirements:
  - Chapter 24: "What You Need to Do" section with setup actions
  - Chapter 25: SPEC creation manual steps and Claude Code commands
  - Chapter 26: Complete TDD workflow with RED/GREEN/REFACTOR manual steps
  - Chapter 27: Milestone execution guide with checkpoint verification

- **PART VI: Launch** - Completely expanded with:
  - "Why Launch Phase Matters" explanation
  - "How Launch Supports the Process" context
  - Step-by-step verification for Code Quality, Security, Performance, User Flows, Monitoring, Backups
  - Launch Day checklist
  - Manual commands for every verification step

- **PART VII: File Control System** - Enhanced with:
  - "Why File Control Matters" explanation
  - Complete file naming conventions table
  - "When to Update Files" maintenance triggers
  - Manual setup commands and Claude Code alternatives

### Fixed
- All special character encoding issues (mojibake) in Build Guide v3 resolved:
  - Checkmarks, arrows, warning symbols now use proper HTML entities
  - CSS unicode escapes corrected for icons
  - All UTF-8 double-encoding artifacts removed

### Changed
- Build Guide now includes manual alternatives for every Claude Code command
- PART VI subtitle added: "Production Readiness and Go-Live"
- PART VII subtitle added: "Artifact Organization for AI-Assisted Development"

---

## [3.0.1] - 2026-01-04

### Added
- **Part IV-C: Development Environment Setup** - New section in main handbook covering:
  - The Critical Transition (tool change from Claude Chat to Claude Code)
  - Project Repository Setup with step-by-step commands
  - Complete CLAUDE.md template with all sections explained
  - Documentation folder structure (docs/, docs/specs/)
  - Initial commit guidance
  - Claude Code configuration basics
  - Verification checklist before starting Milestone 1
  - Tool usage reference table by phase

### Changed
- **Project Lifecycle Diagram** - Now shows explicit tool transitions with Claude Chat phase, transition point, and Claude Code phase clearly marked
- **Document System Overview** - Added "Tool" column to clarify which tool is used at each stage
- **Workflow Guide positioning** - Reframed as a "reference" document rather than required reading, since key setup steps are now in the handbook
- **Table of Contents** - Added Part IV-C with all subsections
- **Index page** - Updated handbook card, workflow guide card, lifecycle diagram, and quick reference links

### Fixed
- Gap in methodology where users didn't know when to transition from Claude Chat to Claude Code
- Missing explicit guidance on CLAUDE.md file creation timing
- Disconnect between Workflow Guide content and main handbook flow

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
