// ===================================================================
// SERVICE WORKER — Makes the app work OFFLINE
// ===================================================================
//
// A Service Worker is like a middleman between your app and the internet.
// When you first open the app, it downloads and caches all the files.
// Next time you open it — even without internet — the Service Worker
// serves the files from the cache instead of the network.
//
// Think of it like this:
//   1. First visit:  App → Internet → Downloads files → Stores copies
//   2. Later visits: App → Service Worker → "I have a copy!" → Serves it
//   3. No internet:  App → Service Worker → "I have a copy!" → Still works!
//
// The Service Worker runs in the BACKGROUND, separate from the page.
// It has three lifecycle events: install, activate, fetch.
// ===================================================================

// CACHE_NAME: a version label for our cache.
// If you update the app, change this to 'thought-log-v2' etc.
// This forces the old cache to be deleted and new files to be downloaded.
const CACHE = 'thought-log-v3';

// The list of files to cache for offline use.
// './' is the root URL (which loads index.html).
const ASSETS = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

// ----- INSTALL EVENT -----
// Fires when the Service Worker is first registered (first visit).
// We open a cache and store all our app files in it.
self.addEventListener('install', e => {
  e.waitUntil(                          // "don't finish installing until this is done"
    caches.open(CACHE)                  // open (or create) our named cache
      .then(c => c.addAll(ASSETS))      // download and store all listed files
  );
  self.skipWaiting();                   // activate immediately, don't wait for old tabs to close
});

// ----- ACTIVATE EVENT -----
// Fires when a new Service Worker takes over (e.g., after an update).
// We delete any old caches from previous versions.
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE)     // find caches that aren't our current version
          .map(k => caches.delete(k))   // delete them
      )
    )
  );
  self.clients.claim();  // take control of all open tabs immediately
});

// ----- FETCH EVENT -----
// Fires every time the app requests ANY file (HTML, CSS, fonts, etc.).
// This is where the "offline magic" happens.
self.addEventListener('fetch', e => {

  // SPECIAL HANDLING FOR GOOGLE FONTS:
  // Fonts are loaded from Google's servers. We cache them the first time
  // they're downloaded, so they work offline on future visits.
  if (e.request.url.includes('fonts.googleapis.com') || e.request.url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(r =>
        // If we have a cached copy, use it. Otherwise, fetch from network.
        r || fetch(e.request).then(res => {
          const clone = res.clone();  // we need to clone because a response can only be read once
          caches.open(CACHE).then(c => c.put(e.request, clone));  // save to cache for next time
          return res;
        }).catch(() => caches.match(e.request))  // if network fails too, try cache one more time
      )
    );
    return;
  }

  // FOR EVERYTHING ELSE (our app files):
  // Cache-first strategy: check cache, fall back to network.
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
