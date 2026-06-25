// Utility: create a hash from file list
async function generateCacheVersion(files) {
  const encoder = new TextEncoder();
  const data = encoder.encode(files.join('|'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Core assets to pre-cache
const CORE_ASSETS = [];

let CACHE_NAME;

// Generate cache name with content hash before install
generateCacheVersion(CORE_ASSETS).then((version) => {
  CACHE_NAME = '2048-cache-' + version;
});

// Install: pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    generateCacheVersion(CORE_ASSETS).then((version) => {
      CACHE_NAME = '2048-cache-' + version;
      return caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS));
    })
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

// Fetch: strategies by asset type
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Fonts → cache-first
  if (url.includes('/assets/fonts/')) {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse.clone()));
        return networkResponse;
      }))
    );
    return;
  }

  // Audio → lazy-load
  if (url.includes('/assets/audio/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        return fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
    return;
  }

  // Images → stale-while-revalidate
  if (url.includes('/assets/images/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse.clone()));
          return networkResponse;
        });
        return response || fetchPromise;
      })
    );
    return;
  }

  // Default → network-first
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
