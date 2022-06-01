const cacheName = 'test';
const staticAssets = [
  "/",
  "/index.html",
  "/src/index.js",
  "/style.css",
  "/manifest.json",
  "/src/DropMenu.js",
  "/src/InfoDialog.js",
  "/src/UnusableWarning.js",
  "/src/icons.js",
  "/src/photos.js",
  "/src/FloatButton.js",
  "/src/ProjectBanner.js",
  "/src/appbar.js",
  "/src/IconButton.js",
  "/src/SearchBar.js",
  "/src/drawer.js",
  "/src/login.js",
];

self.addEventListener('install', async (e) => {
  console.log('[Service Worker] Install');

  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", e => {
  self.clients.claim();
})

self.addEventListener("fetch", async e=>{
  const req = e.request;
  const url = new URL(req.url);

  if(url.origin == location.origin){
    e.respondWith(cacheFirst(req))
  }else{
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req){
  const cache = await caches.open(cacheName);
  try{
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  }catch(e){
    const cached = await cache.match(req);
    return cached;
  }
}