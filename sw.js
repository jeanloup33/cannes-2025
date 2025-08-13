Voici le code de votre Service Worker, formaté pour une meilleure lisibilité et commenté pour expliquer chaque section.

```javascript
// ===================================================================
// SERVICE WORKER CONFIGURATION
// ===================================================================

const CACHE_NAME = 'app-v10';
const RUNTIME_IMG_CACHE = 'img-v1';
const RUNTIME_FONT_CACHE = 'font-v1';
const IMG_CACHE_MAX_ENTRIES = 50;

// Pages et ressources de secours en mode hors ligne
const OFFLINE_HTML = '/offline.html';
const OFFLINE_IMAGE = '/assets/hero.webp';

/**
 * URLs à mettre en cache dès l'installation du Service Worker.
 * Important : on ne précache PAS les fichiers HTML principaux (index.html, news.html)
 * ni les données dynamiques (news.json) pour éviter de servir des versions obsolètes.
 * La stratégie "Network First" sera utilisée pour ces fichiers.
 */
const PRECACHE_URLS = [
  // '/',             // Dé-commenter pour un mode hors-ligne complet (attention aux màj)
  // '/index.html',   // Idem pour la page d'accueil
  '/manifest.webmanifest',
  OFFLINE_HTML,
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/assets/hero.webp',
  '/assets/logo.webp',
  '/assets/logo.png'
];

// Expressions régulières pour identifier les types de requêtes
const ASSETS_IMG_RE = new RegExp('^/assets/.+\\.(webp|png|jpg|jpeg|svg)$', 'i');
const GOOGLE_FONTS_STYLES_RE = new RegExp('^https://fonts\\.googleapis\\.com/.', 'i');
const GOOGLE_FONTS_FILES_RE = new RegExp('^https://fonts\\.gstatic\\.com/.', 'i');

// Fichiers et chemins avec des stratégies de cache spécifiques
const NEWS_JSON_PATH = '/assets/news.json';
const HTML_NETWORK_FIRST = new Set(['/', '/index.html', '/news.html']);

// Notifications push
self.addEventListener('push', (event) => {
  let options = {
    body: 'Nouvelle actualité Festival de Cannes !',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'cannes-news',
    requireInteraction: false,
    data: { url: '/' }
  };
  
  // Si des données sont envoyées avec la notification push
  if (event.data) {
    try {
      const data = event.data.json();
      options = { ...options, ...data };
    } catch (e) {
      console.log('Données push non-JSON:', event.data.text());
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('Festival de Cannes 🎬', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Si une fenêtre est déjà ouverte, la focuser et naviguer
        for (const client of clientList) {
          if (client.url.includes(self.location.origin)) {
            client.focus();
            if (urlToOpen.includes('#')) {
              // Pour les ancres, envoyer un message au client
              client.postMessage({
                type: 'NAVIGATE_TO_ANCHOR',
                anchor: urlToOpen.split('#')[1]
              });
            } else {
              client.navigate(urlToOpen);
            }
            return;
          }
        }
        // Sinon, ouvrir une nouvelle fenêtre
        return clients.openWindow(urlToOpen);
      })
  );
});


// ===================================================================
// FONCTIONS UTILITAIRES
// ===================================================================

/** Détecte si la requête est une demande de navigation (pour une page HTML). */
function isNavigationRequest(req) {
  const accept = req.headers.get('accept') || '';
  return req.mode === 'navigate' || (req.method === 'GET' && accept.includes('text/html'));
}

/** Vérifie si l'URL correspond au fichier de news. */
function isNewsJson(url) {
  return url.origin === location.origin && url.pathname === NEWS_JSON_PATH;
}

/** Vérifie si l'URL est une page HTML nécessitant une stratégie "Network First". */
function isHtmlNetworkFirst(url) {
  return url.origin === location.origin && HTML_NETWORK_FIRST.has(url.pathname);
}

/** Supprime les entrées les plus anciennes d'un cache pour ne pas dépasser une taille max. */
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  while (keys.length > maxEntries) {
    const oldestRequest = keys.shift();
    await cache.delete(oldestRequest);
  }
}


// ===================================================================
// CYCLES DE VIE DU SERVICE WORKER
// ===================================================================

// --- INSTALLATION ---
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(PRECACHE_URLS);
  })());
  self.skipWaiting();
});

// --- ACTIVATION ---
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Supprime les anciens caches qui ne sont plus utilisés
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys
      .filter(key => ![CACHE_NAME, RUNTIME_IMG_CACHE, RUNTIME_FONT_CACHE].includes(key))
      .map(key => caches.delete(key))
    );
    // Force le Service Worker à prendre le contrôle de la page immédiatement
    await self.clients.claim();
  })());
});

// --- FETCH (interception des requêtes réseau) ---
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Stratégie améliorée pour news.json : Network First avec cache intelligent
  if (req.method === 'GET' && isNewsJson(url)) {
    event.respondWith((async () => {
      try {
        // Toujours essayer le réseau en premier pour les dernières news
        const networkResponse = await fetch(new Request(req, { cache: 'no-store' }));
        // Mettre à jour le cache avec la nouvelle version
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        // Fallback vers le cache si réseau indisponible
        const cachedResponse = await caches.match(req);
        return cachedResponse || new Response('[]', { 
          headers: { 'Content-Type': 'application/json' }
        });
      }
    })());
    return;
  }

  // Stratégie B: "Network First" pour les pages HTML
  if (isNavigationRequest(req) || isHtmlNetworkFirst(url)) {
    event.respondWith((async () => {
      try {
        // Tente de récupérer la version fraîche depuis le réseau
        const networkResponse = await fetch(new Request(req, { cache: 'no-store' }));
        // Met en cache la nouvelle version pour les futures requêtes hors-ligne
        const responseClone = networkResponse.clone();
        const appCache = await caches.open(CACHE_NAME);
        appCache.put(req, responseClone);
        return networkResponse;
      } catch (error) {
        // En cas d'échec (hors ligne), cherche dans le cache
        const cachedResponse = await caches.match(req);
        // Si trouvé, le renvoyer, sinon renvoyer la page "offline"
        return cachedResponse || await caches.match(OFFLINE_HTML);
      }
    })());
    return;
  }

  // Stratégie C: "Cache First" pour les images locales avec nettoyage du cache
  if (url.origin === location.origin && ASSETS_IMG_RE.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;

        // Si non trouvé dans le cache, récupérer via le réseau
        return fetch(req).then(async networkResponse => {
          const responseClone = networkResponse.clone();
          const cache = await caches.open(RUNTIME_IMG_CACHE);
          await cache.put(req, responseClone);
          // Nettoie le cache pour qu'il ne grossisse pas indéfiniment
          await trimCache(RUNTIME_IMG_CACHE, IMG_CACHE_MAX_ENTRIES);
          return networkResponse;
        }).catch(() => caches.match(OFFLINE_IMAGE)); // Image de secours si tout échoue
      })
    );
    return;
  }

  // Stratégie D: "Stale-While-Revalidate" pour Google Fonts
  if (GOOGLE_FONTS_STYLES_RE.test(req.url) || GOOGLE_FONTS_FILES_RE.test(req.url)) {
    event.respondWith(
      caches.match(req).then(cachedResponse => {
        // Tente une mise à jour en arrière-plan
        const networkFetch = fetch(req).then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(RUNTIME_FONT_CACHE).then(cache => cache.put(req, responseClone));
          return networkResponse;
        });
        // Renvoie la version du cache immédiatement si elle existe, sinon attend le réseau
        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // Stratégie E (par défaut): "Cache First" pour toutes les autres requêtes GET
  if (req.method === 'GET') {
    event.respondWith(
      caches.match(req).then(cachedResponse => {
        return cachedResponse || fetch(req).then(networkResponse => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, responseClone));
          return networkResponse;
        });
      })
    );
  }
});
```