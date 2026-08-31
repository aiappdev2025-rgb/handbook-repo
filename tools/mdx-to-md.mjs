#!/usr/bin/env node
/**
 * mdx-to-md.mjs — port the MDX-only pages into the method tree.
 *
 * Most MDX pages are a metadata layer over content the HTML tree already holds in
 * full; those are joined, not copied. This handles the pages with NO HTML origin —
 * roughly 16,000 words that exist nowhere else.
 *
 * The port list is explicit rather than heuristic. Slug matching mis-joins here:
 * the MDX tree uses a different chapter numbering than the HTML tree (its "Chapter 2"
 * is HTML chapter 5), so anything automatic silently duplicates or drops content.
 *
 * The 11 `*Content to be migrated*` stubs are deliberately NOT ported — every one is
 * in Phase 4/5, exactly where the HTML tree is complete.
 *
 * Usage: node tools/mdx-to-md.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { frontmatter, fence, slugify } from './lib/emit.mjs';
import { normaliserFor } from './lib/overrides.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = 'archive/docusaurus/docs';

/** [mdx path, target dir, chapter number, milestone] — numbers continue past 43. */
const PORT = [
  ['phase-1-validate/competitive-analysis.mdx', '01-validate', 44, 1],
  ['phase-1-validate/mvp-scoping.mdx', '01-validate', 45, 1],
  ['phase-2-design/user-flows.mdx', '02-design', 46, 2],
  ['phase-2-design/component-library.mdx', '02-design', 47, 2],
  ['phase-3-architect/api-specification.mdx', '03-architect', 48, 3],
  ['phase-3-architect/security.mdx', '03-architect', 49, 3],
  ['phase-3-architect/adr-templates.mdx', '03-architect', 50, 3],
  ['phase-3-architect/test-strategy.mdx', '03-architect', 51, 3],
  ['reference/ears-syntax.mdx', '99-appendix', null, null],
  ['reference/troubleshooting.mdx', '99-appendix', null, null],
];
const APPENDIX = { 'ears-syntax': 'D', troubleshooting: 'E' };
const PHASE_NAME = { 1: 'Validate', 2: 'Design', 3: 'Architect', 4: 'Build', 5: 'Launch' };

/** Parse a JSX array-of-strings or array-of-objects prop into a string[]. */
const parseList = (raw) => {
  if (!raw) return [];
  const out = [];
  for (const m of raw.matchAll(/text:\s*"([^"]+)"/g)) out.push(m[1]);
  if (out.length) return out;
  for (const m of raw.matchAll(/"([^"]+)"/g)) out.push(m[1]);
  return out;
};
/** Grab a JSX prop's raw value, handling "...", {[...]}, {`...`}. */
const prop = (block, name) => {
  if (!block) return null;
  const s = block.match(new RegExp(`${name}=\\{?\\[([\\s\\S]*?)\\]\\}`))
    ?? block.match(new RegExp(`${name}=\\{\`([\\s\\S]*?)\`\\}`))
    ?? block.match(new RegExp(`${name}="([^"]*)"`));
  return s ? s[1] : null;
};
/** Extract a self-closing or paired component block by name. */
const component = (src, name) => {
  const open = src.indexOf(`<${name}`);
  if (open < 0) return null;
  // find the matching close: either "/>" for self-closing or "</Name>"
  const selfEnd = src.indexOf('/>', open);
  const pairEnd = src.indexOf(`</${name}>`, open);
  if (pairEnd >= 0 && (selfEnd < 0 || pairEnd < selfEnd)) {
    return src.slice(open, pairEnd + name.length + 3);
  }
  return selfEnd >= 0 ? src.slice(open, selfEnd + 2) : null;
};


/**
 * Docusaurus routes are site-absolute ("/templates/spec-template") and mean nothing
 * on disk. Map the ones with a real destination; for the rest keep the link text as
 * prose rather than emitting a path that resolves to nothing.
 */
const ROUTES = new Map([
  ['/reference/workflow-guide', '../00-operating/README.md'],
  ['/reference/ears-syntax', '../99-appendix/d-ears-syntax.md'],
  ['/reference/troubleshooting', '../99-appendix/e-troubleshooting.md'],
  ['/templates/spec-template', '../../plugins/moai/assets/templates/spec-template.md'],
  ['/templates/quality-checklist', '../../plugins/moai/assets/templates/quality-checklist.md'],
  ['/templates/tech-debt', '../../plugins/moai/assets/templates/TECH-DEBT.md'],
  ['/templates/build-contract', '../../plugins/moai/assets/templates/build-contract-template.md'],
  ['/templates/claude-md', '../../plugins/moai/assets/templates/CLAUDE.md'],
]);
const fixRoutes = (md) => md.replace(/\[([^\]]+)\]\((\/[^)]*)\)/g,
  (m, text, href) => (ROUTES.has(href) ? `[${text}](${ROUTES.get(href)})` : text));

const prompts = [];
let written = 0;

for (const [rel, dir, chapter, phase] of PORT) {
  const abs = path.join(ROOT, SRC, rel);
  if (!fs.existsSync(abs)) { console.error(`missing: ${rel}`); continue; }
  let src = fs.readFileSync(abs, 'utf8');

  const mfm = src.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = mfm ? mfm[1] : '';
  const title = meta.match(/^title: "?([^"\n]+)"?$/m)?.[1] ?? path.basename(rel, '.mdx');
  const description = meta.match(/^description: "?([^"\n]+)"?$/m)?.[1] ?? null;
  src = src.replace(/^---\n[\s\S]*?\n---\n/, '');
  src = src.replace(/^import[\s\S]*?from\s+'[^']+';\s*$/gm, '');   // JSX imports

  /* --- lift components into frontmatter / markdown ------------------------ */
  const tldr = component(src, 'TldrBox');
  const wtu = component(src, 'WhenToUse');
  const pre = component(src, 'Prerequisites');
  const howto = component(src, 'HowToRun');

  const fmData = {
    chapter,
    appendix: APPENDIX[path.basename(rel, '.mdx')] ?? undefined,
    title,
    slug: `${chapter ? String(chapter).padStart(2, '0') + '-' : ''}${path.basename(rel, '.mdx')}`,
    phase: phase ?? undefined,
    phase_name: phase ? PHASE_NAME[phase] : undefined,
    milestone: null,
    checkpoint: null,
    tool: howto ? (/(claude-code|code)/i.test(prop(howto, 'platform') ?? '') ? 'claude-code' : 'claude-chat') : null,
    session: howto ? prop(howto, 'session') : null,
    estimated_time: src.match(/reading-time"?>([^<]+)</)?.[1] ?? null,
    description,
    prerequisites: parseList(prop(pre, 'items')),
    when_to_use: parseList(prop(wtu, 'useWhen')),
    skip_if: wtu ? prop(wtu, 'skipIf') : null,
    source_mdx: `${SRC}/${rel}`,
  };

  const lead = [];
  if (tldr) {
    const what = prop(tldr, 'what'), why = prop(tldr, 'why'), out = prop(tldr, 'outcome');
    lead.push(['> **TL;DR**', what && `> ${what}`, why && `>\n> **Why:** ${why}`,
      out && `>\n> **Outcome:** ${out}`].filter(Boolean).join('\n'));
  }
  if (fmData.when_to_use.length) {
    lead.push(`> **When to use**\n>\n${fmData.when_to_use.map((w) => `> - ${w}`).join('\n')}`
      + (fmData.skip_if ? `\n>\n> **Skip if:** ${fmData.skip_if}` : ''));
  }
  if (fmData.prerequisites.length) {
    lead.push(`**Prerequisites**\n\n${fmData.prerequisites.map((p) => `- [ ] ${p}`).join('\n')}`);
  }

  /* --- SmartPrompt -> a fenced prompt plus a prompts/ file ----------------- */
  let body = src;
  for (const name of ['TldrBox', 'WhenToUse', 'Prerequisites', 'HowToRun', 'NextSteps', 'ChapterNav', 'TemplateDownload']) {
    let c; while ((c = component(body, name))) body = body.replace(c, '');
  }
  body = body.replace(/<SmartPrompt([\s\S]*?)\/>/g, (m, attrs) => {
    const tpl = attrs.match(/template=\{`([\s\S]*?)`\}/);
    const t = attrs.match(/title="([^"]*)"/)?.[1] ?? 'Prompt';
    const aid = attrs.match(/artifactId="([^"]*)"/)?.[1] ?? slugify(t);
    if (!tpl) return '';
    const pid = `S-${aid}`;   // S = SmartPrompt; X- belongs to Phase 3 chapter prompts
    const file = `${pid}.md`;
    prompts.push({ pid, file, name: t, body: tpl[1].replace(/\\`/g, '`') });
    return `### ${t}\n\n> Prompt file: [\`prompts/${file}\`](../../prompts/${file})\n\n${fence(tpl[1].replace(/\\`/g, '`'))}`;
  });
  // Verification / ExpectedOutput -> markdown
  body = body.replace(/<Verification([\s\S]*?)\/>/g, (m, a) => {
    const items = parseList(prop(m, 'items'));
    return items.length ? `## Verification\n\n${items.map((i) => `- [ ] ${i}`).join('\n')}` : '';
  });
  body = body.replace(/<ExpectedOutput[^>]*>([\s\S]*?)<\/ExpectedOutput>/g,
    (m, inner) => `> **Expected output**\n>\n${inner.trim().split('\n').map((l) => `> ${l.trim()}`).join('\n')}`);
  body = body.replace(/<ExpectedOutput([\s\S]*?)\/>/g, (m) => {
    const d = prop(m, 'description') ?? prop(m, 'content');
    return d ? `> **Expected output**\n>\n> ${d}` : '';
  });
  // leftover JSX + reading-time spans
  body = body.replace(/<span className="reading-time">[^<]*<\/span>/g, '');
  body = body.replace(/<\/?[A-Z][A-Za-z]*[^>]*>/g, '');
  body = body.replace(/^#\s+.+$/m, '').replace(/\n{3,}/g, '\n\n').trim();
  body = fixRoutes(body);
  // Source-specific factual corrections — see tools/lib/overrides.mjs
  body = normaliserFor(`${SRC}/${rel}`)(body);

  const heading = chapter ? `# Chapter ${chapter}: ${title}` : `# Appendix ${fmData.appendix}: ${title}`;
  const out = `${frontmatter(fmData)}\n\n${heading}\n\n${[...lead, body].filter(Boolean).join('\n\n')}\n`;
  const file = chapter ? `${chapter}-${path.basename(rel, '.mdx')}.md`
    : `${fmData.appendix.toLowerCase()}-${path.basename(rel, '.mdx')}.md`;
  fs.writeFileSync(path.join(ROOT, 'method', dir, file), out);
  written++;
}

for (const p of prompts) {
  fs.writeFileSync(path.join(ROOT, 'prompts', p.file),
    `${frontmatter({ id: p.pid, title: p.name, tool: 'claude-chat', variant: 'canonical', source: SRC })}\n\n${fence(p.body)}\n`);
}

console.log(`mdx pages ported : ${written}/${PORT.length}`);
console.log(`prompts added    : ${prompts.length}`);
console.log(`stubs skipped    : 11 (all Phase 4/5, complete in the HTML tree)`);
