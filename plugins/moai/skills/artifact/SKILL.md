---
name: artifact
description: Produce any Phase 1-3 design artifact (one-pager, design brief, UX package, UI system, architecture, ADRs, test strategy, build contract) directly in Claude Code, with dependency gating.
argument-hint: "[artifact-id] [--revise]"
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch]
---

# /moai:artifact

Produces the design artifacts that feed the Build Contract. With no argument, list the
artifact ids with their status and show which are currently unblocked.

> The handbook originally split this work between Claude Chat (design) and Claude Code
> (implementation), with a manual copy-paste handoff. That split is a 2026-01 artifact.
> Claude Code does the whole relay now — that is what this command is for.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/method/references/artifacts.json` — 18 definitions,
   each with `{phase, chapter, chapterPath, filename, title, description, extractFields,
   requires}`.
2. Read `${CLAUDE_PLUGIN_ROOT}/skills/method/references/execution.json` for that
   artifact's `prerequisites`, `contextFiles` and `estimatedTime`.
3. **Check the gate.** Every artifact's `requires` array lists the artifact ids that must
   be `complete` in `docs/moai/state.md` first. If any is not, name it and stop.
   Dependency order is the point: a UX package written before the design brief is a
   rewrite waiting to happen. An empty `requires` means the artifact is a valid starting
   point — do not invent a prerequisite from the prose in `execution.json`.
4. Load each `contextFiles` entry from `docs/<name>` and substitute `[TOKEN]`
   placeholders from state using
   `${CLAUDE_PLUGIN_ROOT}/skills/method/references/placeholders.json`.
5. Read the chapter named by `chapterPath` (relative to the handbook repo root, reachable
   at `${CLAUDE_PLUGIN_ROOT}/../..`) and, if the definition names one, its prompt under
   `prompts/`. That chapter is the authoring source — the one-line `description` field is
   a label, not a brief.
6. **Research artifacts need sources.** `market-research` and `competitive-analysis`
   require live data (TAM/SAM/SOM, competitor pricing and funding). Use `WebSearch` /
   `WebFetch` and cite every figure. If web access is unavailable, **stop and ask the
   user for the numbers** — do not supply them from memory. These files chain forward as
   `contextFiles` into every later artifact including the Build Contract, so an
   unsourced figure propagates silently through the whole design.
7. Draft the artifact **in the conversation** so the user can steer it, then write it to
   `docs/<filename>` using the `filename` from the definition. Everything downstream —
   `/moai:spec`, `/moai:checkpoint`, and this command's own `contextFiles` — reads from
   `docs/`.
8. Update state: set `artifacts.<id>.status = complete`, and write each `extractFields`
   value to **the dotted path given in `extractFields` verbatim** (`phase1.*`, `phase2.*`,
   `phase3.*`). Those are the exact keys `placeholders.json` reads back; writing them
   anywhere else leaves later `[TOKEN]` substitutions unresolved.

## Success condition

The file exists at `docs/<filename>`, is not a placeholder, and every `extractFields` key
for that artifact is populated in state at its verbatim path.
