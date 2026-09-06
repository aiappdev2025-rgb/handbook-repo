#!/usr/bin/env node
/**
 * build-index.mjs — generate method/README.md, the single navigation source.
 *
 * Replaces docs/js/navigation.js + docs/js/navigation-data.json, which had drifted
 * from each other (D5: the reference copy pointed ch43 at a file that never existed).
 * There is now one index, generated from the files that actually exist on disk, so
 * it cannot drift.
 *
 * Usage: node tools/build-index.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const M = path.join(ROOT, 'method');

const PHASES = [
  ['01-validate', 1, 'Validate', 'Is this worth building? Research, one-pager, design brief.'],
  ['02-design', 2, 'Design', 'What does it look like? UX package, UI system, visual direction.'],
  ['03-architect', 3, 'Architect', 'How is it built? Architecture, infrastructure, the Build Contract.'],
  ['04-build', 4, 'Build', 'Ship it. SPEC-first + TDD across milestones M1–M11 with checkpoints A/B/C.'],
  ['05-launch', 5, 'Launch', 'QA, deployment, launch checklist.'],
];

const fm = (f) => {
  const t = fs.readFileSync(f, 'utf8');
  const g = (k) => t.match(new RegExp(`^${k}: "?([^"\\n]*)"?$`, 'm'))?.[1] ?? '';
  return { title: g('title'), chapter: g('chapter'), milestone: g('milestone'), tool: g('tool'), gate: g('gate') };
};

const section = (dir) => fs.readdirSync(path.join(M, dir))
  .filter((f) => f.endsWith('.md') && f !== 'README.md')
  .sort()
  .map((f) => ({ f, ...fm(path.join(M, dir, f)) }));

const p0files = fs.readdirSync(path.join(M, '00-operating')).filter((f) => f.endsWith('.md'));
const p0 = {
  chapters: p0files.filter((f) => /^\d\d-/.test(f)).length,
  appendices: p0files.filter((f) => /^[a-z]-/.test(f)).length,
};

let out = `---
title: "AI SaaS Handbook — the method"
slug: "method"
---

# The Method

Everything needed to take a SaaS product from idea to launch with Claude Code.
Read **Part 0 first** — it is orthogonal to the five phases and applies throughout.

Prompts referenced by these chapters live in [\`../prompts/\`](../prompts/INDEX.md),
one file each, flat and greppable. Templates for the artifacts you produce live in
[\`../plugins/moai/assets/templates/\`](../plugins/moai/assets/templates/).

## Part 0 — Operating Claude Code

How to drive the tool well: context budgeting, session boundaries, \`CLAUDE.md\` vs
skills, when to \`/clear\`, carrying state across sessions.

→ [**Part 0 index**](00-operating/README.md) · ${p0.chapters} chapters + ${p0.appendices} appendices

`;

for (const [dir, n, name, blurb] of PHASES) {
  const rows = section(dir);
  out += `\n## Phase ${n} — ${name}\n\n${blurb}\n\n`;
  out += '| Ch | Title | Tool | Milestone |\n| --- | --- | --- | --- |\n';
  for (const r of rows) {
    const badge = r.gate && r.gate !== 'null' ? ' ⛔' : '';
    out += `| ${r.chapter} | [${r.title}](${dir}/${r.f})${badge} | ${r.tool === 'null' ? '' : r.tool} | ${r.milestone === 'null' ? '' : r.milestone} |\n`;
  }
}

const app = section('99-appendix');
out += `\n## Appendices\n\n${app.map((a) => `- [${a.title}](99-appendix/${a.f})`).join('\n')}\n`;

out += `
## The milestone sequence

M1 Project Setup → M2 Design System → M3 Database → **Checkpoint A** →
M4 Layouts → M5 Authentication → M6 Core Feature → **Checkpoint B** →
M7 Admin Console → M8 Supporting Features → M9 Payments → M10 Polish →
**Checkpoint C** → M11 Testing.

Checkpoints tag the repo (\`checkpoint-a\`, \`checkpoint-b\`, \`checkpoint-c\`) and gate
progress on a technical-debt score. This numbering is canonical — see
\`CLAUDE.md\` § CANONICAL FACTS for why, and do not renumber it.
`;

fs.writeFileSync(path.join(M, 'README.md'), out);
console.log(`method/README.md written (${PHASES.reduce((n, p) => n + section(p[0]).length, 0)} chapters + ${app.length} appendices)`);
