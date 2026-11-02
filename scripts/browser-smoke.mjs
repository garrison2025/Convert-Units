/**
 * Dependency-free local Chromium smoke tests.
 * Browser test JavaScript is injected by a localhost-only test server and is
 * never written to the Cloudflare static production output.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const chrome=process.env.CHROME_BIN||
  ['google-chrome','chromium','chromium-browser'].find(cmd=>spawnSync('which',[cmd]).status===0);
if(!chrome)throw new Error('Chrome/Chromium required for browser checks; no silent skip');

async function smokeScenario(SCENARIO){
  function ok(test,message){if(!test)throw new Error(message);}
  const q=s=>document.querySelector(s);
  switch(SCENARIO){
   case 'homepage':{
     const input=q('[data-converter] [data-value]');
     input.value='150';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-converter] [data-output]').textContent.includes('68.038856'),'150 lb should equal 68.038856 kg');
     const finder=q('[data-home-find]');
     finder.value='pounds';finder.dispatchEvent(new Event('input',{bubbles:true}));
     ok(!q('[data-suggestions]').hidden,'search suggestions should open');
     ok([...document.querySelectorAll('[data-quick-item]')].some(el=>!el.hidden),'suggestions should include matching tools');
     break;
   }
   case 'batch':{
     ok(q('[data-batch-from]').value==='lbs','batch default lbs');
     ok(q('[data-batch-to]').value==='kg','batch default kg');
     q('[data-batch-column]').value='2';
     q('[data-batch-input]').value='name,value\nshirt,149\nbag,not-a-number\ncap,126';
     q('[data-process]').click();
     const output=q('[data-batch-result]').value;
     ok(output.includes('Line 2: 149 lb'),'correct selected column result');
     ok(output.includes('Line 3:')&&output.includes('Error:'),'bad row preserved with line number');
     ok(output.includes('Line 4: 126 lb'),'good data after invalid row still converts');
     ok(q('[data-batch-status]').textContent.includes('Converted 2 of 3'),'accurate batch summary');
     ok(q('[data-batch-status]').textContent.includes('Preserved 2 input columns'),'output must keep the original imported columns');
     ok(q('[data-batch-status]').textContent.includes('Original column headings preserved'),'CSV header must be retained');
     q('[data-batch-column]').value='1';
     q('[data-batch-column]').dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-batch-result]').value==='','stale results must be cleared');
     break;
   }
   case 'universal':{
     const dimension=q('[data-dimension]');
     dimension.value='temperature';dimension.dispatchEvent(new Event('change',{bubbles:true}));
     const input=q('[data-value]');
     input.value='37.9';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('100.22'),'37.9 C -> 100.22 F');
     q('[data-reset]').click();
     ok(dimension.value==='mass'&&q('[data-from]').value==='lbs'&&q('[data-to]').value==='kg',
       'reset restores original dimension');
     const menu=q('[data-menu]');menu.click();
     ok(q('[data-nav]').classList.contains('open'),'menu opens');
     document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
     ok(!q('[data-nav]').classList.contains('open'),'Escape closes menu');
     break;
   }
   case 'number':{
     ok(q('[data-copy-answer]').dataset.answer.includes('149 lb = 67.58526313 kg'),
       'static numeric answer correct');
     ok(!!q('[data-precision-table]'),'precision comparison exists');
     ok(q('.practical-equivalence')?.textContent.includes('10 st 9 lb'),
       'mass compound notation exists');
     const button=q('[data-load-value]');
     const n=button.dataset.loadValue;
     button.click();
     ok(q('[data-value]').value===n,'reference value loads into calculator');
     ok(q('[data-output]').textContent.includes('kg'),'live calculator gives converted answer');
     break;
   }
   case 'temperature':{
     const value=q('[data-value]');
     value.value='-40';value.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('-40'),'minus 40 C equals minus 40 F');
     value.value='-273.16';value.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.trim()==='—','below absolute zero must not yield a result');
     ok(q('[data-error]').textContent.includes('absolute zero'),'invalid temperature must report a meaningful error');
     break;
   }
   case 'fuel':{
     const value=q('[data-value]');
     value.value='30';value.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('7.840486'),'30 US mpg approximately 7.840486 L/100 km');
     value.value='0';value.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.trim()==='—','zero reciprocal input is invalid');
     ok(q('[data-error]').textContent.includes('greater than zero'),'fuel error is explained');
     break;
   }
   case 'mobile':{
     for(const width of [320,375,768,900,1024]){
       const iframe=document.createElement('iframe');
       iframe.style.width=width+'px';iframe.style.height='800px';iframe.style.border='0';
       iframe.src=location.pathname;
       document.body.append(iframe);
       await new Promise((resolve,reject)=>{
         iframe.addEventListener('load',resolve,{once:true});
         iframe.addEventListener('error',()=>reject(new Error('Responsive iframe failed to load')),{once:true});
       });
       const doc=iframe.contentDocument;
       const measured=iframe.contentWindow.innerWidth;
       const visible=doc.documentElement.clientWidth;
       const extra=doc.documentElement.scrollWidth-visible;
       ok(Math.abs(measured-width)<=2,'Expected iframe viewport '+width+'px, observed '+measured);
       const offenders=extra>2?[...doc.querySelectorAll('body *')].map(el=>({el,right:el.getBoundingClientRect().right,left:el.getBoundingClientRect().left})).filter(x=>x.right>visible+2||x.left< -2).sort((a,b)=>b.right-a.right).slice(0,8).map(x=>x.el.tagName.toLowerCase()+(x.el.className&&typeof x.el.className==='string'?'.'+x.el.className.split(/\s+/).join('.'):'' )+' right='+Math.round(x.right)).join(', '):'';
       ok(extra<=2,'Horizontal overflow '+extra+'px at width '+width+' on '+location.pathname+'; offenders: '+offenders);
       iframe.remove();
     }
     break;
   }
   default:throw new Error('Unknown smoke scenario');
  }
}
const suites=[
 {name:'homepage',url:'/'},{name:'batch',url:'/batch-converter/'},
 {name:'universal',url:'/universal-converter/'},{name:'number',url:'/convert/lbs-to-kg/149/'},
 {name:'temperature',url:'/convert/celsius-to-fahrenheit/'},
 {name:'fuel',url:'/convert/mpg-us-to-l-100km/'},
 {name:'mobile',url:'/'},{name:'mobile',url:'/batch-converter/'},
 {name:'mobile',url:'/universal-converter/'},{name:'mobile',url:'/convert/lbs-to-kg/149/'},
 {name:'mobile',url:'/convert/lbs-to-kg/'},{name:'mobile',url:'/category/volume/'}
];
function injection(name){
 const code='import("/assets/app.mjs").then(async()=>{let result="PASS";try{await ('+smokeScenario.toString()+')('+JSON.stringify(name)+')}catch(e){result="FAIL: "+(e?.stack||e?.message||String(e));}const el=document.createElement("pre");el.id="browser-smoke-marker";el.textContent=result;document.body.append(el);}).catch(e=>{const el=document.createElement("pre");el.id="browser-smoke-marker";el.textContent="FAIL: module "+e;document.body.append(el);});';
 return '<script type="module">'+code+'</script>';
}
const server=http.createServer((req,res)=>{
 const request=new URL(req.url,'http://127.0.0.1');
 let relative;
 try{relative=decodeURIComponent(request.pathname).replace(/^\/+/,'');}
 catch{res.writeHead(400).end();return;}
 const target=path.resolve(dist,relative.endsWith('/')||!relative?path.join(relative,'index.html'):relative);
 if(!target.startsWith(dist+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){
  res.writeHead(404).end('Not found');return;
 }
 const ext=path.extname(target);
 const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
 res.setHeader('Content-Type',types[ext]||'application/octet-stream');
 let body=fs.readFileSync(target);
 if(ext==='.html'&&request.searchParams.has('__smoke')){
  const snippet=injection(request.searchParams.get('__smoke'));
  body=Buffer.from(body.toString('utf8').replace('</body>',snippet+'</body>'));
 }
 res.end(body);
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',err=>err?reject(err):resolve()));
const port=server.address().port;
function run(url){
 return new Promise((resolve,reject)=>{
  const args=['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--disable-extensions',
    '--disable-background-networking','--no-first-run','--virtual-time-budget=3500','--dump-dom',url];
  const child=spawn(chrome,args,{stdio:['ignore','pipe','pipe']});
  let html='',stderr='';
  const timer=setTimeout(()=>child.kill('SIGKILL'),20000);
  child.stdout.on('data',chunk=>html+=chunk);
  child.stderr.on('data',chunk=>stderr+=chunk);
  child.on('error',err=>{clearTimeout(timer);reject(err);});
  child.on('close',code=>{
   clearTimeout(timer);
   const match=/<pre id="browser-smoke-marker">([\s\S]*?)<\/pre>/.exec(html);
   if(code!==0||!match){reject(new Error('Chrome exit '+code+', no marker. '+stderr.slice(-900)+' '+html.slice(-300)));return;}
   if(match[1]!=='PASS'){reject(new Error('Browser smoke failed: '+match[1]));return;}
   resolve();
  });
 });
}
try{
 for(const suite of suites){
  await run('http://127.0.0.1:'+port+suite.url+'?__smoke='+encodeURIComponent(suite.name));
  console.log('BROWSER PASS: '+suite.name+' '+suite.url);
 }
 console.log('BROWSER SMOKE PASS: '+suites.length+' real Chromium scenarios');
}finally{
 await new Promise(resolve=>server.close(resolve));
}
