#!/usr/bin/env node
/*
  polish-lint.mjs - counts the signals of heavy reading in a deliverable and in its generator. Node 22, no package.

    node scripts/polish-lint.mjs <file | folder> [more paths] [--lexicon <file>] [--json]
    node scripts/polish-lint.mjs --compare <before> <after> [--lexicon <file>]

  It reads human text only: text between tags in .html, string literals that contain a space in code
  (.js .mjs .ts .py .html), and the lines outside code fences in .md and .txt.
  It skips node_modules, .git, data folders and files larger than 3 MB.

  Signals (WARN = fix it, INFO = look at it):
    pct-decimal     WARN  a percentage or a point change with decimals ("47,6 %", "+3,2 pt")
    code-decimal    WARN  code that prints decimals (toFixed(1), ":.2f", round(x, 1), maximumFractionDigits)
    placeholder     WARN  "undefined", "NaN", "[object Object]", "{{ }}" in text
    raw-identifier  WARN  snake_case or camelCase word in text
    many-numbers    INFO  a sentence with more than 3 numbers
    long-sentence   INFO  a sentence with more than 25 words
    symbol          INFO  a symbol or short form: >= <= Δ vs nb
    acronym         INFO  an acronym of 2 to 5 capitals that the text never defines
    lexicon         WARN  a term from the project lexicon (one "term | replacement" or "term;replacement" per line)
    scattered-fmt   INFO  the same kind of number formatting appears in 3 or more places (use one formatter)

  --compare prints the count of each signal for two paths side by side, to measure a rewrite.
  The script counts. It never blocks: the exit code is 0, or 2 on a usage error.
*/
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const die = (m) => { console.error('polish-lint: ' + m); process.exit(2); };
let asJson = false, lexFile = '', compare = false;
const paths = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--json') asJson = true;
  else if (argv[i] === '--compare') compare = true;
  else if (argv[i] === '--lexicon') lexFile = argv[++i] || die('--lexicon needs a file');
  else paths.push(argv[i]);
}
if (!paths.length || (compare && paths.length !== 2)) die('usage: polish-lint.mjs <path...> [--lexicon f] [--json] | --compare <before> <after>');

const LEX = [];
if (lexFile) {
  for (const line of fs.readFileSync(lexFile, 'utf8').split('\n')) {
    const term = line.split(/\s*[|;]\s*/)[0].trim().replace(/^[-*]\s*/, '');
    if (term && !term.startsWith('#') && !/^-+$/.test(term)) LEX.push(term);
  }
}

const SKIP = new Set(['node_modules', '.git', 'data', 'dist']);
const EXT = new Set(['.html', '.js', '.mjs', '.ts', '.py', '.md', '.txt']);
function listFiles(p, out = []) {
  const st = fs.statSync(p, { throwIfNoEntry: false });
  if (!st) die('cannot read ' + p);
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p).sort()) if (!SKIP.has(f)) listFiles(path.join(p, f), out);
  } else if (EXT.has(path.extname(p)) && st.size <= 3_000_000) out.push(p);
  return out;
}

// Human text pieces of a file: [{text, line}]
function pieces(file, src) {
  const ext = path.extname(file);
  const out = [];
  const lineOf = (idx) => src.slice(0, idx).split('\n').length;
  if (ext === '.md' || ext === '.txt') {
    let fence = false;
    src.split('\n').forEach((l, i) => {
      if (/^\s*```/.test(l)) { fence = !fence; return; }
      if (!fence && l.trim()) out.push({ text: l.replace(/`[^`]*`/g, ' '), line: i + 1 });
    });
    return out;
  }
  if (ext === '.html') {
    const body = src.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, (m) => ' '.repeat(m.length).replace(/ /g, (c, i) => (m[i] === '\n' ? '\n' : ' ')));
    const re = />([^<>]{3,})</g; let m;
    while ((m = re.exec(body))) if (/[\p{L}]/u.test(m[1]) && m[1].trim()) out.push({ text: m[1], line: lineOf(m.index) });
    for (const s of src.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)) literals(s[1], lineOf(s.index), out);
    return out;
  }
  literals(src, 1, out);
  return out;
}
function literals(code, baseLine, out) {
  const re = /(["'`])((?:\\.|(?!\1)[^\\\n])*?)\1/g; let m;
  while ((m = re.exec(code))) {
    const t = m[2].replace(/<[^>]*>/g, ' ').trim();
    if (/\p{L}{3,}\s+\p{L}{2,}/u.test(t) && !/[{};]\s*$/.test(t) && !/^[\w-]+\s*:\s*[^\s]+;/.test(t)) out.push({ text: t.replace(/\$\{[^}]*\}/g, ' 0 '), line: baseLine + code.slice(0, m.index).split('\n').length - 1 });
  }
}

const findings = [];
const add = (file, line, id, level, text, extra) => findings.push({ file, line, id, level, text: text.trim().slice(0, 110), extra });

const FMT = [
  [/\.toFixed\(\s*[1-9]/g, 'toFixed'],
  [/:\s*\.[1-9]f\}|\{:\.[1-9]f\}|%\.[1-9]f/g, 'format-string'],
  [/\bround\([^()]*,\s*[1-9]\)/g, 'round'],
  [/(?:max|min)imumFractionDigits\s*:\s*[1-9]/g, 'intl'],
];
const PCT = /(?:^|[^\d])\d+[.,]\d+(?:\s| | )?(?:%|pt\b|points?\b)/g;
const PLACE = /\bundefined\b|\bNaN\b|\[object Object\]|\{\{[^}]*\}\}/;
const SNAKE = /\b[a-z]{2,}(?:_[a-z0-9]{2,})+\b/;
const CAMEL = /\b[a-z]{2,}[A-Z][a-z]+[A-Za-z]*\b/;
const SYMB = /[≥≤Δ]|\bvs\.?\s|\bnb\b/;
const ACRO = /\b[A-Z]{2,5}\b/g;
const ACRO_OK = new Set(['HTML', 'CSS', 'JSON', 'PDF', 'URL', 'API', 'CSV', 'SVG', 'OK', 'TTC', 'HT', 'TVA', 'FR', 'EN', 'UTC', 'ETP']);

function scan(file) {
  const src = fs.readFileSync(file, 'utf8');
  const code = ['.js', '.mjs', '.ts', '.py', '.html'].includes(path.extname(file));
  const fmtSites = [];
  if (code) {
    for (const [re, kind] of FMT) for (const m of src.matchAll(re)) fmtSites.push({ kind, line: src.slice(0, m.index).split('\n').length });
    for (const s of fmtSites) add(file, s.line, 'code-decimal', 'WARN', s.kind, s.kind);
  }
  const defined = new Set();
  const acros = new Map();
  for (const { text, line } of pieces(file, src)) {
    for (const m of text.matchAll(PCT)) add(file, line, 'pct-decimal', 'WARN', m[0], '');
    if (PLACE.test(text)) add(file, line, 'placeholder', 'WARN', text, '');
    const s1 = text.match(SNAKE) || text.match(CAMEL);
    if (s1 && !/^https?:|\.[a-z]{2,4}\b/.test(s1[0])) add(file, line, 'raw-identifier', 'WARN', text, s1[0]);
    if (SYMB.test(text)) add(file, line, 'symbol', 'INFO', text, '');
    for (const t of LEX) if (text.toLowerCase().includes(t.toLowerCase())) add(file, line, 'lexicon', 'WARN', text, t);
    for (const sent of text.split(/(?<=[.!?])\s+/)) {
      const nums = (sent.match(/\d+(?:[.,   ]\d+)*/g) || []).length;
      if (nums > 3) add(file, line, 'many-numbers', 'INFO', sent, `${nums} numbers`);
      const words = sent.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length;
      if (words > 25) add(file, line, 'long-sentence', 'INFO', sent, `${words} words`);
    }
    for (const m of text.matchAll(/\b([A-Z]{2,5})\b\s*(?:\(|:|=|—|-)/g)) defined.add(m[1]);
    for (const m of text.matchAll(/\(([A-Z]{2,5})\)/g)) defined.add(m[1]);
    for (const m of text.matchAll(ACRO)) if (!ACRO_OK.has(m[0])) acros.set(m[0], acros.get(m[0]) || line);
  }
  for (const [a, line] of acros) if (!defined.has(a)) add(file, line, 'acronym', 'INFO', a, '');
  return fmtSites;
}

function run(root) {
  findings.length = 0;
  const sites = [];
  for (const f of listFiles(root)) for (const s of scan(f)) sites.push({ ...s, f });
  const byKind = {};
  for (const s of sites) (byKind[s.kind] ||= []).push(s);
  for (const [kind, list] of Object.entries(byKind)) {
    if (list.length >= 3) add(list[0].f, list[0].line, 'scattered-fmt', 'INFO', `${kind} appears ${list.length} times`, `${new Set(list.map((x) => x.f)).size} files`);
  }
  return findings.map((f) => ({ ...f }));
}
const count = (list) => list.reduce((a, f) => ((a[f.id] = (a[f.id] || 0) + 1), a), {});

if (compare) {
  const a = count(run(paths[0])), b = count(run(paths[1]));
  const ids = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort();
  console.log('signal'.padEnd(18) + 'before'.padStart(8) + 'after'.padStart(8));
  for (const id of ids) console.log(id.padEnd(18) + String(a[id] || 0).padStart(8) + String(b[id] || 0).padStart(8));
  process.exit(0);
}

const all = [];
for (const p of paths) all.push(...run(p));
if (asJson) console.log(JSON.stringify({ findings: all, counts: count(all) }, null, 2));
else {
  for (const f of all) console.log(`${f.level} ${f.id} ${path.relative(process.cwd(), f.file)}:${f.line}${f.extra ? ` (${f.extra})` : ''} ${f.text}`);
  const c = count(all);
  console.log('\n' + (Object.keys(c).length ? Object.entries(c).map(([k, v]) => `${k} ${v}`).join(', ') : 'no signal'));
}
process.exit(0);
