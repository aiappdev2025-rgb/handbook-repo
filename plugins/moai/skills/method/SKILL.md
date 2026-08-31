---
name: method
description: >
  Use this skill whenever the user mentions any of these unambiguous MOAI terms, in any
  project: a SPEC-/REQ-/TC-/D- identifier, EARS requirements, a Build Contract, a
  milestone M1-M11, Checkpoint A/B/C, the MOAI method, or one of the /moai: commands.
  ALSO use it for otherwise-generic requests — "what's next", "am I ready to tag",
  "write the tests first", "run the checkpoint", "score the debt", "start the next
  milestone" — but ONLY when the current project is a MOAI project, which is true if
  docs/moai/state.md or docs/specs/ exists. Do not load it for generic phrasing in a
  project with neither. Provides the phase and milestone map, the EARS and
  GIVEN-WHEN-THEN formats, the TDD gate, the debt scoring formula, and the state
  contract.
version: 1.0.0
---

# MOAI — Milestone-Oriented AI Integration

A method for building a SaaS product with Claude Code without accumulating the kind of
debt that stalls a project at 60%. Design artifacts compress into a Build Contract; the
contract is decomposed into SPECs; each SPEC is implemented test-first; milestones are
gated by an audited checkpoint.

```
Design Brief ┐
UX Package   ├─→ Build Contract ─→ SPEC ─→ RED/GREEN/REFACTOR ─→ tested code
UI System    │                                    │
Architecture ┘                                    └─→ checkpoint audit ─→ git tag
```

> MOAI here is this handbook's own coinage. It draws on the upstream **MoAI-ADK**
> framework (*Methodology for Organized AI-Driven Development Kit*) for SPEC-First,
> EARS and Doc-Sync, but the M1–M11 milestone structure is the handbook's.

## Phases

| Phase | Chapters | Produces |
| --- | --- | --- |
| 0 Operating | Part 0 | *(how to drive Claude Code — read first)* |
| 1 Validate | 1–7, 44–45 | market research, one-pager, design brief |
| 2 Design | 8–12, 46–47 | UX package, UI system, visual direction |
| 3 Architect | 13–22, 48–51 | architecture, infrastructure, **Build Contract** |
| 4 Build | 23–41 | SPECs, tested code, checkpoint reports |
| 5 Launch | 42–43 | QA, deployment, launch checklist |

## Milestones — canonical, do not renumber

M1 Project Setup → M2 Design System → M3 Database → **Checkpoint A** →
M4 Layouts → M5 Authentication → M6 Core Feature → **Checkpoint B** →
M7 Admin Console → M8 Supporting Features → M9 Payments → M10 Polish →
**Checkpoint C** → M11 Testing.

Checkpoints tag the repo: `checkpoint-a`, `checkpoint-b`, `checkpoint-c`.

⚠ A competing numbering exists in retired material (M2 Database, M3 Core API,
checkpoints 1/2/3). **It is wrong here.** Every build prompt ID encodes the milestone
number — `Prompt 3.1 Core Database Schema` belongs to M3 — so renumbering would
contradict the ID of all 31 build prompts. Use the sequence above.

## SPEC format — EARS

| Type | Pattern |
| --- | --- |
| Ubiquitous | The [system] shall [action] |
| State-Driven | While [state], the [system] shall [action] |
| Event-Driven | When [event], the [system] shall [action] |
| Optional | Where [condition], the [system] shall [action] |
| Unwanted | The [system] shall not [action] |

Test cases are GIVEN / WHEN / THEN.

**Identifiers.** `SPEC-<PREFIX>-<NNN>`, `REQ-<PREFIX>-<NNN>`, `TC-<PREFIX>-<NNN>`,
debt items `D-<NNN>`. Prefixes: AUTH, DASH, PHOTO, GEN, BILL, ADMIN, CORE.

**Filename rule.** A SPEC's filename stem must equal its ID exactly
(`docs/specs/SPEC-AUTH-001.md`) — `spec-check.sh` links SPEC to test by that stem, so
a descriptive suffix breaks traceability.

## The TDD loop

```
RED      write failing tests from the SPEC's test cases — NO implementation
GREEN    minimum code to pass
REFACTOR clean up; tests stay green
DONE     quality gate passes, SPEC marked Status: Done
```

Quality gate: `npm test && npm run build && npm run lint` (plus `npx tsc --noEmit`).

**RED never writes implementation code.** This is the guardrail an unaided agent
breaks most often, and the one that makes the rest of the method work.

Every test file opens with a `// SPEC: SPEC-XXX-NNN` comment. Every `TC-*` id in the
SPEC must appear as a test name.

## Technical debt score

```
(Complexity × 0.25) + (ErrorHandling × 0.20) + (TypeSafety × 0.20)
  + (TestCoverage × 0.20) + (DocSync × 0.10) + (Dependencies × 0.05)
```

Weights sum to 1.00. **Doc-Sync is 10%** — retired material says 15% in places; that is
arithmetically inconsistent with this formula. Checkpoints gate at **≥ 6.0**.

Doc-Sync is not a vibe: it is measured by `scripts/spec-check.sh --json`, which
verifies every SPEC is Done, every SPEC has a test file carrying its `// SPEC:`
comment, every `TC-*` id appears in that test file, and no TODO is older than 7 days.

## State

`docs/moai/state.md` in the *project being built* is authoritative for phase,
milestone, active SPEC, TDD phase, artifacts, debt and checkpoints. YAML frontmatter is
machine state; the body below it is a generated human view.

- **Never hand-edit the frontmatter** — commands own it.
- `PROGRESS.md` is the human narrative log (append dated entries); state.md is not.
- Run `/moai:status` to read it. It survives `/clear`; your context does not.

## Commands

| Command | Use |
| --- | --- |
| `/moai:init` | Bootstrap a project into a MOAI-executable state |
| `/moai:artifact <id>` | Produce any Phase 1–3 design artifact |
| `/moai:spec <feature>` | Author one SPEC, self-verified against the Ready checklist |
| `/moai:tdd <SPEC-ID>` | Run one phase of RED/GREEN/REFACTOR |
| `/moai:checkpoint <a\|b\|c>` | Audit, score debt, write the report, propose the tag |
| `/moai:status` | The whole project on one screen |
| `/moai:session start\|end` | The context-boundary ritual |

## Reference

Load on demand — do not read these unless the task needs them.

| File | When |
| --- | --- |
| `${CLAUDE_PLUGIN_ROOT}/assets/templates/quality-checklist.md` | the SPEC Ready and Implementation Done checklists, and the per-checkpoint gates |
| `${CLAUDE_PLUGIN_ROOT}/assets/templates/checkpoint-debt-audit.md` | running a checkpoint audit — the per-category worksheets |
| `${CLAUDE_PLUGIN_ROOT}/skills/method/references/artifacts.json` | artifact ids, filenames, chapter paths, dependency gating |
| `${CLAUDE_PLUGIN_ROOT}/skills/method/references/execution.json` | per-artifact prerequisites, context files, timing |
| `${CLAUDE_PLUGIN_ROOT}/skills/method/references/placeholders.json` | the `[TOKEN]` → state-field substitution map |
| `${CLAUDE_PLUGIN_ROOT}/../../method/04-build/27-build-milestones.md` | planning or starting a milestone |
| `${CLAUDE_PLUGIN_ROOT}/../../method/README.md` | the full handbook: 51 chapters + Part 0 |
| `${CLAUDE_PLUGIN_ROOT}/../../prompts/INDEX.md` | all 108 prompts, flat and greppable |
