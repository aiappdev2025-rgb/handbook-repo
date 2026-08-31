import { load } from 'cheerio';
import fs from 'node:fs';
const [f,m] = process.argv.slice(2);
const $ = load(fs.readFileSync(f,'utf8'));
$('nav, aside, script, style, .print-button').remove();
$('.milestone-info, .prompt-indicator, .prerequisites').remove();
$('td, th, li, p, div, h1, h2, h3, h4').each((_,el)=>$(el).append(' '));
const toks = s => (s.match(/\S+/g)||[]).filter(t=>/[A-Za-z0-9]/.test(t)).map(t=>t.replace(/[^A-Za-z0-9]/g,'').toLowerCase()).filter(Boolean);
const src = toks($('main.content article').first().text());
let md = fs.readFileSync(m,'utf8').replace(/^---\n[\s\S]*?\n---\n/,'');
md = md.split('\n').filter(l=>!/^>\s*Prompt file:/.test(l)&&!/^>\s*\*\*Run in:\*\*/.test(l)).join('\n')
  .replace(/^>\s?/gm,'').replace(/^\s*(?:[-*]|\d+\.)\s+/gm,'').replace(/^\s*\|[\s|:-]+\|\s*$/gm,'');
const c = a => a.reduce((m,x)=>(m.set(x,(m.get(x)||0)+1),m),new Map());
const cs=c(src), cm=c(toks(md));
const only=(a,b,l)=>{const o=[];for(const[k,v]of a){const d=v-(b.get(k)||0);if(d>0)o.push([k,d]);}
o.sort((x,y)=>y[1]-x[1]);console.log(l,o.slice(0,18).map(([k,v])=>`${k}x${v}`).join(' '));};
only(cs,cm,'SOURCE ONLY:'); only(cm,cs,'MARKDOWN ONLY:');
