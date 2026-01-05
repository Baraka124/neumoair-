// sw.js - Advanced Service Worker for Spirolite
const CACHE_NAME = 'spirolite-v1.0.0';
const OFFLINE_CACHE = 'spirolite-offline-v1';

// Critical assets for offline functionality
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/icons.js',
  '/manifest.json',
  '/offline.html',
  '/icon.svg',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js'
];

// Assets to cache for offline use (with versioning)
const APP_ASSETS = [
  // Local assets
  '/styles.css',
  '/app.js',
  
  // External dependencies
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  
  // Icon assets
  '/icons/icon-72.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/icons/icon-144.png',
  '/icons/icon-152.png',
  '/icons/icon-192.png',
  '/icons/icon-384.png',
  '/icons/icon-512.png'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(CRITICAL_ASSETS)),
      caches.open(OFFLINE_CACHE)
        .then(cache => cache.add('/offline.html'))
    ])
    .then(() => self.skipWaiting())
    .catch(error => {
      console.error('Service worker installation failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Enhanced fetch strategy with fallbacks
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') return;
  
  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(event));
    return;
  }
  
  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(event));
    return;
  }
  
  // Handle static assets
  event.respondWith(handleAssetRequest(event));
});

// Handle API requests with network-first strategy
async function handleApiRequest(event) {
  const { request } = event;
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Clone response for caching
    const responseToCache = networkResponse.clone();
    
    // Cache successful responses (except errors)
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API
    return new Response(
      JSON.stringify({ 
        error: 'You are offline',
        timestamp: new Date().toISOString(),
        cached: true 
      }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle navigation requests with offline fallback
async function handleNavigationRequest(event) {
  const { request } = event;
  
  try {
    // Network first for navigation
    const networkResponse = await fetch(request);
    
    // Cache the successful response
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    const offlineResponse = await caches.match('/offline.html');
    if (offlineResponse) {
      return offlineResponse;
    }
    
    // Last resort - basic offline response
    return new Response(
      '<h1>You are offline</h1><p>Spirolite requires an internet connection.</p>',
      { 
        status: 503,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Handle asset requests with cache-first strategy
async function handleAssetRequest(event) {
  const { request } = event;
  
  // Check cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Update cache in background
    event.waitUntil(updateCache(request));
    return cachedResponse;
  }
  
  // Not in cache, try network
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, check if it's an image
    if (request.headers.get('Accept')?.includes('image')) {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ccc" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        { 
          headers: { 'Content-Type': 'image/svg+xml' }
        }
      );
    }
    
    // Return generic error for other assets
    return new Response('Network error', { status: 408 });
  }
}

// Update cache in background
async function updateCache(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse);
    }
  } catch (error) {
    // Silent fail - cache won't be updated
    console.debug('Background cache update failed:', request.url);
  }
}

// Handle background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-visits') {
    event.waitUntil(syncOfflineVisits());
  }
});

// Sync offline visits when back online
async function syncOfflineVisits() {
  const offlineVisits = await getOfflineVisits();
  
  if (offlineVisits.length === 0) return;
  
  try {
    // Send each visit to server
    for (const visit of offlineVisits) {
      await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visit)
      });
      
      // Remove from offline storage on success
      await removeOfflineVisit(visit.id);
    }
    
    // Show sync complete notification
    self.registration.showNotification('Spirolite Sync', {
      body: `${offlineVisits.length} visits synced successfully`,
      icon: '/icons/icon-192.png',
      tag: 'sync-complete'
    });
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Helper functions for offline data management
async function getOfflineVisits() {
  // In a real app, you would use IndexedDB
  // This is a simplified version
  return JSON.parse(localStorage.getItem('spirolite_offline_visits') || '[]');
}

async function removeOfflineVisit(id) {
  const visits = await getOfflineVisits();
  const updatedVisits = visits.filter(v => v.id !== id);
  localStorage.setItem('spirolite_offline_visits', JSON.stringify(updatedVisits));
}

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New notification from Spirolite',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    tag: data.tag || 'spirolite-notification',
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Spirolite', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const { notification } = event;
  const urlToOpen = notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clientList => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If not, open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle periodic sync (if supported)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'sync-background-data') {
      event.waitUntil(syncBackgroundData());
    }
  });
}

async function syncBackgroundData() {
  // Sync protocol settings, patient data, etc.
  console.log('Periodic background sync running');
}
