#!/usr/bin/env node
/**
 * html-to-md.mjs — convert docs/handbook/**.html into method/**.md
 *
 * The HTML tree is the content source of truth (complete: 43 chapters + 2
 * appendices, zero stubs). The MDX tree supplies the metadata layer and is joined
 * on afterwards by mdx-to-md.mjs.
 *
 * Two substitutions are applied during conversion, per the approved plan:
 *   ch31   the orphaned *-REWRITTEN file replaces the stale checkpoint-a file
 *          (2794 words / 15 prompts vs 425 words / 0 prompts), and its
 *          "Checkpoint 1" naming is normalised to "Checkpoint A" (D2).
 *   links  the 11 dead workflow-guide anchors and the ch27 404 CTA are retargeted
 *          by emit.mjs's rewrite table (D12, D1).
 *
 * Usage: node tools/html-to-md.mjs [--dry-run]
 */
import { load } from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import { tidy, frontmatter, fence, chapterPaths } from './lib/emit.mjs';
import { renderBlocks } from './lib/rules.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');

const PHASE_DIR = {
  phase1: '01-validate', phase2: '02-design', phase3: '03-architect',
  phase4: '04-build', phase5: '05-launch',
};
const PHASE_NAME = { 1: 'Validate', 2: 'Design', 3: 'Architect', 4: 'Build', 5: 'Launch' };
const PREFIX = { 1: 'V', 2: 'D', 3: 'X', 4: 'B', 5: 'L' };

const milestoneOf = (s) => (s.match(/^m(\d+)-/) ? `M${s.match(/^m(\d+)-/)[1]}` : null);
const checkpointOf = (s) => (s.match(/^checkpoint-([abc])$/) ? s.match(/^checkpoint-([abc])$/)[1].toUpperCase() : null);

function discover() {
  const out = [];
  for (const [pdir, mdir] of Object.entries(PHASE_DIR)) {
    const abs = path.join(ROOT, 'archive/html-v3/handbook', pdir);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).sort()) {
      if (!f.endsWith('.html')) continue;
      // ch31: the REWRITTEN file wins; the stale incumbent is archive-only.
      if (f === 'chapter-31-checkpoint-a.html') continue;

      const ap = f.match(/^appendix-([a-z])-(.+)\.html$/);
      if (ap) {
        out.push({
          src: `archive/html-v3/handbook/${pdir}/${f}`, outDir: 'method/99-appendix',
          outFile: `${ap[1]}-${ap[2]}.md`, appendix: ap[1].toUpperCase(),
          chapter: null, phase: Number(pdir.slice(-1)),
        });
        continue;
      }
      const cm = f.match(/^chapter-(\d+)-(.+?)(?:-REWRITTEN)?\.html$/);
      if (!cm) continue;
      let slug = cm[2];
      if (slug === 'checkpoint-1') slug = 'checkpoint-a'; // D2 normalisation
      out.push({
        src: `archive/html-v3/handbook/${pdir}/${f}`, outDir: `method/${mdir}`,
        outFile: `${cm[1].padStart(2, '0')}-${slug}.md`,
        chapter: Number(cm[1]), appendix: null, phase: Number(pdir.slice(-1)),
      });
    }
  }
  return out;
}

const jobs = discover();
for (const j of jobs) if (j.chapter) chapterPaths.set(j.chapter, `${j.outDir}/${j.outFile}`);

const allPrompts = [];
const unresolved = [];

for (const job of jobs) {
  const slug = job.outFile.replace(/^[a-z\d]+-/, '').replace(/\.md$/, '');
  const ckpt = checkpointOf(job.outFile.replace(/^\d+-/, '').replace(/\.md$/, ''));

  // The rescued ch31 still says "Checkpoint 1" throughout; normalise to A (D2).
  const norm = ckpt === 'A'
    ? (s) => String(s).replace(/Checkpoint\s+1\b/g, 'Checkpoint A')
        .replace(/CHECKPOINT-1-REPORT/g, 'CHECKPOINT-A-REPORT')
        .replace(/checkpoint-1\b/g, 'checkpoint-a')
    : (s) => s;

  const $ = load(fs.readFileSync(path.join(ROOT, job.src), 'utf8'));
  const article = $('main.content article').first().length ? $('main.content article').first() : $('body');
  const rawTitle = tidy(article.find('h1').first().text());
  const title = rawTitle.replace(/^Chapter\s+\d+:\s*/i, '').replace(/^Appendix\s+[A-Z]:\s*/i, '')
    .replace(/\s+-\s+/g, ' — ');

  const ctx = { dir: job.outDir, prefix: PREFIX[job.phase], promptSeq: 0, unresolved };
  const { body, prompts, meta } = renderBlocks($, article.children().toArray(), ctx, {
    norm,
    chapter: job.chapter,
    blockName: title,
    // IDs key on (file, ordinal), never on title: three boxes in the rescued ch31
    // share the <h4> "Claude Code Prompt" and would otherwise overwrite each other.
    promptId: (name, id, ord) => (ckpt ? `C${ckpt}-${String(ord).padStart(2, '0')}`
      : id ? `B-${id}`
      : `${PREFIX[job.phase]}-${String(job.chapter).padStart(2, '0')}-${ord}`),
  });
  allPrompts.push(...prompts);

  const fm = frontmatter({
    chapter: job.chapter, appendix: job.appendix ?? undefined,
    title, slug, phase: job.phase, phase_name: PHASE_NAME[job.phase],
    milestone: milestoneOf(slug), checkpoint: ckpt,
    tool: meta.tool, session: meta.session, estimated_time: meta.estimated_time,
    prompts: meta.prompts, deliverables: meta.deliverables,
    prerequisites: meta.prerequisites, when_to_use: meta.when_to_use, gate: meta.gate,
    source_html: job.src,
  });
  const heading = job.chapter ? `# Chapter ${job.chapter}: ${title}` : `# Appendix ${job.appendix}: ${title}`;
  const md = `${fm}\n\n${heading}\n\n${body.filter(Boolean).join('\n\n')}\n`;

  if (!DRY) {
    fs.mkdirSync(path.join(ROOT, job.outDir), { recursive: true });
    fs.writeFileSync(path.join(ROOT, job.outDir, job.outFile), md);
  }
}

// Collision guard: a duplicate filename means one prompt would silently overwrite
// another. Fail loudly rather than lose content.
{
  const seen = new Map(); const dupes = [];
  for (const p of allPrompts) {
    if (seen.has(p.file)) dupes.push(`${p.file}  (ch${seen.get(p.file)} and ch${p.chapter})`);
    else seen.set(p.file, p.chapter);
  }
  if (dupes.length) {
    console.error(`\nFATAL: ${dupes.length} prompt filename collision(s):`);
    dupes.forEach((d) => console.error('  ' + d));
    process.exit(1);
  }
}

if (!DRY) {
  fs.mkdirSync(path.join(ROOT, 'prompts'), { recursive: true });
  for (const p of allPrompts) {
    const fm = frontmatter({
      id: p.pid, title: p.name, tool: p.tool ?? 'claude-code', chapter: p.chapter,
      variant: 'canonical', source: 'archive/html-v3/handbook',
    });
    fs.writeFileSync(path.join(ROOT, 'prompts', p.file), `${fm}\n\n${fence(p.body)}\n`);
  }
}

console.log(`chapters converted : ${jobs.length}`);
console.log(`prompts extracted  : ${allPrompts.length}`);
if (unresolved.length) {
  console.log(`unresolved links   : ${[...new Set(unresolved)].length}`);
  [...new Set(unresolved)].forEach((h) => console.log(`  ${h}`));
}
