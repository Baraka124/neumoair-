// Service Worker Configuration
const SW_CONFIG = {
  version: '2.0.0',
  cacheStrategy: 'network-first',
  enablePush: false,
  enableBackgroundSync: true,
  offlineSupport: true,
  
  // Cache settings
  cacheOptions: {
    maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    maxEntries: 50
  },
  
  // Precache patterns
  precachePatterns: [
    /\.html$/,
    /\.css$/,
    /\.js$/,
    /\.svg$/,
    /\.png$/,
    /\.json$/
  ],
  
  // Runtime cache patterns
  runtimeCachePatterns: {
    api: {
      pattern: /\/api\//,
      handler: 'networkFirst',
      options: {
        maxAgeSeconds: 60 * 5 // 5 minutes
      }
    },
    images: {
      pattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'cacheFirst',
      options: {
        maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
      }
    },
    fonts: {
      pattern: /\.(?:woff2|woff|ttf)$/,
      handler: 'cacheFirst',
      options: {
        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
      }
    }
  }
};

// Export for service worker
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SW_CONFIG;
}
