<div align="center">

# ⚡ SOLE Voltaje

### Una guía de soluciones de conectividad — *cacharreando juntas para inventar otros internets posibles*

[![Sitio en vivo](https://img.shields.io/badge/🌐_Sitio-voltaje.solecolombia.org-2563eb?style=for-the-badge)](https://voltaje.solecolombia.org)
[![Descarga offline](https://img.shields.io/badge/⬇️_Descarga-offline-16a34a?style=for-the-badge)](../../releases)

![Idiomas](https://img.shields.io/badge/idiomas-ES_·_EN_·_PT-f97316)
![Construido con](https://img.shields.io/badge/Quartz-4.6-8b5cf6)
![Offline first](https://img.shields.io/badge/offline-first-0ea5e9)
![Auto deploy](https://img.shields.io/badge/deploy-GitHub_Actions-111827)

</div>

---

> ⚠️ **Repositorio generado automáticamente.** No edites aquí: cada deploy
> sobrescribe el contenido. Los cambios se hacen en el repositorio fuente y se
> publican vía GitHub Actions.

## ¿Qué es esto?

Este repositorio contiene el **sitio estático ya compilado** (HTML/CSS/JS) de
**SOLE Voltaje**, servido con **GitHub Pages**. No es el código fuente: es el
resultado del build.

**SOLE Voltaje** es una base de conocimiento pensada para comunidades con
conexión limitada o nula. Reúne **soluciones** técnicas paso a paso, **historias**
que inspiran y un **glosario** claro, en **español, inglés y portugués**, con
foco en uso **offline-first**.

## 📊 Avance del proyecto

```
Núcleo del sitio   ████████████████████  100%
Traducción ES→EN/PT ████████████████████  100%
Offline (PWA/ZIP)  ██████████████░░░░░░   70%
App de escritorio  ████████████████░░░░   80%
```

| Área | Estado |
|------|--------|
| 🏗️ Build & deploy (Quartz 4.6 + GitHub Actions) | ✅ Listo |
| 🌍 Traducción automática ES → EN / PT | ✅ Listo |
| 🔎 Buscador, grafo de soluciones, filtros | ✅ Listo |
| 📦 ZIP offline liviano (índice compartido) | ✅ Listo |
| 🖥️ App de escritorio (Tauri) — navegación offline | ✅ Listo |
| 🔄 Auto-update de la app | 🟡 En progreso |
| 📲 PWA offline real (Workbox) | 🟡 En progreso |
| 🤖 Release automático de instaladores | ⬜ Pendiente |

> 📍 **[Ver el roadmap completo →](./ROADMAP.md)** — fases, decisiones técnicas y backlog.

## 📥 Usar sin internet

- **App de escritorio** (Windows / Linux): instalador que funciona 100% offline → pestaña **[Releases](../../releases)**.
- **ZIP del sitio**: paquete que abres con `file://` (sin servidor) → también en **[Releases](../../releases)**.

## 🛠️ Cómo se genera

| Paso | Herramienta |
|------|-------------|
| Contenido | Obsidian + Markdown (repo privado `voltaje-dev`) |
| Build | [Quartz v4](https://quartz.jzhao.xyz/) |
| Deploy | GitHub Actions → `main` → GitHub Pages |
| Empaquetado offline | `build-offline-zip.mjs` + app Tauri |

## 🤝 Créditos

Proyecto de **[SOLE Colombia](https://solecolombia.org)** · hecho con cariño para
quienes inventan conectividad donde no la hay.

---

_Generado automáticamente · commit `88105c24859674a17fc46240b6ad6d6d421d77bc` · 2026-06-26 UTC_
