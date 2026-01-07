// Service Worker
self.addEventListener('install', e => {
  console.log('SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('SW activated');
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Pass through
});
