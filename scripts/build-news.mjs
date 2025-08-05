    import fs from 'fs';
    import path from 'path';

const contentDir = 'content/news';
const outFile = 'assets/news.json';

function parseFrontMatter(md) {
const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
if (!m) return { data: {}, body: md };
const body = md.slice(m[0].length);
const data = {};
m[1].split('\n').forEach(line => {
const i = line.indexOf(':');
if (i > -1) {
const k = line.slice(0, i).trim();
let v = line.slice(i + 1).trim();
if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
data[k] = v;
}
});
return { data, body };
}

const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter(f => f.endsWith('.md')) : [];
const items = files.map(f => {
const slug = f.replace(/.md$/, '');
const md = fs.readFileSync(path.join(contentDir, f), 'utf8');
const { data, body } = parseFrontMatter(md);
return {
slug,
title: data.title || slug,
date: data.date || null,
image: data.image || null,
description: data.description || '',
category: data.category || '',
body
};
}).sort((a,b)=> new Date(b.date||0) - new Date(a.date||0));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(items, null, 2));
console.log(Generated ${outFile} with ${items.length} entries);
