/* =========================================================================
   AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (PORTAL ARCHITECTURE)
   ========================================================================= */

let premiumScrollTarget = null;
const BASE_PRICE = 1600;

// 1. Zabezpieczenie przed "skakaniem" przeglądarki
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 1a. KRYTYCZNE: Firefox BFCache Killswitch
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

// 2. Rejestracja wtyczek GSAP
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- PEŁNA, ROZWINIĘTA BAZA DANYCH MODUŁÓW ---
const moduleDatabase = {
    'tools': {
        number: 'Moduł 01',
        title: 'Narzędzia',
        desc: 'Wszystko, co pozwoli Ci działać. Niezbędny hardware do przetrwania w terenie.',
        image: 'https://images.unsplash.com/photo-1589104052309-84b2c15e83ce?q=80&w=1200&auto=format&fit=crop',
        items: [
            'metalowa piła strunowa 65 cm',
            'długopis taktyczny z wybijakiem',
            'gwizdek',
            'nóż składany z blokadą back lock, długość ostrza 63 mm, z klipsem',
            'wielofunkcyjna karta survivalowa 15w1 (m.in. klucz, miarka, śrubokręt, nóż)',
            'latarka czołowa z diodą LED i czterema trybami świecenia',
            'krzesiwo z prętem magnesium, blaszka do krzesania z otwieraczem',
            'koc termiczny 130x210 cm, knoty sznurkowe na rozpałkę',
            'bransoleta paracord z kompasem i krzesiwem, uchwyt na butelkę do paska',
            'zestaw do wędkowania (żyłka, 2 haczyki, 2 spławiki, 2 ciężarki)',
            'spork z sześcioma funkcjami (m.in. nóż, widelec, łyżka, otwieracz, gwizdek)',
            'zamykany pojemnik do przechowywania zestawu Mamba Tac All in One',
            'narzędzie wielofunkcyjne Mamba Tac Axe Solver 19w1'
        ]
    },
    'orientation': {
        number: 'Moduł 02',
        title: 'Orientacja',
        desc: 'Znajdź drogę, utrzymaj świadomość sytuacyjną i komunikację.',
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
        items: [
            'baterie alkaliczne rozmiar AA / R6 x4',
            'przezroczyste wodoodporne etui na dokumenty, rozm. 130 x 200 mm',
            'mapa foliowana rozkładana, mapa samochodowa Polski w skali 1:700 000'
        ]
    },
    'shelter': {
        number: 'Moduł 03',
        title: 'Schronienie',
        desc: 'Ochrona przed żywiołami i izolacja termiczna.',
        image: 'https://images.unsplash.com/photo-1504280390224-3ea3391b1513?q=80&w=1200&auto=format&fit=crop',
        items: [
            'śpiwór termiczny w formie worka ratunkowego, z wytrzymałej folii NRC',
            'wodoodporny namiot termiczny z folii NRC, wymiary po rozłożeniu: 240 x 110 x 90 cm',
            'ponczo przeciwdeszczowe wielorazowe Texar Olive, rozmiar uniwersalny'
        ]
    },
    'nutrition': {
        number: 'Moduł 04',
        title: 'Wyżywienie',
        desc: 'Kluczowe nawodnienie i wysokoenergetyczne paliwo kognitywne.',
        image: 'https://images.unsplash.com/photo-1622484211148-356ec37db7bb?q=80&w=1200&auto=format&fit=crop',
        items: [
            'tabletki do uzdatniania Javel, odkażania wody pitnej, gotowe w 30 min, x20',
            'suche racje żywieniowe Seven Oceans 500g, kaloryczność 2500 kcal, 9 tabliczek po dwa batony',
            'kubek termiczny M-Tac 280ml z pokrywką, próżniowy, kolor oliwkowy'
        ]
    },
    'hygiene': {
        number: 'Moduł 05',
        title: 'Higiena',
        desc: 'Prewencja chorobowa i czystość operacyjna w każdych warunkach.',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop',
        items: [
            'żel pod prysznic w buteleczce 30 ml x2, szampon w buteleczce 30 ml x2, mydełko w kostce',
            'grzebień, igielnik z nitką, maszynka do golenia, zestaw dentystyczny szczoteczka z pastą x2',
            'kosmetyczka militarna rozkładana M-Tac, wym. 270 x 160 mm, rozłożona 420 x 270 mm'
        ]
    },
    'medical': {
        number: 'Moduł 06',
        title: 'Pierwsza Pomoc',
        desc: 'Zabezpieczenie ran, urazów i wsparcie medyczne.',
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1200&auto=format&fit=crop',
        items: [
            'wielorazowy ogrzewacz do rąk para, utrzymanie ciepła 10 h',
            'apteczka pierwszej pomocy w etui DIN 13164, ponad 30 elementów w tym koc, rękawiczki, nożyczki, opatrunki i opaski'
        ]
    }
};


/* =========================================================================
   GLOBALNE FUNKCJE LOGIKI PRODUKTU (Współpracują z HTML onclick)
   ========================================================================= */

window.openDossier = function(moduleId) {
    const data = moduleDatabase[moduleId];
    if (!data) return;

    const dossierImage = document.getElementById('dossier-image');
    if (dossierImage) dossierImage.style.backgroundImage = `url('${data.image}')`;

    const numberEl = document.getElementById('dossier-number');
    const titleEl = document.getElementById('dossier-title');
    const descEl = document.getElementById('dossier-desc');
    
    if(numberEl) numberEl.innerText = data.number;
    if(titleEl) titleEl.innerText = data.title;
    if(descEl) descEl.innerText = data.desc;

    const listContainer = document.getElementById('dossier-list');
    if (listContainer) {
        listContainer.innerHTML = ''; 
        data.items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-4';
            li.innerHTML = `<span class="text-brand-gold mt-1 font-mono text-[10px]">///</span><span class="leading-relaxed font-light text-sm">${item}</span>`;
            listContainer.appendChild(li);
        });
    }

    const overlay = document.getElementById('dossier-overlay');
    const panel = document.getElementById('dossier-panel');
    
    document.body.style.overflow = 'hidden';
    
    if (overlay) {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
    }
    if (panel) {
        panel.classList.remove('translate-y-12');
        panel.classList.add('translate-y-0');
    }
};

window.closeDossier = function() {
    const overlay = document.getElementById('dossier-overlay');
    const panel = document.getElementById('dossier-panel');
    
    if (overlay) {
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    }
    if (panel) {
        panel.classList.remove('translate-y-0');
        panel.classList.add('translate-y-12');
    }

    // Płynne przywrócenie scrolla po zamknięciu animacji
    setTimeout(() => { document.body.style.overflow = ''; }, 700); 
};

window.updateQuantity = function(change) {
    const input = document.getElementById('qty-input');
    if (!input) return;
    
    let currentValue = parseInt(input.value);
    let newValue = currentValue + change;
    
    if (newValue >= 1 && newValue <= 10) { 
        input.value = newValue;
        window.updatePriceDisplay(newValue);
    }
};

window.updatePriceDisplay = function(quantity) {
    const priceElement = document.getElementById('price-display');
    if (priceElement) {
        const formattedPrice = (BASE_PRICE * quantity).toLocaleString('pl-PL');
        
        priceElement.style.opacity = '0.5';
        setTimeout(() => {
            priceElement.innerText = `${formattedPrice} PLN`;
            priceElement.style.opacity = '1';
        }, 150);
    }
};

window.changeMainImage = function(imageUrl, btnElement) {
    const mainBg = document.getElementById('main-image-bg');
    if (mainBg) {
        mainBg.style.opacity = '0';
        setTimeout(() => {
            mainBg.style.backgroundImage = `url('${imageUrl}')`;
            mainBg.style.opacity = '1';
        }, 150); 
    }
    
    const thumbnails = document.querySelectorAll('.thumbnail-btn');
    thumbnails.forEach(btn => {
        btn.classList.remove('border-brand-gold');
        btn.classList.add('border-white/5');
        const imgInner = btn.querySelector('.thumbnail-inner');
        if (imgInner) imgInner.classList.add('brightness-50');
    });
    
    if (btnElement) {
        btnElement.classList.remove('border-white/5');
        btnElement.classList.add('border-brand-gold');
        const clickedImgInner = btnElement.querySelector('.thumbnail-inner');
        if (clickedImgInner) clickedImgInner.classList.remove('brightness-50');
    }
};

window.scrollThumbnails = function(direction) {
    const container = document.getElementById('thumbnail-container');
    if (!container) return;
    const scrollAmount = 130; 
    
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
};

window.navigateMainImage = function(direction) {
    const thumbnails = Array.from(document.querySelectorAll('.thumbnail-btn'));
    if (thumbnails.length === 0) return;
    
    let activeIndex = thumbnails.findIndex(btn => btn.classList.contains('border-brand-gold'));
    if (activeIndex === -1) activeIndex = 0;
    
    let newIndex;
    if (direction === 'next') {
        newIndex = (activeIndex + 1) % thumbnails.length;
    } else {
        newIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
    }
    
    thumbnails[newIndex].click();
    thumbnails[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
};

window.openLightbox = function() {
    const dossierImage = document.getElementById('dossier-image');
    if (!dossierImage) return;

    const imageUrl = dossierImage.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageUrl;
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => { lightboxImg.classList.remove('scale-90'); }, 50);
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.classList.add('scale-90');
        lightbox.classList.add('opacity-0', 'pointer-events-none');
    }
};


/* =========================================================================
   SILNIKI ANIMACJI GSAP I CYKL ŻYCIA
   ========================================================================= */

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach((el) => {
        el.classList.remove('visible'); 
        observer.observe(el);
    });
}

function initBackpackCardsAnimation() {
    const cards = document.querySelectorAll('#wybor-plecaka a');
    if (cards.length === 0) return;

    gsap.fromTo(cards, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: "#wybor-plecaka", start: "top 70%", toggleActions: "play none none reverse" }
        }
    );
}

function initHeroAndThreatAnimations() {
    const hero = document.querySelector("#hero");
    if (hero) {
        gsap.to(hero, {
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
            scale: 0.95, opacity: 0.5, filter: "blur(10px)", ease: "none"
        });
    }

    gsap.from(".threat-line-1, .threat-line-2, .threat-line-3", {
        scrollTrigger: { trigger: ".threat-header", start: "top 85%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1.2, stagger: 0.25, ease: "power3.out"
    });

    gsap.fromTo(".threat-grid > div", 
        { y: 60, opacity: 0 }, 
        {
            y: 0, opacity: 1, duration: 1.5, stagger: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: ".threat-grid", start: "top 70%", end: "top 0%", scrub: 4 }
        }
    );
}

function initFeatureGridAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length === 0) return;

    gsap.fromTo(featureCards, 
        { y: 40, opacity: 0 }, 
        {
            y: 0, opacity: 1, duration: 1.5, stagger: 0.4, ease: "power2.out",
            scrollTrigger: { trigger: ".feature-grid-container", start: "top 60%", toggleActions: "play none none reverse" }
        }
    );
}

function initLightboxBind() {
    const dossierImage = document.getElementById('dossier-image');
    if (dossierImage) {
        dossierImage.style.cursor = 'zoom-in';
        dossierImage.onclick = window.openLightbox;
    }
}

function initFAQ() {
    const triggers = document.querySelectorAll('.faq-trigger');
    triggers.forEach(trigger => {
        // Usuwanie starych eventów by uniknąć wycieków przy przejściach SPA
        trigger.removeEventListener('click', trigger._faqHandler);
        trigger._faqHandler = () => {
            const parent = trigger.closest('.faq-item');
            parent.classList.toggle('active');
            const expanded = parent.classList.contains('active');
            trigger.setAttribute('aria-expanded', expanded);
        };
        trigger.addEventListener('click', trigger._faqHandler);
    });
}

function initContactForm() {
    const privacyCheckbox = document.getElementById('privacy-policy');
    const submitBtn = document.getElementById('submit-btn');

    if (!privacyCheckbox || !submitBtn) return;

    // Resetowanie eventu by uniknąć wycieków
    const newCheckbox = privacyCheckbox.cloneNode(true);
    privacyCheckbox.parentNode.replaceChild(newCheckbox, privacyCheckbox);

    newCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-40', 'pointer-events-none', 'grayscale');
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(submitBtn, { scale: 0.98 }, { scale: 1, duration: 0.4, ease: "back.out(1.5)" });
            }
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-40', 'pointer-events-none', 'grayscale');
        }
    });
}

function scrollToAnchor(hash) {
    if (!hash || typeof hash !== 'string') return; 
    
    const targetId = hash.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const navOffset = 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;
        
        document.documentElement.classList.remove('scroll-smooth');
        
        gsap.to(document.scrollingElement, {
            scrollTop: targetPosition, duration: 1.8, ease: "power4.inOut", overwrite: "auto",
            onComplete: () => { document.documentElement.classList.add('scroll-smooth'); }
        });
    }
}

function initNavLinks() {
    const anchorLinks = document.querySelectorAll('a[href*="#wybor-plecaka"], a[href*="#opis-produktu"]');

    anchorLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        newLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            const href = newLink.getAttribute('href');
            const [pathPart, hashPart] = href.split('#');
            const currentClean = window.location.pathname.replace(/\/$/, '').replace('/index.html', '');
            const targetClean = pathPart ? pathPart.replace(/\/$/, '').replace('/index.html', '') : currentClean;

            const isSamePage = (currentClean === targetClean);

            if (isSamePage) {
                scrollToAnchor(hashPart);
            } else {
                premiumScrollTarget = hashPart;
                if (typeof barba !== 'undefined') { 
                    barba.go(pathPart || '/'); 
                } else { 
                    window.location.href = href; 
                }
            }
        });
    });
}


/* =========================================================================
   PORTAL ENGINE (Naprawa okienek ucinanych przez Barba.js i GSAP)
   ========================================================================= */
function setupPortals() {
    const dossier = document.getElementById('dossier-overlay');
    const lightbox = document.getElementById('lightbox-overlay');
    
    // Okienka były ucinane przez własność `transform` w tagu <main>. 
    // To wyciąga je z `<main>` i wrzuca bezpośrednio do `<body>` zaraz po załadowaniu.
    if (dossier && dossier.parentNode !== document.body) {
        document.body.appendChild(dossier);
    }
    if (lightbox && lightbox.parentNode !== document.body) {
        document.body.appendChild(lightbox);
    }
}


/* =========================================================================
   GŁÓWNY INICJATOR
   ========================================================================= */
function initAll(targetHash = null) {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
    
    setTimeout(() => {
        // WYWOŁANIE PORTALI - To naprawia problem renderowania pop-upów!
        setupPortals();
        
        initAnimations();
        initBackpackCardsAnimation();
        initHeroAndThreatAnimations();
        initFeatureGridAnimation();
        initFAQ();
        initLightboxBind();
        initContactForm(); 
        initNavLinks();
       
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }

        let hashToScroll = null;

        if (premiumScrollTarget) {
            hashToScroll = premiumScrollTarget;
            premiumScrollTarget = null;
        } else if (window.location.hash) {
            hashToScroll = window.location.hash;
        }

        if (hashToScroll) {
            scrollToAnchor(hashToScroll);
        }
    }, 50); 
}

window.addEventListener("load", () => initAll());


/* =========================================================================
   SILNIK INTEGRACJI BARBA.JS + GSAP
   ========================================================================= */
if (typeof barba !== 'undefined') {
    barba.init({
        sync: false, // Zapobiega nakładaniu się kontenerów na siebie
        transitions: [{
            name: 'cinematic-focus',
            async leave(data) {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(t => t.kill());
                
                const hero = document.querySelector("#hero");
                if (hero) gsap.set(hero, { clearProps: "all" });

                // ODZYSKANIE SCROLLA: Jeśli użytkownik zmieni stronę z otwartym panelem
                document.body.style.overflow = '';

                // SPRZĄTANIE PORTALU: Upewniamy się, że nie zdublujemy okienek w <body>
                document.querySelectorAll('body > #dossier-overlay, body > #lightbox-overlay').forEach(el => el.remove());

                return gsap.to(data.current.container, {
                    y: 40, opacity: 0, filter: "blur(15px)", duration: 0.6, ease: "power2.inOut"
                });
            },
            async enter(data) {
                window.scrollTo(0, 0); // Natychmiastowy reset pozycji paska przed animacją wejścia
                gsap.set(data.next.container, { y: -40, opacity: 0, filter: "blur(15px)" });
                
                return gsap.to(data.next.container, {
                    y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                    clearProps: "all" // <--- KLUCZ, USUWA RESZTKOWE TRANSFORMACJE GSAP
                });
            },
            after() {
                initAll();
            }
        }]
    });
}
