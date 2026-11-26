import fs from 'node:fs';
import path from 'node:path';

const ORDER = [
  'src/data/knowledge.js',
  'src/data/quiz_extended.js',
  'src/data/quiz.js',
  'src/engines/pm.js',
  'src/engines/svg.js',
  'src/app.js'
];

function stripModuleSyntax(code) {
  return code
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];\r?\n?/gm, '')
    .replace(/^export\s+(const|let|var|function|async function)\s+/gm, '$1 ');
}

const css = fs.readFileSync('src/styles.css', 'utf8');
const bundledJs = ORDER.map(f => `/* === ${f} === */\n` + stripModuleSyntax(fs.readFileSync(f, 'utf8'))).join('\n\n');
const template = fs.readFileSync('src/index.html', 'utf8');

const output = template
  .replace('/*__STYLES__*/', () => css)
  .replace('/*__SCRIPT__*/', () => `(function() {\n'use strict';\n${bundledJs}\n})();`);

fs.mkdirSync('public', { recursive: true });
fs.writeFileSync(path.join('public', 'index.html'), output, 'utf8');

// Bump sw.js cache version deterministically from build timestamp
const swPath = path.join('public', 'sw.js');
if (fs.existsSync(swPath)) {
  const ver = 'pm-mastery-v2-' + Date.now().toString(36);
  const sw = fs.readFileSync(swPath, 'utf8').replace(/const CACHE_NAME = '[^']+';/, `const CACHE_NAME = '${ver}';`);
  fs.writeFileSync(swPath, sw, 'utf8');
}

console.log(`Built public/index.html (${(output.length / 1024).toFixed(1)} KB)`);
