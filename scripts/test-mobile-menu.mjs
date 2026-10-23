// Real-browser regression: native menu opens, navigation closes the shared header's menu.
// Usage: node scripts/test-mobile-menu.mjs [BASE_URL]; CHROME may override the installed binary.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:3910';
const health = await fetch(base + '/api/health/').then(r => r.json());
assert.equal(health.env, 'staging', 'Use an isolated staging-mode build');
const profile = await mkdtemp(path.join(tmpdir(), 'saleslights-menu-'));
const chrome = spawn(process.env.CHROME || path.join(homedir(), '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome'), ['--headless=new', '--no-sandbox', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank']);
let ws;
try {
  const url = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Browser startup timeout')), 12000);
    chrome.stderr.on('data', d => { const m = String(d).match(/ws:\/\/[^\s]+/); if (m) { clearTimeout(timer); resolve(m[0]); } });
    chrome.on('error', reject);
  });
  ws = new WebSocket(url);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const i = ++id; const timer = setTimeout(() => { pending.delete(i); reject(Error(`CDP timeout: ${method}`)); }, 10000);
    pending.set(i, m => { clearTimeout(timer); if (m.error) reject(Error(JSON.stringify(m.error))); else resolve(m.result); });
    ws.send(JSON.stringify({ id: i, method, params, sessionId }));
  });
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId: s } = await send('Target.attachToTarget', { targetId, flatten: true });
  const ev = async expression => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, s);
    assert(!r.exceptionDetails, JSON.stringify(r.exceptionDetails)); return r.result.value;
  };
  const until = async expression => {
    for (let i = 0; i < 60; i++) { if (await ev(expression)) return; await new Promise(r => setTimeout(r, 100)); }
    assert.fail(`Timed out: ${expression}`);
  };
  await send('Page.enable', {}, s);
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, s);
  await send('Page.navigate', { url: base + '/' }, s);
  await until(`document.readyState === 'complete' && !!document.querySelector('details.menu summary')`);
  await new Promise(r => setTimeout(r, 800));
  await ev(`document.querySelector('details.menu summary').focus()`);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', unmodifiedText: '\r', windowsVirtualKeyCode: 13 }, s);
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, s);
  await until(`document.querySelector('details.menu').open`);
  console.log('PASS native menu opens with Enter');
  const point = await ev(`(() => { const a=document.querySelector('details.menu a[href="/training/"]'); const r=a.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 }, s);
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 }, s);
  await until(`location.pathname === '/training/' && document.querySelector('h1')?.textContent === 'Sales and cold-call training'`);
  console.log('PASS visible mobile link reaches training');
  assert.equal(await ev(`document.querySelector('details.menu').open`), false, 'Mobile menu must close after client navigation');
  console.log('PASS menu closes after navigation');
} finally {
  ws?.close();
  chrome.kill();
  await new Promise(r => chrome.exitCode !== null ? r() : chrome.once('exit', r));
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
