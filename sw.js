// Service Worker for PulmoMetrics Pro v5.0
const CACHE_NAME = 'pulmometrics-pro-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon.svg',
  '/icon2.svg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event with offline fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if found
        if (response) {
          return response;
        }

        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              // Don't cache large files or API responses
              const contentType = response.headers.get('content-type');
              const url = event.request.url;
              
              // Only cache static assets, not API calls
              if (contentType && (
                contentType.includes('text/html') ||
                contentType.includes('text/css') ||
                contentType.includes('application/javascript') ||
                contentType.includes('image/') ||
                contentType.includes('font/') ||
                url.endsWith('.json')
              )) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        }).catch(() => {
          // If fetch fails and we're offline, return offline page for HTML requests
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
          
          // For other requests, return a simple offline message
          return new Response('You are offline. Please check your connection.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-visits') {
    console.log('Background sync for visits triggered');
    event.waitUntil(syncVisits());
  }
});

async function syncVisits() {
  // This would sync offline data when connection is restored
  console.log('Syncing offline visits...');
}
