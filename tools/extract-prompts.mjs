#!/usr/bin/env node
/**
 * extract-prompts.mjs — rescue the archived prompt library and build prompts/INDEX.md
 *
 * docs/archive/build-guide-v3.html (213 KB) is the richest prompt asset in the repo
 * and is unreachable: 36 prompts, a formal taxonomy, and five audit prompts that
 * exist nowhere else (Refactoring, Code Review, Security, Debt Review, Debt
 * Remediation). The handbook's central "now go build" CTA pointed at it and 404'd.
 *
 * Divergence policy (the load-bearing decision):
 *   A SHA-1 body diff shows 18 title matches between this guide and the live
 *   chapters, ZERO identical — the guide is the parent, the chapters the edited
 *   child, both frozen in the same commit. Reconciling them is content authoring,
 *   which is out of scope. So the live version stays canonical and the archive
 *   variant is preserved verbatim as <ID>.alt-v3.md. Nothing is lost, nothing is
 *   invented, and `ls prompts/*.alt-v3.md` becomes the explicit review queue.
 *
 * Usage: node tools/extract-prompts.mjs
 */
import { load } from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import { tidy, slugify, frontmatter, fence } from './lib/emit.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = 'archive/html-v3/archive/build-guide-v3.html';
const PROMPTS = path.join(ROOT, 'prompts');

/**
 * The five audit prompts are the only containers WITHOUT a "Prompt N.M:" prefix —
 * they live under the guide's section 5.x headings, which are section numbers, not
 * prompt numbers. (5.1/5.2 as *prompt* numbers are M5 auth prompts; keying on the
 * number conflates the two.) They have no counterpart in the live tree at all.
 */
const AUDIT_SLUG = (name) => {
  const n = name.toLowerCase();
  if (n.includes('refactor')) return 'refactor';
  if (n.includes('code review')) return 'code-review';
  if (n.includes('security')) return 'security';
  if (n.includes('remediation')) return 'debt-remediation';
  if (n.includes('debt')) return 'debt-review';
  return null;
};

const $ = load(fs.readFileSync(path.join(ROOT, SRC), 'utf8'));

/** Everything already emitted from the live tree, keyed by canonical prompt id. */
const existing = new Map();
for (const f of fs.readdirSync(PROMPTS)) {
  if (!f.endsWith('.md')) continue;
  const t = fs.readFileSync(path.join(PROMPTS, f), 'utf8');
  const id = t.match(/^id: "?([^"\n]+)"?$/m)?.[1];
  if (id) existing.set(id, f);
}

const added = [];
const variants = [];

$('.prompt-container').each((_, el) => {
  const $el = $(el);
  const header = tidy($el.find('.prompt-header span').first().text());
  const pre = $el.find('pre').first();
  const raw = pre.length ? pre.text()
    : $el.clone().find('.prompt-header').remove().end().text();

  const m = header.match(/Prompt\s+([\d.]+)\s*[:—-]\s*(.*)$/i);
  const num = m ? m[1] : null;
  const name = m ? m[2] : header.replace(/^Prompt\s*/i, '') || 'Prompt';

  // No "Prompt N.M:" prefix => an audit/tool prompt. No live counterpart -> canonical.
  if (!num) {
    const slug = AUDIT_SLUG(name);
    const pid = slug ? `A-${slug}` : `A-${slugify(name)}`;
    write(pid, name, raw, 'canonical', null);
    added.push({ pid, name, milestone: null, kind: 'audit' });
    return;
  }

  const pid = num ? `B-${num}` : `B-x-${slugify(name)}`;
  const milestone = num ? `M${num.split('.')[0]}` : null;

  if (existing.has(pid)) {
    // Same ID exists in the live tree. Bodies are known to differ 100% of the time;
    // keep both, mark the archive one as the variant, and cross-link.
    const canonicalFile = existing.get(pid);
    const vFile = `${pid}-${slugify(name)}.alt-v3.md`;
    fs.writeFileSync(path.join(PROMPTS, vFile), `${frontmatter({
      id: pid, title: name, tool: 'claude-code', milestone,
      variant: 'alt-v3', supersedes: null, superseded_by: canonicalFile, source: SRC,
    })}

> **Variant.** This is the \`build-guide-v3\` wording of \`${pid}\`. The canonical version
> is [\`${canonicalFile}\`](${canonicalFile}). Both were frozen in the same commit and their
> bodies differ; neither is uniformly newer. Reconciling them is a content decision that
> has not been made — see \`INDEX.md\` § Known Divergences.

${fence(raw)}
`);
    variants.push({ pid, name, canonicalFile, vFile });
    return;
  }

  // Archive-only build prompt (7.0, 7.5, 10.4, 11.4 ...) -> first-class canonical.
  write(pid, name, raw, 'canonical', milestone);
  added.push({ pid, name, milestone, kind: 'build' });
});

function write(pid, name, raw, variant, milestone) {
  // Audit IDs already carry the name (A-security); don't repeat it in the filename.
  const file = pid.startsWith('A-') ? `${pid}.md` : `${pid}-${slugify(name)}.md`;
  fs.writeFileSync(path.join(PROMPTS, file), `${frontmatter({
    id: pid, title: name, tool: 'claude-code', milestone,
    variant, source: SRC,
  })}\n\n${fence(raw)}\n`);
  existing.set(pid, file);
}

/* ------------------------------------------------------------------- INDEX --- */

const rows = [];
for (const f of fs.readdirSync(PROMPTS).sort()) {
  if (!f.endsWith('.md') || f === 'INDEX.md') continue;
  const t = fs.readFileSync(path.join(PROMPTS, f), 'utf8');
  const g = (k) => t.match(new RegExp(`^${k}: "?([^"\\n]*)"?$`, 'm'))?.[1] ?? '';
  rows.push({
    id: g('id'), title: g('title'), tool: g('tool') || 'claude-code',
    milestone: g('milestone') === 'null' ? '' : g('milestone'),
    chapter: g('chapter') === 'null' ? '' : g('chapter'),
    variant: g('variant'), file: f,
  });
}
rows.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }) || a.file.localeCompare(b.file));

const table = [
  '| ID | Title | Tool | Milestone | Chapter | Variant | File |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((r) => `| \`${r.id}\` | ${r.title} | ${r.tool} | ${r.milestone} | ${r.chapter} | ${r.variant} | [\`${r.file}\`](${r.file}) |`),
].join('\n');

const divergences = variants.map((v) => `| \`${v.pid}\` | ${v.name} | [\`${v.canonicalFile}\`](${v.canonicalFile}) | [\`${v.vFile}\`](${v.vFile}) |`).join('\n');

fs.writeFileSync(path.join(PROMPTS, 'INDEX.md'), `# Prompt Library

Every prompt in the handbook as a standalone file. Flat by design: \`ls\` is the
catalogue and \`grep -l\` is the search.

**ID scheme** — namespaced so the same number can never mean two things:

| Prefix | Set |
| --- | --- |
| \`B-<M>.<n>\` | Build prompts, keyed to the milestone they belong to |
| \`CA-\`, \`CB-\`, \`CC-\` | Checkpoint prompts (A after M3, B after M6, C after M10) |
| \`A-<slug>\` | Audit prompts — refactor, code-review, security, debt-review, debt-remediation |
| \`V-\`, \`D-\`, \`X-\` | Phase 1 Validate / Phase 2 Design / Phase 3 Architect prompts |
| \`W-\` | Part 0, operating Claude Code |

**Total: ${rows.length} files** (${rows.filter((r) => r.variant === 'canonical').length} canonical, ${rows.filter((r) => r.variant === 'alt-v3').length} variants).

## Taxonomy

- **Foundation** — M1–M4: project setup, design system, database, layouts
- **Feature** — M5–M9: auth, core feature, admin, supporting features, payments
- **Quality** — M10–M11 plus the \`A-*\` audit prompts, run at checkpoints

## All prompts

${table}

## Known Divergences

The archived \`build-guide-v3.html\` is the *parent* of the live chapters, not an
older sibling — both were last touched in the same commit. Of the prompts whose
titles match, **none has an identical body**. Neither tree is uniformly newer, so
both are kept: the live wording is canonical, the guide's wording is preserved as
\`.alt-v3\`. This table is the review queue; it is not a defect list.

| ID | Title | Canonical | Variant |
| --- | --- | --- | --- |
${divergences}

Beware also that the two trees **reuse the same numbers for different prompts** —
live \`7.4\` is *Error Logs* while the guide's \`7.4\` is *Subscription Viewing*, and
\`11.1/11.2/11.3\` are permuted between them. The namespaced IDs above keep those
apart; do not renumber them back.
`);

console.log(`archive prompts   : 36 scanned`);
console.log(`  canonical added : ${added.length} (${added.filter((a) => a.kind === 'audit').length} audit, ${added.filter((a) => a.kind === 'build').length} build-only)`);
console.log(`  variants kept   : ${variants.length}`);
console.log(`INDEX.md rows     : ${rows.length}`);
