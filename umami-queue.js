// SOLE Voltaje — Umami offline queue
// Captura eventos cuando no hay red y los envía cuando vuelve la conexión.
// Compatible con HTML descargado (file://) y sitio online.
(function() {
  if (typeof window === 'undefined') return;
  var QUEUE_KEY = 'voltaje-umami-queue';
  var MAX = 1000;
  var ENDPOINT = 'https://analitica.solecolombia.org/api/send';
  var WEBSITE_ID = "ab95914f-5ff4-4591-a6e6-7ef52d78f792";

  function readQueue() {
    try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function writeQueue(q) {
    try {
      if (q.length > MAX) q = q.slice(-MAX);
      localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
    } catch (e) {}
  }
  function pushEvent(ev) {
    var q = readQueue();
    q.push(ev);
    writeQueue(q);
  }

  function buildPayload(ev) {
    return {
      type: 'event',
      payload: {
        website: WEBSITE_ID,
        url: ev.url,
        referrer: ev.referrer,
        name: ev.name,
        data: ev.data || {},
        screen: ev.screen,
        language: ev.language,
        hostname: ev.hostname,
        title: ev.title,
        __deferred_at: ev.captured_at,
      },
    };
  }

  function send(ev) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload(ev)),
      credentials: 'omit',
      keepalive: true,
    }).then(function(r){ return r.ok; }).catch(function(){ return false; });
  }

  async function flush() {
    var q = readQueue();
    if (q.length === 0) return;
    var remaining = [];
    for (var i = 0; i < q.length; i++) {
      var ok = false;
      try { ok = await send(q[i]); } catch (e) {}
      if (!ok) remaining.push(q[i]);
    }
    writeQueue(remaining);
  }

  function captureEvent(name, data) {
    var ev = {
      name: name,
      data: data || {},
      url: location.pathname + location.search,
      referrer: document.referrer || '',
      screen: (screen.width || 0) + 'x' + (screen.height || 0),
      language: navigator.language || 'es',
      hostname: location.hostname || 'standalone',
      title: document.title || '',
      captured_at: new Date().toISOString(),
    };
    if (navigator.onLine) {
      send(ev).then(function(ok){ if (!ok) pushEvent(ev); });
    } else {
      pushEvent(ev);
    }
  }

  // Capturar clicks con data-umami-event como red de seguridad
  document.addEventListener('click', function(e) {
    var t = e.target && e.target.closest && e.target.closest('[data-umami-event]');
    if (!t) return;
    if (navigator.onLine && window.umami && window.umami.track) return; // umami nativo se encarga
    var name = t.getAttribute('data-umami-event');
    if (!name) return;
    var data = {};
    Object.keys(t.dataset || {}).forEach(function(k){
      if (k.indexOf('umamiEvent') === 0 && k !== 'umamiEvent') {
        data[k.slice('umamiEvent'.length).toLowerCase()] = t.dataset[k];
      }
    });
    captureEvent(name, data);
  }, true);

  // Si el script de Umami carga, parchear track() para que pase por nuestra ruta cuando esté offline
  var hookInterval = setInterval(function() {
    if (window.umami && typeof window.umami.track === 'function') {
      var orig = window.umami.track.bind(window.umami);
      window.umami.track = function(name, data) {
        if (!navigator.onLine) {
          captureEvent(name, data);
          return;
        }
        try { return orig(name, data); } catch (e) { captureEvent(name, data); }
      };
      clearInterval(hookInterval);
    }
  }, 200);
  setTimeout(function(){ clearInterval(hookInterval); }, 30000);

  window.addEventListener('online', function() { flush(); });
  if (navigator.onLine) flush();
})();
