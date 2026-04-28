import { minify } from 'html-minifier-terser';
import JavaScriptObfuscator from 'javascript-obfuscator';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';

const html = readFileSync('index.html', 'utf8');

// 1. Extract the <script> block, obfuscate it, then re-inject
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
let processedHtml = html;

if (scriptMatch) {
  const rawJs = scriptMatch[1];
  const obfuscated = JavaScriptObfuscator.obfuscate(rawJs, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.4,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.2,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    selfDefending: false,
  }).getObfuscatedCode();

  processedHtml = html.replace(
    /<script>[\s\S]*?<\/script>(\s*<\/body>)/,
    `<script>${obfuscated}</script>$1`
  );
}

// 2. Minify HTML + inline CSS
const minified = await minify(processedHtml, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: false, // already obfuscated above
  useShortDoctype: true,
});

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', minified, 'utf8');

// Copy static assets
const assets = ['logo.png', 'templo.jpg', 'savio.png'];
for (const asset of assets) {
  if (existsSync(asset)) {
    copyFileSync(asset, `dist/${asset}`);
    console.log(`✓ Copiado: ${asset}`);
  }
}

const original = Buffer.byteLength(html, 'utf8');
const result   = Buffer.byteLength(minified, 'utf8');
console.log(`✓ dist/index.html generado`);
console.log(`  Original : ${(original / 1024).toFixed(1)} KB`);
console.log(`  Resultado: ${(result   / 1024).toFixed(1)} KB`);
