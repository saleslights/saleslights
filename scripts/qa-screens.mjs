// Full-page screenshots + overflow/H1/console checks over raw CDP.
// Usage: node scripts/qa-screens.mjs http://127.0.0.1:3910 OUT_DIR
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir, homedir } from 'node:os';
import path from 'node:path';

const BASE = process.argv[2] || 'http://127.0.0.1:3910';
const OUT = process.argv[3] || 'qa';
const CHROME = process.env.CHROME || path.join(homedir(), '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome');
const ROUTES = ['/', '/gtm-engine/', '/revenue-infrastructure/', '/training/', '/book/', '/about/', '/lab/', '/lab/what-is-revenue-infrastructure/', '/contact/'];
const VIEWS = [['mobile', 390, 844, 2, true], ['desktop', 1440, 900, 1, false]];
mkdirSync(OUT, { recursive: true });

const prof = mkdtempSync(path.join(tmpdir(), 'sl-cdp-'));
const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0', `--user-data-dir=${prof}`, 'about:blank']);
const wsUrl = await new Promise((res, rej) => {
  chrome.stderr.on('data', (d) => { const m = String(d).match(/ws:\/\/[^\s]+/); if (m) res(m[0]); });
  setTimeout(() => rej(new Error('chrome did not start')), 15000);
});
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } else events.push(m); });
const send = (method, params = {}, sessionId) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId: s } } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, s); await send('Runtime.enable', {}, s);
const report = [];
for (const [name, w, h, dpr, mobile] of VIEWS) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile }, s);
  for (const route of ROUTES) {
    events.length = 0;
    await send('Page.navigate', { url: BASE + route }, s);
    await new Promise((r) => setTimeout(r, 1800));
    const evalr = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => { const imgs=[...document.images]; return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight, h1: document.querySelectorAll('h1').length, title: document.title, brokenImgs: imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src), noAlt: imgs.filter(i=>!i.alt).length, robots: document.querySelector('meta[name=robots]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href }; })()` }, s);
    const v = evalr.result.result.value;
    const errors = events.filter((e) => e.method === 'Runtime.exceptionThrown' || (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error')).map((e) => JSON.stringify(e.params).slice(0, 300));
    const fullH = Math.min(v.h, 9000);
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: fullH, deviceScaleFactor: dpr, mobile }, s);
    await new Promise((r) => setTimeout(r, 400));
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, s);
    const file = `${name}${route.replace(/\//g, '_') || '_'}.png`;
    writeFileSync(path.join(OUT, file), Buffer.from(shot.result.data, 'base64'));
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dpr, mobile }, s);
    report.push({ view: name, route, overflow: v.sw > v.cw, ...v, errors, file });
  }
}
writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
for (const r of report) console.log(r.view.padEnd(8), r.route.padEnd(40), 'overflow', r.overflow, 'h1', r.h1, 'broken', r.brokenImgs.length, 'noAlt', r.noAlt, 'errors', r.errors.length, r.robots);
ws.close(); chrome.kill();
