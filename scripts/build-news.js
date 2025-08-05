// scripts/build-news.js
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const contentDir = 'content/news';
const outFile = 'assets/news.json';

// Parser YAML front matter minimal, tolérant LF/CRLF
function parseFrontMatter(md) {
  // ---\n ... \n---\n  (tolère \r\n)
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: md };

  // Corps: retire une éventuelle première ligne vide après le front matter
  const body = md.slice(m[0].length).replace(/^\r?\n/, '');

  const data = {};
  // Découpe lignes (tolère \r\n)
  m[1].split(/\r?\n/).forEach(line => {
    const i = line.indexOf(':');
    if (i > -1) {
      const k = line.slice(0, i).trim();
      let v = line.slice(i + 1).trim();
      // Retire guillemets simples/doubles encadrants
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      data[k] = v;
    }
  });
  return { data, body };
}

function safeDate(d) {
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : d;
}

// Prépare le dossier de sortie
fs.mkdirSync(path.dirname(outFile), { recursive: true });

// Liste des fichiers .md
const files = fs.existsSync(contentDir)
  ? fs.readdirSync(contentDir).filter(f => /\.md$/i.test(f))
  : [];

const items = files
  .map(f => {
    const filePath = path.join(contentDir, f);
    const md = fs.readFileSync(filePath, 'utf8');

    // 1) Front matter + body
    const { data, body } = parseFrontMatter(md);

    // 2) Slug (front matter prioritaire, sinon nom de fichier sans .md)
    const slug =
      (data.slug && String(data.slug).trim()) ||
      f.replace(/\.md$/i, '');

    // 3) Champs normalisés
    const title = data.title || slug;
    const date = data.date ? safeDate(data.date) : null;
    const image = data.image || null;
    const description = data.description || '';
    const category = data.category || '';

    // 4) HTML du body (Markdown -> HTML)
    const body_html = marked.parse(body || '');

    return { slug, title, date, image, description, category, body, body_html };
  })
  // 5) Tri par date décroissante (les null en bas)
  .sort((a, b) => {
    const ta = a.date ? Date.parse(a.date) : 0;
    const tb = b.date ? Date.parse(b.date) : 0;
    return tb - ta;
  });

// Écriture du JSON
fs.writeFileSync(outFile, JSON.stringify(items, null, 2));
console.log(`Generated ${outFile} with ${items.length} entries`);
