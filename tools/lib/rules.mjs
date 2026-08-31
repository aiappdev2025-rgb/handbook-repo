/**
 * rules.mjs — the HTML -> Markdown rule table.
 *
 * Shared by every converter entry point (chapters, the workflow guide, the archived
 * build guide) so all of them emit identical Markdown conventions.
 *
 * Two invariants:
 *   1. Prompt and code bodies are emitted from .text() verbatim — never reflowed.
 *   2. An element carrying real text that produces no output is marked UNCONVERTED
 *      rather than dropped. tools/verify-conversion.mjs fails on any marker.
 */
import {
  slugify, tidy, inline, fence, quote, list, taskList, table, unconverted, relPath,
} from './emit.mjs';

const CHROME_TAGS = new Set(['nav', 'aside', 'script', 'style']);
const LIFTED = ['milestone-info', 'prerequisites', 'prompt-indicator'];

/**
 * @param {*} $        cheerio instance
 * @param {Array} els  top-level elements to render, in document order
 * @param {object} ctx { dir, prefix, promptSeq, unresolved }
 * @param {object} opts { norm, chapter, promptId(name,id,ord) }
 * @returns {{body:string[], prompts:object[], meta:object}}
 */
export function renderBlocks($, els, ctx, opts = {}) {
  const norm = opts.norm ?? ((s) => s);
  const body = [];
  const prompts = [];
  const meta = {
    tool: null, session: null, prompts: [], deliverables: null,
    when_to_use: [], gate: null, prerequisites: [], estimated_time: null,
  };
  let pendingIndicator = null;

  /**
   * Render a container's children.
   *
   * Block-level children (div/section) recurse through the full rule table rather
   * than being flattened by inline(). Flattening was silently collapsing nested
   * structures — the workflow guide's `div.timeline` holds six `div.phase` blocks
   * and lost 90% of its words that way.
   */
  /**
   * Clone an element with its first matching descendant removed.
   *
   * Replaces the chained `.clone().find(sel).first().remove().end()` idiom, which
   * is a trap: `.end()` reverts to the *find* set, so with more than one match it
   * returns the headings instead of the container and the body silently vanishes.
   */
  const dropFirst = ($el, sel) => { const c = $el.clone(); c.find(sel).first().remove(); return c; };

  const renderChildren = ($wrap, depth = 0) => {
    const parts = [];
    $wrap.contents().each((_, el) => {
      if (el.type === 'text') { const t = tidy(el.data); if (t) parts.push(t); return; }
      if (el.type !== 'tag') return;
      const $el = $(el);
      if (el.tagName === 'ul' || el.tagName === 'ol') parts.push(list($, el, ctx));
      else if (el.tagName === 'table') parts.push(table($, el, ctx));
      else if (el.tagName === 'pre') parts.push(fence($el.text()));
      else if ((el.tagName === 'div' || el.tagName === 'section') && depth < 4
               && $el.children().length) {
        const nested = renderBlocks($, $el.children().toArray(), ctx, { ...opts, _depth: depth + 1 });
        prompts.push(...nested.prompts);
        parts.push(nested.body.filter(Boolean).join('\n\n'));
      } else parts.push(tidy(inline($, el, ctx)));
    });
    return parts.filter(Boolean).join('\n\n');
  };

  const addPrompt = (rawName, id, raw) => {
    const name = norm(rawName);          // filenames must carry the normalised naming too
    const ord = ++ctx.promptSeq;
    const pid = opts.promptId ? opts.promptId(name, id, ord) : `${ctx.prefix}-${ord}`;
    const file = `${pid}-${slugify(name)}.md`;
    prompts.push({ pid, name, file, body: norm(raw), tool: meta.tool, chapter: opts.chapter ?? null });
    return { pid, file, id };
  };

  const handle = (el) => {
    if (el.type !== 'tag') return;
    const $el = $(el);
    const tag = el.tagName;
    const cls = $el.attr('class') || '';
    const has = (c) => cls.split(/\s+/).includes(c);

    if (tag === 'h1') return;
    if (tag === 'h2' || tag === 'h3' || tag === 'h4') {
      const lvl = tag === 'h2' ? '##' : tag === 'h3' ? '###' : '####';
      body.push(`${lvl} ${norm(tidy(inline($, el, ctx)))}`);
      return;
    }

    if (has('prompt-indicator')) {
      const toolTxt = tidy($el.find('.tool-badge').text());
      const sess = tidy($el.find('.session-badge').text());
      const note = tidy($el.find('span:not(.tool-badge):not(.session-badge)').text());
      if (toolTxt) meta.tool ??= /code/i.test(toolTxt) ? 'claude-code' : 'claude-chat';
      if (sess) meta.session ??= slugify(sess);
      pendingIndicator = [
        toolTxt && `**Run in:** ${toolTxt}`,
        sess && `**Session:** ${sess}`,
        note && note.replace(/^\(|\)$/g, ''),
      ].filter(Boolean).join(' · ');
      return;
    }

    if (has('prompt-box') || has('prompt-container')) {
      const heading = tidy($el.find('h4,h3').first().text());
      const pre = $el.find('pre').first();
      const raw = pre.length ? pre.text() : $el.clone().children('h4,h3').remove().end().text();
      const idm = heading.match(/Prompt\s+([\d.]+)\s*[:—-]\s*(.*)$/i);
      const id = idm ? idm[1] : null;
      const name = idm ? idm[2]
        : (heading || 'Prompt').replace(/^Claude Code Prompt:?\s*/i, '') || heading || 'Prompt';
      if (id) meta.prompts.push(id);
      const { file } = addPrompt(name, id, raw);
      if (heading) body.push(`### ${norm(id ? `Prompt ${id} — ${name}` : name)}`);
      if (pendingIndicator) { body.push(quote(pendingIndicator)); pendingIndicator = null; }
      if (ctx.dir) body.push(quote(`Prompt file: [\`prompts/${file}\`](${relPath(ctx.dir, 'prompts/' + file)})`));
      body.push(fence(norm(raw)));
      return;
    }

    if (has('prompt-block')) {
      const raw = $el.text();
      const { file } = addPrompt(opts.blockName ?? 'prompt', null, raw);
      if (pendingIndicator) { body.push(quote(pendingIndicator)); pendingIndicator = null; }
      if (ctx.dir) body.push(quote(`Prompt file: [\`prompts/${file}\`](${relPath(ctx.dir, 'prompts/' + file)})`));
      body.push(fence(norm(raw)));
      return;
    }

    if (has('milestone-info')) {
      $el.find('p').each((_, p) => {
        const label = tidy($(p).find('strong').first().text()).replace(/:$/, '');
        const val = tidy($(p).clone().find('strong').remove().end().text());
        if (/^tool$/i.test(label)) meta.tool = /code/i.test(val) ? 'claude-code' : 'claude-chat';
        else if (/^deliverables?$/i.test(label)) meta.deliverables = val;
      });
      return;
    }
    if (has('prerequisites')) {
      $el.find('li').each((_, li) => meta.prerequisites.push(tidy(inline($, li, ctx))));
      return;
    }

    if (has('tldr-box')) {
      body.push(quote(`**TL;DR** — ${norm(tidy(dropFirst($el, 'h4').text()))}`));
      return;
    }
    if (has('when-to-use')) {
      const t = tidy(dropFirst($el, 'strong').text());
      meta.when_to_use.push(t);
      body.push(quote(`**When to use:** ${norm(t)}`));
      return;
    }
    if (has('gate-indicator')) {
      const t = tidy(dropFirst($el, 'strong').text());
      meta.gate = norm(t);
      body.push(quote(`**⛔ GATE:** ${norm(t)}`));
      return;
    }
    if (has('workflow-tip')) {
      const t = tidy(inline($, el, ctx)).replace(/^\s*Workflow Tip:\s*/i, '');
      body.push(quote(`**Workflow tip:** ${norm(t)}`));
      return;
    }
    if (has('warning') || has('warning-box')) {
      body.push(quote(`**⚠ Warning:** ${norm(tidy(inline($, el, ctx)))}`)); return;
    }
    if (has('note') || has('info') || has('tip') || has('intro-box') || has('decision-box')) {
      const h = tidy($el.find('h3,h4').first().text());
      const inner = norm(renderChildren(dropFirst($el, 'h3,h4')));
      body.push(quote(h ? `**${norm(h)}**\n\n${inner}` : `**Note:** ${inner}`));
      return;
    }
    // The workflow guide renders ASCII diagrams and file listings as styled divs
    // with significant whitespace (CSS white-space: pre). Fence them verbatim.
    if (has('diagram')) { body.push(fence(norm($el.text()))); return; }
    if (has('file-block')) {
      const name = tidy($el.find('.file-block-header').first().text());
      const content = $el.find('.file-block-content').first();
      if (name) body.push(`**\`${name}\`**`);
      body.push(fence(norm(content.length ? content.text() : $el.text())));
      return;
    }
    if (has('timeline') || has('chapter-summary')) {
      const h = tidy($el.find('h2,h3,h4').first().text());
      if (h) body.push(`## ${norm(h)}`);
      body.push(norm(renderChildren(dropFirst($el, 'h2,h3,h4'))));
      return;
    }

    if (has('success') || has('success-box') || has('expected-output')) {
      const h = tidy($el.find('h3,h4').first().text()) || 'Expected Outcome';
      body.push(quote(`**${norm(h)}**\n\n${norm(renderChildren(dropFirst($el, 'h3,h4')))}`));
      return;
    }
    if (has('checkpoint-box')) {
      const h = tidy($el.find('h2,h3,h4').first().text());
      const rows = [];
      $el.find('p').each((_, p) => {
        const label = tidy($(p).find('strong').first().text()).replace(/:$/, '');
        const val = tidy(inline($, dropFirst($(p), 'strong')[0], ctx));
        if (label) rows.push([norm(label), norm(val)]);
      });
      if (h) body.push(`### ${norm(h)}`);
      if (rows.length) body.push(['| | |', '| --- | --- |', ...rows.map((r) => `| **${r[0]}** | ${r[1]} |`)].join('\n'));
      return;
    }
    if (has('moai-box')) {
      const h = tidy($el.find('h4').first().text());
      body.push(quote(`**${norm(h)}**\n\n${norm(renderChildren(dropFirst($el, 'h4')))}`));
      return;
    }
    if (has('part-header')) {
      const h = tidy($el.find('h2,h3').first().text());
      const sub = tidy($el.find('p').first().text());
      body.push(`## ${norm(h)}${sub ? `\n\n*${norm(sub)}*` : ''}`);
      return;
    }

    if (has('code-block') || has('file-structure')) { body.push(fence(norm($el.text()))); return; }
    if (tag === 'pre') { body.push(fence(norm($el.text()))); return; }

    if (has('checklist') || has('printable-checklist')) {
      const h = tidy($el.find('h4,h3').first().text());
      if (h) body.push(`### ${norm(h)}`);
      if ($el.find('li').length) body.push(norm(taskList($, el, ctx)));
      else body.push(norm(renderChildren(dropFirst($el, 'h4,h3'))));
      return;
    }
    if (tag === 'ul' || tag === 'ol') { body.push(norm(list($, el, ctx))); return; }
    if (tag === 'table') { body.push(norm(table($, el, ctx))); return; }
    if (has('comparison-table')) {
      const t = $el.find('table').first();
      body.push(t.length ? norm(table($, t[0], ctx)) : unconverted(tag, cls));
      return;
    }

    if (tag === 'p') { const t = tidy(inline($, el, ctx)); if (t) body.push(norm(t)); return; }
    if (tag === 'hr') { body.push('---'); return; }
    if (CHROME_TAGS.has(tag) || tag === 'footer' || has('print-button')
        || $el.attr('id') === 'page-nav' || has('toc') || has('toc-section')
        || has('toc-items') || has('nav-bar') || has('nav-links') || has('divider')
        || has('title-section')) return;

    // Unknown container: recurse through the rule table rather than flattening or
    // dropping. Only a genuinely unhandled element falls through to the marker.
    if ((tag === 'div' || tag === 'section') && $el.children().length) {
      const inner = norm(renderChildren($el, (opts._depth ?? 0)));
      if (inner.trim()) { body.push(inner); return; }
    }
    if (tag === 'div' && !cls) { body.push(norm(renderChildren($el))); return; }
    body.push(unconverted(tag, cls));
  };

  for (const el of els) {
    const before = body.length;
    const srcText = el.type === 'tag' ? tidy($(el).text()) : '';
    const cls = el.type === 'tag' ? ($(el).attr('class') || '') : '';
    // h1 is exempt: the caller lifts it into the frontmatter `title` and re-emits it
    // as the document heading, so producing no body output here is correct.
    const isChrome = el.type === 'tag'
      && (el.tagName === 'h1' || el.tagName === 'footer' || CHROME_TAGS.has(el.tagName)
          || /print-button|toc|nav-bar|nav-links|divider|title-section/.test(cls)
          || LIFTED.some((c) => cls.split(/\s+/).includes(c)));
    handle(el);
    if (!isChrome && srcText.length > 20) {
      const added = body.slice(before).join('').replace(/[\s>*`#|_[\]()-]/g, '');
      if (added.length === 0) body.push(unconverted(el.tagName, cls));
    }
  }

  return { body, prompts, meta };
}
