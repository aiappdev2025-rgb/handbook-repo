# AI SaaS Handbook

A methodology for building production-quality SaaS products with Claude Code — and the
plugin that lets you actually run it.

Design artifacts compress into a Build Contract. The contract decomposes into SPECs.
Each SPEC is implemented test-first. Milestones are gated by an audited checkpoint that
scores technical debt and blocks on it.

```
Design Brief ┐
UX Package   ├─→ Build Contract ─→ SPEC ─→ RED/GREEN/REFACTOR ─→ tested code
UI System    │                                    │
Architecture ┘                                    └─→ checkpoint audit ─→ git tag
```

## Install

```bash
/plugin marketplace add ~/Projects/ai-saas-handbook
/plugin install moai@moai-handbook
```

Installed once, available in every project. Update with `git pull` then
`/plugin marketplace update`.

## How to build an app with this

Start in the project you're building — not in this repo.

```bash
cd ~/Projects/my-new-app && claude
```

**1 · Bootstrap.** `/moai:init` interviews you, scaffolds `docs/specs/`, `docs/adr/`,
`docs/moai/`, copies the templates, writes a project `CLAUDE.md`, and creates the
state file. Run it with `--dry-run` first to see the manifest.

**2 · Design (Phases 1–3).** `/moai:artifact` with no argument lists the 18 artifacts
and shows which are unblocked. Work down the chain — one-pager → design brief → UX
package → UI system → architecture → **build contract**. The gating is real: it will
refuse to write a UX package before the design brief exists, because doing that out of
order guarantees a rewrite.

**3 · Build (Phase 4).** For each feature:

```
/moai:spec  password reset flow     → docs/specs/SPEC-AUTH-003.md, self-verified
/moai:tdd   SPEC-AUTH-003           → RED: failing tests, no implementation
/moai:tdd                           → GREEN: minimum code to pass
/moai:tdd                           → REFACTOR: full quality gate, SPEC marked Done
```

Repeat until the milestone's SPECs are done, then gate:

```
/moai:checkpoint b
```

It detects your stack, runs build/lint/tsc/audit, dispatches three read-only audit
subagents, scores debt against the weighted formula, writes
`CHECKPOINT-B-REPORT.md`, and prints the `git tag` command — **only** if the score
clears 6.0 with zero failures.

**4 · Every session.** `/moai:session start` restores what the last one established;
`/moai:session end` writes the log, memory and progress entries, then tells you to
`/clear`. That ritual is what makes the method survive a context reset.

`/moai:status` at any time shows the whole project on one screen.

## What's here

| Path | |
| --- | --- |
| [`method/`](method/README.md) | The handbook. 51 chapters across 5 phases, plus **Part 0** on operating Claude Code. Start with Part 0. |
| [`prompts/`](prompts/INDEX.md) | 108 prompts, one file each, flat and greppable. |
| `plugins/moai/` | The plugin: 8 skills, 3 audit subagents, 1 session hook, 11 templates. |
| `tools/` | The converters that generate `method/` and `prompts/` from `archive/`, and the verifier. |
| `archive/` | The original HTML and Docusaurus trees, frozen verbatim. |

## Working on the handbook itself

`method/` and `prompts/` are **generated**. Edit the converters, not the output:

```bash
nvm use 22
npm ci
npm run convert    # rebuild method/ and prompts/ from archive/
npm run verify     # 7 checks, including byte-identity of every prompt body
```

The verifier is not decorative: it fails if any prompt body differs from its source by
a single byte, if any element was dropped without a marker, or if any link is broken.

See `CLAUDE.md` for standing rules and the canonical facts (milestone order, checkpoint
naming, the debt formula) that earlier versions of this material contradicted.
