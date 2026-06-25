// Utility: create a hash from file list
async function generateCacheVersion(files) {
  const encoder = new TextEncoder();
  const data = encoder.encode(files.join('|'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Core assets to pre-cache
const CORE_ASSETS = [
    '/index.html',
    '/temp.js',
    '/assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf',
    '/assets/fonts/OpenSans-VariableFont_wdth,wght.ttf',
    '/assets/icons/favicon.ico',
    '/assets/icons/android/icon-16.png',
    '/assets/icons/android/icon-24.png',
    '/assets/icons/android/icon-32.png',
    '/assets/icons/android/icon-64.png',
    '/assets/icons/android/icon-128.png',
    '/assets/icons/android/icon-192.png',
    '/assets/icons/android/icon-256.png',
    '/assets/icons/android/icon-512.png',
    '/assets/icons/apple/apple-touch-icon.png',
    '/assets/icons/apple/apple-touch-startup-image-640x920.png',
    '/assets/icons/apple/apple-touch-startup-image-640x1096.png',
    '/scripts/actions.js',
    '/scripts/controls.js',
    '/scripts/dataStorage.js',
    '/scripts/events.js',
    '/scripts/globals.js',
    '/scripts/helpers.js',
    '/scripts/initialize.js',
    '/scripts/reactiveBindings.js',
    '/scripts/reactivity.js',
    '/scripts/ui.js',
    '/styles/base.css',
    '/styles/fonts.css',
    '/styles/gameHeader.css',
    '/styles/style.css',
];

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
  if (url.includes('/assets/sfx/')) {
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
  if (url.includes('/assets/icons/')) {
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
