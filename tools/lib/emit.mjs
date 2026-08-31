/**
 * Shared Markdown emitter.
 *
 * Both html-to-md.mjs and mdx-to-md.mjs import from here so the two converters
 * produce byte-identical Markdown conventions.
 *
 * Design rules:
 *  - Prompt/code bodies are emitted from .text() verbatim. Never reflow, never trim
 *    internal whitespace. Prompt bodies must survive SHA-1 identity checks.
 *  - Anything the rule table does not recognise emits an UNCONVERTED marker rather
 *    than being silently dropped. tools/verify-conversion.mjs fails on any marker.
 */

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/['"’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Collapse runs of whitespace in prose. Never used on code or prompt bodies. */
export function tidy(s) {
  return String(s).replace(/\s+/g, ' ').trim();
}

/**
 * Part 0 chapter filenames, derived from workflow-guide-v1.html's 22 <h1 id="chapter-N">.
 * Used to resolve the D12 broken anchors and to name the split files.
 */
export const PART0 = [
  'the-context-window-mental-model',
  'token-economics-and-why-context-matters',
  'filesystem-as-persistent-memory',
  'the-claude-md-file',
  'documentation-file-structure',
  'skills-vs-claude-md',
  'initial-project-scaffolding',
  'breaking-large-projects-into-subtasks',
  'the-one-verifiable-outcome-rule',
  'task-state-files',
  'checkpoint-and-recovery-strategy',
  'when-and-how-to-use-clear',
  'configuration-auto-compact-and-token-limits',
  'the-session-rhythm',
  'context-recovery-after-clearing',
  'understanding-sub-agents',
  'mcp-tools-and-integration',
  'memory-persistence-strategies',
  'multi-session-project-continuity',
  'mapping-milestones-to-sessions',
  'prescriptive-git-workflow',
  'quality-gates-as-context-boundaries',
];

export const part0File = (n) => `${String(n).padStart(2, '0')}-${PART0[n - 1]}.md`;

/**
 * Link rewrite table.
 *
 * D12: all 11 workflow-guide cross-links target anchors that do not exist in the
 *      source (its anchors are chapter-N / section-N-M only). Resolve to real files.
 * D1:  the ch27 "now go build" CTA points at a path that 404s. Retarget to the
 *      prompt library that the monolithic guide was always trying to be.
 */
const LINK_MAP = new Map([
  ['../workflow-guide-v1.html#context-management', `../00-operating/${part0File(12)}`],
  ['../workflow-guide-v1.html#task-decomposition', `../00-operating/${part0File(8)}`],
  ['../workflow-guide-v1.html#agentic-patterns', `../00-operating/${part0File(16)}`],
  ['../workflow-guide-v1.html', '../00-operating/README.md'],
  ['../../build-guide-v3.html', '../../prompts/INDEX.md'],
  ['../../claude-code-integration.html', `../00-operating/23-claude-code-timing-by-phase.md`],
  ['../claude-code-integration.html', `../00-operating/23-claude-code-timing-by-phase.md`],
  ['index.html', '../README.md'],
]);

/**
 * Targets that exist in no tree, old or new. Their link text is kept as plain prose
 * rather than pointing at a file that was never migrated.
 */
const DEAD_LINKS = new Set(['handbook-v3-part1-strategy.html']);

/** chapter number -> converted markdown path, filled in by the driver before conversion. */
export const chapterPaths = new Map();

export function rewriteHref(href, ctx = {}) {
  if (!href) return href;
  if (DEAD_LINKS.has(href)) return null;          // caller renders text only
  if (LINK_MAP.has(href)) return LINK_MAP.get(href);

  // chapter-NN-slug.html (possibly ../phaseN/ prefixed) -> the converted path
  const m = href.match(/chapter-(\d+)-[a-z0-9-]+\.html(#.*)?$/i);
  if (m) {
    const target = chapterPaths.get(Number(m[1]));
    if (target) {
      const from = ctx.dir ?? '';
      return relPath(from, target) + (m[2] ?? '');
    }
  }
  if (href.startsWith('#') || /^https?:/i.test(href) || href.startsWith('mailto:')) return href;
  ctx.unresolved?.push(href);
  return href;
}

/** POSIX relative path from directory `from` to file `to`, both repo-relative. */
export function relPath(from, to) {
  const a = from.split('/').filter(Boolean);
  const b = to.split('/').filter(Boolean);
  while (a.length && b.length && a[0] === b[0]) { a.shift(); b.shift(); }
  return [...a.map(() => '..'), ...b].join('/');
}

/* ------------------------------------------------------------------ inline */

/**
 * Recursive inline conversion. Handles the inline subset that actually occurs in
 * this corpus: strong/b, em/i, code, a, br, span. Prose text is passed through
 * unescaped — the source is ordinary English and escaping would hurt raw readability.
 */
export function inline($, node, ctx = {}) {
  let out = '';
  $(node).contents().each((_, el) => {
    if (el.type === 'text') { out += el.data; return; }
    if (el.type !== 'tag') return;
    const $el = $(el);
    switch (el.tagName) {
      case 'strong': case 'b': out += `**${tidy(inline($, el, ctx))}**`; break;
      case 'em': case 'i': out += `*${tidy(inline($, el, ctx))}*`; break;
      case 'code': out += '`' + $el.text() + '`'; break;
      case 'br': out += '\n'; break;
      case 'a': {
        const text = tidy(inline($, el, ctx)) || $el.attr('href');
        const href = rewriteHref($el.attr('href'), ctx);
        out += href ? `[${text}](${href})` : text;
        break;
      }
      case 'span': case 'small': case 'kbd': out += inline($, el, ctx); break;
      default: out += inline($, el, ctx);
    }
  });
  return out;
}

/* ------------------------------------------------------------------- blocks */

export function fence(body, lang = 'text') {
  const b = String(body).replace(/\r\n?/g, '\n').replace(/\s+$/, '');
  // Guard against a body that itself contains a ``` fence.
  const ticks = /^```/m.test(b) ? '````' : '```';
  return `${ticks}${lang}\n${b}\n${ticks}`;
}

/** Blockquote a multi-line body, prefixing every line (blank lines get a bare '>'). */
export function quote(body) {
  return String(body).trim().split('\n')
    .map((l) => (l.trim() ? `> ${l}` : '>'))
    .join('\n');
}

export function list($, el, ctx, depth = 0) {
  const ordered = el.tagName === 'ol';
  const pad = '  '.repeat(depth);
  const lines = [];
  let i = 1;
  $(el).children('li').each((_, li) => {
    const nested = [];
    $(li).children('ul,ol').each((_, sub) => {
      nested.push(list($, sub, ctx, depth + 1));
      $(sub).remove();
    });
    const marker = ordered ? `${i++}.` : '-';
    const text = tidy(inline($, li, ctx));
    lines.push(`${pad}${marker} ${text}`);
    if (nested.length) lines.push(nested.join('\n'));
  });
  return lines.join('\n');
}

/** GFM task list. Source checklists are <ul><li> with the box implied by CSS. */
export function taskList($, el, ctx) {
  const lines = [];
  $(el).find('li').each((_, li) => {
    lines.push(`- [ ] ${tidy(inline($, li, ctx))}`);
  });
  return lines.join('\n');
}

export function table($, el, ctx) {
  const rows = [];
  $(el).find('tr').each((_, tr) => {
    const cells = [];
    $(tr).children('th,td').each((_, td) => {
      cells.push(tidy(inline($, td, ctx)).replace(/\|/g, '\\|'));
    });
    if (cells.length) rows.push(cells);
  });
  if (!rows.length) return '';
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r) => { while (r.length < width) r.push(''); return r; };
  const head = pad(rows[0]);
  const body = rows.slice(1).map(pad);
  return [
    `| ${head.join(' | ')} |`,
    `|${' --- |'.repeat(width)}`,
    ...body.map((r) => `| ${r.join(' | ')} |`),
  ].join('\n');
}

export function frontmatter(obj) {
  const lines = ['---'];
  const emitScalar = (v) => {
    if (v === null || v === undefined) return 'null';
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    const s = String(v);
    return /^[\w./ -]+$/.test(s) && !/^\s|\s$/.test(s) ? `"${s}"` : JSON.stringify(s);
  };
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) {
      if (!v.length) { lines.push(`${k}: []`); continue; }
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - ${emitScalar(item)}`);
    } else {
      lines.push(`${k}: ${emitScalar(v)}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

export function unconverted(tag, cls) {
  return `<!-- UNCONVERTED: ${tag}${cls ? '.' + String(cls).trim().split(/\s+/).join('.') : ''} -->`;
}
