// PulmoMetrics Pro Service Worker
const CACHE_NAME = 'pulmometrics-pro-v2.1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './offline.html'
];

const EXTERNAL_RESOURCES = [
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('📦 Installing PulmoMetrics Pro');
  
  event.waitUntil(
    Promise.all([
      // Cache app shell
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(APP_SHELL)),
      
      // Skip waiting for immediate activation
      self.skipWaiting()
    ])
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('🚀 Activating PulmoMetrics Pro');
  
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys()
        .then(keys => Promise.all(
          keys.filter(key => key !== CACHE_NAME)
              .map(key => caches.delete(key))
        )),
      
      // Claim clients
      self.clients.claim()
    ])
  );
});

// Fetch event - Network First strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If navigation request, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match('./offline.html');
            }
            
            // Return offline response
            return new Response('Offline - Data not available', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Background sync for data persistence
self.addEventListener('sync', (event) => {
  if (event.tag === 'backup-data') {
    event.waitUntil(backupData());
  }
});

async function backupData() {
  console.log('💾 Background backup');
  // Backup logic can be added here
}

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🫁 PulmoMetrics Pro Service Worker loaded');
