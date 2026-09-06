# PROGRESS

Dated, append-only log. This is the single source of truth for status; `CLAUDE.md`
holds standing rules. Replaces the old `docs/ROADMAP.md` and `docs/TASKS.md`, both of
which had drifted badly (11 of 24 roadmap rows were mis-stated; TASKS.md had zero
genuinely open items and contradicted itself).

## 2026-09-06 — Glossary and the cost chapter; `authored/` is born

The two chapters the known-gaps list said were worth writing now exist. Neither could
go into `method/` (generated) or `archive/` (frozen), so the repo gained a third source:
**`authored/`**, hand-written, same layout as `method/`, copied in by
`tools/copy-authored.mjs` on every build. The step stamps `source_authored:` (so the
parity check skips the file), refuses to overwrite a generated file, and lists Part 0
chapters in the Part 0 index before its Appendices block. `build-index` now counts
Part 0 from disk instead of a literal.

- **Part 0, chapter 24 — AI Cost and Session Management** (`PART VII: COST AND
  LIMITS`). Written against a survey of Part 0: money, model choice, effort, caching,
  batching, usage limits, plan mode and loop economics were entirely uncovered; the
  200K window, the token bands and the clear triggers are saturated and are only
  cross-referenced. Prices are the June 2026 API list rates and are dated in the text.
- **Appendix C — Glossary**, 90 entries. Built from a sweep of every chapter, skill
  and template. Where the handbook disagrees with itself the entry says which meaning
  is *Settled* (from CLAUDE.md's canonical facts) or marks *Two senses*.

**Side fix.** The Part 0 index rendered "Part Ii", "Part Iii", "Part Vi": the
generator's title-case folded the Roman numerals. `titleCase` moved to
`tools/lib/title-case.mjs`, shared by `split-guide` and `copy-authored`, and keeps
numerals.

**Vocabulary conflicts found by the sweep, not fixed** (review queue; each needs a
decision, some are template changes with downstream blast radius):

1. `checkpoint-debt-audit.md` carries three per-checkpoint rubrics, none the canonical
   six-category formula, one summing to 95%; and still says "proceed to Milestone 2/3".
2. Gate threshold: canonical 6.0 vs 7.0 in `99-appendix/b-quality-gates.md` (C) and
   `04-build/35-checkpoint-b.md` (B target), plus a three-band scheme in the audit template.
3. SPEC prefix sets differ between the shipped template and Appendix A.
4. `REQ-` ids: prefixed in CLAUDE.md and `/moai:spec`, bare `REQ-001` in both templates.
5. `D-` is both the Design prompt prefix and the debt-item prefix.
6. `04-build/23-moai-overview.md` and `01-validate/01-introduction.md` attribute the
   method to MOAI-ADK; a chapter reader never meets "Milestone-Oriented AI Integration".
7. Two state files: Part 0's `docs/STATE.md` vs the plugin's `docs/moai/state.md`;
   nothing says one replaces the other and init creates neither.
8. Artifact filenames: chapters say `docs/one-pager.md` / `docs/architecture.md`, the
   registry writes `business-one-pager.md` / `solution-architecture.md`; ch22's
   pre-implementation checklist fails against a plugin-built project.
9. ADR location: `docs/adrs/` (chapter) vs `docs/adr/` (init) vs `docs/adrs.md` (artifact).
10. Test framework: Jest+RTL (ch23) vs Vitest+Playwright (test strategy) vs detected.
11. Coverage bar: 80% vs 60/50 at Checkpoint B vs ch26's scale giving 8/10 at 70-79%.
12. Phase naming: three schemes plus the orthogonal Stage 0.1-5.0 numbering in 21 titles.
13. `S-` prefix missing from `prompts/INDEX.md`'s scheme table (8 files exist).
14. Doc-Sync spelled four ways; ch26 still scores it "from manual review".
15. `TECH-DEBT.md` footer points at Chapter 27 for scoring; it is Chapter 26.
16. Appendix A's example test comment `// TC-001:` cannot match `spec-check.sh`'s regex.

## 2026-09-06 — first real run of the plugin: init → spec → tdd ×3 → status

Executed end to end in a throwaway TypeScript library (vitest, eslint, tsc), one feature
(`slugify`, SPEC-CORE-001, 7 EARS requirements, 8 test cases). Every command was
invoked through the installed plugin, not by reading the skill files.

**What held.** All four `/moai:init` success conditions, including the one never
verified before: `bash scripts/spec-check.sh --json` → `{"score": 10, "issues": []}` on a
fresh project. The banner parsed state at every phase. spec-check dropped to 8 mid-cycle
(SPEC not Done, no test file) and returned to 10 on Done — the Doc-Sync score behaves as
designed. RED failed on a missing module, then on assertions; GREEN 8/8; REFACTOR full
gate green, coverage 100%. Six conventional commits, all authored as Silver Pepper.

**What the run exposed** (fixed where cheap):

- **A throw-only test is green in RED.** TC-CORE-007 (`toThrow(TypeError)`) passed
  against the empty module, because calling a missing export also throws `TypeError`.
  The `tdd` skill now says every test must fail in RED and how to make a throw test
  honest.
- **`/moai:status` reconciles only one direction.** A hand-written
  `docs/build-contract.md` with `artifacts.build-contract: empty` in state is invisible
  to it. Added the reverse row to the reconcile table.
- **Nothing advances `phase`.** init writes `1`; spec and tdd leave it. A project in the
  middle of M6 reports "Phase 1 Validate". Recorded as a known gap in the status skill;
  the fix belongs in `/moai:artifact` (Phase 3 complete → 4) and needs a decision on
  who owns the transition.
- `/moai:init` and `/moai:spec` are interview-first and wait for confirmation, which an
  autonomous run cannot give; both were answered from detected defaults.
- Coverage ≥80% is an Implementation Done item, but a vitest project has no provider
  by default; the loop had to install `@vitest/coverage-v8` to measure it. Worth a line
  in the init manifest.

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
