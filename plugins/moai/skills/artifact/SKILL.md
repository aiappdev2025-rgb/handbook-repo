---
name: artifact
description: Produce any Phase 1-3 design artifact (one-pager, design brief, UX package, UI system, architecture, ADRs, test strategy, build contract) directly in Claude Code, with dependency gating.
argument-hint: "[artifact-id] [--revise]"
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash]
---

# /moai:artifact

Produces the design artifacts that feed the Build Contract. With no argument, list the
artifact ids with their status and show which are currently unblocked.

> The handbook originally split this work between Claude Chat (design) and Claude Code
> (implementation), with a manual copy-paste handoff. That split is a 2026-01 artifact.
> Claude Code does the whole relay now — that is what this command is for.

## Steps

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/method/references/artifacts.json` — 18 definitions,
   each with `{phase, chapter, filename, title, description, extractFields}`.
2. Read `execution.json` for that artifact's `prerequisites`, `contextFiles` and
   `estimatedTime`.
3. **Check the gate.** If a prerequisite artifact is not `complete` in
   `docs/moai/state.md`, say which one and stop. Dependency order is the point: a UX
   package written before the design brief is a rewrite waiting to happen.
4. Load the `contextFiles` from `docs/` and substitute `[TOKEN]` placeholders from
   state using `placeholders.json`.
5. Read the matching chapter in `method/` and its prompt in `prompts/`.
6. Draft the artifact **in the conversation** so the user can steer it, then write it
   to the `filename` from the definition.
7. Update state: `artifacts.<id>.status = complete`, and write the `extractFields` back
   into `profile.*` so later prompts can substitute them.

## Success condition

The file exists, is not a placeholder, and every `extractFields` key for that artifact
is populated in state.
