import { load } from 'cheerio';
const $ = load('<div class="t"><div><h3>A</h3><p>one</p></div><div><h3>B</h3><p>two</p></div></div>');
const r = $('.t').clone().find('h3').first().remove().end();
console.log('multi-heading .end() ->', r.length, 'el(s):', r.toArray().map(e=>e.tagName).join(','));
