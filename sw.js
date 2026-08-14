const CACHE="daytrade-calculator-v1-8";
const ASSETS=["./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>e.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),
  self.clients.claim()
])));
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.mode==="navigate"||(r.headers.get("accept")||"").includes("text/html")){
    e.respondWith(fetch(r,{cache:"no-store"}).catch(()=>caches.match(r)));
    return;
  }
  e.respondWith(caches.match(r).then(x=>x||fetch(r)));
});