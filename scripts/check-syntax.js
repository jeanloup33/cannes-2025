import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const file = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');

// Find all inline <script> blocks (no src attribute)
const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let block = 0;
let hadError = false;

console.log('Scanning inline <script> blocks for syntax errors...');

while ((match = scriptRegex.exec(html)) !== null) {
  block++;
  const code = match[1];
  const before = html.slice(0, match.index);
  const startLine = (before.match(/\n/g) || []).length + 1;

  try {
    new vm.Script(code, { filename: `index.html:<script>#${block} @ line ${startLine}` });
    console.log(`✅ Block #${block} OK (starts at line ${startLine})`);
  } catch (err) {
    hadError = true;
    console.error(`\n❌ Syntax error in block #${block} (starts at line ${startLine})`);
    console.error(err.message);
    if (typeof err.stack === 'string') {
      console.error(err.stack.split('\n').slice(0, 3).join('\n'));
    }
    const lines = code.split('\n');
    const errLine = err.lineNumber || 1;
    const from = Math.max(1, errLine - 3);
    const to = Math.min(lines.length, errLine + 3);
    console.error(`\nCode snippet (lines ${from + startLine - 1}-${to + startLine - 1} in index.html):`);
    for (let i = from; i <= to; i++) {
      const mark = i === errLine ? '>>' : '  ';
      console.error(`${mark} ${i + startLine - 1}: ${lines[i - 1]}`);
    }
    process.exitCode = 1;
    break; // stop at first error
  }
}

if (!hadError) {
  console.log('\n🎉 No syntax errors detected in inline scripts of index.html');
}