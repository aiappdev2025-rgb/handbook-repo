# "When to Use" Criteria - All Chapters

## MOAI Handbook v3.1 Redesign
**Task 1.3** | Phase 1: Architecture | Claude Chat

---

## Purpose

This document defines the **timing triggers** for every chapter, solving the UX issue: *"Users don't know when to do something."*

Each entry specifies:
- ✅ **Use when:** Triggers that indicate this chapter is relevant NOW
- ⏳ **Not yet if:** Prerequisites not met
- ⏭️ **Skip if:** Conditions where this chapter isn't needed

---

## Getting Started

### Chapter 0: Quick Start Guide (NEW)
| | Criteria |
|---|---|
| ✅ Use when | First time visiting the handbook; Want the 5-minute overview; Need to understand the overall flow |
| ⏳ Not yet if | N/A - always accessible |
| ⏭️ Skip if | You've already read the methodology introduction |

### Chapter 0.1: "I Need To..." Quick Reference (NEW)
| | Criteria |
|---|---|
| ✅ Use when | Returning to find specific information; Know what you want but not where it is; Looking for a template or tool |
| ⏳ Not yet if | N/A - always accessible |
| ⏭️ Skip if | Following the methodology sequentially |

---

## Phase 1: Validate

### Chapter 1: Introduction & Methodology
| | Criteria |
|---|---|
| ✅ Use when | Starting a new SaaS project; Want to understand the MOAI approach; Need to explain the methodology to a co-founder |
| ⏳ Not yet if | N/A - this is the starting point |
| ⏭️ Skip if | Already familiar with the handbook methodology |

### Chapter 2: Market Research
| | Criteria |
|---|---|
| ✅ Use when | Have a business idea but haven't validated market size; Need TAM/SAM/SOM analysis; Preparing for investor conversations |
| ⏳ Not yet if | Don't have a clear idea of what you want to build |
| ⏭️ Skip if | Already have validated market research; Building for a known market |

### Chapter 3: Opportunity Assessment
| | Criteria |
|---|---|
| ✅ Use when | Have multiple ideas and need to choose; Want to score opportunities objectively; Need to validate bootstrapper fit |
| ⏳ Not yet if | Haven't done basic market research |
| ⏭️ Skip if | Already committed to a specific opportunity; Only have one viable idea |

### Chapter 4: Business One-Pager
| | Criteria |
|---|---|
| ✅ Use when | Ready to crystallize your idea into a document; Need to communicate the concept clearly; Starting to think about MVP scope |
| ⏳ Not yet if | Still evaluating multiple opportunities; Market research incomplete |
| ⏭️ Skip if | Have existing business plan with all required elements |

### Chapter 5: Competitive Analysis
| | Criteria |
|---|---|
| ✅ Use when | Know your market but not your competitors; Need to find differentiation angles; Pricing strategy undefined |
| ⏳ Not yet if | Business One-Pager not complete |
| ⏭️ Skip if | Operating in a brand new market with no competitors |

### Chapter 6: MVP Scoping
| | Criteria |
|---|---|
| ✅ Use when | Have validated idea but scope is unclear; Features keep expanding (scope creep); Need to define "what's NOT in v1" |
| ⏳ Not yet if | Business idea not validated; Competitive analysis not done |
| ⏭️ Skip if | Have clear, documented MVP scope under 5 features |

### Chapter 7: Design Brief
| | Criteria |
|---|---|
| ✅ Use when | MVP scope is locked; Ready to transition from "what" to "how"; About to start UX/UI work |
| ⏳ Not yet if | MVP features still changing; Haven't completed competitive analysis |
| ⏭️ Skip if | Have existing PRD that covers all Design Brief sections |

---

## Phase 2: Design

### Chapter 8: Design Philosophy
| | Criteria |
|---|---|
| ✅ Use when | Starting design work; Need to align on UX principles; Multiple stakeholders with different design opinions |
| ⏳ Not yet if | Design Brief not complete |
| ⏭️ Skip if | Have established design system from previous project |

### Chapter 9: UX Package
| | Criteria |
|---|---|
| ✅ Use when | Design Brief complete; Ready to create user flows; Need to define information architecture |
| ⏳ Not yet if | Design Brief incomplete; Core features still undefined |
| ⏭️ Skip if | Have existing UX documentation that covers all flows |

### Chapter 10: User Flows & Wireframes
| | Criteria |
|---|---|
| ✅ Use when | UX Package started; Need to visualize specific journeys; Validating feature interactions |
| ⏳ Not yet if | Haven't defined primary user personas |
| ⏭️ Skip if | Working from existing wireframes |

### Chapter 11: UI System
| | Criteria |
|---|---|
| ✅ Use when | UX flows approved; Ready for visual design; Need component specifications |
| ⏳ Not yet if | User flows not finalized |
| ⏭️ Skip if | Using established design system (Material, Tailwind presets) |

### Chapter 12: Component Library Spec
| | Criteria |
|---|---|
| ✅ Use when | UI System defined; Preparing for implementation; Need to document component states and variants |
| ⏳ Not yet if | Visual design not approved |
| ⏭️ Skip if | Using component library with existing documentation |

---

## Phase 3: Architect

### Chapter 13: Solution Architecture
| | Criteria |
|---|---|
| ✅ Use when | Design complete; Ready to plan technical implementation; Need to choose tech stack |
| ⏳ Not yet if | UI System not finalized |
| ⏭️ Skip if | Architecture already documented and reviewed |

### Chapter 14: Data Model Design
| | Criteria |
|---|---|
| ✅ Use when | Features defined; Need to design database schema; Planning API structure |
| ⏳ Not yet if | Core features still changing |
| ⏭️ Skip if | Migrating existing data model |

### Chapter 15: API Specification
| | Criteria |
|---|---|
| ✅ Use when | Data model designed; Need to define endpoints; Planning integrations |
| ⏳ Not yet if | Data model incomplete |
| ⏭️ Skip if | Using generated API from framework (tRPC, GraphQL auto) |

### Chapter 16: Security Architecture
| | Criteria |
|---|---|
| ✅ Use when | Handling user data; Need authentication strategy; Compliance requirements exist |
| ⏳ Not yet if | Basic architecture not defined |
| ⏭️ Skip if | No user accounts; No sensitive data |

### Chapter 17: Infrastructure Planning
| | Criteria |
|---|---|
| ✅ Use when | Ready to set up hosting; Need deployment strategy; Planning for scale |
| ⏳ Not yet if | Tech stack not chosen |
| ⏭️ Skip if | Using serverless with managed services only |

### Chapter 18: Multi-Environment Config
| | Criteria |
|---|---|
| ✅ Use when | Need dev/staging/prod separation; Setting up CI/CD; Managing environment variables |
| ⏳ Not yet if | Basic project not scaffolded |
| ⏭️ Skip if | Single environment sufficient for MVP |

### Chapter 19: ADR Templates
| | Criteria |
|---|---|
| ✅ Use when | Making significant technical decisions; Need to document "why" for future reference; Team growing |
| ⏳ Not yet if | No technical decisions made yet |
| ⏭️ Skip if | Solo founder with good memory; Very simple project |

### Chapter 20: Test Strategy
| | Criteria |
|---|---|
| ✅ Use when | Preparing for TDD implementation; Need to define testing approach; CI/CD setup |
| ⏳ Not yet if | Architecture not finalized |
| ⏭️ Skip if | Not using TDD (though recommended) |

### Chapter 21: Generating Build Contract 🚪 GATE
| | Criteria |
|---|---|
| ✅ Use when | ALL design artifacts complete; Ready to transition to Claude Code; Need implementation roadmap |
| ⏳ Not yet if | Missing: Design Brief, UX Package, UI System, or Architecture docs |
| ⏭️ Skip if | Never - Build Contract is REQUIRED before implementation |

### Chapter 22: Dev Environment Setup 🚪 GATE
| | Criteria |
|---|---|
| ✅ Use when | Build Contract generated; Ready to start coding; Setting up CLAUDE.md |
| ⏳ Not yet if | Build Contract not complete |
| ⏭️ Skip if | Never - required for Claude Code workflow |

---

## Phase 4: Build

### Chapter 23: MOAI Overview
| | Criteria |
|---|---|
| ✅ Use when | Starting implementation; Need to understand MOAI methodology; First time using Claude Code |
| ⏳ Not yet if | Dev Environment not set up |
| ⏭️ Skip if | Familiar with MOAI from previous project |

### Chapter 24: SPEC-First Development
| | Criteria |
|---|---|
| ✅ Use when | About to implement a feature; Need SPEC document template; Learning the workflow |
| ⏳ Not yet if | Haven't read MOAI Overview |
| ⏭️ Skip if | Already know SPEC format well |

### Chapter 25: TDD Workflow
| | Criteria |
|---|---|
| ✅ Use when | Writing first tests; Need RED-GREEN-REFACTOR guidance; Setting up test infrastructure |
| ⏳ Not yet if | SPEC document not written for current feature |
| ⏭️ Skip if | Not using TDD (reconsider this) |

### Chapter 26: Quality Gates
| | Criteria |
|---|---|
| ✅ Use when | Completing a milestone; Need checkpoint criteria; Reviewing code quality |
| ⏳ Not yet if | No code written yet |
| ⏭️ Skip if | Never - quality gates are mandatory |

### Chapters 27-30: Milestones 1-4 (Foundation → UI Shell)
| | Criteria |
|---|---|
| ✅ Use when | Starting respective milestone; Need implementation prompts; Following Build Guide |
| ⏳ Not yet if | Previous milestone not complete |
| ⏭️ Skip if | Component already built (e.g., using boilerplate) |

### Chapter 31: Checkpoint 1 🚪 GATE
| | Criteria |
|---|---|
| ✅ Use when | Milestones 1-4 complete; Before starting authentication; Need quality verification |
| ⏳ Not yet if | Any of M1-M4 incomplete |
| ⏭️ Skip if | Never - checkpoint is mandatory |

### Chapters 32-36: Milestones 5-7 (Auth → Admin)
| | Criteria |
|---|---|
| ✅ Use when | Checkpoint 1 passed; Implementing auth, core features, or admin console |
| ⏳ Not yet if | Checkpoint 1 not passed |
| ⏭️ Skip if | Feature not in MVP scope |

### Chapter 37: Checkpoint 2 🚪 GATE
| | Criteria |
|---|---|
| ✅ Use when | Milestones 5-7 complete; Before advanced features; Need quality verification |
| ⏳ Not yet if | Any of M5-M7 incomplete |
| ⏭️ Skip if | Never - checkpoint is mandatory |

### Chapters 38-41: Milestones 8-11 (Advanced → Pre-Launch)
| | Criteria |
|---|---|
| ✅ Use when | Checkpoint 2 passed; Implementing payments, polish, or preparing launch |
| ⏳ Not yet if | Checkpoint 2 not passed |
| ⏭️ Skip if | Feature not in MVP scope (except M11) |

---

## Phase 5: Launch

### Chapter 42: QA & Deployment
| | Criteria |
|---|---|
| ✅ Use when | All milestones complete; Ready for final testing; Preparing production deployment |
| ⏳ Not yet if | Core features incomplete |
| ⏭️ Skip if | Never - QA is mandatory |

### Chapter 43: Launch Checklist
| | Criteria |
|---|---|
| ✅ Use when | QA passed; Ready to go live; Need pre-launch verification |
| ⏳ Not yet if | QA issues unresolved |
| ⏭️ Skip if | Never - use this checklist for every launch |

---

## Reference Guides

### R1: Workflow Guide (Context Management)
| | Criteria |
|---|---|
| ✅ Use when | Context window filling up; Sessions exceeding 30 minutes; Need /clear tactics |
| ⏳ Not yet if | Just started Claude Code |
| ⏭️ Skip if | Short sessions with simple tasks |

### R2: Claude Code Integration Timing
| | Criteria |
|---|---|
| ✅ Use when | Unsure when to switch from Chat to Code; Planning session structure; Setting up workflow |
| ⏳ Not yet if | Still in design phase |
| ⏭️ Skip if | Confident in tool selection |

### R3: EARS Requirements Syntax
| | Criteria |
|---|---|
| ✅ Use when | Writing SPEC documents; Need structured requirement format; Requirements ambiguous |
| ⏳ Not yet if | Not writing SPECs yet |
| ⏭️ Skip if | Simple requirements; Prefer natural language |

### R4: Troubleshooting
| | Criteria |
|---|---|
| ✅ Use when | Something isn't working; Claude producing unexpected output; Build errors |
| ⏳ Not yet if | N/A - use when needed |
| ⏭️ Skip if | Everything working fine |

---

## Templates

### T1: CLAUDE.md Template
| | Criteria |
|---|---|
| ✅ Use when | Chapter 22 (Dev Environment Setup); Starting new Claude Code project; Updating project context |
| ⏳ Not yet if | Build Contract not generated |
| ⏭️ Skip if | Have customized CLAUDE.md already |

### T2: SPEC Template
| | Criteria |
|---|---|
| ✅ Use when | About to implement any feature; Writing implementation requirements |
| ⏳ Not yet if | Design artifacts incomplete |
| ⏭️ Skip if | Using alternative spec format |

### T3: Build Contract Template
| | Criteria |
|---|---|
| ✅ Use when | Chapter 21; Consolidating design artifacts into implementation plan |
| ⏳ Not yet if | Design phase incomplete |
| ⏭️ Skip if | Never - Build Contract required |

### T4: Quality Checklist
| | Criteria |
|---|---|
| ✅ Use when | Any checkpoint; Code review; Pre-commit verification |
| ⏳ Not yet if | No code to review |
| ⏭️ Skip if | Using automated quality gates |

### T5: Tech Debt Audit
| | Criteria |
|---|---|
| ✅ Use when | Post-milestone cleanup; Refactoring session; Before scaling |
| ⏳ Not yet if | MVP not complete |
| ⏭️ Skip if | No tech debt accumulated (unlikely) |

---

## Interactive Tools

### PromptBuilder
| | Criteria |
|---|---|
| ✅ Use when | Need to generate prompts for Claude Code; Following Build Guide milestones; Want copy-paste commands |
| ⏳ Not yet if | Not in Build phase |
| ⏭️ Skip if | Writing custom prompts |

### Project Workspace
| | Criteria |
|---|---|
| ✅ Use when | Tracking project progress; Storing artifacts; Managing multiple projects |
| ⏳ Not yet if | N/A - always useful |
| ⏭️ Skip if | Using external project management |

### Progress Tracker
| | Criteria |
|---|---|
| ✅ Use when | Want visual progress overview; Checking milestone completion; Reviewing journey |
| ⏳ Not yet if | N/A - always useful |
| ⏭️ Skip if | Prefer manual tracking |

---

## Task 1.3 Checklist

- [x] Define criteria for all 43 chapters
- [x] Define criteria for reference guides (R1-R4)
- [x] Define criteria for templates (T1-T5)
- [x] Define criteria for interactive tools
- [x] Mark GATE chapters clearly
- [x] Ensure no chapter has empty "Not yet if"

---

**Status:** ✅ Task 1.3 Complete
**Next:** Task 1.4 - Design component specs (callouts, checklists, progress indicators)
