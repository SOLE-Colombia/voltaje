// SOLE Voltaje — Update Banner
// Solo se activa en HTML descargado (protocolo file:).
(function() {
  if (typeof window === 'undefined') return;
  if (location.protocol !== 'file:') return;
  var LOCAL = window.__VOLTAJE_VERSION__ || '0000-00-00';
  var DISMISS = 'voltaje-update-dismissed';
  try { if (localStorage.getItem(DISMISS) === LOCAL) return; } catch (e) {}

  var idle = window.requestIdleCallback || function(cb){ return setTimeout(cb, 2000); };
  idle(function() {
    var ctrl = new AbortController();
    var t = setTimeout(function(){ try { ctrl.abort(); } catch(e){} }, 5000);
    fetch('https://voltaje.solecolombia.org/version.json', { signal: ctrl.signal, cache: 'no-store' })
      .then(function(r){ clearTimeout(t); return r.json(); })
      .then(function(remote) {
        if (!remote || !remote.version) return;
        if (!remote.release || !remote.release.url) return;
        if (remote.version <= LOCAL) return;
        var bar = document.createElement('div');
        bar.id = 'voltaje-update-banner';
        bar.setAttribute('style', [
          'position:fixed','top:0','left:0','right:0','z-index:99999',
          'background:#045da5','color:#fff','padding:.7rem 1rem',
          'display:flex','gap:1rem','align-items:center',
          'font-family:system-ui,sans-serif','font-size:.9rem',
          'box-shadow:0 2px 8px rgba(0,0,0,.25)'
        ].join(';'));
        var span = document.createElement('span');
        span.style.flex = '1';
        span.textContent = 'Hay nueva versión disponible: ' + remote.version;
        var a = document.createElement('a');
        a.href = remote.release.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.style.color = '#fff';
        a.style.fontWeight = '700';
        a.style.textDecoration = 'underline';
        a.textContent = 'Descargar';
        var btn = document.createElement('button');
        btn.setAttribute('aria-label', 'cerrar');
        btn.style.cssText = 'background:none;border:none;color:#fff;font-size:1.4rem;cursor:pointer;padding:0 .3rem;line-height:1';
        btn.textContent = '×';
        btn.onclick = function() {
          try { localStorage.setItem(DISMISS, LOCAL); } catch (e) {}
          bar.remove();
        };
        bar.appendChild(span);
        bar.appendChild(a);
        bar.appendChild(btn);
        if (document.body) document.body.prepend(bar);
      })
      .catch(function(){ clearTimeout(t); });
  });
})();
