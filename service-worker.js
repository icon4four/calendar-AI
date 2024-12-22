const CACHE_NAME = 'event-calendar-cache-v1';
const urlsToCache = [
  'index.html',
  'event.html',
  'calendar.css',
  'event.css',
  'calendar.js',
  'event.js',
  'manifest.json',
  'icon-192x192.png',
  'icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
