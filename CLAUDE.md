# CLAUDE.md — AI SaaS Handbook

Two things live here: the **handbook** (the MOAI method, as markdown) and the **`moai`
plugin** (that method, as Claude Code skills you run from inside other projects). This
repo is not an app and has no build, no dev server and no deploy target.

## SESSION WORKFLOW

1. Read `PROGRESS.md` first. It is the single source of truth for status; this file
   holds standing rules only.
2. Append a dated entry to `PROGRESS.md` as you go — not at the end.
3. `method/` and `prompts/` are **generated**. Never hand-edit them. Change the
   converter in `tools/`, then `npm run convert && npm run verify`.
4. `npm run verify` must be green before any commit that touches `tools/` or `archive/`.

## REPO LAYOUT

```
method/          GENERATED. 51 chapters + Part 0 (23) + 4 appendices. The source of truth for content.
  _data/         GENERATED. artifacts.json, execution.json, placeholders.json — mined from the retired app.
prompts/         GENERATED. 108 prompts, flat. INDEX.md is the catalogue.
plugins/moai/    The Claude Code plugin: 8 skills, 3 agents, 1 hook, 11 templates.
tools/           The converters and the verifier. The only hand-written code.
archive/         FROZEN. The original HTML and Docusaurus trees, verbatim.
```

## THE PLUGIN

Installed once, globally, and then available in every project:

```
/plugin marketplace add ~/Projects/ai-saas-handbook
/plugin install moai@moai-handbook
```

- **Commands are skills.** `skills/<name>/SKILL.md` with `argument-hint` +
  `allowed-tools` in the frontmatter. ⚠ `commands/*.md` is a **legacy format** — it
  loads identically but is the older layout. Do not create it.
- Every intra-plugin path goes through `${CLAUDE_PLUGIN_ROOT}`. That is what lets a
  command find its templates while cwd is some other project.
- The `SessionStart` hook **must** exit 0 with zero output when `docs/moai/state.md`
  is absent. It runs in every repo on the machine.

## TESTING PLUGIN CHANGES

`/plugin marketplace update`, then exercise the command in a **throwaway** project.
Never test `/moai:init` against a real app repo — build and use its `--dry-run` first.

## CANONICAL FACTS

These were contradictory across the old trees. They are settled; do not "fix" them back.

- **Milestones:** M1 Setup · M2 Design System · M3 Database · **Checkpoint A** ·
  M4 Layouts · M5 Auth · M6 Core Feature · **Checkpoint B** · M7 Admin ·
  M8 Supporting · M9 Payments · M10 Polish · **Checkpoint C** · M11 Testing.
  A retired MDX tree used M2 Database / M3 Core API and checkpoints 1/2/3. **Wrong
  here.** Every build prompt ID encodes its milestone (`Prompt 3.1 Core Database
  Schema` = M3), so renumbering would contradict all 31 build prompt IDs.
- **Tags** are `checkpoint-a|b|c`. Never `checkpoint-1`.
- **Debt formula:** `(C×.25)+(EH×.20)+(TS×.20)+(TC×.20)+(DS×.10)+(Dep×.05)` = 1.00.
  **Doc-Sync is 10%**, not 15% — 15% appeared in two retired files and does not sum.
  Gate threshold **6.0**.
- **MOAI** = *Milestone-Oriented AI Integration*, this handbook's coinage. **MoAI-ADK**
  (*Methodology for Organized AI-Driven Development Kit*) is the upstream framework it
  borrows SPEC-First/EARS/Doc-Sync from. Two different things; keep them distinct.
- **IDs:** `SPEC-<PREFIX>-<NNN>`, `REQ-`, `TC-`, `D-`. A SPEC's filename stem must
  equal its ID exactly — `spec-check.sh` links SPEC to test by that stem.

## CONVENTIONS

- Node 22 (`.nvmrc`). One devDependency: `cheerio`, pinned exact.
- Chapters: `method/<NN>-<phase>/<CC>-<slug>.md`, zero-padded so `ls` sorts right.
- Prompt IDs are namespaced: `B-<M>.<n>` build · `CA-/CB-/CC-` checkpoint ·
  `A-<slug>` audit · `V-/D-/X-` phase 1/2/3 · `W-` Part 0 · `S-` from SmartPrompt.
- Conventional commits.

## DON'T TOUCH

- **`archive/**` is frozen.** It is the provenance for every generated file and the
  safety net that makes the conversion reversible. Never edit it; to use something
  from it, promote it through a converter.
- **`method/**` and `prompts/**` are generated.** Editing them by hand puts them out
  of sync with `archive/` and the next `npm run convert` silently discards your work.
- **`plugins/moai/assets/templates/spec-template.md`** and
  **`build-contract-template.md`** — every downstream project's SPECs are shaped by
  these. Changing a heading breaks `spec-check.sh` and every SPEC already written.
- **`prompts/*.alt-v3.md`** are not content — they are the 27-item review queue for a
  reconciliation decision nobody has made yet. Don't merge or delete them casually.
- Do not renumber chapters 1–43. Prompt IDs, the archive and 228 section anchors all
  key off those numbers.
- Do not resurrect the Chat→Code platform split in `method/_data/execution.json`.
  Claude Code does the whole relay now; `/moai:artifact` exists because of that.
