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
