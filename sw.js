// SOLE Voltaje — Service Worker (voltaje-v3)
// Generado automáticamente por el emitter PWA de Quartz.
// NO editar manualmente — se sobreescribe en cada build.

const SW_VERSION = 'voltaje-v3';
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

// ─── Mensaje de update disponible ────────────────────────────────────────

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
