// Standalone SSR gates. No build, server, installation or browser required.
// Run with Node 22+: node scripts/test-service-art.mjs
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const swc = require('next/dist/build/swc');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const modules = new Map();
await swc.loadBindings();

// Transform only our source in memory using the already-installed Next compiler.
// Ignore styles for SSR; the private browser preview uses the actual CSS bytes.
export function loadSource(relativePath) {
  const filename = path.resolve(root, relativePath);
  if (modules.has(filename)) return modules.get(filename).exports;
  assert(existsSync(filename), `Missing component: ${relativePath}`);
  const module = { exports: {} };
  modules.set(filename, module);
  const source = readFileSync(filename, 'utf8');
  const { code } = swc.transformSync(source, {
    filename,
    jsc: { parser: { syntax: 'ecmascript', jsx: true }, target: 'es2020', transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  });
  const sourceRequire = (specifier) => {
    if (specifier.endsWith('.css')) {
      assert(existsSync(path.resolve(path.dirname(filename), specifier)), `Missing stylesheet: ${specifier}`);
      return {};
    }
    if (specifier.startsWith('.')) {
      const candidate = path.resolve(path.dirname(filename), specifier);
      const resolved = path.extname(candidate) ? candidate : `${candidate}.js`;
      return loadSource(path.relative(root, resolved));
    }
    return require(specifier);
  };
  new Script(`(function(require, module, exports) { ${code}\n})`, { filename }).runInThisContext()(sourceRequire, module, module.exports);
  return module.exports;
}

function verifySculpture(relativePath) {
  const Component = loadSource(relativePath).default;
  const one = renderToStaticMarkup(React.createElement(Component, { className: 'caller-art' }));
  assert.match(one, /<svg\b[^>]*viewBox="0 0 \d+ \d+"/, 'SVG has a responsive viewBox');
  assert.match(one, /<svg\b[^>]*width="\d+"[^>]*height="\d+"/, 'Intrinsic dimensions prevent layout shift');
  assert.match(one, /<svg\b[^>]*aria-hidden="true"/, 'Decorative sculpture does not duplicate page narrative');
  assert.match(one, /<svg\b[^>]*focusable="false"/, 'Decorative sculpture is not a focus stop');
  assert.match(one, /class="[^"]*caller-art/, 'Caller className is retained');
  const two = renderToStaticMarkup(React.createElement(React.Fragment, null, React.createElement(Component), React.createElement(Component)));
  const ids = [...two.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert(ids.length > 0, 'Material artwork uses scoped paint definitions');
  assert.equal(new Set(ids).size, ids.length, 'Two instances have no duplicate IDs');
  for (const [, id] of two.matchAll(/url\(#([^)]+)\)/g)) assert(ids.includes(id), `Missing paint definition ${id}`);
  assert(!/<(?:script|image|foreignObject)\b/.test(two), 'Sculpture is static, original SVG');
  assert(one.length < 20000, 'Keep each sculpture below 20 KB of rendered SVG');
  console.log(`PASS ${path.basename(relativePath)}: SSR, viewBox, decorative semantics, className, two-instance IDs, paint references, static SVG (${Buffer.byteLength(one)} bytes)`);
}

function verifyMap() {
  const Map = loadSource('src/components/AITrainingMap.js').default;
  const { DOMAINS } = loadSource('src/content/site.js');
  assert.equal(DOMAINS.length, 10, 'Use the canonical ten domains');
  const markup = renderToStaticMarkup(React.createElement(Map, { className: 'caller-map' }));
  assert.match(markup, /<figure\b[^>]*aria-labelledby="[^"]+"/, 'Infographic is a labelled semantic figure');
  assert.match(markup, /<figcaption\b/, 'Infographic has an HTML caption');
  assert.match(markup, /class="[^"]*caller-map/, 'Caller className is retained');
  const list = markup.match(/<ol\b[^>]*class="sl-training-map-domains"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
  assert(list, 'Domains are a real HTML list, not SVG text or a flattened image');
  assert.equal([...list.matchAll(/<li\b/g)].length, 10, 'Exactly ten application domains');
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
  for (const domain of DOMAINS) assert(list.includes(`>${escape(domain.name)}</span>`), `Readable canonical HTML label: ${domain.name}`);
  assert(!/<(?:ol|li)\b[^>]*aria-hidden="true"/.test(markup), 'Canonical lists remain accessible');
  assert(!/<span\b[^>]*class="sl-training-map-name"[^>]*aria-hidden/.test(list), 'Domain labels remain accessible');
  assert(!list.includes('Security'), 'Security is a foundation, not an eleventh domain');
  for (const step of ['Learn', 'Apply', 'Review']) assert(markup.includes(`>${step}</span>`), `Shared method includes ${step}`);
  assert.match(markup, /Security \+ human review/, 'Cross-cutting foundation is explicit');
  assert(!/<(?:script|foreignObject)\b/.test(markup), 'No-JavaScript HTML');
  const all = renderToStaticMarkup(React.createElement(React.Fragment, null, ...[0, 1].flatMap(i => [
    React.createElement(Map, { key: `map-${i}` }),
    React.createElement(loadSource('src/components/art/AITrainingStudy.js').default, { key: `training-${i}` }),
    React.createElement(loadSource('src/components/art/DevelopmentStudy.js').default, { key: `development-${i}` }),
  ])));
  const ids = [...all.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'All six component instances have unique IDs');
  for (const [, id] of all.matchAll(/url\(#([^)]+)\)/g)) assert(ids.includes(id), `Missing paint definition ${id}`);
  for (const [, id] of all.matchAll(/aria-labelledby="([^"]+)"/g)) assert(ids.includes(id), 'Accessible names resolve to real elements');
  console.log(`PASS AITrainingMap.js: canonical ten HTML labels, semantic figure/list, shared method, separate foundation, no-JS, six-instance IDs (${ids.length} unique IDs)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  verifySculpture('src/components/art/AITrainingStudy.js');
  verifySculpture('src/components/art/DevelopmentStudy.js');
  verifyMap();
}
