/**
 * overrides.mjs — per-source content corrections applied during conversion.
 *
 * `archive/` is frozen and `method/` is generated, so a factual error inherited from a
 * source file cannot be fixed by hand: the next `npm run convert` discards the edit.
 * Corrections live here instead, keyed by source path, and are applied by the same
 * `norm` chain the converters already use.
 *
 * Keep this file small. It is for correcting statements that contradict the canonical
 * facts in CLAUDE.md — not for editorial improvement. Each entry says why it exists.
 */

/** Applied to every file: the rescued ch31 still uses the retired checkpoint naming. */
export const CHECKPOINT_A_NAMING = [
  [/Checkpoint\s+1\b/g, 'Checkpoint A'],
  [/CHECKPOINT-1-REPORT/g, 'CHECKPOINT-A-REPORT'],
  [/checkpoint-1\b/g, 'checkpoint-a'],
];

/**
 * Source-path-keyed corrections. Each is [pattern, replacement, why].
 */
export const OVERRIDES = {
  // The rescued chapter-31 rewrite is the best Claude-Code-native artifact in the repo
  // (2794 words, 15 prompts, vs 425 words and 0 in the file it replaces), but it was
  // written against the retired numbering where the first checkpoint followed M4.
  // Canonically Checkpoint A gates M3 — ch27, ch30 and the plugin all agree.
  'archive/html-v3/handbook/phase4/chapter-31-checkpoint-1-REWRITTEN.html': [
    [/\bM1-M4 complete\b/g,
      'M1-M3 complete',
      'Checkpoint A gates M3, not M4 — ch27 and ch30 are explicit that it precedes M4'],
    [/- If has auth: \[Chapter 33: M5 - Authentication\]\(33-m5-authentication\.md\)\n- If local-only: \[Chapter 34: M6 - Core Features\]\(34-m6-core-feature\.md\)/g,
      '- Next: [Chapter 32: M4 — Layouts](32-m4-layouts.md)',
      'the gate precedes M4, so the next chapter is M4 — not M5/M6'],
    [/31\.9 Step 6: UI Shell Verification \(Universal with Conditions\)/g,
      '31.9 Step 6: UI Shell Verification (only if M4 is already complete)',
      'this audits M4 deliverables at a gate that precedes M4; make it conditional'],
  ],

  // Ported from the retired Docusaurus tree, which used M2 Database / M3 Core API /
  // M4 UI Shell. A reader plans their whole per-milestone test suite from this table.
  'archive/docusaurus/docs/phase-3-architect/test-strategy.mdx': [
    [/\| M1: Foundation \| Project setup, environment config \|\n\| M2: Database \| Schema validation, query functions \|\n\| M3: Auth \| Login, signup, logout, session handling \|\n\| M4: UI Shell \| Component rendering, navigation \|\n\| M5-M10 \| Feature-specific business logic \|\n\| M11: Payments \| Checkout flow, webhook handling \|/g,
      `| M1: Project Setup | Project scaffolding, environment config, tooling |
| M2: Design System | Component rendering, design tokens, theming |
| M3: Database | Schema validation, query functions, RLS policies |
| M4: Layouts | Layout composition, navigation, routing |
| M5: Authentication | Login, signup, logout, session handling, protected routes |
| M6: Core Feature | The primary value-proposition flow, end to end |
| M7: Admin Console | Access control, user management, audit surfaces |
| M8: Supporting Features | Secondary flows and their edge cases |
| M9: Payments | Checkout flow, webhook handling, billing state |
| M10: Polish | Error boundaries, loading and empty states, accessibility |
| M11: Testing | Coverage sweep, integration and E2E suites |`,
      'the source carried the retired milestone map wholesale — schema tests during M2 (Design System) and auth tests during M3 (Database) would both be wrong'],
  ],
};

/**
 * Build a normaliser for one source file: the checkpoint naming rules (when the file
 * needs them) plus any source-specific overrides. Returns identity when there is
 * nothing to apply, so callers can use it unconditionally.
 */
export function normaliserFor(sourcePath, { checkpointNaming = false } = {}) {
  const rules = [
    ...(checkpointNaming ? CHECKPOINT_A_NAMING : []),
    ...(OVERRIDES[sourcePath] ?? []).map(([p, r]) => [p, r]),
  ];
  if (!rules.length) return (s) => s;
  return (s) => rules.reduce((acc, [pat, rep]) => String(acc).replace(pat, rep), s);
}

/**
 * Verify every override actually landed in the generated tree.
 *
 * Checking the pattern against the *source* is wrong: `norm` runs at several points in
 * the pipeline, so some rules match raw HTML text while others match markdown that only
 * exists after conversion. What matters either way is the outcome — that the corrected
 * text is present in the output. A rule whose replacement is absent has silently stopped
 * applying, which is how a correction rots.
 *
 * @param {(rel: string) => string} readOut  read a generated file, relative to repo root
 * @param {string[]} outFiles                every generated file to search
 */
export function auditOverrides(readOut, outFiles) {
  const corpus = outFiles.map((f) => { try { return readOut(f); } catch { return ''; } }).join('\n');
  const unmatched = [];
  for (const [src, rules] of Object.entries(OVERRIDES)) {
    for (const [, replacement, why] of rules) {
      // Use the first non-empty line of the replacement as the probe — enough to be
      // distinctive, short enough to survive incidental reformatting.
      const probe = String(replacement).split('\n').map((l) => l.trim()).find(Boolean);
      if (probe && !corpus.includes(probe)) unmatched.push(`${src}: ${why}`);
    }
  }
  return unmatched;
}
