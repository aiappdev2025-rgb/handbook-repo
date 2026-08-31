#!/usr/bin/env node
/**
 * split-guide.mjs — promote the Claude Code operating manual into the spine.
 *
 * docs/workflow-guide-v1.html is a 1750-line flat document holding the only
 * Claude Code mechanics content in the repo (context windows, token economics,
 * /clear discipline, sub-agents, MCP, session rhythm, milestone->session mapping).
 * It was filed under "References", outside the 43-chapter spine, and 11 chapters
 * link into it through three anchors that do not exist (D12).
 *
 * This splits it into method/00-operating/ so those links can resolve, and so
 * Part 0 can be listed first in the spine — it is orthogonal to the phases, which
 * is exactly why it kept getting stranded.
 *
 * Also converts docs/claude-code-integration.html as chapter 23 of Part 0.
 *
 * Usage: node tools/split-guide.mjs
 */
import { load } from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import { tidy, frontmatter, fence, part0File, PART0 } from './lib/emit.mjs';
import { renderBlocks } from './lib/rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = 'method/00-operating';
const SRC = 'archive/html-v3/workflow-guide-v1.html';

fs.mkdirSync(path.join(ROOT, OUT), { recursive: true });

const $ = load(fs.readFileSync(path.join(ROOT, SRC), 'utf8'));
const nodes = $('body').children().toArray();

/** Slice the flat document at every <h1 id="chapter-N"> / <h1 id="appendix-x">. */
const sections = [];
let current = null;
let pendingPart = null;
for (const el of nodes) {
  if (el.type !== 'tag') continue;
  const $el = $(el);
  if (($el.attr('class') || '').includes('part-header')) {
    pendingPart = tidy($el.find('h2,h3').first().text());
    continue;
  }
  if (el.tagName === 'h1') {
    const id = $el.attr('id') || '';
    const cm = id.match(/^chapter-(\d+)$/);
    const am = id.match(/^appendix-([a-e])$/);
    if (cm || am) {
      current = {
        kind: cm ? 'chapter' : 'appendix',
        n: cm ? Number(cm[1]) : am[1],
        title: tidy($el.text()).replace(/^\d+\.\s*/, '').replace(/^Appendix\s+[A-E]:\s*/i, ''),
        part: pendingPart, els: [],
      };
      sections.push(current);
      pendingPart = null;
      continue;
    }
  }
  if (current) current.els.push(el);
}

const allPrompts = [];
const written = [];

for (const s of sections) {
  const isCh = s.kind === 'chapter';
  const file = isCh ? part0File(s.n) : `${s.n}-${slug(s.title)}.md`;
  const ctx = { dir: OUT, prefix: 'W', promptSeq: 0, unresolved: [] };
  const { body, prompts } = renderBlocks($, s.els, ctx, {
    chapter: null,
    blockName: s.title,
    promptId: (name, id, ord) => `W-${String(isCh ? s.n : 90).padStart(2, '0')}-${ord}`,
  });
  allPrompts.push(...prompts);

  const fm = frontmatter({
    part: 0,
    part_name: 'Operating',
    [isCh ? 'chapter' : 'appendix']: isCh ? s.n : s.n.toUpperCase(),
    title: s.title,
    slug: file.replace(/\.md$/, ''),
    section: s.part ?? null,
    source_html: SRC,
  });
  const heading = isCh ? `# ${s.n}. ${s.title}` : `# Appendix ${s.n.toUpperCase()}: ${s.title}`;
  fs.writeFileSync(path.join(ROOT, OUT, file), `${fm}\n\n${heading}\n\n${body.filter(Boolean).join('\n\n')}\n`);
  written.push({ file, title: s.title, kind: s.kind, n: s.n, part: s.part });
}

/* --------------------------- chapter 23: Claude Code timing across phases ---- */
{
  const src2 = 'archive/html-v3/claude-code-integration.html';
  const $2 = load(fs.readFileSync(path.join(ROOT, src2), 'utf8'));
  const art = $2('main.content article').first().length ? $2('main.content article').first() : $2('body');
  const ctx = { dir: OUT, prefix: 'W', promptSeq: 0, unresolved: [] };
  const { body, prompts } = renderBlocks($2, art.children().toArray(), ctx, {
    blockName: 'Claude Code timing', promptId: (n, i, o) => `W-23-${o}`,
  });
  allPrompts.push(...prompts);
  const title = 'Claude Code Timing by Phase';
  const fm = frontmatter({
    part: 0, part_name: 'Operating', chapter: 23, title,
    slug: '23-claude-code-timing-by-phase', section: null, source_html: src2,
  });
  fs.writeFileSync(path.join(ROOT, OUT, '23-claude-code-timing-by-phase.md'),
    `${fm}\n\n# 23. ${title}\n\n${body.filter(Boolean).join('\n\n')}\n`);
  written.push({ file: '23-claude-code-timing-by-phase.md', title, kind: 'chapter', n: 23, part: null });
}

/* ------------------------------------------------------------------ prompts -- */
fs.mkdirSync(path.join(ROOT, 'prompts'), { recursive: true });
for (const p of allPrompts) {
  const fm = frontmatter({
    id: p.pid, title: p.name, tool: 'claude-code', chapter: null,
    variant: 'canonical', source: SRC,
  });
  fs.writeFileSync(path.join(ROOT, 'prompts', p.file), `${fm}\n\n${fence(p.body)}\n`);
}

/* ------------------------------------------------------------------- README -- */
const chs = written.filter((w) => w.kind === 'chapter').sort((a, b) => a.n - b.n);
const aps = written.filter((w) => w.kind === 'appendix');
let part = null;
const lines = [];
for (const c of chs) {
  if (c.part && c.part !== part) { part = c.part; lines.push('', `### ${titleCase(part)}`, ''); }
  lines.push(`- [${c.n}. ${c.title}](${c.file})`);
}

fs.writeFileSync(path.join(ROOT, OUT, 'README.md'), `---
part: 0
part_name: "Operating"
title: "Part 0 — Operating Claude Code"
slug: "00-operating"
---

# Part 0 — Operating Claude Code

**Read this first.** Part 0 is orthogonal to the five build phases: it applies
throughout, from Phase 1 through launch. It covers how to *drive Claude Code well*
— context budgeting, session boundaries, what to put in \`CLAUDE.md\` versus a skill,
when to \`/clear\`, and how to carry state across sessions.

It was previously filed under "References" as a companion no chapter required, while
eleven build chapters linked into it through anchors that did not exist. Those links
now resolve here.
${lines.join('\n')}

### Appendices

${aps.map((a) => `- [Appendix ${a.n.toUpperCase()}: ${a.title}](${a.file})`).join('\n')}
`);

function slug(s) {
  return String(s).toLowerCase().replace(/['"’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function titleCase(s) {
  return String(s).replace(/^PART\s+([IVX]+):\s*/i, 'Part $1 — ')
    .replace(/\b([A-Z]{2,})\b/g, (m) => m[0] + m.slice(1).toLowerCase());
}

console.log(`part 0 chapters : ${chs.length}`);
console.log(`part 0 appendix : ${aps.length}`);
console.log(`prompts         : ${allPrompts.length}`);
console.log(`expected slugs  : ${PART0.length} (chapters 1-22)`);
