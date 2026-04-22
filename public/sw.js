const CACHE_NAME = 'the-pickup-club-v1';
const APP_SHELL = [
  '/',
  '/find',
  '/reel',
  '/profile',
  '/host',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/icons/maskable-icon.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => Promise.all(APP_SHELL.map(url => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then(response => response || caches.match('/'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const fetched = fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });

      return cached || fetched;
    }),
  );
});
