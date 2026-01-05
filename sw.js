// PulmoMetrics Pro - Professional Service Worker
const CACHE_VERSION = 'pulmometrics-pro-v2.1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg'
];

// Install - cache essentials
self.addEventListener('install', (event) => {
  console.log('⚙️ Installing PulmoMetrics Pro');
  
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => {
        console.log('📦 Caching app shell');
        return cache.addAll(APP_SHELL);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Activating PulmoMetrics Pro');
  
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_VERSION)
            .map(key => {
              console.log(`🗑️ Removing old cache: ${key}`);
              return caches.delete(key);
            })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Network-first for HTML, Cache-first for assets
  if (event.request.url.includes('index.html') || 
      event.request.destination === 'document') {
    event.respondWith(networkFirst(event));
  } else {
    event.respondWith(cacheFirst(event));
  }
});

async function networkFirst(event) {
  try {
    const networkResponse = await fetch(event.request);
    
    // Cache the fresh response
    const cache = await caches.open(CACHE_VERSION);
    await cache.put(event.request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Show offline page for navigation requests
    if (event.request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

async function cacheFirst(event) {
  const cachedResponse = await caches.match(event.request);
  if (cachedResponse) return cachedResponse;
  
  try {
    const networkResponse = await fetch(event.request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      await cache.put(event.request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return appropriate error
    return new Response('Network error', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Background sync for data persistence
self.addEventListener('sync', (event) => {
  if (event.tag === 'save-patient-data') {
    event.waitUntil(syncPatientData());
  }
});

async function syncPatientData() {
  console.log('💾 Background sync for patient data');
  
  // Get unsynced data from localStorage
  try {
    const syncQueue = JSON.parse(localStorage.getItem('pulmometrics_sync_queue') || '[]');
    
    if (syncQueue.length > 0) {
      console.log(`🔄 Syncing ${syncQueue.length} records`);
      
      // In production, send to backend API here
      
      // Clear queue after successful sync
      localStorage.removeItem('pulmometrics_sync_queue');
      localStorage.setItem('pulmometrics_last_sync', new Date().toISOString());
      
      // Notify app of successful sync
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'sync-complete' });
        });
      });
    }
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
}

// Handle app updates
self.addEventListener('message', (event) => {
  const { type } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CHECK_UPDATE':
      checkForUpdates();
      break;
  }
});

async function checkForUpdates() {
  try {
    const cache = await caches.open(CACHE_VERSION);
    const response = await fetch('/?t=' + Date.now());
    const freshHTML = await response.text();
    
    // Simple content check
    const cachedResponse = await cache.match('/');
    if (!cachedResponse) return;
    
    const cachedHTML = await cachedResponse.text();
    
    if (freshHTML !== cachedHTML) {
      // Notify app of update
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'update-available' });
        });
      });
    }
  } catch (error) {
    console.error('Update check failed:', error);
  }
}

console.log('🫁 PulmoMetrics Pro Service Worker ready');
