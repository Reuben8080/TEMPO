const CACHE = 'tempo-v6'; // Bumped to force activation of the new index.html layers
const ASSETS = ['./', './manifest.json', './icon.svg'];

// Install: cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// Activate: clear old caches immediately 
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Network-First for the core HTML payload, Cache-First for static assets
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isRootLayout = url.pathname === '/' || url.pathname.endsWith('index.html');

  if (isRootLayout) {
    // Network-First: Ensures code updates roll out immediately if online
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        }
        return caches.match(e.request);
      }).catch(() => caches.match(e.request))
    );
  } else {
    // Cache-First: Standard handling for unchanged assets (manifest, icons)
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => cached);
      })
    );
  }
});

// Notification click: reliably focus or restore the existing app window
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      const existing = cs.find(c => c.url.includes('tempo') || new URL(c.url).pathname === '/');
      if (existing) return existing.focus();
      return clients.openWindow('./');
    })
  );
});
