const CACHE_NAME = 'app-v9';
const RUNTIME_IMG_CACHE = 'img-v1';
const RUNTIME_FONT_CACHE = 'font-v1';
const IMG_CACHE_MAX_ENTRIES = 50;

const OFFLINE_HTML = '/offline.html';
const OFFLINE_IMAGE = '/assets/hero.webp';

const PRECACHE_URLS = [
'/',
'/index.html',
'/app.js',
'/manifest.webmanifest',
OFFLINE_HTML,
'/icons/icon-192.png',
'/icons/icon-512.png',
'/assets/hero.webp',
'/assets/logo.webp',
'/assets/logo.png'
];

const ASSETS_IMG_RE = new RegExp('^/assets/.+\.(webp|png|jpg|jpeg|svg)$', 'i');
const GOOGLE_FONTS_STYLES_RE = new RegExp('^https://fonts\\.googleapis\\.com/.', 'i');
const GOOGLE_FONTS_FILES_RE = new RegExp('^https://fonts\\.gstatic\\.com/.', 'i');
async function trimCache(cacheName, maxEntries) {
const cache = await caches.open(cacheName);
const keys = await cache.keys();
while (keys.length > maxEntries) {
const reqToDelete = keys.shift();
await cache.delete(reqToDelete);
}
}

self.addEventListener('install', (event) => {
event.waitUntil((async () => {
const cache = await caches.open(CACHE_NAME);
await cache.addAll(PRECACHE_URLS);
})());
self.skipWaiting();
});

self.addEventListener('activate', (event) => {
event.waitUntil((async () => {
const keys = await caches.keys();
await Promise.all(
keys
.filter(k => ![CACHE_NAME, RUNTIME_IMG_CACHE, RUNTIME_FONT_CACHE].includes(k))
.map(k => caches.delete(k))
);
await self.clients.claim();
})());
});

// Helper: détection navigation HTML même si mode !== 'navigate'
function isNavigationRequest(req) {
const accept = req.headers.get('accept') || '';
return req.mode === 'navigate' || (req.method === 'GET' && accept.includes('text/html'));
}

self.addEventListener('fetch', (event) => {
const req = event.request;
const url = new URL(req.url);

// 1) Navigation HTML -> cache-first, sinon réseau, sinon offline.html
if (isNavigationRequest(req)) {
event.respondWith((async () => {
// Tente la page demandée depuis le cache
const cachedPage = await caches.match(req);
if (cachedPage) return cachedPage;

  // Sinon réseau, et mets en cache si succès
  try {
    const netRes = await fetch(req);
    const copy = netRes.clone();
    const appCache = await caches.open(CACHE_NAME);
    appCache.put(req, copy);
    return netRes;
  } catch (e) {
    // Dernier recours: offline.html (toujours précaché)
    const offline = await caches.match(OFFLINE_HTML);
    if (offline) return offline;

    // Ou index.html si offline.html manquant
    return caches.match('/index.html');
  }
})());
return;

}

// 2) Images locales /assets -> cache-first + fallback image + trimming
if (url.origin === location.origin && ASSETS_IMG_RE.test(url.pathname)) {
event.respondWith(
caches.match(req).then(m => {
if (m) return m;
return fetch(req).then(async res => {
const copy = res.clone();
const cache = await caches.open(RUNTIME_IMG_CACHE);
await cache.put(req, copy);
await trimCache(RUNTIME_IMG_CACHE, IMG_CACHE_MAX_ENTRIES);
return res;
}).catch(() => caches.match(OFFLINE_IMAGE));
})
);
return;
}

// 3) Google Fonts
if (GOOGLE_FONTS_STYLES_RE.test(req.url)) {
event.respondWith(
fetch(req).then(res => {
const copy = res.clone();
caches.open(RUNTIME_FONT_CACHE).then(c => c.put(req, copy));
return res;
}).catch(() => caches.match(req))
);
return;
}
if (GOOGLE_FONTS_FILES_RE.test(req.url)) {
event.respondWith(
caches.match(req).then(m => m || fetch(req).then(res => {
const copy = res.clone();
caches.open(RUNTIME_FONT_CACHE).then(c => c.put(req, copy));
return res;
}))
);
return;
}

// 4) Autres GET -> cache-first
if (req.method === 'GET') {
event.respondWith(
caches.match(req).then(m => m || fetch(req).then(res => {
const copy = res.clone();
caches.open(CACHE_NAME).then(c => c.put(req, copy));
return res;
}).catch(() => m))
);
}
});
