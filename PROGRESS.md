# PROGRESS

Dated, append-only log. This is the single source of truth for status; `CLAUDE.md`
holds standing rules. Replaces the old `docs/ROADMAP.md` and `docs/TASKS.md`, both of
which had drifted badly (11 of 24 roadmap rows were mis-stated; TASKS.md had zero
genuinely open items and contradicted itself).

## 2026-09-06 — ownership consolidated under silverpepperlabsadmin-stack

The 2026-09-02 push was investigated and found correctly attributed: every commit in
this repo had always been authored as `aiappdev2025-rgb`, and the repo was owned by that
account. What was wrong was the machine: the global git identity was `aiappdev2025-rgb`,
so it had leaked into two Silver Pepper repos (`silverpepperlabs-web`, `email-mass-app`).

Decision (owner): everything under `silverpepperlabsadmin-stack`, nothing else. Applied:

- Global git identity → `Silver Pepper <silverpepperlabs.admin@gmail.com>`; the
  `aiappdev2025-rgb` login removed from `gh`.
- **History rewritten** (author + committer) and force-pushed here and in the two
  affected repos. Every hash before this entry changed; the upstream base commit
  `1896301` is now `b921728`, and `tools/verify-migration.sh` gate 1 pins the new hash.
- Repo transfer `aiappdev2025-rgb/handbook-repo → silverpepperlabsadmin-stack`
  requested via the API; pending the owner's email acceptance. `origin` already points
  at the new URL. `package.json`, `plugin.json` and `marketplace.json` owner fields
  updated. `archive/` still carries the old org name in the retired Docusaurus config —
  frozen provenance, left as is.

Both verifiers green after the change: `npm run verify` 7/7, `verify-migration.sh` 46/46.

## 2026-08-31 (later) — plugin surface audited and repaired before first use

A 47-agent adversarial audit of `plugins/moai/` — the part that had never been executed
and that the 42 structural gates could not reach. **35 confirmed defects, 5 refuted,
zero blockers.** Everything below is fixed and verified.

**`/moai:artifact` — six defects in one 40-line skill.** It wrote all 18 artifacts to the
project root while every other command reads them from `docs/`; drafted from the one-line
`description` because the path to the source chapter was a bare slug (5 of 18 matched no
file); wrote `extractFields` to a `profile.*` namespace nothing reads, so 18 of 30
`[TOKEN]` placeholders could never resolve; and owned `market-research` with no
`WebSearch`, so TAM/SAM/SOM came from model memory and chained forward into the Build
Contract unmarked.

**`spec-check.sh` — three more bugs of the class already fixed four of.** `SRC_DIR` was
hard-coded to `src` with no directory guard, so a Next.js app-router project scored 7/10
on four false errors; all three greps were `.ts`/`.tsx`-only, so a `.test.js` failed; and
`/moai:init` planted `docs/specs/_TEMPLATE.md`, which the script then scored as a
permanently failing SPEC — a self-inflicted −0.20 on the debt gate from the moment init
finished. A simulated init now scores **10/10, zero issues** (was 8/10).

**Data is now enriched in the converter, not by hand.** `artifacts.json` gains a real
`chapterPath` (18/18 resolve) and an explicit `requires` graph (the gate previously
checked English prose); `build-contract`'s `contextFiles` was the prose string "All Phase
3 artifacts" and is now derived from the requires graph; three orphan override keys
encoding the retired milestone numbering are dropped; and the plugin's copy is synced by
`npm run convert` instead of by hand.

**`tools/lib/overrides.mjs` is new** — per-source factual corrections applied during
conversion, because `archive/` is frozen and `method/` is generated, so an inherited
error cannot be hand-fixed. It carries three: ch31's "M1-M4 complete" prerequisite (the
gate precedes M4), its next-chapter pointer, and `51-test-strategy.md`'s wholesale copy of
the retired milestone map. `npm run convert` now **fails** if an override stops matching —
verified by breaking one deliberately.

**Also:** severity→❌ contract across all three agents and mirrored in the checkpoint gate
(a security finding scores zero on all six weighted categories, so ❌ was the only channel
and it was unspecified); the debt analyst's unmeasurable-category policy, `spec-check.sh`
exit-1 semantics, `D-NNN` reuse rule and CI test flags; the banner's `sed` range parser
replaced (one stray `---` in the body ran the range to EOF and read prose as state);
`quality-checklist.md`'s Checkpoint A blurb placed the gate after M5 with six impossible
auth items, and had no Checkpoint C section at all; the `method` skill's trigger gated on
a structural signal so it stops firing in unrelated repos; `/moai:status` no longer claims
read-only while offering to mutate.

`tools/verify-migration.sh` gained gate 10 (plugin surface integrity): every
`${CLAUDE_PLUGIN_ROOT}` path resolves, the plugin's data copy matches `method/_data`, the
requires graph is closed, and the shipped checklist has all three checkpoints. **46 gates,
all green.**

Still not executed: no `/moai:*` command has run in a real Claude Code session. That is
the next step, in a scratch repo.

## 2026-08-31 — migrated out of iCloud, converted to markdown, packaged as a plugin

**Migration.** Fresh clone of `github.com/aiappdev2025-rgb/handbook-repo` into
`~/Projects/ai-saas-handbook` on branch `migrate/local-toolkit`. The iCloud copy at
`~/Desktop/000 Saas Projects/AI Handbook` was never written to — only read. It is
still there and untouched; deleting it is a separate decision, not part of this work.

Four unique orphans hand-carried into `archive/orphans/`: `PromptBuilder.jsx` (13
`[ROLE:]` stage templates incl. the R1–R4 review gates, which exist nowhere in the 43
chapters), two meta-prompts, and the v2.2 source `.docx`. `AgentFlow_Specification.docx`
was deliberately **not** migrated — it is a different product's spec. The old
`.claude/settings.local.json` was **not** copied; it carried 7 malformed shell-fragment
permission entries. All four sibling copies and four zips were verified byte-identical
to git history and left behind.

**Conversion.** `archive/` → `method/` + `prompts/`, all generated by `tools/`:

- 51 chapters (43 original + 8 ported from MDX-only pages) + 4 appendices
- **Part 0** — the 22-chapter Claude Code operating manual, promoted out of
  "References" into the spine where the 11 chapters that link to it can reach it
- 108 prompts, flat and greppable, including the 36 rescued from the archived
  `build-guide-v3.html` and the 5 audit prompts that existed nowhere else
- `method/_data/` mined from the Docusaurus app before archiving it: 18 artifact
  definitions, 21 execution overrides, 30 placeholder tokens

Verified by `npm run verify` — 7 checks, all green. The load-bearing one is byte-level
SHA-1 identity of all 64 prompt bodies against their source; prose may be reformatted,
prompt text may not.

**Plugin.** `plugins/moai/` — 8 skills (`/moai:init|artifact|spec|tdd|checkpoint|status|session`
plus the `method` skill), 3 read-only audit subagents, 1 SessionStart hook, 11 templates.
The repo is its own single-plugin marketplace.

**Defects fixed** — D1 dead build-guide CTA · D2 four conflicting checkpoint→milestone
mappings, settled on M3/M6/M10 with A/B/C naming · D3 two MOAI expansions, disambiguated
· D4 Doc-Sync weight 15%→10% · D5 drifted navigation data · D6 three stale orientation
files · D7 stale trackers · D8 duplicated setup spec · D9 polluted permissions ·
D10 prompt-ID collisions · D11–D14, D16 four real bugs in `spec-check.sh` · D15 CI Node 20→22.

Three of those were found only by running the code: `spec-check.sh` had a `set -e` +
`((count++))` bug that killed it at its first finding, a test-case regex that could
never match the `TC-AUTH-001` form every SPEC uses, and a status check requiring a
colon that the official SPEC template never emits. **The script that is supposed to be
the Doc-Sync procedure had never worked.**

## Known gaps

Recorded deliberately, not scheduled.

- **27 `.alt-v3` prompt variants.** The archived build guide is the *parent* of the
  live chapters; of the prompts whose titles match, none has an identical body and
  neither tree is uniformly newer. Both are kept. `ls prompts/*.alt-v3.md` is the
  review queue. Reconciling them is content authoring.
- **`archive/orphans/PromptBuilder-standalone.jsx`** uses a fourth numbering scheme
  (`0.1 / R1–R4 / 6.0`) with no counterpart anywhere. Its R1–R4 review-gate idea is
  genuinely good and unabsorbed.
- **7 templates the method asks for but does not provide**: one-pager, ux-package,
  ui-system, architecture, ADR, test-strategy, milestone tracker. ADR and test-strategy
  can be *extracted* from `method/03-architect/50-adr-templates.md` and `51-test-strategy.md`
  rather than authored.
- **Unwritten chapters** the old roadmap wanted: Glossary, AI Cost / Session
  Management, Monitoring, CI/CD, decision tables. Of these, Glossary (~2h, kills the
  recurring vocabulary ambiguity) and AI Cost / Session Management (the only one that
  improves *running* the method rather than the content it produces) are the two worth
  doing next.
- **11 MDX stubs discarded**, not ported. Every one is in Phase 4/5, exactly where the
  HTML tree is complete. They survive in `archive/docusaurus/`.
