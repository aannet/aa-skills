#!/usr/bin/env node
/*
  ste-check.mjs - counts the signals that a text breaks the main ASD-STE100 writing limits.
  Node 22, no package.

    node scripts/ste-check.mjs <file.md | folder> [more paths] [--max 20] [--json]

  Checks (heuristics, not a full STE check):
    long-sentence   a sentence has more than --max words (default 20; 25 for the frontmatter description)
    long-paragraph  a paragraph has more than 6 sentences
    passive         a probable passive voice ("is made", "are shown")
    ing-form        a word that ends in -ing, as an INFO to review (allowed only as a technical noun or modifier)

  It skips fenced code, tables, headings, inline code and text between « ». Those parts are examples or data.
  The vocabulary list of ASD-STE100 is not checked.
  Exit 0 when there is no finding, 1 when there is one, 2 on a usage error.
*/
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
let MAX = 20, asJson = false;
const targets = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--max') MAX = Number(args[++i]);
  else if (args[i] === '--json') asJson = true;
  else targets.push(args[i]);
}
if (!targets.length || !Number.isFinite(MAX)) {
  console.error('usage: ste-check.mjs <file.md|folder> [--max 20] [--json]');
  process.exit(2);
}

const files = [];
const walk = (p) => {
  const st = fs.statSync(p, { throwIfNoEntry: false });
  if (!st) { console.error('ste-check: cannot read ' + p); process.exit(2); }
  if (st.isDirectory()) for (const f of fs.readdirSync(p).sort()) walk(path.join(p, f));
  else if (p.endsWith('.md')) files.push(p);
};
targets.forEach(walk);

const PASSIVE = /\b(is|are|was|were|be|been)\s+(not\s+)?(\w+ed|made|done|shown|given|set|run|kept|found|written|read|put|seen|taken|known|used|built)\b/i;
const ING = /\b[a-z]{4,}ing\b/gi;
const ING_OK = new Set(['during', 'nothing', 'something', 'anything', 'everything', 'string', 'thing', 'sibling', 'bring', 'spring']);

const findings = [];
const add = (file, line, id, text, extra = '') => findings.push({ file, line, id, text: text.slice(0, 120), extra });

function checkFile(file) {
  const raw = fs.readFileSync(file, 'utf8').split('\n');
  let inFence = false, inFront = false, inDesc = false;
  let para = []; // {text, line}
  const flush = () => {
    if (para.length) {
      const sentences = para.flatMap((p) => splitSentences(p.text).map((s) => ({ s, line: p.line })));
      if (sentences.length > 6) add(file, para[0].line, 'long-paragraph', para[0].text, `${sentences.length} sentences`);
    }
    para = [];
  };
  for (let i = 0; i < raw.length; i++) {
    let line = raw[i];
    if (i === 0 && line.trim() === '---') { inFront = true; continue; }
    if (inFront) {
      if (line.trim() === '---') { inFront = false; inDesc = false; continue; }
      if (/^description:/.test(line)) { inDesc = true; continue; }
      if (inDesc && /^\s+\S/.test(line)) { checkSentences(file, i + 1, line.trim(), 25); continue; }
      inDesc = false;
      continue;
    }
    if (/^\s*```/.test(line)) { inFence = !inFence; flush(); continue; }
    if (inFence) continue;
    if (!line.trim()) { flush(); continue; }
    if (/^\s*#{1,6}\s/.test(line) || /^\s*\|/.test(line)) { flush(); continue; }
    const text = line.replace(/^\s*(?:[-*]|\d+\.)\s+/, '');
    checkSentences(file, i + 1, text, MAX);
    if (/^\s*(?:[-*]|\d+\.)\s+/.test(line)) { flush(); para.push({ text, line: i + 1 }); flush(); }
    else para.push({ text, line: i + 1 });
  }
  flush();
}

function clean(text) {
  return text.replace(/«[^»]*»/g, ' ').replace(/`[^`]*`/g, ' ').replace(/\*\*/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
}
function splitSentences(text) {
  return clean(text).split(/(?<=[.!?:])\s+/).map((s) => s.trim()).filter(Boolean);
}
function checkSentences(file, line, text, max) {
  for (const s of splitSentences(text)) {
    const words = s.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length;
    if (words > max) add(file, line, 'long-sentence', s, `${words} words, limit ${max}`);
    if (PASSIVE.test(s)) add(file, line, 'passive', s);
    const ings = (s.match(ING) || []).filter((w) => !ING_OK.has(w.toLowerCase()));
    if (ings.length) add(file, line, 'ing-form', s, ings.join(', '));
  }
}

files.forEach(checkFile);

const real = findings.filter((f) => f.id !== 'ing-form');
if (asJson) {
  console.log(JSON.stringify({ files: files.length, findings }, null, 2));
} else {
  for (const f of findings) {
    const tag = f.id === 'ing-form' ? 'INFO' : 'WARN';
    console.log(`${tag} ${f.id} ${path.relative(process.cwd(), f.file)}:${f.line} ${f.extra ? `(${f.extra}) ` : ''}${f.text}`);
  }
  const by = (id) => findings.filter((f) => f.id === id).length;
  console.log(`\n${files.length} files. long-sentence ${by('long-sentence')}, long-paragraph ${by('long-paragraph')}, passive ${by('passive')}, ing-form ${by('ing-form')} (info).`);
}
process.exit(real.length ? 1 : 0);
