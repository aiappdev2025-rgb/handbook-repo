---
chapter: null
appendix: "C"
title: "Glossary"
slug: "glossary"
milestone: null
checkpoint: null
tool: null
session: null
estimated_time: "15 min read"
description: "Every method-specific term in one place, with the settled meaning where the handbook has more than one"
prerequisites: []
when_to_use:
  - "A term in a chapter, prompt or plugin command is unfamiliar"
  - "Two chapters seem to use the same word for different things"
  - "Writing a SPEC, Build Contract or session log and you need the canonical name"
skip_if: "You have read Parts 0-4 recently and nothing in them surprised you"
---

# Appendix C: Glossary

> **TL;DR**
> The vocabulary of the method, alphabetical, one paragraph each. Where the handbook's chapters disagree, the entry says which meaning is settled and where the ruling comes from.
>
> **Why:** This handbook was assembled from three generations of source material. Most of the friction a newcomer feels is one word carrying two meanings. Naming the collision removes it.
>
> **Outcome:** One place to check before you name a file, an ID, a checkpoint or a phase.

Entries marked **Settled** record a ruling from the repository's canonical facts. Entries marked **Two senses** are words the handbook uses in two ways that are both legitimate; the entry tells them apart.

---

## A

**`.alt-v3` variant.** A prompt from the archived build guide kept verbatim beside its canonical counterpart under `prompts/`. Not content; a 27-item review queue for a reconciliation decision not yet made. Do not merge or delete casually.

**`A-` prefix.** Audit prompt IDs: refactor, code review, security, debt review, debt remediation. See [Prompt ID namespaces](#p).

**Acceptance criteria.** The checklist at the end of a SPEC that decides when it is Done: functional, quality, security and documentation sections. **Two senses:** the Design Brief also lists acceptance criteria per user story; those are product conditions, not the SPEC gate.

**ADR (Architecture Decision Record).** A short document capturing one architectural decision: context, decision, alternatives, consequences. See [ADR Templates](../03-architect/50-adr-templates.md). Directory naming is not settled: the chapter says `docs/adrs/`, `/moai:init` creates `docs/adr/`, and the artifact writes a single `docs/adrs.md`.

**API Surface.** Section 6 of the Build Contract: every route with method and auth requirement. SPECs cite it by section number.

**Artifact.** One of the 18 Phase 1-3 design documents the method produces before code. Each has an id, a filename, a source chapter, the state fields it must fill (`extractFields`) and the artifacts it `requires`. The 18: market-research, opportunity-assessment, business-one-pager, competitive-analysis, mvp-scope, design-brief, design-philosophy, ux-package, user-flows, ui-system, component-library, solution-architecture, data-model, api-spec, security-architecture, adr-templates, test-strategy, build-contract. `/moai:artifact` writes them; `docs/moai/state.md` tracks `empty | draft | complete`.

**Auto-compaction.** Claude Code's automatic, lossy summarisation of conversation history when the context fills. See [Configuration: Auto-Compact and Token Limits](../00-operating/13-configuration-auto-compact-and-token-limits.md).

## B

**`B-<M>.<n>` prefix.** Build prompt IDs, keyed to their milestone: `B-3.1` belongs to M3. This is why milestones cannot be renumbered.

**Build Contract.** The bridge document that compresses the design artifacts into a structured reference for implementation: Vocabulary, User Model, Screen Inventory, Component Specifications, Data Model, API Surface, Quality Standards. Every SPEC cites it by section number; that citation is the traceability link. See [Build Contract Structure](../03-architect/20-build-contract-structure.md).

## C

**`CA-` / `CB-` / `CC-` prefix.** Checkpoint prompt IDs for Checkpoints A, B and C.

**Canonical vocabulary.** The terms fixed in the Design Brief and restated in Build Contract section 1, to be used exactly in code, comments and UI text. Inconsistent naming is the first source of design-to-code errors.

**Checkpoint (A, B, C).** A quality gate between milestones that runs the tests, the audit sub-agents and the debt score, writes a report, and tags the repository. **Settled:** A after M3, B after M6, C after M10; tags are `checkpoint-a|b|c`, letters not numbers. Any text that numbers the checkpoints or says "proceed to Milestone 2" comes from a retired numbering.

**Checkpoint (Part 0 sense).** **Two senses:** in Part 0 a checkpoint is any point where work is committed and context can be cleared safely: task, session, milestone or recovery checkpoint. See [Checkpoint and Recovery Strategy](../00-operating/11-checkpoint-and-recovery-strategy.md). Unrelated to Checkpoints A/B/C.

**`CHECKPOINT-<A|B|C>-REPORT.md`.** The per-checkpoint report, one line per check, marked ✅ passed, ⚠️ recorded but non-blocking, ⏭️ could not run and never blocks, ❌ blocks the tag.

**`.checkpoint-config.yaml`.** Optional stack-detection override read by `/moai:checkpoint`; created by init only when detection was uncertain.

**CLAUDE.md.** The file Claude Code reads at the start of every session: quick context, essential commands, hard rules, pointers. Keep it lean; put reusable knowledge in skills. See [The CLAUDE.md File](../00-operating/04-the-claude-md-file.md) and [Skills vs CLAUDE.md](../00-operating/06-skills-vs-claude-md.md).

**`/clear`.** Resets the conversation context. Files survive; conversation does not. See [When and How to Use /clear](../00-operating/12-when-and-how-to-use-clear.md).

**Command (plugin).** A `/moai:*` entry point. **Settled:** commands are skills, defined as `skills/<name>/SKILL.md`; the `commands/` layout is legacy and is not created.

**Component Library.** Phase 2 artifact specifying each UI component in every state and variant. **Two senses:** section 2 of the UI System carries the same name.

**Context budget.** The four bands of context size and the action each prescribes: Fresh 0-50K, Working 50-100K, Heavy 100-150K, Critical 150K+. See [Token Economics](../00-operating/02-token-economics-and-why-context-matters.md). The session rhythm collapses this to one decision point at 80K.

**Context window.** The fixed memory holding everything Claude can see at once: system prompt, conversation and file contents. See [The Context Window Mental Model](../00-operating/01-the-context-window-mental-model.md).

**`contextFiles`.** The inputs `/moai:artifact` loads from `docs/` before drafting an artifact, defined per artifact in `execution.json`.

## D

**`D-<NNN>`.** A technical-debt item in `TECH-DEBT.md`: id, category, severity, file, effort S/M/L, fix. **Two senses:** `D-` is also the Phase 2 Design prompt prefix. Context always tells them apart; a debt id has three digits and no slug.

**Data Model.** Section 5 of the Build Contract: entities, columns, constraints and RLS policies. Also the id of the standalone Phase 3 artifact.

**Debt categories.** **Settled:** six, with fixed weights: Code Complexity 25%, Error Handling 20%, Type Safety 20%, Test Coverage 20%, Documentation Sync 10%, Dependency Health 5%. Each scored 0-10. Any rubric with different categories per checkpoint is retired material.

**Debt score.** **Settled:** `(C×.25)+(EH×.20)+(TS×.20)+(TC×.20)+(DS×.10)+(Dep×.05)`, out of 10. Bands: 8.0+ excellent, 7.0-7.9 good, 6.0-6.9 acceptable, 5.0-5.9 concerning, below 5.0 stop. **Gate threshold 6.0** at every checkpoint. See [Technical Debt](../04-build/26-tech-debt.md).

**Defense in depth.** Security in layers: network, authentication, authorization (RLS), input validation, data protection. API validation and RLS both apply; never one alone.

**Design Brief.** Phase 1 artifact and the source of canonical vocabulary. States the what, not the how. See [Design Brief](../01-validate/07-design-brief.md).

**Design Philosophy.** Phase 2 artifact: the five principles a product commits to, such as clarity over cleverness and progressive disclosure. See [Design Philosophy](../02-design/08-design-philosophy.md).

**Design tokens.** The copy-pasteable values of the UI System: palette, type scale, spacing scale, radii, shadows.

**Doc-Sync (Documentation Sync).** The 10% debt category. **Settled:** it is measured, not judged: `bash scripts/spec-check.sh --json` returns the score. Every SPEC Done, every SPEC linked to a test file carrying `// SPEC: <ID>`, every `TC-*` id present in that file, no TODO older than seven days. Spell it Doc-Sync.

## E

**EARS (Easy Approach to Requirements Syntax).** Five sentence patterns that make a requirement's condition explicit. Ubiquitous: *The system shall …*. Event-driven: *When …, the system shall …*. State-driven: *While …, the system shall …*. Optional: *Where …, the system shall …*. Unwanted: *The system shall not …*. See [EARS Syntax](d-ears-syntax.md). Every SPEC needs at least one Unwanted requirement; it is the one people forget.

**Effort.** The depth-of-reasoning dial on current models, set alongside the model. Tune it before switching model. See [AI Cost and Session Management](../00-operating/24-ai-cost-and-session-management.md).

**`execution.json`.** Per-artifact prerequisites, context files and timing. Its prose prerequisites are advisory; `requires` in `artifacts.json` is the gate.

**`extractFields`.** The dotted state paths an artifact must fill in `docs/moai/state.md`, written verbatim so `placeholders.json` can read them back into prompts.

## F

**Five Pillars.** Structure, Simplicity, Safety, Speed, Stability: the standards every piece of code is judged against. See [Quality Framework](../01-validate/03-quality-framework.md). Where the pillars say functions "rarely exceed 20-30 lines", the enforced rule everywhere else is a hard 30.

## G

**Gate.** **Three senses.** ⛔ GATE in a chapter header: a hard precondition, such as M1-M6 complete before Checkpoint B. Quality gate: the command set that must pass before a SPEC is Done, read from `state.gates` (`npm test && npm run build && npm run lint && npx tsc --noEmit` by default). Checkpoint gate: debt score at or above 6.0.

**GIVEN / WHEN / THEN.** The test-case format in a SPEC. GIVEN a precondition the reader can set up, WHEN one action, THEN outcomes observable without reading the code. Maps one-to-one onto test structure.

**GREEN.** The second TDD phase: the minimum implementation that makes the RED tests pass. No extra features, no speculative abstraction.

## I

**Implementation Done checklist.** The gate before a SPEC moves to Review: tests green, no skips, coverage, functions ≤30 lines, files ≤200, nesting ≤3, naming, security. See [Quality Checklist](../../plugins/moai/assets/templates/quality-checklist.md).

## M

**M1-M11.** **Settled:** M1 Project Setup, M2 Design System, M3 Database, Checkpoint A, M4 Layouts, M5 Authentication, M6 Core Feature, Checkpoint B, M7 Admin Console, M8 Supporting Features, M9 Payments, M10 Polish, Checkpoint C, M11 Testing. The retired "M2 Database / M3 Core API" order is wrong here. See [Build Milestones](../04-build/27-build-milestones.md).

**MEMORY.md.** `docs/MEMORY.md`: durable learnings that will still be true next week. Key decisions, established patterns, things that did not work. Not a diary. See [Memory Persistence Strategies](../00-operating/18-memory-persistence-strategies.md).

**Milestone.** A unit of build work with named deliverables; eleven of them, three checkpoints between. Part 0 maps each to one to five sessions, 22-32 in total. See [Mapping Milestones to Sessions](../00-operating/20-mapping-milestones-to-sessions.md).

**MOAI.** **Settled:** *Milestone-Oriented AI Integration*, this handbook's own name for its method: SPEC-first, TDD, milestone checkpoints, durable state. Chapters that credit the whole method to "MOAI-ADK" predate the distinction.

**MoAI-ADK.** **Settled:** *Methodology for Organized AI-Driven Development Kit*, the upstream framework from which MOAI borrows SPEC-First, EARS and Doc-Sync. A different thing; keep the names distinct.

**`/moai:*` commands.** `init` bootstraps a project; `artifact` produces a Phase 1-3 document; `spec` writes one SPEC; `tdd` runs one RED/GREEN/REFACTOR phase; `checkpoint` runs an A/B/C audit; `status` shows the project on one screen; `session start|end` is the context-boundary ritual. Plus the `method` skill, which loads on MOAI vocabulary.

**MVP Scope.** Phase 1 artifact: the three to five core features and everything deliberately left out.

## O

**One-Pager.** Phase 1 artifact forcing clarity on the business model before design. Artifact id `business-one-pager`; chapters that name the file `docs/one-pager.md` predate the artifact registry.

**One Verifiable Outcome rule.** Every task has exactly one way to prove it is done: visual, functional, file exists, test passes, or command succeeds. See [The One Verifiable Outcome Rule](../00-operating/09-the-one-verifiable-outcome-rule.md).

## P

**Part 0 (Operating).** The Claude Code operating manual: 24 chapters and five appendices that apply throughout every phase. Read it first. See [Part 0](../00-operating/README.md).

**Phase 0-5.** **Settled:** 0 Operating (Part 0), 1 Validate, 2 Design, 3 Architect, 4 Build, 5 Launch. Older chapters use "Research / Design / Architecture / Build Contract / Build" or a Stage 0.1-5.0 numbering; both map onto these five.

**Placeholder / `[TOKEN]`.** A bracketed, all-caps slot in a prompt or template, such as `[PRODUCT_NAME]`, substituted from the `profile` block of state. `placeholders.json` holds the 30-token map. A prompt still containing a placeholder has not been prepared.

**Plan mode.** Claude Code's read-only exploration mode: analysis and a plan, no edits. Cheap insurance at the start of a milestone.

**`profile`.** The block in `docs/moai/state.md` holding the values artifacts extracted, at the exact `extractFields` paths.

**PROGRESS.md.** The human narrative log: dated, append-only entries. In a MOAI project it is the source of truth for status; `docs/moai/state.md` is the machine's.

**Prompt ID namespaces.** **Settled:** `B-<M>.<n>` build, `CA-/CB-/CC-` checkpoint, `A-<slug>` audit, `V-/D-/X-` Phase 1/2/3, `W-` Part 0, `S-` from the retired SmartPrompt component. Namespaced so one number can never mean two things.

## Q

**Quality gate.** See Gate. **Two senses:** Part 0 also uses the phrase for a milestone-completion context boundary, the natural place to clear.

## R

**RED.** The first TDD phase: failing tests only, one `it()` per `TC-*` id, first line `// SPEC: <ID>`. No implementation, not a stub, not a type. Every test must fail, and fail on an assertion, not an import error; a throw-only test that is green against an empty module proves nothing.

**REFACTOR.** The third TDD phase: functions ≤30 lines, files ≤200, nesting ≤3, no `any`, no empty catches; then the full quality gate, the Implementation Done checklist, and `Status: Done`.

**`REQ-<PREFIX>-<NNN>`.** An EARS requirement id inside a SPEC, tagged with its pattern type. **Settled** shape carries the prefix; templates that show bare `REQ-001` are older.

**`requires`.** Per artifact, the artifact ids that must be `complete` first. An empty list marks a valid starting point. A UX package written before the design brief is a rewrite waiting to happen.

**RLS (Row Level Security).** Database-level authorization policies on every table: the last line of defense when application checks fail. Non-negotiable in M3 and audited at every checkpoint.

## S

**`S-` prefix.** Prompts recovered from the retired Docusaurus app's SmartPrompt component. Same status as any other prompt.

**Screen Inventory.** Every screen with route, purpose, entry and exit points, components, and its error, loading and empty states. UX Package section 2 and Build Contract section 3.

**Session.** One conversation between two clears. **Session boundary:** the ritual at each end, `/moai:session start` restoring what the last session established and `/moai:session end` writing the log, memory and progress so the work survives `/clear`. See [The Session Rhythm](../00-operating/14-the-session-rhythm.md).

**Session log.** `docs/sessions/YYYY-MM-DD-<slug>.md`: duration, milestone, context clears, completed, decisions made, next session should. Decisions Made is the highest-value section; add a Cost line.

**Severity.** Audit findings are exactly `critical | high | medium | low`. Critical and high become ❌ and block the tag; medium and low become ⚠️; checks that could not run become ⏭️ and never block.

**Skill.** Reusable knowledge that applies across projects, as opposed to CLAUDE.md's project-specific context. The plugin's commands are skills.

**SPEC.** The unit of work: one feature, fully defined before implementation, testable, traceable to the Build Contract. `docs/specs/SPEC-<PREFIX>-<NNN>.md`. **Settled:** the filename stem equals the ID exactly; `spec-check.sh` links SPEC to test by that stem. Status values: Draft, Ready, In Progress, Review, Done (lowercase, hyphenated in state).

**SPEC ID prefixes.** **Settled** set: AUTH, DASH, PHOTO, GEN, BILL, ADMIN, CORE, from the shipped SPEC template. The older appendix set (USER, PAY, UI) is retired.

**SPEC Ready checklist.** The gate before implementation: overview complete, Build Contract cited with version, EARS requirements each with a GIVEN/WHEN/THEN test case, acceptance criteria filled, requirements testable and unambiguous, at least one unhappy path.

**SPEC-First.** Requirements and test cases before any code. Every feature, however small, gets a SPEC. See [SPEC-First Development](../04-build/24-spec-first.md).

**`spec-check.sh`.** `scripts/spec-check.sh`: the Doc-Sync measurement. Five checks, `--json` emits `{"score": N, "issues": [...]}`, exit 1 below 6. A fresh project scores 10.

**`state.md`.** `docs/moai/state.md`: machine-owned. YAML frontmatter is the authoritative phase, milestone, active SPEC, TDD phase, artifacts, debt and checkpoints; the body is a generated human view. Never hand-edit the frontmatter. **Two senses:** Part 0's `docs/STATE.md` is an older, hand-written file with the same job; in a plugin project `docs/moai/state.md` plus `PROGRESS.md` replace it.

**`state-banner.sh`.** The plugin's SessionStart hook: prints a one-screen status banner in a MOAI project and exits silently everywhere else.

**Sub-agent.** A worker with its own context, spawned by the main conversation and reporting back. **Two senses:** Part 0 describes the general mechanism; the plugin ships three named read-only auditors (`moai-debt-analyst`, `moai-refactor-auditor`, `moai-security-auditor`) dispatched by `/moai:checkpoint`. See [Understanding Sub-Agents](../00-operating/16-understanding-sub-agents.md).

## T

**TASKS.md.** `docs/TASKS.md`: the backlog with `[x]` done, `[ ]` open, `[~]` in progress, `[!]` blocked. `/moai:init` generates it as the M1-M11 plus A/B/C tracker.

**`TC-<PREFIX>-<NNN>`.** A test-case id in a SPEC. Every `TC-*` must appear as a test name in the linked test file; `spec-check.sh` matches the prefixed form only, so `TC-001` is invisible to it.

**TDD cycle.** RED, GREEN, REFACTOR, Done. One phase per `/moai:tdd` invocation; never skip RED. See [TDD Workflow](../04-build/25-tdd-workflow.md).

**TECH-DEBT.md.** The debt register at the project root: category table, the `D-<NNN>` items by priority, and a score row per checkpoint.

**Test file linking.** First line of a test file: `// SPEC: SPEC-<PREFIX>-<NNN>`. This is what lets Doc-Sync be measured instead of estimated.

**Test Strategy.** Phase 3 artifact: what is tested, how, with which tools. Tests precede implementation. Framework choice is stack-detected by init and recorded in `state.stack.testRunner`.

**TL;DR block.** The opening callout on chapters converted from the MDX tree: summary, Why, Outcome. Chapters from the HTML tree carry an Expected Outcome block at the end instead. Same purpose, two positions.

**`tool:` / `session:` frontmatter.** Where a chapter's prompt was meant to run (`claude-chat`, `claude-code`) and in which conversation. The Chat-to-Code relay is retired: Claude Code does the whole relay, and `/moai:artifact` exists because of that. The fields remain as provenance.

## U

**UI System.** Phase 2 artifact defining the visual language: tokens, components, patterns, states. See [UI System](../02-design/11-ui-system.md).

**UX Critique.** The revision pass between the draft UX Package and the UI System. Not one of the 18 artifacts.

**UX Package.** Phase 2 artifact: all screens, all flows, all states; the blueprint for UI design. See [UX Package](../02-design/09-ux-package.md).

## V

**`V-` / `X-` / `W-` prefix.** Phase 1 Validate, Phase 3 Architect and Part 0 prompt IDs. (`D-` is Phase 2 Design; see the debt-item collision under D.)

**Vibe coding.** Code that appears to work but fails professional standards because the developer went with the vibe rather than verifying the substance. Six patterns: monolithic functions, copy-paste proliferation, implicit coupling, security as afterthought, performance blindness, inconsistent error handling. See [The Quality Crisis](../01-validate/02-quality-crisis.md).

**Vocabulary (Build Contract section 1).** The canonical terms, used exactly in variable names, function names, comments and UI text.

---

## Not yet defined anywhere

Three names appear only in the repository's history, never in a chapter: the **R1-R4 review gates** and **PromptBuilder** from an orphaned prompt-builder component, and **Conductor**, the retired Docusaurus app whose data the converter mined. They are recorded as known gaps, not vocabulary.
