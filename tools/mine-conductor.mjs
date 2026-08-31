#!/usr/bin/env node
/**
 * mine-conductor.mjs — extract the machine-readable half of the method before the
 * Docusaurus app is archived.
 *
 * The app is being retired, but four of its files are the best-engineered artifacts
 * in the repo and are load-bearing *as data*:
 *
 *   conductorSchema.ts     18 artifact definitions {phase, chapter, filename,
 *                          title, description, extractFields} — the artifact registry
 *                          the method needs for dependency gating.
 *   executionPatterns.ts   per-phase and per-artifact platform/session/prerequisites/
 *                          estimatedTime/tips — the frontmatter generator.
 *   SmartPrompt/index.tsx  the 33-token placeholder map ([PRODUCT_NAME] ->
 *                          phase1.productName) — the canonical substitution vocabulary.
 *
 * Node 22 strips TypeScript types natively, so this needs no tsc, no npm ci and no
 * Docusaurus install — it imports the modules and serialises their exports.
 *
 * Usage: node tools/mine-conductor.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const LIB = path.join(ROOT, 'archive/docusaurus/src/lib');
const OUT = path.join(ROOT, 'method/_data');
fs.mkdirSync(OUT, { recursive: true });

const write = (name, data, note) => {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(data, null, 2) + '\n');
  console.log(`${name.padEnd(20)} ${note}`);
};

/* ---- artifacts: the 18-row registry ---------------------------------------- */
try {
  const m = await import(path.join(LIB, 'conductorSchema.ts'));
  const defs = m.artifactDefinitions ?? m.default?.artifactDefinitions;
  if (!defs) throw new Error('artifactDefinitions not exported');
  write('artifacts.json', defs, `${Object.keys(defs).length} artifact definitions`);
} catch (e) {
  console.error(`artifacts.json     SKIPPED — ${e.message}`);
}

/* ---- execution patterns: platform/session/prereqs/time --------------------- */
try {
  const m = await import(path.join(LIB, 'executionPatterns.ts'));
  const data = {
    phaseDefaults: m.phaseDefaults ?? null,
    artifactExecutionOverrides: m.artifactExecutionOverrides ?? null,
  };
  const n = Object.keys(data.artifactExecutionOverrides ?? {}).length;
  write('execution.json', data, `${Object.keys(data.phaseDefaults ?? {}).length} phase defaults, ${n} overrides`);
} catch (e) {
  console.error(`execution.json     SKIPPED — ${e.message}`);
}

/* ---- placeholders: the substitution vocabulary ----------------------------- */
{
  // placeholderMap is a module-private const inside a .tsx component, so it is
  // parsed out of the source rather than imported.
  const src = fs.readFileSync(path.join(ROOT, 'archive/docusaurus/src/components/SmartPrompt/index.tsx'), 'utf8');
  const block = src.match(/placeholderMap[^=]*=\s*\{([\s\S]*?)\n\s*\};/);
  const map = {};
  if (block) {
    for (const m of block[1].matchAll(/'(\[[A-Z0-9_]+\])'\s*:\s*'([^']+)'/g)) map[m[1]] = m[2];
  }
  write('placeholders.json', map, `${Object.keys(map).length} placeholder tokens`);
}

/* ---- chapter map: HTML <-> MDX join --------------------------------------- */
{
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const rows = [];
  const mdxFiles = [];
  (function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.mdx')) mdxFiles.push(path.relative(ROOT, p));
    }
  })(path.join(ROOT, 'archive/docusaurus/docs'));

  const methodFiles = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.md') && e.name !== 'README.md') methodFiles.push(path.relative(ROOT, p));
    }
  })(path.join(ROOT, 'method'));

  for (const mf of methodFiles) {
    const txt = fs.readFileSync(path.join(ROOT, mf), 'utf8');
    const title = txt.match(/^title: "?([^"\n]+)"?$/m)?.[1] ?? '';
    const ch = txt.match(/^chapter: (\d+)$/m)?.[1];
    const st = slug(title);
    // Match by slug/title, never by chapter number: when-to-use-criteria.md and the
    // MDX tree use a DIFFERENT numbering than the HTML tree (its "Chapter 2" is HTML
    // chapter 5), so a numeric join silently mismatches.
    const hit = mdxFiles.find((x) => {
      const b = path.basename(x, '.mdx');
      return st.includes(b) || b.includes(st) || st.split('-').filter((w) => w.length > 3)
        .every((w) => b.includes(w));
    });
    rows.push({
      chapter: ch ? Number(ch) : null, title, method: mf,
      mdx: hit ?? null, confidence: hit ? 'slug-match' : 'none',
    });
  }
  const matched = rows.filter((r) => r.mdx).length;
  write('chapter-map.json', rows, `${matched}/${rows.length} joined to an MDX page`);

  const orphans = mdxFiles.filter((x) => !rows.some((r) => r.mdx === x));
  write('mdx-only.json', orphans, `${orphans.length} MDX pages with no HTML counterpart`);
}

/* ============================================================================
 * Enrichment.
 *
 * The mined data is faithful to the retired app but not sufficient to drive
 * /moai:artifact. Three things are added here rather than by hand, so they
 * survive `npm run convert`:
 *
 *   chapterPath  the mined `chapter` field is a bare slug; five of the eighteen
 *                match no file under any name test. /moai:artifact needs a real
 *                path or it drafts from the one-line description.
 *   requires     `prerequisites` in execution.json are English sentences. A gate
 *                cannot be checked against prose, so the dependency graph is
 *                declared explicitly.
 *   contextFiles build-contract's was the prose string "All Phase 3 artifacts" —
 *                the only one of 21 that is not a filename. It is the input set
 *                for the hinge document of the whole method.
 *
 * Orphan override keys are dropped: m1-foundation / m2-database-schema /
 * m4-ui-shell have no counterpart in artifactDefinitions, so /moai:artifact can
 * never reach them, and two of the three encode the retired milestone numbering.
 * ========================================================================== */

const CHAPTER_PATH = {
  'market-research': 'method/01-validate/05-research.md',
  'opportunity-assessment': 'method/01-validate/05-research.md',
  'business-one-pager': 'method/01-validate/06-one-pager.md',
  'competitive-analysis': 'method/01-validate/44-competitive-analysis.md',
  'mvp-scoping': 'method/01-validate/45-mvp-scoping.md',
  'design-brief': 'method/01-validate/07-design-brief.md',
  'design-philosophy': 'method/02-design/08-design-philosophy.md',
  'ux-package': 'method/02-design/09-ux-package.md',
  'user-flows': 'method/02-design/46-user-flows.md',
  'ui-system': 'method/02-design/11-ui-system.md',
  'component-library': 'method/02-design/47-component-library.md',
  'solution-architecture': 'method/03-architect/13-architecture.md',
  'data-model': 'method/03-architect/14-database-schema.md',
  'api-specification': 'method/03-architect/48-api-specification.md',
  security: 'method/03-architect/49-security.md',
  'build-contract': 'method/03-architect/21-generating-contract.md',
  'adr-templates': 'method/03-architect/50-adr-templates.md',
  'test-strategy': 'method/03-architect/51-test-strategy.md',
};

/** Explicit dependency graph. [] means a valid starting point. */
const REQUIRES = {
  'market-research': [],
  'opportunity-assessment': ['market-research'],
  'competitive-analysis': ['market-research'],
  'business-one-pager': ['opportunity-assessment'],
  'mvp-scope': ['business-one-pager'],
  'design-brief': ['business-one-pager'],
  'design-philosophy': ['design-brief'],
  'ux-package': ['design-brief'],
  'user-flows': ['ux-package'],
  'ui-system': ['design-brief', 'ux-package'],
  'component-library': ['ui-system'],
  'solution-architecture': ['design-brief', 'ux-package', 'ui-system'],
  'data-model': ['solution-architecture'],
  'api-spec': ['solution-architecture', 'data-model'],
  'security-architecture': ['solution-architecture'],
  'adr-templates': ['solution-architecture'],
  'test-strategy': ['solution-architecture'],
  'build-contract': [
    'design-brief', 'ux-package', 'ui-system', 'solution-architecture',
    'data-model', 'api-spec', 'security-architecture', 'adr-templates', 'test-strategy',
  ],
};

{
  const aPath = path.join(OUT, 'artifacts.json');
  const ePath = path.join(OUT, 'execution.json');
  const artifacts = JSON.parse(fs.readFileSync(aPath, 'utf8'));
  const execution = JSON.parse(fs.readFileSync(ePath, 'utf8'));

  let unmapped = 0, ungated = 0;
  for (const [id, def] of Object.entries(artifacts)) {
    const cp = CHAPTER_PATH[def.chapter];
    if (cp && fs.existsSync(path.join(ROOT, cp))) def.chapterPath = cp;
    else { def.chapterPath = null; unmapped++; console.error(`  ! no chapter for ${id} (${def.chapter})`); }
    if (REQUIRES[id]) def.requires = REQUIRES[id];
    else { def.requires = []; ungated++; console.error(`  ! no requires entry for ${id}`); }
  }

  // build-contract takes every Phase 3 artifact as input. Derived from the
  // artifact definitions themselves so it cannot drift from their filenames.
  if (execution.artifactExecutionOverrides?.['build-contract']) {
    execution.artifactExecutionOverrides['build-contract'].contextFiles =
      REQUIRES['build-contract'].map((dep) => artifacts[dep]?.filename).filter(Boolean);
  }

  // Drop overrides for artifacts that do not exist — unreachable, and two of the
  // three encode the retired M1/M2/M4 numbering.
  const orphans = Object.keys(execution.artifactExecutionOverrides ?? {})
    .filter((k) => !artifacts[k]);
  for (const k of orphans) delete execution.artifactExecutionOverrides[k];

  fs.writeFileSync(aPath, JSON.stringify(artifacts, null, 2) + '\n');
  fs.writeFileSync(ePath, JSON.stringify(execution, null, 2) + '\n');
  console.log(`enrichment           ${Object.keys(artifacts).length - unmapped}/18 chapterPath, ${Object.keys(artifacts).length - ungated}/18 requires, ${orphans.length} orphan override(s) dropped`);
}

/* ---- sync the three reference files the plugin actually reads -------------- */
{
  const dest = path.join(ROOT, 'plugins/moai/skills/method/references');
  fs.mkdirSync(dest, { recursive: true });
  const files = ['artifacts.json', 'execution.json', 'placeholders.json'];
  for (const f of files) fs.copyFileSync(path.join(OUT, f), path.join(dest, f));
  console.log(`plugin references    ${files.length} file(s) synced from method/_data`);
}
