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
     ok(!q('.crumb'),'homepage should not waste space on a self-referential Home breadcrumb');
     const mixed=q('[data-mixed-kg]'),combined=q('[data-mixed-kg-result]');
     ok(Boolean(mixed&&!mixed.hidden&&combined),'homepage must display the compound mass answer');
     ok(combined.textContent.includes('68 kg 39 g'),'150 lb rounds to 68 kilograms and 39 grams');
     input.value='149';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(combined.textContent.includes('67 kg 585 g'),'compound mass answer must update as source value changes');
     const finder=q('[data-home-find]');
     finder.value='pounds';finder.dispatchEvent(new Event('input',{bubbles:true}));
     ok(!q('[data-suggestions]').hidden,'search suggestions should open');
     ok([...document.querySelectorAll('[data-quick-item]')].some(el=>!el.hidden),'suggestions should include matching tools');
     break;
   }
   case 'copy-number':{
     const numberButton=q('[data-copy-number]');
     const feedback=q('[data-action-status]');
     ok(Boolean(numberButton&&feedback),'number-only copy and accessible feedback must exist');
     const input=q('[data-converter] [data-value]');
     input.value='150';input.dispatchEvent(new Event('input',{bubbles:true}));
     const precision=q('[data-precision]');
     precision.value='2';precision.dispatchEvent(new Event('change',{bubbles:true}));
     let written='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{written=value;}}});
     numberButton.click();
     await new Promise(resolve=>setTimeout(resolve,0));
     ok(written==='68.04','number-only copy must match displayed 2-decimal result without the unit');
     ok(feedback.textContent.includes('without units'),'copy announcement must describe unit-free value');
     q('[data-copy]').click();
     await new Promise(resolve=>setTimeout(resolve,0));
     ok(written==='150 lb ≈ 68.04 kg',
       'full-expression copy must signal approximate displayed result');
     precision.value='9';precision.dispatchEvent(new Event('change',{bubbles:true}));
     input.value='1';input.dispatchEvent(new Event('input',{bubbles:true}));
     q('[data-copy]').click();await new Promise(resolve=>setTimeout(resolve,0));
     ok(written==='1 lb = 0.45359237 kg','exact factor must retain the equals sign');
     break;
   }
   case 'progressive':{
     const actions=q('.tool-more-actions'),table=q('.multi-unit-panel');
     ok(actions?.tagName==='DETAILS'&&table?.tagName==='DETAILS','secondary controls and equivalent unit values use native accessible disclosures');
     ok(!actions.open&&!table.open,'secondary content starts collapsed to keep the conversion in view');
     ok(Boolean(q('[data-copy]'))&&Boolean(q('[data-copy-number]')),'two primary copy actions remain visible');
     ok(q('[data-share]')?.closest('.tool-more-actions')===actions,'share action is not lost');
     ok(q('[data-multi-results]')?.children.length>1,'other unit values stay prerendered in the DOM');
     table.querySelector('summary').click();
     ok(table.open&&q('[data-multi-results]').textContent.includes('kg'),'reference values can be expanded');
     actions.querySelector('summary').click();
     ok(actions.open,'secondary actions can be expanded');
     const input=q('[data-value]');input.value='100';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('45.359'),'live result remains correct when disclosures are open');
     q('[data-reset]').click();
     ok(input.value==='149','secondary reset restores original value');
     table.open=false;actions.open=false;
     window.dispatchEvent(new Event('beforeprint'));
     ok(table.open,'the hidden comparison table must expand for printing');
     window.dispatchEvent(new Event('afterprint'));
     ok(!table.open,'after print the previous closed state must be restored');
     table.open=true;
     window.dispatchEvent(new Event('beforeprint'));
     window.dispatchEvent(new Event('afterprint'));
     ok(table.open,'a previously expanded reference table must remain expanded after print');
     break;
   }
   case 'direction':{
     const heading=q('[data-direction-label]'),input=q('[data-value]');
     ok(heading.textContent.includes('Pounds')&&heading.textContent.includes('Kilograms'),'direction heading starts with the selected pair');
     q('[data-swap]').click();
     ok(heading.textContent.includes('Kilograms → Pounds'),'swap must also update the visible conversion heading');
     ok(q('[data-from]').value==='kg'&&q('[data-to]').value==='lbs','unit controls match swapped direction');
     ok(q('[data-mixed-kg]')?.hidden,'kg+g notation must hide when converter direction is reversed');
     input.value='100';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('220.462'),'swapped conversion remains accurate');
     q('[data-reset]').click();
     ok(heading.textContent.includes('Pounds → Kilograms'),'reset returns heading and controls to original direction');
     break;
   }
   case 'time-duration':{
     const input=q('[data-converter] [data-value]'),panel=q('[data-elapsed-duration]');
     const clock=q('[data-elapsed-clock]'),words=q('[data-elapsed-words]');
     ok(panel&&!panel.hidden&&clock.textContent==='0:05:00','time tool must render its initial elapsed value in static HTML');
     input.value='10000';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(clock.textContent==='166:40:00','10000 min should equal 166:40:00 elapsed, without a day wrap');
     ok(words.textContent==='166 h 40 min','time tool must provide an accessible word-based reading');
     const copy=q('[data-copy-elapsed]');let written='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>written=value}});
     copy.click();await new Promise(resolve=>setTimeout(resolve,0));
     ok(written==='166:40:00','copy duration must use computed clock format');
     input.value='90.5';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(clock.textContent==='1:30:30','decimal minutes should represent leftover seconds');
     q('[data-swap]').click();
     input.value='1.5';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(clock.textContent==='1:30:00','swapping hour direction must keep elapsed reading correct');
     input.value='-1';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(panel.hidden,'negative durations must not display fabricated clock values');
     break;
   }
   case 'time-milliseconds':{
     const input=q('[data-value]'),panel=q('[data-elapsed-duration]');
     const clock=q('[data-elapsed-clock]'),note=q('[data-elapsed-note]');
     input.value='1001';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(clock.textContent==='0:00:01.001','millisecond granularity must be kept');
     input.value='2.4';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(clock.textContent==='≈ 0:00:00.002','sub-millisecond rounding must be labeled approximate');
     ok(note.textContent.includes('Rounded'),'rounding must be disclosed');
     input.value='1';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(clock.textContent==='0:00:00.001','exact millisecond reading does not claim approximation');
     ok(note.textContent.includes('Not a time of day'),'duration must not be mistaken for clock-time');
     ok(!panel.hidden,'panel should stay visible for finite time');
     break;
   }
   case 'batch-visual':{
     const advanced=q('[data-batch-advanced]'),input=q('[data-batch-input]'),output=q('[data-batch-result]');
     ok(advanced?.tagName==='DETAILS'&&!advanced.open,'CSV advanced settings should begin collapsed');
     ok(input.value.includes('149')&&output.value.includes('Line 1: 149 lb'),'first-load example output should be real and visible');
     ok(q('[data-process]')?.closest('.batch-submit'),'convert button stays beside input, not below results');
     const inputTop=input.getBoundingClientRect().top;
     ok(inputTop<780,'the batch input should appear within a normal desktop working viewport: '+inputTop);
     advanced.querySelector('summary').click();
     ok(advanced.open&&q('[data-batch-from-column]'),'advanced unit-column controls stay reachable');
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
   case 'batch-multiline':{
     q('[data-batch-column]').value='2';
     q('[data-batch-delimiter]').value='comma';
     q('[data-batch-input]').value='sku,value,notes\nshirt,149,"first line\nsecond line"\ncap,126,normal';
     q('[data-process]').click();
     const output=q('[data-batch-result]').value;
     ok(output.includes('Line 2: 149 lb'),'multi-line first record must survive');
     ok(output.includes('Line 4: 126 lb'),'next record must retain original physical line number');
     ok(q('[data-batch-status]').textContent.includes('Converted 2 of 2'),'quoted multiline notes count as a single logical CSV row');
     break;
   }
   case 'batch-mixed':{
     const rowFrom=q('[data-batch-from-column]'),rowTo=q('[data-batch-to-column]');
     ok(Boolean(rowFrom&&rowTo),'row-specific CSV unit columns must appear in the browser');
     ok(Boolean(q('[data-batch-example]')),'sample CSV must be visible');
     q('[data-batch-example]').click();
     ok(q('[data-batch-status]').textContent.includes('Converted 4 of 4'),'load example must convert all mixed units');
     ok(q('[data-batch-result]').value.includes('330 km/h'),'example must cover speed conversion');
     q('[data-batch-column]').value='2';
     q('[data-batch-input]').value='label,value,from,to\nparcel,149,lb,kg\nclock,60000,ms,s\ninvalid,50,kg,s';
     q('[data-batch-delimiter]').value='comma';
     rowFrom.value='3';rowTo.value='4';
     q('[data-process]').click();
     const content=q('[data-batch-result]').value;
     ok(content.includes('Line 2: 149 lb')&&content.includes('67.58526313'),'mixed mass value');
     ok(content.includes('Line 3: 60000 ms')&&content.includes('60 s'),'mixed elapsed duration value');
     ok(content.includes('Line 4:')&&content.includes('Error:'),'incompatible units must produce row error');
     ok(q('[data-batch-status]').textContent.includes('Converted 2 of 3'),'mixed row summary');
     ok(q('[data-batch-status]').textContent.includes('each row'),'unit column mode described');
     rowTo.value='';
     q('[data-process]').click();
     ok(q('[data-batch-status]').textContent.includes('two different'),'partial column selection must fail clearly');
     break;
   }
   case 'batch-alias':{
     const value=q('[data-batch-input]');
     q('[data-batch-column]').value='1';
     q('[data-batch-delimiter]').value='comma';
     q('[data-batch-from-column]').value='2';
     q('[data-batch-to-column]').value='3';
     value.value='value,from,to\n10,kn,mph\n10,knot,mph\n10,kN,N';
     q('[data-process]').click();
     const output=q('[data-batch-result]').value;
     ok(output.includes('Line 2: 10 kn → Error: Ambiguous'),'kn must not be silently treated as kilonewtons');
     ok(output.includes('Line 3: 10 kn →')&&!output.includes('Line 3: 10 kn → Error:'),'explicit knots must convert as speed');
     ok(output.includes('Line 4: 10 kN → 10000 N'),'explicit kN must convert as force');
     ok(q('[data-batch-status]').textContent.includes('Converted 2 of 3'),'unsafe unit ambiguity rejected as one row error');
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
   case 'kg-to-lbs-mixed':{
     const input=q('[data-value]'),result=q('[data-lb-oz-result]'),panel=q('[data-lb-oz-readout]');
     ok(panel&&!panel.hidden&&result,'SSR mass-ounces readout must be accessible');
     ok(result.textContent==='≈ 529 lb 1.8 oz','240 kg result should use rounded mass ounces, not fluid ounces');
     input.value='54';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(result.textContent==='≈ 119 lb 0.8 oz','54kg should update live to whole pounds + tenths of a mass ounce');
     input.value='2.5';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(result.textContent==='≈ 5 lb 8.2 oz','2.5kg result should preserve useful ounces');
     const copy=q('[data-copy]');let written='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async v=>written=v}});
     copy.click();await new Promise(resolve=>setTimeout(resolve,0));
     ok(written.includes('2.5 kg ≈ ')&&written.includes(' lb'),'main decimal result copy remains available');
     q('[data-swap]').click();
     ok(panel.hidden,'auxiliary lb+oz reading is inappropriate on reverse pounds to kg direction');
     q('[data-swap]').click();
     ok(!panel.hidden,'auxiliary lb+oz reading should return when direction restored');
     input.value='-5';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(panel.hidden,'negative physical mass must not show nonsensical mixed unit output');
     break;
   }
   case 'pressure-50':{
     const input=q('[data-converter] [data-value]'),panel=q('[data-pressure-summary]');
     const kpa=q('[data-pressure-unit="kpa"]'),psi=q('[data-pressure-unit="psi"]'),
       bar=q('[data-pressure-unit="bar"]'),atm=q('[data-pressure-unit="atm"]');
     ok(panel&&!panel.hidden&&kpa&&psi&&bar&&atm,'all four pressure readings should be visible in SSR');
     ok(kpa.textContent==='= 50 kPa','50kPa must preserve exact input');
     ok(psi.textContent==='≈ 7.251887 psi','50 kPa to psi is rounded honestly');
     ok(bar.textContent==='= 0.5 bar','50 kPa equals exactly 0.5 bar');
     ok(atm.textContent==='≈ 0.493462 atm','50 kPa to atm is rounded honestly');
     ok(panel.textContent.includes('Gauge vs absolute'),'gauge/absolute reference context must be clear');
     let written='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>written=value}});
     q('[data-copy-pressure]').click();await new Promise(resolve=>setTimeout(resolve,0));
     ok(written.includes('Pressure unit conversion: 50 kPa')&&
       written.includes('atm: ≈ 0.493462'),'copy should include actual input and four units');
     ok(written.includes('\n')&&written.includes('Reference unchanged'),
       'copy must keep line separation and explicitly preserve gauge vs absolute reference');
     input.value='101.325';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(atm.textContent==='= 1 atm','standard atmosphere should be exactly 101.325 kPa');
     q('[data-swap]').click();input.value='1';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(atm.textContent==='= 1 atm','after swapping to atm, the original value remains exact');
     ok(kpa.textContent==='= 101.325 kPa','swapped values must recompute from the new source unit');
     input.value='-0.5';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(!panel.hidden&&atm.textContent==='= -0.5 atm','signed gauge/pressure-difference values are valid as unit changes');
     break;
   }
   case 'pressure-108':{
     const input=q('[data-value]'),psi=q('[data-pressure-unit="psi"]');
     ok(psi.textContent==='≈ 15.664076 psi','108 kPa pre-rendered numeric query must show correct psi value');
     input.value='0';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(psi.textContent==='= 0 psi','zero should stay exact');
     input.value='abc';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-pressure-summary]').hidden,'invalid numeric input must not leave stale pressure reading');
     break;
   }
   case 'fluid-ounce-us-uk':{
     const source=q('[data-converter] [data-value]');
     const panel=q('[data-fluid-oz-compare]'),us=q('[data-fluid-us]'),uk=q('[data-fluid-uk]');
     ok(panel&&!panel.hidden&&us&&uk,'US/UK fluid ounce comparison must be visible');
     ok(us.textContent.includes('≈ 12.004 US fl oz'),'355 mL must show correct US fluid ounces');
     ok(uk.textContent.includes('≈ 12.4943 UK fl oz'),'355 mL must show correct UK fluid ounces');
     source.value='100';source.dispatchEvent(new Event('input',{bubbles:true}));
     ok(us.textContent.includes('3.3814')&&uk.textContent.includes('3.5195'),
       'changing source updates both systems without intermediate rounding');
     q('[data-swap]').click();
     source.value='12';source.dispatchEvent(new Event('input',{bubbles:true}));
     ok(us.textContent.includes('= 12 US fl oz'),'reverse direction uses exact US ounces');
     ok(uk.textContent.includes('UK fl oz'),'reverse direction keeps correct imperial label');
     source.value='-1';source.dispatchEvent(new Event('input',{bubbles:true}));
     ok(panel.hidden,'invalid negative physical volume must not show misleading comparison');
     break;
   }
   case 'temperature-three-scale':{
     const input=q('[data-value]'),panel=q('[data-temperature-triple]');
     const c=q('[data-temperature-unit="celsius"]'),f=q('[data-temperature-unit="fahrenheit"]'),k=q('[data-temperature-unit="kelvin"]');
     ok(panel&&!panel.hidden&&c&&f&&k,'SSR three-scale temperature answers are visible');
     ok(c.textContent==='= 37.9 °C'&&f.textContent==='= 100.22 °F'&&k.textContent==='= 311.05 K','37.9°C three scales must match NIST');
     ok(panel.textContent.includes('Temperature differences use a different rule'),'temperature interval caveat missing');
     let written='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async v=>{written=v;}}});
     q('[data-copy-temperature]').click();await new Promise(resolve=>setTimeout(resolve,0));
     ok(written.includes('Absolute temperature: 37.9 °C')&&written.includes('K: = 311.05'),'copied three-scale values must match input');
     ok(written.includes('differences do not use the +32 offset'),'copied reading keeps correct interval warning');
     input.value='36.6';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(f.textContent==='= 97.88 °F'&&k.textContent==='= 309.75 K','live 36.6°C result correct');
     q('[data-swap]').click();input.value='32';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(c.textContent==='= 0 °C'&&k.textContent==='= 273.15 K','Fahrenheit swap correct');
     input.value='-460';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(panel.hidden,'below absolute zero should hide scale panel');
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
       iframe.style.width=width+'px';iframe.style.height='870px';iframe.style.border='0';
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
       if(location.pathname==='/'&&width===320){
         const firstCopy=doc.querySelector('.hero [data-copy]').getBoundingClientRect();
         ok(firstCopy.bottom<=870,'320px homepage should reveal the primary copy action in the 870px first screen (actual bottom: '+Math.round(firstCopy.bottom)+'px)');
       }
       if(location.pathname==='/'&&width<=900){
         const top=doc.querySelector('.hero-intro').getBoundingClientRect();
         const tool=doc.querySelector('.hero .demo').getBoundingClientRect();
         const search=doc.querySelector('.hero-discovery').getBoundingClientRect();
         ok(top.top<tool.top&&tool.bottom<=search.top+2,'mobile homepage must show introduction, calculator, then search/discovery');
         ok(doc.querySelector('.hero .tool-more-actions')&&!doc.querySelector('.hero .tool-more-actions').open,
           'mobile calculator keeps extended controls folded');
       }
       if(location.pathname==='/batch-converter/'&&width<=375){
         const from=doc.querySelector('[data-batch-from]').getBoundingClientRect();
         const to=doc.querySelector('[data-batch-to]').getBoundingClientRect();
         const input=doc.querySelector('[data-batch-input]').getBoundingClientRect();
         ok(Math.abs(from.top-to.top)<4,'mobile batch source and target units must sit in one compact row');
         ok(input.top<790,'mobile batch input must be visible in the first phone viewport ('+input.top+'px)');
         ok(!doc.querySelector('[data-batch-advanced]').open,'advanced settings remain folded on mobile');
       }
       if(width<=375&&(location.pathname==='/'||location.pathname==='/convert/lbs-to-kg/')){
         const numeric=doc.querySelector('[data-output-number]');
         ok(Boolean(numeric),'conversion result needs a separate numeric span');
         const range=doc.createRange();
         range.selectNodeContents(numeric);
         ok(range.getClientRects().length===1,'Result digits must not wrap within the number at '+width+'px on '+location.pathname);
         if(width<=320){
           const target=doc.querySelector('[data-to]').getBoundingClientRect();
           const answer=doc.querySelector('.resultbox').getBoundingClientRect();
           ok(target.bottom<=answer.top+2,'320px result must get full width under the target unit selector');
           const presets=[...doc.querySelectorAll('.hero .value-presets .preset')];
           if(presets.length)ok(Math.max(...presets.map(p=>p.getBoundingClientRect().top))-Math.min(...presets.map(p=>p.getBoundingClientRect().top))<4,
             '320px homepage quick-value presets should not spill into a second row');
         }
       }
       iframe.remove();
     }
     break;
   }
   case 'engineering-length':{
     const panel=q('[data-engineering-reference="length"]');
     ok(Boolean(panel&&panel.textContent.includes('1/16 in')&&panel.textContent.includes('1.5875 mm')),
       'length page must render accurate fractional international inch values');
     const input=q('[data-value]');
     input.value='17.7';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('44.958'),'17.7 inches must equal 44.958 centimeters');
     break;
   }
   case 'engineering-speed':{
     const panel=q('[data-engineering-reference="speed"]');
     ok(Boolean(panel&&panel.textContent.includes('96.56064 km/h')&&panel.textContent.includes('26.8224 m/s')),
       'speed page must render accurate multi-unit cross-check');
     const input=q('[data-value]');
     input.value='330';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('205.052493'),'330 km/h speed result must update live');
     const table=q('[data-multi-results]');
     ok(table.textContent.includes('m/s')&&table.textContent.includes('kn'),'speed comparison includes SI and nautical units');
     break;
   }
   case 'torque-four-400':{
     const panel=q('[data-torque-summary]'),input=q('[data-value]'),nm=q('[data-torque-unit="nm"]'),
      ft=q('[data-torque-unit="ft-lbf"]'),inch=q('[data-torque-unit="in-lbf"]'),kgf=q('[data-torque-unit="kgf-m"]');
     ok(Boolean(panel&&!panel.hidden&&nm&&ft&&inch&&kgf),'400-ft-lbf existing numeric page prerenders all torque units');
     ok(nm.textContent==='≈ 542.327179 N·m','N·m magnitude must be correct');
     ok(ft.textContent==='= 400 ft·lbf','source input remains exact');
     ok(inch.textContent==='= 4,800 in·lbf','foot to inch ratio must be 12');
     ok(panel.textContent.includes('not manufacturer tightening specifications'),'never imply recommended tightening torque');
     let clipboard='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async t=>{clipboard=t;}}});
     q('[data-copy-torque]').click();await new Promise(r=>setTimeout(r,0));
     ok(clipboard.includes('400 ft·lbf')&&clipboard.includes('in·lbf: = 4,800'),'copy all four');
     ok(clipboard.includes('manufacturer tightening specifications'),'copy safety note');
     input.value='10';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(inch.textContent==='= 120 in·lbf','live input updates torque panel');
     q('[data-swap]').click();
     ok(q('[data-from]').value==='nm','swap changes unit to N·m');
     input.value='1';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(nm.textContent==='= 1 N·m','source unit swap updates panel');
     input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(panel.hidden,'invalid input hides stale torque readouts');
     ok(q('meta[name="robots"]')?.content.includes('noindex'),'preview numeric SEO page remains noindex');
     break;
   }
   case 'torque-four-reverse':{
     const panel=q('[data-torque-summary]'),input=q('[data-value]');
     ok(panel&&!panel.hidden,'nm-to-ft-lbf must have visible torque panel');
     input.value='9.80665';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-torque-unit="kgf-m"]').textContent==='= 1 kgf·m','metric kilogram-force-meter equivalence correct');
     ok(q('[data-torque-unit="nm"]').textContent==='= 9.80665 N·m','metric source amount correct');
     break;
   }
   case 'engineering-torque':{
     const panel=q('[data-engineering-reference="torque"]');
     ok(Boolean(panel&&panel.textContent.includes('1,200 in·lbf')),
       'torque page must render source-computed inch-pound cross-check');
     const input=q('[data-value]'),destination=q('[data-to]');
     input.value='400';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('542.327179'),'400 ft·lbf must convert live to N·m');
     ok([...destination.options].some(x=>x.value==='in-lbf')&&[...destination.options].some(x=>x.value==='kgf-m'),
       'new engineering torque units must be real selectable targets');
     destination.value='in-lbf';destination.dispatchEvent(new Event('change',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('4,800'),'400 foot-pounds must produce 4,800 inch-pounds');
     destination.value='kgf-m';destination.dispatchEvent(new Event('change',{bubbles:true}));
     ok(q('[data-output]').textContent.includes('55.301'),'kgf·m must calculate from the same source engine');
     break;
   }
   case 'feet-inches-m':{
     const panel=q('[data-feet-inches]'),input=q('[data-value]');
     ok(Boolean(panel&&!panel.hidden),'meters to feet page must SSR the mixed readout');
     input.value='1.75';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-feet-decimal]').textContent.includes('5 ft 8.90 in'),'decimal inches update');
     ok(q('[data-feet-fraction]').textContent.includes('5 ft 8 7/8 in'),'fractional inches update');
     let written='';
     Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{written=text;}}});
     q('[data-copy-feet-inches]').click();await new Promise(r=>setTimeout(r,0));
     ok(written.includes('5 ft 8 7/8 in')&&written.includes('rounded'),'copy discloses rounding');
     q('[data-swap]').click();
     ok(q('[data-from]').value==='ft','swap changes input unit');
     input.value='1';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-feet-fraction]').textContent.includes('1 ft 0 in'),'swapped reading stays accurate');
     input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(panel.hidden,'invalid inputs hide old reading');
     break;
   }
   case 'feet-inches-ft':{
     const input=q('[data-value]');
     input.value='5';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-feet-decimal]').textContent.includes('5 ft 0.00 in'),'feet source correct');
     q('[data-swap]').click();
     input.value='0.3048';input.dispatchEvent(new Event('input',{bubbles:true}));
     ok(q('[data-feet-fraction]').textContent.includes('1 ft 0 in'),'swapping to meters still correct');
     break;
   }
   case 'feet-inches-8849':{
     const panel=q('[data-feet-inches]');
     ok(Boolean(panel&&!panel.hidden),'approved existing 8849-meter page SSR reading required');
     ok(q('[data-value]').value==='8849','SEO page value unchanged');
     ok(panel.textContent.includes('ft')&&panel.textContent.includes('in'),'both units visible');
     ok(q('meta[name="robots"]')?.content.includes('noindex'),'preview still noindex');
     break;
   }
   default:throw new Error('Unknown smoke scenario');
  }
}
const suites=[
 {name:'homepage',url:'/'},{name:'copy-number',url:'/'},{name:'direction',url:'/'},{name:'progressive',url:'/'},{name:'batch-visual',url:'/batch-converter/'},{name:'batch',url:'/batch-converter/'},{name:'batch-mixed',url:'/batch-converter/'},
 {name:'batch-multiline',url:'/batch-converter/'},
 {name:'batch-alias',url:'/batch-converter/'},
 {name:'universal',url:'/universal-converter/'},{name:'number',url:'/convert/lbs-to-kg/149/'},
 {name:'time-duration',url:'/convert/minutes-to-hours/'},{name:'time-milliseconds',url:'/convert/milliseconds-to-seconds/'},
 {name:'fluid-ounce-us-uk',url:'/convert/ml-to-us-fl-oz/355/'},
 {name:'kg-to-lbs-mixed',url:'/convert/kg-to-lbs/240/'},
 {name:'pressure-50',url:'/convert/kpa-to-atm/50/'},{name:'pressure-108',url:'/convert/kpa-to-psi/108/'},
 {name:'temperature-three-scale',url:'/convert/celsius-to-fahrenheit/37.9/'},
 {name:'temperature',url:'/convert/celsius-to-fahrenheit/'},
 {name:'engineering-length',url:'/convert/in-to-cm/'},
 {name:'engineering-speed',url:'/convert/kmh-to-mph/'},
 {name:'engineering-torque',url:'/convert/ft-lbf-to-nm/'},
 {name:'torque-four-400',url:'/convert/ft-lbf-to-nm/400/'},
 {name:'torque-four-reverse',url:'/convert/nm-to-ft-lbf/'},
 {name:'feet-inches-m',url:'/convert/m-to-ft/'},
 {name:'feet-inches-ft',url:'/convert/ft-to-m/'},
 {name:'feet-inches-8849',url:'/convert/m-to-ft/8849/'},
 {name:'fuel',url:'/convert/mpg-us-to-l-100km/'},
 {name:'mobile',url:'/'},{name:'mobile',url:'/batch-converter/'},
 {name:'mobile',url:'/universal-converter/'},{name:'mobile',url:'/convert/lbs-to-kg/149/'},
 {name:'mobile',url:'/convert/lbs-to-kg/'},{name:'mobile',url:'/convert/kg-to-lbs/'},{name:'mobile',url:'/convert/celsius-to-fahrenheit/'},{name:'mobile',url:'/convert/ml-to-us-fl-oz/'},{name:'mobile',url:'/convert/kpa-to-atm/'},{name:'mobile',url:'/convert/minutes-to-hours/'},{name:'mobile',url:'/convert/m-to-ft/'},{name:'mobile',url:'/convert/ft-lbf-to-nm/'},{name:'mobile',url:'/category/volume/'}
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
