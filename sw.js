const CACHE='foodpicker-v1';
const ASSETS=[
  './','./index.html','./manifest.json',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-512-maskable.png'
];
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(
    ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))
  )));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html')))
  );
});
