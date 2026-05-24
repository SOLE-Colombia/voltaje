// SOLE Voltaje — Service Worker (voltaje-v4)
// Generado automáticamente por el emitter PWA de Quartz.
// NO editar manualmente — se sobreescribe en cada build.

const SW_VERSION = 'voltaje-v4';
const CACHE_SHELL   = SW_VERSION + '-shell';
const CACHE_ASSETS  = SW_VERSION + '-assets';
const CACHE_PAGES   = SW_VERSION + '-pages';

// ─── Precache lists ────────────────────────────────────────────────────────

const SHELL_URLS = [
  "/",
  "/index.html",
  "/static/icon.png",
  "/static/prescript.js",
  "/CLAUDE"
];

// ─── Install: precachear shell mínimo ──────────────────────────────────────

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_SHELL).then(cache =>
      cache.addAll(SHELL_URLS.filter(u => {
        try { new URL(u, self.location.origin); return true; } catch { return false; }
      }))
    ).catch(err => console.warn('[SW] install precache parcial:', err))
  );
});

// ─── Activate: limpiar cachés viejas ──────────────────────────────────────

self.addEventListener('activate', event => {
  const keep = new Set([CACHE_SHELL, CACHE_ASSETS, CACHE_PAGES]);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => !keep.has(k)).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch: estrategias por tipo de recurso ───────────────────────────────

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== self.location.origin) return;

  // No cachear requests de la API de Umami ni analytics externos
  if (url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname) return;

  const ext = url.pathname.split('.').pop()?.toLowerCase() ?? '';

  // PDFs → NetworkFirst con timeout 5s
  if (ext === 'pdf') {
    event.respondWith(networkFirstWithTimeout(request, CACHE_PAGES, 5000));
    return;
  }

  // Imágenes y fuentes (inmutables) → CacheFirst
  const cacheFirstExts = new Set(['webp','png','jpg','svg','woff2','woff','ttf']);
  if (cacheFirstExts.has(ext)) {
    event.respondWith(cacheFirst(request, CACHE_ASSETS));
    return;
  }

  // CSS/JS (nombre fijo sin hash) y HTML → StaleWhileRevalidate para que se
  // actualicen tras cada deploy en lugar de quedar cacheados para siempre.
  event.respondWith(staleWhileRevalidate(request, CACHE_PAGES));
});

// ─── Estrategias ──────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Recurso no disponible offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  return cached ?? (await fetchPromise) ?? new Response('Sin conexión', { status: 503 });
}

async function networkFirstWithTimeout(request, cacheName, timeoutMs) {
  const cache = await caches.open(cacheName);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    clearTimeout(timeout);
    const cached = await cache.match(request);
    return cached ?? new Response('Sin conexión', { status: 503 });
  }
}

// ─── Background Sync para Umami (telemetría offline) ─────────────────────

const UMAMI_HOST = "analitica.solecolombia.org";
const UMAMI_DB = 'voltaje-umami';
const UMAMI_STORE = 'queue';

function openUmamiDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(UMAMI_DB, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(UMAMI_STORE, { keyPath: 'id', autoIncrement: true });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function umamiEnqueue(body) {
  try {
    const db = await openUmamiDB();
    await new Promise((res, rej) => {
      const tx = db.transaction(UMAMI_STORE, 'readwrite');
      const r = tx.objectStore(UMAMI_STORE).add({ body, ts: Date.now() });
      r.onsuccess = () => res();
      r.onerror = () => rej(r.error);
    });
  } catch (e) { /* ignorar */ }
}

async function umamiFlush() {
  try {
    const db = await openUmamiDB();
    const all = await new Promise((res, rej) => {
      const r = db.transaction(UMAMI_STORE).objectStore(UMAMI_STORE).getAll();
      r.onsuccess = () => res(r.result || []);
      r.onerror = () => rej(r.error);
    });
    for (const item of all) {
      try {
        const r = await fetch('https://' + UMAMI_HOST + '/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.body),
        });
        if (r.ok) {
          await new Promise((res, rej) => {
            const tx = db.transaction(UMAMI_STORE, 'readwrite');
            const dr = tx.objectStore(UMAMI_STORE).delete(item.id);
            dr.onsuccess = () => res();
            dr.onerror = () => rej(dr.error);
          });
        }
      } catch (e) { /* sigue offline, intentar luego */ }
    }
  } catch (e) { /* ignorar */ }
}

self.addEventListener('sync', event => {
  if (event.tag === 'umami-flush') {
    event.waitUntil(umamiFlush());
  }
});

// Interceptar requests POST a Umami para encolar si fallan
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.hostname !== UMAMI_HOST || event.request.method !== 'POST') return;
  event.respondWith((async () => {
    try {
      const cloned = event.request.clone();
      const r = await fetch(event.request);
      if (!r.ok) {
        try {
          const body = await cloned.json();
          await umamiEnqueue(body);
          if (self.registration.sync) {
            try { await self.registration.sync.register('umami-flush'); } catch (e) {}
          }
        } catch (e) {}
      }
      return r;
    } catch (err) {
      try {
        const body = await event.request.clone().json();
        await umamiEnqueue(body);
        if (self.registration.sync) {
          try { await self.registration.sync.register('umami-flush'); } catch (e) {}
        }
      } catch (e) {}
      return new Response(JSON.stringify({ queued: true }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  })());
});

// ─── Mensaje de update disponible ────────────────────────────────────────

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'FLUSH_UMAMI') event.waitUntil(umamiFlush());
});
