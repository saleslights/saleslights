// Real Chromium: service journeys, responsive layouts, no-JS and staging-only form submissions.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import path from 'node:path';
const base = (process.argv[2] || 'http://127.0.0.1:3915').replace(/\/$/, '');
const out = process.argv[3] || path.join(tmpdir(), 'saleslights-service-qa');
const submitForms = process.env.TEST_FORMS === 'true';
const health = await fetch(base + '/api/health/').then(r => r.json());
assert.equal(health.env, 'staging', 'Use a staging build; never submit synthetic production inquiries');
await mkdir(out, {recursive:true});
const profile = await mkdtemp(path.join(tmpdir(), 'sl-services-'));
const chrome = spawn(process.env.CHROME || path.join(homedir(), '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome'), ['--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank']);
let ws; const results=[]; const errors=[]; let s;
try {
 const url=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Chrome startup')),15000);chrome.stderr.on('data',d=>{const m=String(d).match(/ws:\/\/\S+/);if(m){clearTimeout(timer);resolve(m[0]);}});chrome.on('error',reject);});
 ws=new WebSocket(url);await new Promise(r=>ws.addEventListener('open',r,{once:true}));let id=0;const pending=new Map();
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}else if(m.method==='Runtime.exceptionThrown'||(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error'))errors.push(m);});
 const send=(method,params={},sessionId=s)=>new Promise((resolve,reject)=>{const i=++id,t=setTimeout(()=>{pending.delete(i);reject(Error('CDP timeout '+method));},15000);pending.set(i,m=>{clearTimeout(t);m.error?reject(Error(JSON.stringify(m.error))):resolve(m.result);});ws.send(JSON.stringify({id:i,method,params,sessionId}));});
 const {targetId}=await send('Target.createTarget',{url:'about:blank'},undefined);s=(await send('Target.attachToTarget',{targetId,flatten:true},undefined)).sessionId;
 await send('Page.enable');await send('Runtime.enable');
 const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert(!r.exceptionDetails,JSON.stringify(r.exceptionDetails));return r.result.value;};
 const pause=ms=>new Promise(r=>setTimeout(r,ms));
 const until=async expression=>{for(let i=0;i<100;i++){if(await ev(expression))return;await pause(100);}assert.fail('Timed out: '+expression);};
 const go=async route=>{await send('Page.navigate',{url:base+route});await until(`document.readyState==='complete' && !!document.querySelector('h1')`);await ev('document.fonts.ready.then(()=>true)');await pause(500);};
 const click=async selector=>{const p=await ev(`(()=>{const a=document.querySelector(${JSON.stringify(selector)});if(!a)throw Error('Missing click target');a.scrollIntoView({block:'center',behavior:'instant'});const r=a.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2};})()`);await send('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',clickCount:1});};
 const enter=async()=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',unmodifiedText:'\r',windowsVirtualKeyCode:13});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});};
 const shot=async(name,full=false)=>{const params={format:'png',captureBeyondViewport:full};if(full){const m=await send('Page.getLayoutMetrics');params.clip={x:0,y:0,width:m.cssContentSize.width,height:m.cssContentSize.height,scale:1};}const r=await send('Page.captureScreenshot',params);await writeFile(path.join(out,name+'.png'),Buffer.from(r.data,'base64'));};
 const check=(name,pass,observed)=>{results.push({name,pass:!!pass,observed});assert(pass,name+' '+JSON.stringify(observed));};
 const routes=['/','/training/','/ai-training/','/software-development/'];
 let matrices=0;
 for(const width of [390,820,1280,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  for(const route of routes){
   await go(route);
   // Load lazy images before checking them; return to top without changing viewport dimensions.
   await ev('window.scrollTo(0,document.body.scrollHeight)');await pause(500);await ev('window.scrollTo(0,0)');await pause(100);
   const m=await ev(`(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const nav=document.querySelector('.nav-desktop');const brand=document.querySelector('.brand').getBoundingClientRect();const nr=nav.getBoundingClientRect();return{sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h1:document.querySelectorAll('h1').length,duplicates:ids.filter((v,i)=>ids.indexOf(v)!==i),badImages:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src),navOverlap:getComputedStyle(nav).display!=='none'&&nr.left<brand.right+8,smallLabels:[...document.querySelectorAll('.sl-training-map li')].filter(e=>parseFloat(getComputedStyle(e).fontSize)<14).length};})()`);
   check(`layout ${width} ${route}`,m.sw===m.cw&&m.h1===1&&!m.duplicates.length&&!m.badImages.length&&!m.navOverlap,m);matrices++;
   const slug=route.replaceAll('/','_');await shot(`${width}${slug}-hero`);await shot(`${width}${slug}-full`,true);
  }
 }
 // With JavaScript disabled, content, FAQs and diagram labels remain real HTML.
 for(const width of [390,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
  await send('Emulation.setScriptExecutionDisabled',{value:true});
  for(const route of routes.slice(2)){
   await go(route);const m=await ev(`({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h1:document.querySelectorAll('h1').length,faq:document.querySelectorAll('main details').length,text:document.querySelector('main').textContent.length})`);
   check(`no-js ${width} ${route}`,m.sw===m.cw&&m.h1===1&&m.faq>=7&&m.text>2500,m);matrices++;await shot(`nojs-${width}${route.replaceAll('/','_')}`,true);
  }
  await send('Emulation.setScriptExecutionDisabled',{value:false});
 }
 check('complete responsive/no-JS matrix',matrices===20,matrices);
 // Real keyboard/mobile navigation, Escape focus return, and topic-preserving contact CTA.
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 for(const topic of ['ai-training','software-development']){
  await go('/');await ev("document.querySelector('details.menu summary').focus()");await enter();await until("document.querySelector('details.menu').open");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  check('Escape returns menu focus '+topic,await ev("!document.querySelector('details.menu').open && document.activeElement===document.querySelector('details.menu summary')"),true);
  await enter();await until("document.querySelector('details.menu').open");await click(`details.menu a[href="/${topic}/"]`);await until(`location.pathname==='/${topic}/'`);await pause(500);
  check('mobile navigation closes '+topic,await ev("!document.querySelector('details.menu').open"),true);
  const summary=await ev("(()=>{const e=document.querySelector('main details summary');e.focus();return e.textContent;})()");await enter();
  check('native details keyboard opens '+topic,await ev("document.activeElement.parentElement.open"),summary);
  await click(`main a[href="/contact/?topic=${topic}"]`);await until("!!document.querySelector('.contact-form')");
  check('service CTA preselects '+topic,await ev("document.querySelector('[name=topic]').value")==topic,topic);
  check('blank form invalid '+topic,await ev("!document.querySelector('.contact-form').checkValidity()"),true);
  if(submitForms){
   for(const [name,value] of Object.entries({name:'Staging service QA',email:'qa@example.com',company:'Synthetic test only',message:'Test of service inquiry routing. Do not contact.'})){await click(`[name="${name}"]`);await send('Input.insertText',{text:value});}
   const populated=await ev("({valid:document.querySelector('.contact-form').checkValidity(),values:Object.fromEntries(new FormData(document.querySelector('.contact-form')))})");check('populated form valid '+topic,populated.valid,populated);
   await click('.contact-form button[type=submit]');try { await until("document.querySelector('.form-status').textContent.includes('validated, not sent')"); } catch(error) {await shot(`contact-${topic}-failure`);console.error(await ev("document.querySelector('.contact-form').outerHTML"));throw error;}
   check('browser dry-run accepted '+topic,true,await ev("document.querySelector('.form-status').textContent"));await shot(`contact-${topic}-dry-run`);
  }
 }
 await go('/book/');check('booking uses the Mercury invoice form',await ev("(()=>{const f=document.querySelector('form');return !!f && f.getAttribute('action')==='/api/book';})()"),true);
 check('no Stripe checkout link remains',await ev("!document.documentElement.outerHTML.includes('buy.stripe.com')"),true);
 check('no runtime/console errors',errors.length===0,errors);
} finally {
 await writeFile(path.join(out,'browser-report.json'),JSON.stringify({base,health,submitForms,results,errors},null,2));
 ws?.close();chrome.kill();await new Promise(r=>chrome.exitCode!==null?r():chrome.once('exit',r));await rm(profile,{recursive:true,force:true,maxRetries:10,retryDelay:100});
}
console.log(`PASS ${results.length} browser assertions. ${out}`);
