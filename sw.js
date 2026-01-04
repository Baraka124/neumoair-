// ============================================
// NEUMOCALC SERVICE WORKER - OFFLINE FIRST
// ============================================

const CACHE_NAME = 'neumocalc-v2.0.0';
const CACHE_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// ===== INSTALL =====
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// ===== ACTIVATE =====
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  // Delete old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// ===== FETCH =====
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip Chrome extensions
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  // Skip analytics and external APIs
  if (event.request.url.includes('google-analytics')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('[SW] Cache hit:', event.request.url);
          return response;
        }
        
        // Not in cache - fetch from network
        console.log('[SW] Fetching from network:', event.request.url);
        
        return fetch(event.request.clone())
          .then((networkResponse) => {
            // Check if valid response
            if (!networkResponse || 
                networkResponse.status !== 200 || 
                networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response
            const responseToCache = networkResponse.clone();
            
            // Cache the new resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch(() => {
            // Network failed - try to return fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // For images, return a placeholder
            if (event.request.destination === 'image') {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="#f8fafc"/></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
            
            return new Response('Offline - No network connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// ===== BACKGROUND SYNC (For future data sync) =====
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-calculations') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(syncPendingCalculations());
  }
});

async function syncPendingCalculations() {
  // This would sync localStorage data with backend
  console.log('[SW] Syncing calculations...');
}

// ===== PUSH NOTIFICATIONS (Optional) =====
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New data available',
    icon: 'icon-192.png',
    badge: 'icon-96.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('NeumoCalc', options)
  );
});
