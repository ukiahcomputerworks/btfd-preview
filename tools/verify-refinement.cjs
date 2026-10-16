const {chromium}=require('playwright');
const fs=require('node:fs/promises');
const http=require('node:http');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
 const root=path.resolve(__dirname,'..'), out=path.join(root,'evidence/test-output');
 await fs.mkdir(out,{recursive:true});
 const server=http.createServer(async(req,res)=>{
  try{const url=new URL(req.url,'http://local'), rel=decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+(rel.endsWith('/')?rel+'index.html':rel));
   if(!file.startsWith(root+path.sep))throw Error('outside root');
   res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':file.endsWith('.jpg')?'image/jpeg':'text/html');
   res.end(await fs.readFile(file));
  }catch{res.statusCode=404;res.end('Not found');}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=process.env.SITE_BASE||'http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const report={base,generatedAt:new Date().toISOString(),viewports:[]};
 try{
 for(const viewport of [{width:320,height:844},{width:390,height:844},{width:768,height:1000},{width:1080,height:583},{width:1440,height:1000}]){
  const page=await browser.newPage({viewport}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
  const response=await page.goto(base+'/',{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  assert.deepEqual(await page.locator('.primary-nav a[href^="#"]').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href'))),['#about','#services','#prepare','#resources','#burn','#contact']);
  const first=await page.evaluate(()=>({
   height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,
   heroBottom:document.querySelector('.hero-grid').getBoundingClientRect().bottom,
   titleBottom:document.querySelector('h1').getBoundingClientRect().bottom,
   noindex:document.querySelector('meta[name=robots]').content.includes('noindex'),
   sections:[...document.querySelectorAll('main section')].map(e=>({id:e.id,height:Math.round(e.getBoundingClientRect().height),padding:getComputedStyle(e).padding})),
   invalidImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,
   titleCount:document.querySelectorAll('h1').length,
   contacts:[...document.querySelectorAll('.contact-row')].map(e=>Math.round(e.getBoundingClientRect().height)),
   button:getComputedStyle(document.querySelector('.button')).backgroundImage,
   focus:getComputedStyle(document.querySelector('.button')).outlineStyle
  }));
  assert.equal(first.overflow,false);assert.equal(first.noindex,true);assert.equal(first.invalidImages,0);assert.equal(first.titleCount,1);
  assert.ok(first.titleBottom<viewport.height,'hero title must fit first screen');
  assert.ok(first.contacts.every(h=>h>=44&&h<140),'compact usable contact rows');
  assert.ok(first.button.includes('105deg'),'metal material missing');
  const updates=page.locator('[data-updates-dropdown]'), updateSummary=updates.locator('summary'), updatePanel=updates.locator('.updates-panel');
  assert.equal(await updates.getAttribute('open'),null);
  await updateSummary.focus();await page.keyboard.press('Enter');
  assert.equal(await updatePanel.isVisible(),true);
  assert.equal(await updatePanel.locator('a').count(),9);
  assert.deepEqual(await updatePanel.locator('a').evaluateAll(nodes=>nodes.slice(0,4).map(a=>a.href)),['https://www.facebook.com/MendocinoSheriff','https://x.com/MendoSheriff','https://www.facebook.com/CALFIREMEU','https://x.com/CALFIRE_MEU']);
  assert.equal(await updatePanel.locator('a .source-icon[aria-hidden="true"]').count(),9);
  const updateBounds=await updatePanel.boundingBox();
  assert.ok(updateBounds.x>=0&&updateBounds.x+updateBounds.width<=viewport.width+1&&updateBounds.y+updateBounds.height<=viewport.height+1,'update dropdown must remain inside viewport');
  assert.ok((await updatePanel.locator('a').evaluateAll(nodes=>nodes.map(a=>a.getBoundingClientRect().height))).every(h=>h>=44),'update rows must have usable tap targets');
  assert.equal(await updatePanel.locator('a[href^="https://x.com/"]').count(),2);
  assert.equal(await updatePanel.locator('a[href^="https://www.facebook.com/"]').count(),2);
  assert.ok((await updatePanel.innerText()).includes('not an evacuation authority'));
  assert.ok((await updatePanel.innerText()).includes('may require sign-in'));
  await page.screenshot({path:path.join(out,'updates-dropdown-'+viewport.width+'.png')});
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(()=>document.activeElement.href),'https://www.facebook.com/MendocinoSheriff');
  await page.keyboard.press('Escape');
  assert.equal(await updatePanel.isVisible(),false);
  assert.equal(await updateSummary.evaluate(e=>e===document.activeElement),true);
  await updateSummary.click();await page.mouse.click(3,80);
  assert.equal(await updatePanel.isVisible(),false);
  await page.locator('.path-grid').scrollIntoViewIfNeeded();
  const paths=await page.locator('.path-image').evaluateAll(nodes=>nodes.map(a=>{
    const r=a.getBoundingClientRect(),img=a.querySelector('img');
    return {href:a.getAttribute('href'),top:r.top,bottom:r.bottom,left:r.left,right:r.right,width:r.width,height:r.height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,fit:getComputedStyle(img).objectFit,loaded:img.complete};
  }));
  assert.equal(paths.length,4);
  assert.deepEqual(paths.map(p=>p.href),['#prepare','#burn','#volunteer','#contact']);
  assert.deepEqual(paths.map(p=>p.naturalHeight),[390,380,387,385]);
  assert.ok(paths.every(p=>p.loaded&&p.naturalWidth===1024&&p.fit==='contain'&&p.height>=44));
  assert.ok(Math.max(...paths.map(p=>p.width))-Math.min(...paths.map(p=>p.width))<1,'four image card widths must match');
  assert.ok(Math.max(...paths.map(p=>p.height))-Math.min(...paths.map(p=>p.height))<1,'four image card heights must match');
  if(viewport.width>=608){
    for(const [a,b] of [[0,1],[2,3]])assert.ok(Math.abs(paths[a].top-paths[b].top)<1&&Math.abs(paths[a].bottom-paths[b].bottom)<1,'image row edges must align');
    assert.ok(Math.abs(paths[0].left-paths[2].left)<1&&Math.abs(paths[1].right-paths[3].right)<1,'image columns must align');
  }else assert.ok(paths.every(p=>Math.abs(p.left-paths[0].left)<1),'phone image stack left edges must align');
  await page.locator('.path-grid').screenshot({path:path.join(out,'path-images-'+viewport.width+'.png')});
  for(const role of ['home','burn','crew','station']){
    const card=page.locator('.path-'+role);
    await page.keyboard.press('Tab');
    await card.focus();
    assert.equal(await card.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
    await card.click();
    assert.equal(new URL(page.url()).hash,await card.getAttribute('href'));
  }
  await page.locator('.path-home').click();
  assert.equal(await page.locator('[data-ready=home]').getAttribute('aria-selected'),'true');
  const zone=page.locator('.action-zone-image');
  const banner=await zone.locator('img').evaluate(e=>({width:e.clientWidth,height:e.clientHeight,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight}));
  assert.equal(banner.naturalWidth,1024);assert.equal(banner.naturalHeight,190);
  assert.ok(Math.abs(banner.width/banner.height-1024/190)<.08,'banner must keep its original proportions');
  assert.ok(banner.height>=44,'banner tap target must remain usable');
  assert.equal(await zone.getAttribute('href'),'https://mendoready.org/');
  const alerts=page.locator('.action-alerts-image');
  const alertImage=await alerts.locator('img').evaluate(e=>({width:e.clientWidth,height:e.clientHeight,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight}));
  assert.equal(alertImage.naturalWidth,1024);assert.equal(alertImage.naturalHeight,180);
  assert.ok(Math.abs(alertImage.width/alertImage.height-1024/180)<.08,'alerts banner proportions changed');
  assert.ok((await alerts.boundingBox()).height>=44,'alerts link tap target must remain usable');
  assert.equal(await alerts.getAttribute('href'),'https://mendoready.org/plan-prepare/');
  const burn=page.locator('.action-burn-image');
  const burnImage=await burn.locator('img').evaluate(e=>({width:e.clientWidth,height:e.clientHeight,naturalWidth:e.naturalWidth,naturalHeight:e.naturalHeight}));
  assert.equal(burnImage.naturalWidth,1024);assert.equal(burnImage.naturalHeight,208);
  assert.ok(Math.abs(burnImage.width/burnImage.height-1024/208)<.08,'burn banner proportions changed');
  assert.ok((await burn.boundingBox()).height>=44,'burn banner tap target must remain usable');
  assert.equal(await burn.getAttribute('href'),'https://burnpermit.fire.ca.gov/current-burn-status');
  assert.equal(await page.locator('.action-deck .action-image').count(),3);
  const alignment=await page.locator('.action-deck').evaluate(e=>[...e.querySelectorAll('.action-image')].map(a=>{
    const r=a.getBoundingClientRect(),i=a.querySelector('img').getBoundingClientRect(),img=a.querySelector('img');
    return {top:r.top,bottom:r.bottom,left:r.left,width:r.width,height:r.height,image:{left:i.left,top:i.top,width:i.width,height:i.height,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight}};
  }));
  assert.ok(Math.max(...alignment.map(a=>a.height))-Math.min(...alignment.map(a=>a.height))<1,'banner frame heights must match');
  assert.ok(Math.max(...alignment.map(a=>a.width))-Math.min(...alignment.map(a=>a.width))<1,'banner widths must match');
  if(viewport.width>880) {
    assert.ok(Math.max(...alignment.map(a=>a.top))-Math.min(...alignment.map(a=>a.top))<1,'desktop banner tops must align');
    assert.ok(Math.max(...alignment.map(a=>a.bottom))-Math.min(...alignment.map(a=>a.bottom))<1,'desktop banner bottoms must align');
  }
  for(const [n,bounds] of [[0,[50,48,990,164]],[1,[38,40,995,160]],[2,[50,50,990,178]]]){
    const a=alignment[n],i=a.image,s=i.width/i.naturalWidth;
    assert.ok(i.left+bounds[0]*s>=a.left && i.left+bounds[2]*s<=a.left+a.width,'banner text/arrow must fit horizontally');
    assert.ok(i.top+bounds[1]*s>=a.top && i.top+bounds[3]*s<=a.bottom,'banner text/arrow must fit vertically');
  }
  await page.keyboard.press('Tab');
  await zone.focus();
  assert.equal(await zone.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  await zone.evaluate(e=>e.blur());
  await page.locator('.action-deck').screenshot({path:path.join(out,'zone-banner-'+viewport.width+'.png')});
  await page.screenshot({path:path.join(out,'fire-'+viewport.width+'-full.png'),fullPage:true});
  await page.locator('.button').first().focus();
  assert.equal(await page.locator('.button').first().evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
  const edgeBefore=await page.locator('.path-card').first().evaluate(e=>getComputedStyle(e).backgroundPosition);
  const sweepBefore=await page.locator('.button').first().evaluate(e=>getComputedStyle(e,'::before').transform);
  await page.waitForTimeout(150);
  const edgeAfter=await page.locator('.path-card').first().evaluate(e=>getComputedStyle(e).backgroundPosition);
  assert.notEqual(edgeBefore,edgeAfter,'metallic edge must actually shimmer');
  assert.ok(sweepBefore!=='none','metal sweep layer present');
  const visibleTabs=page.locator('[role=tab]');
  assert.equal(await visibleTabs.count(),3);
  const tabImages=await page.locator('.ready-image').evaluateAll(nodes=>nodes.map(b=>{
    const r=b.getBoundingClientRect(),i=b.querySelector('img');
    return {top:r.top,bottom:r.bottom,left:r.left,width:r.width,height:r.height,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,fit:getComputedStyle(i).objectFit,name:i.alt};
  }));
  assert.equal(tabImages.length,3);
  assert.deepEqual(tabImages.map(i=>i.naturalHeight),[147,147,145]);
  assert.ok(tabImages.every(i=>i.naturalWidth===1024&&i.fit==='contain'&&i.height>=44));
  assert.ok(Math.max(...tabImages.map(i=>i.height))-Math.min(...tabImages.map(i=>i.height))<1,'preparedness image heights must match');
  assert.ok(Math.max(...tabImages.map(i=>i.width))-Math.min(...tabImages.map(i=>i.width))<1,'preparedness image widths must match');
  if(viewport.width>880) assert.ok(tabImages.every(i=>Math.abs(i.top-tabImages[0].top)<1&&Math.abs(i.bottom-tabImages[0].bottom)<1),'preparedness row edges must align');
  else assert.ok(tabImages.every(i=>Math.abs(i.left-tabImages[0].left)<1),'preparedness stack must align');
  await page.locator('.ready-tabs').screenshot({path:path.join(out,'ready-images-'+viewport.width+'.png')});
  for(const key of ['home','zone','alerts']){
   await page.locator('[data-ready='+key+']').click();
   assert.equal(await page.locator('[data-ready-panel='+key+']').isVisible(),true);
   assert.equal(await page.locator('[role=tabpanel]:visible').count(),1);
   assert.equal(await page.locator('[data-ready='+key+']').getAttribute('aria-selected'),'true');
   assert.equal(await page.locator('[data-ready='+key+']').evaluate(e=>getComputedStyle(e,'::after').borderLeftWidth),'5px');
  }
  await page.locator('[data-ready=home]').focus();await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('[data-ready=zone]').getAttribute('aria-selected'),'true');
  await page.locator('#fire-search').fill('water form');
  const district=page.locator('[data-search-matches] a').first();
  assert.ok((await district.getAttribute('href')).includes('brooktrails-township-preview/resources/'));
  assert.ok((await district.innerText()).includes('Township site'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('#search-results').isVisible(),false);
  await page.locator('#fire-search').fill('volunteer');
  assert.ok((await page.locator('[data-search-matches] a').first().getAttribute('href')).startsWith('#'));
  await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');
  assert.equal(await page.locator('#volunteer-process').getAttribute('open'),'');
  await page.locator('#fire-search').fill('evacuation');
  await page.locator('[data-search-matches] a').first().click();
  assert.equal(await page.locator('#ready-zone').isVisible(),true);
  await page.locator('#fire-search').fill('zzzzunlikely');
  assert.ok((await page.locator('[data-search-matches]').innerText()).includes('No exact match'));
  await page.keyboard.press('Escape');
  if(viewport.width<960){
   await page.locator('[data-menu-toggle]').click();assert.equal(await page.locator('[data-nav]').isVisible(),true);
   await page.keyboard.press('Escape');assert.equal(await page.locator('[data-nav]').isVisible(),false);
  }
  for(const id of ['permit-resources','district-resources']){
   await page.locator('#'+id+' summary').click();
   assert.equal(await page.locator('#'+id).getAttribute('open'),'');
  }
  await page.goto(base+'/#ready-zone');
  assert.equal(await page.locator('#ready-zone').isVisible(),true);
  await page.goto(base+'/#volunteer-process');
  assert.equal(await page.locator('#volunteer-process').getAttribute('open'),'');
  assert.equal(await page.locator('[href="tel:911"]').count(),2);
  assert.equal(await page.locator('input:not([type=search]),textarea').count(),0);
  assert.equal(await page.locator('#cwu-colophon').count(),1);
  assert.ok(await page.locator('.sibling-nav').getAttribute('href'));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  assert.deepEqual(errors,[]);
  report.viewports.push({viewport,...first,interactionChecks:'passed',consoleErrors:errors});
  await page.close();
 }
 const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await reduced.goto(base+'/');
 const motion=await reduced.locator('.button').first().evaluate(e=>getComputedStyle(e,'::before').animationName);
 assert.equal(motion,'none');await reduced.close();report.reducedMotion='passed';
 const plain=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
 await plain.goto(base+'/');
 await plain.locator('[data-updates-dropdown] summary').click();
 assert.equal(await plain.locator('.updates-panel a:visible').count(),9);
 await plain.locator('[data-updates-dropdown] summary').click();
 assert.equal(await plain.locator('.feature-card:visible').count(),3);
 await plain.locator('#district-resources summary').click();
 assert.equal(await plain.locator('#district-resources .resource-row:visible').count(),2);
 await plain.close();report.noJavaScript='passed';
 await fs.writeFile(path.join(out,process.env.SITE_BASE?'live-report.json':'local-report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
