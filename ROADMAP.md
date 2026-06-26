# Roadmap — SOLE Voltaje

> Última actualización: 2026-06-26 · Rama de producción: `voltaje`

---

## Estado actual

| Componente | Estado | Notas |
|---|---|---|
| Build (Quartz 4.6) | ✅ | Node 24, GH Actions, cache de `.quartz-cache` |
| Deploy | ✅ | Rama `voltaje` → repo público → GH Pages (`voltaje.solecolombia.org`) |
| Traducción ES→EN/PT | ✅ | `auto-translate.mjs`, Gemini 3.1 Flash Lite, caché de hashes |
| Campos canónicos (filtro) | ✅ | Diccionario estricto en `normalize-canonical-frontmatter.mjs`, sin IA |
| Tests de traducción | ✅ | 34 tests, `node --test`, corre en CI antes de traducir |
| Validador de traducciones | ✅ | `validate-translations.mjs`: detecta truncados, pasos faltantes, conteos; gate en deploy |
| Blindaje de traducción | ✅ | `finishReason` guard + `maxOutputTokens` + abort en auth; `--prune-cache` self-healing |
| Analítica | ✅ | Umami cookie-less en `analitica.solecolombia.org` |
| Fuentes offline | ✅ | Noto Sans + VT323 servidas localmente |
| WebP local | ✅ | `optimize-images.mjs`, quality 82, max 1600px, inbox → images/ |
| WebP en CI | ✅ | Verificación en deploy + conversión en translate-content |
| YouTube Facade | ✅ | Transformer `youtubeFacade.ts`, carga diferida de iframes |
| PWA manifest + SW básico | ✅ | `pwa.ts` emitter, manifest + Service Worker con Workbox |
| Grafo de relaciones | ✅ | `SolveRelationsGraph`, slugs normalizados por idioma |
| StepProgress (gamificación) | ✅ | Dock i18n, botón WhatsApp, formulario feedback |
| Filtro multilingüe | ✅ | `SolveFilterGrid` + `SolveFilterSidebar` con mapas de normalización |
| PWA Workbox (precache real) | 🟡 En progreso | SW con precache por tipo de asset — ver Fase B |
| ZIP offline más liviano | ✅ | `contentIndex.js` compartido (1 copia) en vez de inline ×771 HTML: `offline-build` 1.5 GB → ~277 MB |
| Tauri desktop (navegación offline) | ✅ | Custom protocol `app://` con fallback `.html` — render validado (portada + rutas sin extensión) |
| Tauri auto-update | 🟡 En progreso | `tauri-plugin-updater` registrado (Rust+JS) + `tauri.conf` (pubkey/endpoint); falta workflow de release y llamada desde el front |
| Tauri release CI | ⬜ Pendiente | `tauri-release.yml`: build Win/Linux + firma + GitHub Release — ver Fase C |
| Auditoría de imágenes CLS | ⬜ Pendiente | `width`/`height` en `<img>` para eliminar layout shift |
| Reparar videos rotos | ⬜ Pendiente | `solv-create-poweful-message` y otros |
| Auditoría enlaces Notion | ⬜ Pendiente | Links legacy de Notion en soluciones antiguas |
| Kiwix / ZIM | ⬜ Backlog | Pipeline Docker, baja prioridad |

---

## Fase B — PWA offline real (semana actual)

**Objetivo:** Que la app instalada en Android/iPhone funcione sin datos, usando Workbox para gestionar el caché de forma confiable.

### B.1 Service Worker con Workbox (en `quartz/plugins/emitters/pwa.ts`)

Estrategias por tipo de recurso:
- **HTML pages** → `StaleWhileRevalidate` (muestra caché instantáneo, actualiza en background)
- **CSS / JS / fuentes** → `CacheFirst` con expiración 30 días
- **WebP / imágenes** → `CacheFirst` con expiración 60 días, máx 500 entradas LRU
- **PDFs** → `NetworkFirst` con timeout 5s (pesados, opcionales)
- **Requests externos (Umami, YouTube)** → `NetworkOnly`

El emitter genera el SW al build time con la lista completa de slugs (HTML) y assets en `public/`.

### B.2 Install prompt

Componente `quartz/components/PWAInstallBanner.tsx` que escucha `BeforeInstallPrompt` y muestra un banner "Instalar para uso offline" en Android. En iOS detecta `navigator.standalone` y muestra instrucciones de "Agregar a pantalla de inicio".

### B.3 Sincronización no destructiva

- SW v2 se descarga en paralelo al v1 activo.
- v2 queda en estado `waiting` hasta que el usuario cierra todas las tabs.
- Banner avisa "Nueva versión disponible — recarga para actualizar".
- Si el download de v2 falla a mitad, v1 sigue operando intacto.

### B.4 Consideración iOS

iOS Safari tiene quota ~50 MB para SW cache. Plan: detectar iOS y precachear solo el shell + idioma activo (~80 MB para ES). El resto se cachea on-demand al navegar.

---

## Fase C — Tauri desktop (2-4 semanas)

**Objetivo:** Instalable (`.deb`, `.AppImage`, `.msi`, `.exe`) que funcione 100% sin internet, con actualización automática no destructiva cuando hay conexión.

> **Progreso (2026-06-26):**
> - ✅ **Navegación offline resuelta** con un *custom asset protocol* `app://` en
>   `src-tauri/src/lib.rs` que resuelve URLs sin extensión a su `.html` (igual que un
>   servidor). Render validado: portada + rutas profundas sin extensión.
> - ✅ `tauri-plugin-updater` registrado (Rust + JS) y `tauri.conf.json` con `pubkey`,
>   `endpoint` (`SOLE-Colombia/voltaje`) y `createUpdaterArtifacts`.
> - 🟡 **Falta:** workflow `tauri-release.yml` (build Win/Linux + firma + Release) y
>   llamar al updater desde el front. El esquema `version.json` de abajo se reemplaza por
>   el `latest.json` firmado que genera `tauri-action`.

### C.1 Estructura

```
src-tauri/
├── Cargo.toml
├── tauri.conf.json     # distDir: "../public"
├── icons/
└── src/main.rs         # registra plugin-updater
```

Build: `npm run build` (Quartz genera `public/`) → `npm run tauri build` → empaqueta `public/`.

Tamaño estimado: ~300 MB de instalador (Tauri runtime ~10 MB + `public/` 282 MB).

### C.2 Auto-update no destructivo

1. App arranca → HEAD a `voltaje.solecolombia.org/version.json`.
2. **Sin internet o misma versión** → carga `public/` embebido (fallback eterno).
3. **Nueva versión disponible** → descarga a `$APPDATA/Voltaje/update-pending/`.
4. Verifica hash SHA256 del bundle descargado.
5. `rename("update-pending/", "current/")` — operación atómica.
6. Próximo arranque usa `current/`; el embebido es el fallback si `current/` falla.

**Regla dura**: nunca borrar `current/` antes de validar el nuevo bundle.

### C.3 `version.json` en producción

Publicar en cada deploy:
```json
{
  "version": "2026.05.12",
  "url": "https://voltaje.solecolombia.org/voltaje-desktop-2026.05.12.zip",
  "sha256": "<hash>"
}
```

---

## Decisiones técnicas (log)

| Decisión | Razón | Impacto |
|---|---|---|
| **CANONICAL_FIELDS sin IA** | La IA inventaba variantes que rompían los filtros (`Accesible` ≠ `Gratis`). | Filtros 100% confiables, 0 alucinaciones en campos de filtrado. |
| **Node.js sobre Python** | Ecosistema unificado con Quartz y `gray-matter`. | Elimina errores de RegEx y dependencias extras en CI. |
| **Gemini 3.1 Flash Lite** | Mayor ventana de contexto, mejor tono "cacharrero" que 1.5 Flash. | Traducciones más naturales para audiencias rurales. |
| **429 → PR automático** | Límite API gratuita: 11 RPM. | Permite procesar cientos de archivos en días sucesivos sin intervención. |
| **WebP quality 82, max 1600px** | Equilibrio calidad/peso para zonas con ancho de banda limitado. | Ahorro ~60% vs JPEG original, compatible con todos los navegadores modernos. |
| **Repo único para imágenes** | 44 MB actuales, manejable. R2/LFS tiene complicaciones con Tauri bundle. | Build atómico, sin pasos extra de sync en CI. |
| **Rama `voltaje` como producción** | `main` reservada para upstream de Quartz. | Merge limpio de updates de Quartz sin mezclar con código propio. |

---

## Fase D — Investigación APK Android (sin compromiso)

**Objetivo:** Evaluar opciones para distribuir Voltaje como APK Android (Play Store o sideload) con interactividad completa y comportamiento offline-first. Esta fase es **solo investigación**; la decisión de implementación queda postergada hasta que la Fase B (PWA Workbox) esté estable.

### D.1 Comparativa de opciones

| Opción | Pros | Contras | Veredicto preliminar |
|---|---|---|---|
| **TWA (Trusted Web Activity, Bubblewrap)** | Reusa el PWA al 100%, Chrome Custom Tabs sin barra, APK ~2 MB, instalable en Play Store. | Requiere HTTPS público + Digital Asset Links, **no es offline-first** en primer arranque (carga online hasta que SW precachee), depende de Chrome del dispositivo. | Inviable para offline-first puro. |
| **Capacitor (Ionic)** | Bundle local de `public/`, plugins nativos (filesystem, share, intents), Play Store OK, mismo flujo que Tauri pero para Android. APK ~15-25 MB + contenido. | Toolchain extra (npm + Gradle + Android SDK), build más complejo, runtime estilo Cordova. | **Recomendado** para offline-first + Play Store. |
| **WebView Kotlin nativo** | Control total, APK ~5 MB + contenido, no runtime adicional. | Mantener app Kotlin desde cero, sin hot-reload del bundle web, requiere expertise Android. | Solo si hay equipo Android disponible. |
| **PWA "Agregar a pantalla de inicio"** | Cero esfuerzo adicional, ya disponible al cerrar Fase B. | No está en Play Store, descubrimiento limitado, dependencia del navegador. | Status quo aceptable mientras se decide. |

### D.2 Criterios de decisión (a discutir antes de implementar)

1. ¿Necesita estar en Play Store para descubrimiento o basta sideload + sitio?
2. ¿Debe funcionar 100% offline desde el primer arranque, sin red?
3. ¿Tamaño de APK aceptable con bundle de contenido (>50 MB con imágenes)?
4. ¿Quién mantiene el toolchain Android a largo plazo?
5. ¿Hay presupuesto para firmar y publicar en Play Store ($25 USD one-time + revisión)?

### D.3 Recomendación preliminar

**Capacitor con bundle completo de `public/`** — espejo del approach Tauri ya usado para PC. Permite Play Store, ofrece offline-first real, y comparte la lógica del sitio con la versión web sin duplicar contenido. Postponer hasta cerrar Fase B.

---

## Limitaciones conocidas del ZIP offline (file://)

El ZIP descargable para PC/Mac (`scripts/build-offline-zip.mjs`) funciona abriendo cualquier `.html` por doble click, pero tiene límites técnicos del protocolo `file://`:

- **Búsqueda full-text (Flexsearch)** puede no operar en Chrome `file://` por restricción a Web Workers locales — recomendar Firefox como alternativa.
- **Service Worker desactivado** en ZIP (no aplica en `file://`); todo el offline depende de la copia local del árbol.
- **Telemetría Umami desactivada** en ZIP — los eventos no se reportan al servidor.
- **Grafo de soluciones (D3)** se carga como bundle estático (~80 KB extra en el ZIP) porque el `dynamic import("d3")` falla en `file://` por MIME del chunk.
- **Explorer / índice de contenido** ~~se sirve inline en cada HTML~~ **RESUELTO (2026-06-26):** `contentIndex.json` (~2.1 MB) ya **no** se inyecta en cada página; se emite **una sola** copia en `static/contentIndex.js` (define `window.__VOLTAJE_CONTENT_INDEX__`) cargada vía `<script>`. `offline-build` bajó de ~1.5 GB a **~277 MB** (ZIP ~609 MB y bajando). Aun así, la navegación por links generados en runtime (grafo/búsqueda/popovers) no resuelve en `file://` sin servidor → **Tauri (Fase C) es el camino offline real.**
- **`history.replaceState()`** está bloqueado en algunos navegadores en `file://`; los filtros persisten en `localStorage` pero no en la URL.

---

## Fase F — Evaluar migración a Quartz v5 (sin compromiso)

**Objetivo:** Decidir si y cuándo migrar de Quartz **4.6** (actual) a **v5** (publicada a
fines de mayo 2026). Esta fase es **solo evaluación**; no hay compromiso de migrar.

### F.1 Qué cambia en v5

- **Config:** `quartz.config.ts` (TypeScript) → `quartz.config.yaml` (YAML).
- **Plugins:** dejan de ser parte del core y pasan a **paquetes git standalone** del
  org `quartz-community`, instalados por separado, con **patrón factory** (estilo
  integraciones de Astro) y dependencias `@quartz-community/types|utils|runtime`.

### F.2 Costo para este repo (alto)

Voltaje tiene mucho código custom que habría que **reescribir como paquetes community**:
`quartz/plugins/emitters/pwa.ts`, `offlineGuide.ts`, `youtubeFacade.ts`, y componentes
`SolveFilterGrid`, `SolveFilterSidebar`, `SolveRelationsGraph`, `StepProgress`, `Head.tsx`.
Riesgo concreto de romper PWA / offline / Tauri, que son el corazón del proyecto.

### F.3 Recomendación

**Quedarse en 4.6.** El beneficio inmediato de v5 es bajo y el costo/riesgo alto.
Reevaluar cuando: (a) exista la guía oficial "Migrating to Quartz 5", (b) el ecosistema
`quartz-community` esté maduro, (c) haya equivalentes a los plugins custom o tiempo para
portarlos. Vigilar el repo `quartz-community` y los release notes de v5.x.

> **Nota sobre edición de contenido:** se evaluó un dashboard/CMS web (Sveltia/Decap) y se
> **descartó**. La edición se hace con **Obsidian + git**, alineado con cómo funciona Quartz;
> un panel web duplicaría el flujo sin aportar. Las automatizaciones siguen por GitHub Actions
> (`workflow_dispatch` para disparos manuales). Ver `docs/editorial/MANUAL_COLABORADORES.md`.

---

## Backlog largo plazo

- **Kiwix / ZIM**: Pipeline Docker para generar `.zim` para servidores escolares. Requiere evaluación de `zim-tools` y mantenimiento del pipeline.
- **yt-dlp + ffmpeg en Tauri**: Descarga de videos YouTube como WebM (VP9) al build, embebidos en el ejecutable para uso 100% offline.
- **Ejecutable ligero + descarga separada**: Instalador de ~50 MB + descarga opcional de contenido completo en primer arranque.
