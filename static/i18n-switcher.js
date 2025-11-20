/**
 * SOLE Voltaje - Sistema de cambio de idioma (i18n)
 * 
 * Este script crea un botón flotante para cambiar entre español e inglés
 * en cualquier página del sitio.
 */

(function() {
  'use strict';
  
  // Configuración
  const config = {
    languages: {
      es: {
        code: 'es',
        name: 'Español',
        flag: '🇪🇸',
        switchTo: 'English'
      },
      en: {
        code: 'en',
        name: 'English',
        flag: '🇬🇧',
        switchTo: 'Español'
      }
    }
  };
  
  /**
   * Detecta el idioma actual basándose en la URL
   */
  function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/es/')) return 'es';
    if (path.startsWith('/en/')) return 'en';
    return null; // Página de inicio o sin idioma
  }
  
  /**
   * Obtiene la URL equivalente en el otro idioma
   */
  function getAlternateURL(currentLang) {
    const path = window.location.pathname;
    
    if (currentLang === 'es') {
      // Cambiar de español a inglés
      return path.replace('/es/', '/en/');
    } else if (currentLang === 'en') {
      // Cambiar de inglés a español
      return path.replace('/en/', '/es/');
    }
    
    return '/'; // Volver al inicio si no se puede determinar
  }
  
  /**
   * Crea el botón flotante de cambio de idioma
   */
  function createLanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    
    // No mostrar el botón en la página de inicio
    if (!currentLang) return;
    
    const targetLang = currentLang === 'es' ? 'en' : 'es';
    const langConfig = config.languages[targetLang];
    const alternateURL = getAlternateURL(currentLang);
    
    // Crear el botón
    const button = document.createElement('a');
    button.href = alternateURL;
    button.className = 'i18n-switcher-button';
    button.title = `Cambiar a ${langConfig.name} | Switch to ${langConfig.name}`;
    button.setAttribute('aria-label', `Cambiar idioma a ${langConfig.name}`);
    
    // Contenido del botón
    button.innerHTML = `
      <span class="i18n-flag">${langConfig.flag}</span>
      <span class="i18n-text">${langConfig.code.toUpperCase()}</span>
    `;
    
    // Agregar al body
    document.body.appendChild(button);
    
    // Animación de entrada
    setTimeout(() => {
      button.classList.add('visible');
    }, 500);
  }
  
  /**
   * Inicializa el sistema cuando el DOM está listo
   */
  function init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createLanguageSwitcher);
    } else {
      createLanguageSwitcher();
    }
  }
  
  // Iniciar
  init();
})();

