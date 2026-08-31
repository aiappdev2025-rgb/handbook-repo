#!/usr/bin/env node
/**
 * build.mjs — regenerate method/ and prompts/ from the archived HTML+MDX sources.
 *
 * Order matters:
 *   1. html-to-md      chapters 1-43 + appendices A/B, and their prompts
 *   2. split-guide     Part 0 (the workflow guide) + the Claude Code timing chapter
 *   3. mdx-to-md       the ~10 MDX-only pages (chapters 44-51, appendices D/E)
 *   4. extract-prompts the archived build-guide library + prompts/INDEX.md
 *                      (must run after 1-3: it needs to know which IDs already exist
 *                      to decide canonical vs .alt-v3 variant)
 *   5. mine-conductor  method/_data/*.json from the Docusaurus app
 *   6. build-index     method/README.md, generated from what is actually on disk
 *
 * The whole tree is derived, so this is safe to re-run: it wipes method/ and prompts/
 * first. Nothing here is hand-edited.
 *
 * Usage: node tools/build.mjs   (or: npm run convert)
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const STEPS = [
  'html-to-md.mjs', 'split-guide.mjs', 'mdx-to-md.mjs',
  'extract-prompts.mjs', 'mine-conductor.mjs', 'build-index.mjs',
];

fs.rmSync(path.join(ROOT, 'method'), { recursive: true, force: true });
fs.rmSync(path.join(ROOT, 'prompts'), { recursive: true, force: true });

for (const s of STEPS) {
  process.stdout.write(`\n\x1b[1m→ ${s}\x1b[0m\n`);
  execFileSync(process.execPath, [path.join(ROOT, 'tools', s)], {
    cwd: ROOT, stdio: 'inherit', env: { ...process.env, NODE_NO_WARNINGS: '1' },
  });
}
console.log('\n\x1b[32mbuild complete\x1b[0m — run `npm run verify` to check it\n');
