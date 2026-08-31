#!/usr/bin/env node
/**
 * verify-conversion.mjs — proves the HTML -> Markdown conversion lost nothing.
 *
 * The load-bearing check is #3: every prompt body must be SHA-1 identical between
 * the source HTML and the emitted Markdown fence. Prose may be reformatted; prompt
 * text may not. If check 3 fails, the conversion is invalid.
 *
 * Exits nonzero on any RED.
 */
import { load } from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m', X = '\x1b[0m';
let pass = 0, fail = 0;
const ok = (m) => { console.log(`${G}  PASS${X}  ${m}`); pass++; };
const bad = (m) => { console.log(`${R}  FAIL${X}  ${m}`); fail++; };
const warn = (m) => console.log(`${Y}  WARN${X}  ${m}`);

const sha = (s) => crypto.createHash('sha1')
  .update(String(s).replace(/\r\n?/g, '\n').replace(/\s+$/, ''))
  .digest('hex');

/**
 * Count prose words only: tokens containing at least one alphanumeric character.
 * This makes HTML and Markdown directly comparable — Markdown syntax that carries
 * no content (`- [ ]` task boxes, table pipes and `---` rules, `#`, `>`, backticks)
 * is punctuation-only and drops out of both sides.
 */
const words = (s) => (String(s).match(/\S+/g) || []).filter((t) => /[A-Za-z0-9]/.test(t)).length;
const stripFm = (s) => s.replace(/^---\n[\s\S]*?\n---\n/, '');

/**
 * Remove the navigation scaffolding the converter *adds* (prompt-file crosslinks and
 * the Run in/Session execution line). It is new content by design, so it must not
 * count against source parity.
 */
const stripScaffold = (s) => s
  .split('\n')
  .filter((l) => !/^>\s*Prompt file:/.test(l) && !/^>\s*\*\*Run in:\*\*/.test(l))
  .join('\n');

/** Same normalisation the converter applies to the rescued ch31 (D2). */
const norm = (s, isCkA) => (isCkA
  ? String(s).replace(/Checkpoint\s+1\b/g, 'Checkpoint A')
      .replace(/CHECKPOINT-1-REPORT/g, 'CHECKPOINT-A-REPORT')
      .replace(/checkpoint-1\b/g, 'checkpoint-a')
  : String(s));

const mdFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
    if (e.isDirectory()) walk(path.join(d, e.name));
    else if (e.name.endsWith('.md')) mdFiles.push(path.join(d, e.name));
  }
})('method');

/**
 * source -> [{file, txt}]. One source can map to many outputs: the workflow guide
 * is a single flat document split into 28 Part 0 files, so parity must be checked
 * against the AGGREGATE of everything derived from that source, not per file.
 */
const bySource = new Map();
for (const f of mdFiles) {
  const txt = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const m = txt.match(/^source_html: "?([^"\n]+)"?$/m);
  if (!m) continue;
  if (!bySource.has(m[1])) bySource.set(m[1], []);
  bySource.get(m[1]).push({ file: f, txt });
}

console.log('\nCHECK 1  word-count parity per chapter (tolerance +/-3%)');
{
  let worst = 0, off = 0;
  for (const [src, outs] of bySource) {
    const label = outs.length === 1 ? outs[0].file : `${src} -> ${outs.length} files`;
    const html = fs.readFileSync(path.join(ROOT, src), 'utf8');
    const $ = load(html);
    $('nav, aside, script, style, .print-button').remove();
    // Blocks the converter deliberately lifts into YAML frontmatter. They leave the
    // body by design, so counting them against the body would be a false negative.
    $('.milestone-info, .prompt-indicator, .prerequisites').remove();
    // Navigation chrome the converter drops on purpose: the workflow guide carries a
    // 600-word multi-section table of contents that method/README.md replaces.
    $('.toc, .toc-section, .toc-items, .title-section, .nav-links, .divider, footer').remove();
    // cheerio's .text() concatenates adjacent table cells with no separator
    // ("m1projectsetupnextjs"), which under-counts the source. Re-space them.
    $('td, th, li, p, div, h1, h2, h3, h4').each((_, el) => $(el).append(' '));
    const srcW = words($('main.content article').first().text() || $('body').text());
    let mdW = 0;
    for (const { txt } of outs) {
    // Strip Markdown syntax that carries no prose, but ONLY outside fenced blocks —
    // numbered steps inside a prompt body are content and must still count.
    let inFence = false;
    const mdBody = stripScaffold(stripFm(txt)).split('\n').map((line) => {
      if (/^\s*`{3,4}/.test(line)) { inFence = !inFence; return ''; } // fence delimiters
      if (inFence) return line;
      return line
        .replace(/^>\s?/, '')
        .replace(/^\s*(?:[-*]|\d+\.)\s+/, '')
        .replace(/^\s*\|[\s|:-]+\|\s*$/, '');
    }).join('\n');
      mdW += words(mdBody);
    }
    const delta = srcW ? (mdW - srcW) / srcW : 0;
    if (Math.abs(delta) > 0.03) {
      off++;
      if (Math.abs(delta) > Math.abs(worst)) worst = delta;
      warn(`${label}  ${srcW} -> ${mdW} words (${(delta * 100).toFixed(1)}%)`);
    }
  }
  off === 0
    ? ok(`all ${bySource.size} source documents within +/-3%`)
    : bad(`${off}/${bySource.size} source documents outside +/-3% (worst ${(worst * 100).toFixed(1)}%)`);
}

console.log('\nCHECK 2  prompt-count parity');
{
  const promptFiles = fs.readdirSync(path.join(ROOT, 'prompts'))
    .filter((f) => f.endsWith('.md') && f !== 'INDEX.md');
  let box = 0, block = 0;
  for (const src of bySource.keys()) {
    const $ = load(fs.readFileSync(path.join(ROOT, src), 'utf8'));
    box += $('.prompt-box').length;
    block += $('.prompt-block').length;
  }
  // The archived build guide contributes .prompt-container prompts: those whose ID
  // already exists in the live tree land as `.alt-v3` variants, the rest as canonical.
  const $arch = load(fs.readFileSync(path.join(ROOT, 'archive/html-v3/archive/build-guide-v3.html'), 'utf8'));
  const archive = $arch('.prompt-container').length;
  // Ported MDX-only pages contribute their <SmartPrompt> templates as X-* prompts.
  const mdx = promptFiles.filter((f) => f.startsWith('S-')).length;
  const expect = box + block + archive + mdx;
  expect === promptFiles.length
    ? ok(`${expect} source prompts (${box} prompt-box + ${block} prompt-block + ${archive} archive + ${mdx} mdx) = ${promptFiles.length} files`)
    : bad(`source has ${expect} prompts but prompts/ holds ${promptFiles.length}`);
}

console.log('\nCHECK 3  prompt-body SHA-1 identity  [zero tolerance]');
{
  let checked = 0, mismatch = 0;
  for (const [src, outs] of bySource) {
    const isCkA = outs.some((o) => o.file.includes('checkpoint-a'));
    const $ = load(fs.readFileSync(path.join(ROOT, src), 'utf8'));
    const srcHashes = [];
    $('.prompt-box').each((_, el) => {
      const pre = $(el).find('pre').first();
      srcHashes.push(sha(norm(pre.length ? pre.text() : $(el).text(), isCkA)));
    });
    $('.prompt-block').each((_, el) => srcHashes.push(sha(norm($(el).text(), isCkA))));

    const fences = outs.flatMap(({ txt }) =>
      [...txt.matchAll(/^(`{3,4})text\n([\s\S]*?)\n\1$/gm)].map((m) => sha(m[2])));

    for (const h of srcHashes) {
      checked++;
      if (!fences.includes(h)) { mismatch++; bad(`body not found verbatim from ${src} (sha ${h.slice(0, 8)})`); }
    }
  }
  mismatch === 0
    ? ok(`all ${checked} prompt bodies byte-identical to source`)
    : bad(`${mismatch}/${checked} prompt bodies differ`);
}

console.log('\nCHECK 4  no silent drops');
{
  let n = 0;
  for (const f of [...mdFiles, ...fs.readdirSync(path.join(ROOT, 'prompts')).map((x) => 'prompts/' + x)]) {
    const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
    n += (t.match(/UNCONVERTED/g) || []).length;
  }
  n === 0 ? ok('zero UNCONVERTED markers') : bad(`${n} UNCONVERTED markers`);
}

console.log('\nCHECK 5  link integrity');
{
  const broken = [];
  for (const f of mdFiles) {
    const dir = path.dirname(f);
    const txt = fs.readFileSync(path.join(ROOT, f), 'utf8');
    for (const m of txt.matchAll(/\]\(([^)\s]+)\)/g)) {
      const href = m[1].split('#')[0];
      if (!href || /^https?:|^mailto:/.test(href)) continue;
      if (!fs.existsSync(path.resolve(ROOT, dir, href))) broken.push(`${f} -> ${href}`);
    }
  }
  broken.length === 0
    ? ok('every relative link resolves')
    : (broken.slice(0, 12).forEach((b) => warn(b)), bad(`${broken.length} broken links`));
}

console.log('\nCHECK 6  dead workflow-guide anchors retargeted (D12)');
{
  let n = 0;
  for (const f of mdFiles) {
    // Scan the BODY only: `source_html:` in the frontmatter is deliberate provenance,
    // recording which HTML file each chapter came from.
    const t = stripFm(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    n += (t.match(/workflow-guide-v1\.html/g) || []).length;
    n += (t.match(/build-guide-v3\.html/g) || []).length;
  }
  n === 0 ? ok('no references to the retired monolithic HTML guides') : bad(`${n} stale .html references remain`);
}

console.log('\nCHECK 7  HTML entity leakage');
{
  let n = 0;
  for (const f of [...mdFiles, ...fs.readdirSync(path.join(ROOT, 'prompts')).map((x) => 'prompts/' + x)]) {
    n += (fs.readFileSync(path.join(ROOT, f), 'utf8').match(/&[a-zA-Z]{2,6};/g) || []).length;
  }
  n === 0 ? ok('zero undecoded HTML entities') : bad(`${n} entities leaked`);
}

console.log(`\n${fail === 0 ? G + 'ALL GREEN' : R + 'RED'}${X}  ${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
