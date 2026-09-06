#!/usr/bin/env node
/**
 * copy-authored.mjs — bring hand-written chapters into the generated tree.
 *
 * archive/ is frozen and method/ is wiped on every build, so content written after
 * the migration (the Glossary, the cost chapter) needs a home that survives
 * `npm run convert`. That home is authored/: the same directory layout as method/,
 * hand-written, committed, never generated. This step copies it in verbatim, stamps
 * `source_authored:` so verify-conversion knows there is no HTML source to check
 * parity against, and lists any Part 0 chapter in 00-operating/README.md, which
 * split-guide writes from its own table and cannot know about.
 *
 * Runs after every converter and before build-index, which reads method/ from disk.
 *
 * Usage: node tools/copy-authored.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { titleCase } from './lib/title-case.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'authored');
const OUT = path.join(ROOT, 'method');

const files = [];
(function walk(d) {
  if (!fs.existsSync(d)) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md') && !(d === SRC && e.name === 'README.md')) files.push(p);
  }
})(SRC);

const fmField = (txt, key) => txt.match(new RegExp(`^${key}: "?([^"\\n]*)"?$`, 'm'))?.[1] ?? null;

let copied = 0;
for (const src of files) {
  const rel = path.relative(SRC, src);
  const dest = path.join(OUT, rel);
  let txt = fs.readFileSync(src, 'utf8');
  if (!txt.startsWith('---\n')) throw new Error(`${rel}: authored chapters need frontmatter`);
  if (!fmField(txt, 'source_authored')) {
    txt = txt.replace(/^---\n/, `---\nsource_authored: "authored/${rel}"\n`);
  }
  if (fs.existsSync(dest)) throw new Error(`${rel}: would overwrite a generated file`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, txt);
  copied++;

  // Part 0 chapters: list in the index split-guide wrote, before its Appendices
  // block, under the chapter's own section heading (same casing as the generator).
  if (rel.startsWith('00-operating/') && /^\d+$/.test(fmField(txt, 'chapter') ?? '')) {
    const readme = path.join(OUT, '00-operating', 'README.md');
    const idx = fs.readFileSync(readme, 'utf8');
    const cut = idx.indexOf('\n### Appendices');
    let head = (cut === -1 ? idx : idx.slice(0, cut)).replace(/\s+$/, '');
    const tail = cut === -1 ? '' : idx.slice(cut);
    const section = fmField(txt, 'section');
    const heading = section ? `### ${titleCase(section)}` : null;
    if (heading && !head.includes(heading)) head += `\n\n${heading}\n`;
    head += `\n- [${fmField(txt, 'chapter')}. ${fmField(txt, 'title')}](${path.basename(rel)})`;
    fs.writeFileSync(readme, head + '\n' + tail);
  }
}
console.log(`authored: ${copied} file(s) copied into method/`);
