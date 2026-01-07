// Spirolite Professional - Service Worker v2.0
const CACHE_NAME = 'spirolite-v2.0';
const OFFLINE_URL = 'offline.html';
const RUNTIME_CACHE = 'runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icons.js',
  './service-worker-config.js',
  
  // External dependencies
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js',
  
  // Fonts (optional)
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// ========================
// INSTALL EVENT
// ========================
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('[Service Worker] Caching app shell');
          return cache.addAll(PRECACHE_ASSETS);
        })
        .catch(err => {
          console.error('[Service Worker] Cache addAll failed:', err);
        }),
      
      self.skipWaiting()
    ])
  );
});

// ========================
// ACTIVATE EVENT
// ========================
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Claim clients immediately
      self.clients.claim(),
      
      // Send ready message to clients
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_READY',
            version: '2.0'
          });
        });
      })
    ])
  );
});

// ========================
// FETCH EVENT (Network First with Fallback)
// ========================
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and cross-origin requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Handle navigation requests specially
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the page
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          // Offline: return cached page or offline.html
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }
  
  // Handle API/data requests (always try network first)
  if (event.request.url.includes('/api/') || event.request.url.includes('/data/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Offline: try cache, but don't show offline page for API
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For static assets (cache first)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Update cache in background
          fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE)
                .then(cache => cache.put(event.request, responseClone));
            })
            .catch(() => { /* Ignore fetch errors for background update */ });
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(event.request)
          .then(response => {
            // Cache the response
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE)
              .then(cache => cache.put(event.request, responseClone));
            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch failed:', error);
            throw error;
          });
      })
  );
});

// ========================
// MESSAGE EVENT (for app communication)
// ========================
self.addEventListener('message', (event) => {
  if (event.data) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
        
      case 'CLEAR_CACHE':
        caches.delete(CACHE_NAME);
        caches.delete(RUNTIME_CACHE);
        break;
        
      case 'GET_CACHE_INFO':
        event.ports[0].postMessage({
          cacheNames: caches.keys()
        });
        break;
        
      case 'UPDATE_AVAILABLE':
        // Trigger update flow
        self.registration.update();
        break;
    }
  }
});

// ========================
// SYNC EVENT (background sync)
// ========================
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Implement background sync for pending data
  console.log('[Service Worker] Background sync triggered');
}

// ========================
// PUSH EVENT (push notifications)
// ========================
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Spirolite notification',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: data.tag || 'spirolite-notification',
    data: data.data || {},
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Spirolite', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Focus existing window or open new one
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});
