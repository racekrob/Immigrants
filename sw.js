const CACHE='immigrants-v9';
const FILES=["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "icon-180.png", "icon-maskable.png", "img/bill-500.jpg", "img/bill-1000.jpg", "img/board.jpg", "img/bill-5000.jpg", "img/bill-10000.jpg", "img/bill-2000.jpg", "img/cards/illinois.jpg", "img/cards/connecticut.jpg", "img/cards/rhode-island.jpg", "img/cards/california.jpg", "img/cards/new-mexico.jpg", "img/cards/south-dakota.jpg", "img/cards/idaho.jpg", "img/cards/back-special.jpg", "img/cards/virginia.jpg", "img/cards/back-state.jpg", "img/cards/delaware.jpg", "img/cards/wisconsin.jpg", "img/cards/georgia.jpg", "img/cards/michigan.jpg", "img/cards/nebraska.jpg", "img/cards/north-dakota.jpg", "img/cards/arkansas.jpg", "img/cards/mississippi.jpg", "img/cards/nevada.jpg", "img/cards/new-jersey.jpg", "img/cards/tennessee.jpg", "img/cards/texas.jpg", "img/cards/double-label.jpg", "img/cards/commander.jpg", "img/cards/montana.jpg", "img/cards/kansas.jpg", "img/cards/chief.jpg", "img/cards/utah.jpg", "img/cards/oklahoma.jpg", "img/cards/sea-lines.jpg", "img/cards/wyoming.jpg", "img/cards/washington-dc.jpg", "img/cards/ohio.jpg", "img/cards/iowa.jpg", "img/cards/massachusetts.jpg", "img/cards/maryland.jpg", "img/cards/colorado.jpg", "img/cards/air-lines.jpg", "img/cards/new-hampshire.jpg", "img/cards/new-york.jpg", "img/cards/maine.jpg", "img/cards/oregon.jpg", "img/cards/indiana.jpg", "img/cards/independent-label.jpg", "img/cards/shareholder-20b.jpg", "img/cards/north-carolina.jpg", "img/cards/kentucky.jpg", "img/cards/vermont.jpg", "img/cards/special-label.jpg", "img/cards/arizona.jpg", "img/cards/washington.jpg", "img/cards/west-virginia.jpg", "img/cards/florida.jpg", "img/cards/minnesota.jpg", "img/cards/free-movement.jpg", "img/cards/shareholder-10.jpg", "img/cards/louisiana.jpg", "img/cards/federal-highways.jpg", "img/cards/south-carolina.jpg", "img/cards/second-national-bank.jpg", "img/cards/alabama.jpg", "img/cards/pennsylvania.jpg", "img/cards/shareholder-20a.jpg", "img/cards/mafia.jpg", "img/cards/missouri.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isPage=e.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('/')||url.pathname.endsWith('.json');
  if(isPage){
    // nejdřív síť (aby se nová verze projevila hned), bez internetu z mezipaměti
    e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res;})
      .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
    return res;})));
});
