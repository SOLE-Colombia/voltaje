// SOLE Voltaje — Service Worker (voltaje-v7)
// Generado automáticamente por el emitter PWA de Quartz.
// NO editar manualmente — se sobreescribe en cada build.

const SW_VERSION = 'voltaje-v7';
const CACHE_SHELL   = SW_VERSION + '-shell';
const CACHE_ASSETS  = SW_VERSION + '-assets';
const CACHE_PAGES   = SW_VERSION + '-pages';

// ─── Precache lists ────────────────────────────────────────────────────────

const SHELL_URLS = [
  "/",
  "/index.html",
  "/index.css",
  "/postscript.js",
  "/manifest.json",
  "/static/icon.png",
  "/static/icon-192.png",
  "/static/icon-512.png",
  "/static/prescript.js",
  "/assets/images/solv-spread-message/solv-spread-message-wallsign-2.webp",
  "/assets/images/solv-spread-message/solv-spread-message-wapp-2.jpeg",
  "/bases-datos/conceptos",
  "/bases-datos/desconectados",
  "/bases-datos/",
  "/bases-datos/inspiraciones",
  "/bases-datos/soluciones",
  "/en/answers-comments/",
  "/en/disconnected/",
  "/en/glossary/conc-2g-net",
  "/en/glossary/conc-3g-4g-antennas",
  "/en/glossary/conc-ai-helper",
  "/en/glossary/conc-antenna",
  "/en/glossary/conc-bandwidth",
  "/en/glossary/conc-canva",
  "/en/glossary/conc-client",
  "/en/glossary/conc-coaxial-cable",
  "/en/glossary/conc-command-prompt",
  "/en/glossary/conc-cpu-processor",
  "/en/glossary/conc-daemon",
  "/en/glossary/conc-dhcp-protocol",
  "/en/glossary/conc-dns",
  "/en/glossary/conc-dnsmasq",
  "/en/glossary/conc-docker-container",
  "/en/glossary/conc-domain-name",
  "/en/glossary/conc-edge-connection",
  "/en/glossary/conc-ethernet",
  "/en/glossary/conc-firewall",
  "/en/glossary/conc-firmware",
  "/en/glossary/conc-flashdrive-usb",
  "/en/glossary/conc-gprs",
  "/en/glossary/conc-hardware",
  "/en/glossary/conc-hostapd-daemon",
  "/en/glossary/conc-hspa-technology",
  "/en/glossary/conc-imei-code",
  "/en/glossary/conc-information-system",
  "/en/glossary/conc-interface",
  "/en/glossary/conc-ip-address",
  "/en/glossary/conc-javascript-language",
  "/en/glossary/conc-latency",
  "/en/glossary/conc-linux-system",
  "/en/glossary/conc-local-network",
  "/en/glossary/conc-lte-4g-connection",
  "/en/glossary/conc-mifi-modem",
  "/en/glossary/conc-network-agents",
  "/en/glossary/conc-nginx",
  "/en/glossary/conc-operating-system",
  "/en/glossary/conc-paquetes-internet",
  "/en/glossary/conc-php-language",
  "/en/glossary/conc-ping-program",
  "/en/glossary/conc-python-language",
  "/en/glossary/conc-radio-enlace",
  "/en/glossary/conc-ram-memory",
  "/en/glossary/conc-raspberry-pi",
  "/en/glossary/conc-rg6-cable",
  "/en/glossary/conc-router",
  "/en/glossary/conc-sdmemory",
  "/en/glossary/conc-server",
  "/en/glossary/conc-simcard",
  "/en/glossary/conc-smartphone",
  "/en/glossary/conc-ssh-protocol",
  "/en/glossary/conc-ssid-identifier",
  "/en/glossary/conc-storage-disk",
  "/en/glossary/conc-swap-memory",
  "/en/glossary/conc-system-folders",
  "/en/glossary/conc-terminal",
  "/en/glossary/conc-umts",
  "/en/glossary/conc-usb-connection",
  "/en/glossary/conc-username",
  "/en/glossary/conc-whatsapp",
  "/en/glossary/conc-wifi",
  "/en/glossary/conc-yagi-antenna",
  "/en/glossary/",
  "/en/",
  "/en/inspire/",
  "/en/inspire/insp-big-questions",
  "/en/inspire/insp-build-memory-solelab",
  "/en/inspire/insp-convince-sharing-internet",
  "/en/inspire/insp-data-for-dollar",
  "/en/inspire/insp-data-usage",
  "/en/inspire/insp-fish-game",
  "/en/inspire/insp-free-internet-for-all",
  "/en/inspire/insp-granny-cloud",
  "/en/inspire/insp-granny-no-connection",
  "/en/inspire/insp-granny-questions",
  "/en/inspire/insp-hilando-vidas-OIM",
  "/en/inspire/insp-how-internet-travels",
  "/en/inspire/insp-how-internet-works",
  "/en/inspire/insp-imagine-collective-futures",
  "/en/inspire/insp-internet-ate-homework",
  "/en/inspire/insp-internet-in-a-box",
  "/en/inspire/insp-internet-in-group",
  "/en/inspire/insp-internet-signal-transmission",
  "/en/inspire/insp-internet-usage-measure",
  "/en/inspire/insp-internetimprove-caceres",
  "/en/inspire/insp-internetimprove-chalan",
  "/en/inspire/insp-internetimprove-coloso",
  "/en/inspire/insp-internetimprove-dominguillo",
  "/en/inspire/insp-internetimprove-nepomuceno",
  "/en/inspire/insp-internetimprove-nuevomexico",
  "/en/inspire/insp-internetimprove-piendamo",
  "/en/inspire/insp-internetimprove-tambo",
  "/en/inspire/insp-internetimprove-valdivia",
  "/en/inspire/insp-life-and-technology",
  "/en/inspire/insp-make-SOLE",
  "/en/inspire/insp-others-build-antenna3g",
  "/en/inspire/insp-privileged-finance-internet",
  "/en/inspire/insp-save-money-fixing",
  "/en/inspire/insp-searching-for-solutions",
  "/en/inspire/insp-sharing-your-internet",
  "/en/inspire/insp-sociotech-cacharreras",
  "/en/inspire/insp-sole-unal",
  "/en/inspire/insp-solecolombia-in-thailand",
  "/en/inspire/insp-solecolombia-is-us",
  "/en/inspire/insp-solelab-boca-camarones",
  "/en/inspire/insp-solelab-tambo",
  "/en/inspire/insp-solved-on-my-own",
  "/en/inspire/insp-speed-access-info",
  "/en/inspire/insp-tinkerer-corner",
  "/en/inspire/insp-tinkerer-inspiration",
  "/en/inspire/insp-tinkerer-since-kid",
  "/en/inspire/insp-voltaje-test01",
  "/en/inspire/insp-voltaje-test02",
  "/en/inspire/insp-voltaje-test03",
  "/en/inspire/insp-voltaje-test04",
  "/en/inspire/insp-voltaje-tests",
  "/en/inspire/insp-what-is-internet",
  "/en/inspire/insp-who-is-solecolombia",
  "/en/new-here",
  "/en/nuevo-aqui",
  "/en/solve/",
  "/en/solve/solv-agree-with-neighbors",
  "/en/solve/solv-ally-with-places",
  "/en/solve/solv-bandwidth",
  "/en/solve/solv-bicigenerator",
  "/en/solve/solv-build-3Gantenna",
  "/en/solve/solv-buy-cellphone",
  "/en/solve/solv-buy-computer",
  "/en/solve/solv-buy-phone-plan",
  "/en/solve/solv-buy-satellite-antenna",
  "/en/solve/solv-choose-satellite-internet",
  "/en/solve/solv-community-meeting-space",
  "/en/solve/solv-create-poweful-message",
  "/en/solve/solv-debian-thinkpad-server",
  "/en/solve/solv-discover-audience",
  "/en/solve/solv-donated-equipment",
  "/en/solve/solv-endless",
  "/en/solve/solv-express-invite",
  "/en/solve/solv-financial-support-connect",
  "/en/solve/solv-find-allied-spaces",
  "/en/solve/solv-find-wifi-app",
  "/en/solve/solv-fish-game",
  "/en/solve/solv-full-server",
  "/en/solve/solv-funding-community-internet",
  "/en/solve/solv-improve-signal-can",
  "/en/solve/solv-improve-signal-router",
  "/en/solve/solv-install-3G-antenna",
  "/en/solve/solv-internet-quality-diagnosis",
  "/en/solve/solv-internet-speedtest",
  "/en/solve/solv-jangala-install-box",
  "/en/solve/solv-jangala-internet-box",
  "/en/solve/solv-know-ram",
  "/en/solve/solv-know-wifi-passwords",
  "/en/solve/solv-need-3Gantenna",
  "/en/solve/solv-organize-space",
  "/en/solve/solv-pocket-wikipedia",
  "/en/solve/solv-powerbank",
  "/en/solve/solv-prueba-ia",
  "/en/solve/solv-purchase-temp-satellite",
  "/en/solve/solv-radio-link",
  "/en/solve/solv-raspberrypi-pocket-internet",
  "/en/solve/solv-save-data-phone",
  "/en/solve/solv-second-life-computer",
  "/en/solve/solv-share-computers",
  "/en/solve/solv-share-internet-cellphone",
  "/en/solve/solv-share-internet-computer",
  "/en/solve/solv-share-internet-wirelessly",
  "/en/solve/solv-sole-tv",
  "/en/solve/solv-spread-message",
  "/en/solve/solv-tricks-mobile-signal",
  "/en/solve/solv-type-internet-signal",
  "/en/solve/solv-usb-internet-router",
  "/en/solve/solv-wiki-phone",
  "/en/solve/solv-write-invitation",
  "/answers-comments/es-importante-aprender-a-transmitir-un-buen-mensaje-para-hacer-una-buena-invitacionna-responses",
  "/answers-comments/",
  "/answers-comments/pregunta-comenta-sole-voltaje",
  "/answers-comments/tienes-preguntas-o-comentarios-responses",
  "/disconnected/",
  "/glossary/conc-2g-net",
  "/glossary/conc-3g-4g-antennas",
  "/glossary/conc-ai-helper",
  "/glossary/conc-antenna",
  "/glossary/conc-bandwidth",
  "/glossary/conc-canva",
  "/glossary/conc-client",
  "/glossary/conc-coaxial-cable",
  "/glossary/conc-command-prompt",
  "/glossary/conc-cpu-processor",
  "/glossary/conc-daemon",
  "/glossary/conc-dhcp-protocol",
  "/glossary/conc-dns",
  "/glossary/conc-dnsmasq",
  "/glossary/conc-docker-container",
  "/glossary/conc-domain-name",
  "/glossary/conc-edge-connection",
  "/glossary/conc-ethernet",
  "/glossary/conc-firewall",
  "/glossary/conc-firmware",
  "/glossary/conc-flashdrive-usb",
  "/glossary/conc-gprs",
  "/glossary/conc-hardware",
  "/glossary/conc-hostapd-daemon",
  "/glossary/conc-hspa-technology",
  "/glossary/conc-imei-code",
  "/glossary/conc-information-system",
  "/glossary/conc-interface",
  "/glossary/conc-ip-address",
  "/glossary/conc-javascript-language",
  "/glossary/conc-latency",
  "/glossary/conc-linux-system",
  "/glossary/conc-local-network",
  "/glossary/conc-lte-4g-connection",
  "/glossary/conc-mifi-modem",
  "/glossary/conc-network-agents",
  "/glossary/conc-nginx",
  "/glossary/conc-operating-system",
  "/glossary/conc-paquetes-internet",
  "/glossary/conc-php-language",
  "/glossary/conc-ping-program",
  "/glossary/conc-python-language",
  "/glossary/conc-radio-enlace",
  "/glossary/conc-ram-memory",
  "/glossary/conc-raspberry-pi",
  "/glossary/conc-rg6-cable",
  "/glossary/conc-router",
  "/glossary/conc-sdmemory",
  "/glossary/conc-server",
  "/glossary/conc-simcard",
  "/glossary/conc-smartphone",
  "/glossary/conc-ssh-protocol",
  "/glossary/conc-ssid-identifier",
  "/glossary/conc-storage-disk",
  "/glossary/conc-swap-memory",
  "/glossary/conc-system-folders",
  "/glossary/conc-terminal",
  "/glossary/conc-umts",
  "/glossary/conc-usb-connection",
  "/glossary/conc-username",
  "/glossary/conc-whatsapp",
  "/glossary/conc-wifi",
  "/glossary/conc-yagi-antenna",
  "/glossary/",
  "/inspire/",
  "/inspire/insp-big-questions",
  "/inspire/insp-build-memory-solelab",
  "/inspire/insp-convince-sharing-internet",
  "/inspire/insp-data-for-dollar",
  "/inspire/insp-data-usage",
  "/inspire/insp-fish-game",
  "/inspire/insp-free-internet-for-all",
  "/inspire/insp-granny-cloud",
  "/inspire/insp-granny-no-connection",
  "/inspire/insp-granny-questions",
  "/inspire/insp-hilando-vidas-OIM",
  "/inspire/insp-how-internet-travels",
  "/inspire/insp-how-internet-works",
  "/inspire/insp-imagine-collective-futures",
  "/inspire/insp-internet-ate-homework",
  "/inspire/insp-internet-in-a-box",
  "/inspire/insp-internet-in-group",
  "/inspire/insp-internet-signal-transmission",
  "/inspire/insp-internet-usage-measure",
  "/inspire/insp-internetimprove-caceres",
  "/inspire/insp-internetimprove-chalan",
  "/inspire/insp-internetimprove-coloso",
  "/inspire/insp-internetimprove-dominguillo",
  "/inspire/insp-internetimprove-nepomuceno",
  "/inspire/insp-internetimprove-nuevomexico",
  "/inspire/insp-internetimprove-piendamo",
  "/inspire/insp-internetimprove-tambo",
  "/inspire/insp-internetimprove-valdivia",
  "/inspire/insp-life-and-technology",
  "/inspire/insp-make-SOLE",
  "/inspire/insp-others-build-antenna3g",
  "/inspire/insp-privileged-finance-internet",
  "/inspire/insp-save-money-fixing",
  "/inspire/insp-searching-for-solutions",
  "/inspire/insp-sharing-your-internet",
  "/inspire/insp-sociotech-cacharreras",
  "/inspire/insp-sole-unal",
  "/inspire/insp-solecolombia-in-thailand",
  "/inspire/insp-solecolombia-is-us",
  "/inspire/insp-solelab-boca-camarones",
  "/inspire/insp-solelab-tambo",
  "/inspire/insp-solved-on-my-own",
  "/inspire/insp-speed-access-info",
  "/inspire/insp-tinkerer-corner",
  "/inspire/insp-tinkerer-inspiration",
  "/inspire/insp-tinkerer-since-kid",
  "/inspire/insp-voltaje-test01",
  "/inspire/insp-voltaje-test02",
  "/inspire/insp-voltaje-test03",
  "/inspire/insp-voltaje-test04",
  "/inspire/insp-voltaje-tests",
  "/inspire/insp-what-is-internet",
  "/inspire/insp-who-is-solecolombia",
  "/new-here",
  "/nuevo-aqui",
  "/solve/",
  "/solve/solv-agree-with-neighbors",
  "/solve/solv-ally-with-places",
  "/solve/solv-bandwidth",
  "/solve/solv-bicigenerator",
  "/solve/solv-build-3Gantenna",
  "/solve/solv-buy-cellphone",
  "/solve/solv-buy-computer",
  "/solve/solv-buy-phone-plan",
  "/solve/solv-buy-satellite-antenna",
  "/solve/solv-choose-satellite-internet",
  "/solve/solv-community-meeting-space",
  "/solve/solv-create-poweful-message",
  "/solve/solv-debian-thinkpad-server",
  "/solve/solv-discover-audience",
  "/solve/solv-donated-equipment",
  "/solve/solv-endless",
  "/solve/solv-express-invite",
  "/solve/solv-financial-support-connect",
  "/solve/solv-find-allied-spaces",
  "/solve/solv-find-wifi-app",
  "/solve/solv-fish-game",
  "/solve/solv-full-server",
  "/solve/solv-funding-community-internet",
  "/solve/solv-improve-signal-can",
  "/solve/solv-improve-signal-router",
  "/solve/solv-install-3G-antenna",
  "/solve/solv-internet-quality-diagnosis",
  "/solve/solv-internet-speedtest",
  "/solve/solv-jangala-install-box",
  "/solve/solv-jangala-internet-box",
  "/solve/solv-know-ram",
  "/solve/solv-know-wifi-passwords",
  "/solve/solv-need-3Gantenna",
  "/solve/solv-organize-space",
  "/solve/solv-pocket-wikipedia",
  "/solve/solv-powerbank",
  "/solve/solv-prueba-ia",
  "/solve/solv-purchase-temp-satellite",
  "/solve/solv-radio-link",
  "/solve/solv-raspberrypi-pocket-internet",
  "/solve/solv-save-data-phone",
  "/solve/solv-second-life-computer",
  "/solve/solv-share-computers",
  "/solve/solv-share-internet-cellphone",
  "/solve/solv-share-internet-computer",
  "/solve/solv-share-internet-wirelessly",
  "/solve/solv-sole-tv",
  "/solve/solv-spread-message",
  "/solve/solv-tricks-mobile-signal",
  "/solve/solv-type-internet-signal",
  "/solve/solv-usb-internet-router",
  "/solve/solv-wiki-phone",
  "/solve/solv-write-invitation",
  "//",
  "/preguntas-provocadoras-inspirate",
  "/pt/answers-comments/",
  "/pt/disconnected/",
  "/pt/glossary/conc-2g-net",
  "/pt/glossary/conc-3g-4g-antennas",
  "/pt/glossary/conc-ai-helper",
  "/pt/glossary/conc-antenna",
  "/pt/glossary/conc-bandwidth",
  "/pt/glossary/conc-canva",
  "/pt/glossary/conc-client",
  "/pt/glossary/conc-coaxial-cable",
  "/pt/glossary/conc-command-prompt",
  "/pt/glossary/conc-cpu-processor",
  "/pt/glossary/conc-daemon",
  "/pt/glossary/conc-dhcp-protocol",
  "/pt/glossary/conc-dns",
  "/pt/glossary/conc-dnsmasq",
  "/pt/glossary/conc-docker-container",
  "/pt/glossary/conc-domain-name",
  "/pt/glossary/conc-edge-connection",
  "/pt/glossary/conc-ethernet",
  "/pt/glossary/conc-firewall",
  "/pt/glossary/conc-firmware",
  "/pt/glossary/conc-flashdrive-usb",
  "/pt/glossary/conc-gprs",
  "/pt/glossary/conc-hardware",
  "/pt/glossary/conc-hostapd-daemon",
  "/pt/glossary/conc-hspa-technology",
  "/pt/glossary/conc-imei-code",
  "/pt/glossary/conc-information-system",
  "/pt/glossary/conc-interface",
  "/pt/glossary/conc-ip-address",
  "/pt/glossary/conc-javascript-language",
  "/pt/glossary/conc-latency",
  "/pt/glossary/conc-linux-system",
  "/pt/glossary/conc-local-network",
  "/pt/glossary/conc-lte-4g-connection",
  "/pt/glossary/conc-mifi-modem",
  "/pt/glossary/conc-network-agents",
  "/pt/glossary/conc-nginx",
  "/pt/glossary/conc-operating-system",
  "/pt/glossary/conc-paquetes-internet",
  "/pt/glossary/conc-php-language",
  "/pt/glossary/conc-ping-program",
  "/pt/glossary/conc-python-language",
  "/pt/glossary/conc-radio-enlace",
  "/pt/glossary/conc-ram-memory",
  "/pt/glossary/conc-raspberry-pi",
  "/pt/glossary/conc-rg6-cable",
  "/pt/glossary/conc-router",
  "/pt/glossary/conc-sdmemory",
  "/pt/glossary/conc-server",
  "/pt/glossary/conc-simcard",
  "/pt/glossary/conc-smartphone",
  "/pt/glossary/conc-ssh-protocol",
  "/pt/glossary/conc-ssid-identifier",
  "/pt/glossary/conc-storage-disk",
  "/pt/glossary/conc-swap-memory",
  "/pt/glossary/conc-system-folders",
  "/pt/glossary/conc-terminal",
  "/pt/glossary/conc-umts",
  "/pt/glossary/conc-usb-connection",
  "/pt/glossary/conc-username",
  "/pt/glossary/conc-whatsapp",
  "/pt/glossary/conc-wifi",
  "/pt/glossary/conc-yagi-antenna",
  "/pt/glossary/",
  "/pt/",
  "/pt/inspire/",
  "/pt/inspire/insp-big-questions",
  "/pt/inspire/insp-build-memory-solelab",
  "/pt/inspire/insp-convince-sharing-internet",
  "/pt/inspire/insp-data-for-dollar",
  "/pt/inspire/insp-data-usage",
  "/pt/inspire/insp-fish-game",
  "/pt/inspire/insp-free-internet-for-all",
  "/pt/inspire/insp-granny-cloud",
  "/pt/inspire/insp-granny-no-connection",
  "/pt/inspire/insp-granny-questions",
  "/pt/inspire/insp-hilando-vidas-OIM",
  "/pt/inspire/insp-how-internet-travels",
  "/pt/inspire/insp-how-internet-works",
  "/pt/inspire/insp-imagine-collective-futures",
  "/pt/inspire/insp-internet-ate-homework",
  "/pt/inspire/insp-internet-in-a-box",
  "/pt/inspire/insp-internet-in-group",
  "/pt/inspire/insp-internet-signal-transmission",
  "/pt/inspire/insp-internet-usage-measure",
  "/pt/inspire/insp-internetimprove-caceres",
  "/pt/inspire/insp-internetimprove-chalan",
  "/pt/inspire/insp-internetimprove-coloso",
  "/pt/inspire/insp-internetimprove-dominguillo",
  "/pt/inspire/insp-internetimprove-nepomuceno",
  "/pt/inspire/insp-internetimprove-nuevomexico",
  "/pt/inspire/insp-internetimprove-piendamo",
  "/pt/inspire/insp-internetimprove-tambo",
  "/pt/inspire/insp-internetimprove-valdivia",
  "/pt/inspire/insp-life-and-technology",
  "/pt/inspire/insp-make-SOLE",
  "/pt/inspire/insp-others-build-antenna3g",
  "/pt/inspire/insp-privileged-finance-internet",
  "/pt/inspire/insp-save-money-fixing",
  "/pt/inspire/insp-searching-for-solutions",
  "/pt/inspire/insp-sharing-your-internet",
  "/pt/inspire/insp-sociotech-cacharreras",
  "/pt/inspire/insp-sole-unal",
  "/pt/inspire/insp-solecolombia-in-thailand",
  "/pt/inspire/insp-solecolombia-is-us",
  "/pt/inspire/insp-solelab-boca-camarones",
  "/pt/inspire/insp-solelab-tambo",
  "/pt/inspire/insp-solved-on-my-own",
  "/pt/inspire/insp-speed-access-info",
  "/pt/inspire/insp-tinkerer-corner",
  "/pt/inspire/insp-tinkerer-inspiration",
  "/pt/inspire/insp-tinkerer-since-kid",
  "/pt/inspire/insp-voltaje-test01",
  "/pt/inspire/insp-voltaje-test02",
  "/pt/inspire/insp-voltaje-test03",
  "/pt/inspire/insp-voltaje-test04",
  "/pt/inspire/insp-voltaje-tests",
  "/pt/inspire/insp-what-is-internet",
  "/pt/inspire/insp-who-is-solecolombia",
  "/pt/new-here",
  "/pt/nuevo-aqui",
  "/pt/solve/",
  "/pt/solve/solv-agree-with-neighbors",
  "/pt/solve/solv-ally-with-places",
  "/pt/solve/solv-bandwidth",
  "/pt/solve/solv-bicigenerator",
  "/pt/solve/solv-build-3Gantenna",
  "/pt/solve/solv-buy-cellphone",
  "/pt/solve/solv-buy-computer",
  "/pt/solve/solv-buy-phone-plan",
  "/pt/solve/solv-buy-satellite-antenna",
  "/pt/solve/solv-choose-satellite-internet",
  "/pt/solve/solv-community-meeting-space",
  "/pt/solve/solv-create-poweful-message",
  "/pt/solve/solv-debian-thinkpad-server",
  "/pt/solve/solv-discover-audience",
  "/pt/solve/solv-donated-equipment",
  "/pt/solve/solv-endless",
  "/pt/solve/solv-express-invite",
  "/pt/solve/solv-financial-support-connect",
  "/pt/solve/solv-find-allied-spaces",
  "/pt/solve/solv-find-wifi-app",
  "/pt/solve/solv-fish-game",
  "/pt/solve/solv-full-server",
  "/pt/solve/solv-funding-community-internet",
  "/pt/solve/solv-improve-signal-can",
  "/pt/solve/solv-improve-signal-router",
  "/pt/solve/solv-install-3G-antenna",
  "/pt/solve/solv-internet-quality-diagnosis",
  "/pt/solve/solv-internet-speedtest",
  "/pt/solve/solv-jangala-install-box",
  "/pt/solve/solv-jangala-internet-box",
  "/pt/solve/solv-know-ram",
  "/pt/solve/solv-know-wifi-passwords",
  "/pt/solve/solv-need-3Gantenna",
  "/pt/solve/solv-organize-space",
  "/pt/solve/solv-pocket-wikipedia",
  "/pt/solve/solv-powerbank",
  "/pt/solve/solv-prueba-ia",
  "/pt/solve/solv-purchase-temp-satellite",
  "/pt/solve/solv-radio-link",
  "/pt/solve/solv-raspberrypi-pocket-internet",
  "/pt/solve/solv-save-data-phone",
  "/pt/solve/solv-second-life-computer",
  "/pt/solve/solv-share-computers",
  "/pt/solve/solv-share-internet-cellphone",
  "/pt/solve/solv-share-internet-computer",
  "/pt/solve/solv-share-internet-wirelessly",
  "/pt/solve/solv-sole-tv",
  "/pt/solve/solv-spread-message",
  "/pt/solve/solv-tricks-mobile-signal",
  "/pt/solve/solv-type-internet-signal",
  "/pt/solve/solv-usb-internet-router",
  "/pt/solve/solv-wiki-phone",
  "/pt/solve/solv-write-invitation",
  "/404.html",
  "/_ABRE_VOLTAJE.html",
  "/assets/images/index.html",
  "/assets/images/solv-spread-message/index.html",
  "/assets/images/solv-spread-message/solv-spread-message-wallsign-2.webp.html",
  "/assets/images/solv-spread-message/solv-spread-message-wapp-2.jpeg.html",
  "/assets/index.html",
  "/bases-datos/conceptos.html",
  "/bases-datos/desconectados.html",
  "/bases-datos/index.html",
  "/bases-datos/inspiraciones.html",
  "/bases-datos/soluciones.html",
  "/en/answers-comments/index.html",
  "/es/answers-comments/es-importante-aprender-a-transmitir-un-buen-mensaje-para-hacer-una-buena-invitacionna-responses.html",
  "/es/answers-comments/index.html",
  "/es/answers-comments/pregunta-comenta-sole-voltaje.html",
  "/es/answers-comments/tienes-preguntas-o-comentarios-responses.html",
  "/es/disconnected/index.html",
  "/es/glossary/conc-2g-net.html",
  "/prescript.js",
  "/static/custom.js",
  "/static/i18n-switcher.css",
  "/static/i18n-switcher.js",
  "/tags/Community.html",
  "/tags/Computing.html",
  "/tags/Devices.html",
  "/tags/Networks.html",
  "/tags/Offline.html",
  "/tags/ddd.html"
];
const PRECACHE_IMAGES = [
  "/static/home-main.png",
  "/static/icon-192.png",
  "/static/icon-512.png",
  "/static/icon-maskable-512.png"
];

// ─── Install: precachear todas las páginas + assets ────────────────────────

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil((async () => {
    try {
      const shellCache = await caches.open(CACHE_SHELL);
      // addAll es atómico: si un solo URL falla, falla todo. Hacemos add por
      // separado y tragamos errores individuales para que el SW quede instalado
      // aunque algún asset secundario falle.
      const validShell = SHELL_URLS.filter(u => {
        try { new URL(u, self.location.origin); return true; } catch { return false; }
      });
      await Promise.allSettled(validShell.map(u => shellCache.add(u)));
    } catch (err) {
      console.warn('[SW] install precache parcial (shell):', err);
    }
    try {
      const assetsCache = await caches.open(CACHE_ASSETS);
      const validImages = PRECACHE_IMAGES.filter(u => {
        try { new URL(u, self.location.origin); return true; } catch { return false; }
      });
      await Promise.allSettled(validImages.map(u => assetsCache.add(u)));
    } catch (err) {
      console.warn('[SW] install precache parcial (assets):', err);
    }
  })());
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

  // Navegaciones HTML sin caché previo → NetworkFirst rápido con fallback al
  // shell. Evita el escenario donde el SPA recibe un 503 y hace location.assign
  // dando sensación de "página caída".
  if (request.mode === 'navigate') {
    event.respondWith(navigationStrategy(request));
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

  const fresh = cached ?? (await fetchPromise);
  if (fresh) return fresh;

  // Fallback final: si es navegación, devolver el shell para que el SPA pueda
  // pintar algo en lugar de provocar location.assign() → recarga en loop.
  if (request.mode === 'navigate') {
    const shell = await cache.match('/') ?? await cache.match('/index.html');
    if (shell) return shell;
  }
  return new Response('Sin conexión', { status: 503 });
}

async function navigationStrategy(request) {
  const cache = await caches.open(CACHE_PAGES);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeout);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    clearTimeout(timeout);
    const cached = await cache.match(request);
    if (cached) return cached;
    const shell = await cache.match('/') ?? await cache.match('/index.html');
    if (shell) return shell;
    return new Response('Sin conexión', { status: 503 });
  }
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
