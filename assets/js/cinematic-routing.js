/* =========================================================================
   AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (SCALABLE ARCHITECTURE)
   ========================================================================= */

let premiumScrollTarget = null;

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- BAZA DANYCH MODUŁÓW (Indywidualne + Rodzinne) ---
const moduleDatabase = {
    // === PLECAK INDYWIDUALNY ===
    
    'tools': { 
        number: 'Moduł 01', 
        title: 'Narzędzia', 
        desc: 'Wszystko, co pozwoli Ci działać. Niezbędny hardware do przetrwania w terenie.', 
        image: 'https://images.unsplash.com/photo-1589104052309-84b2c15e83ce?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'narzędzie wielofunkcyjne, 1 szt.',
            'nóż taktyczny z krzesiwem, osełką i gwizdkiem, 1 szt.',
            'taśma naprawcza 5 cm x 2,5 m, 1 szt.',
            'zapałki sztormowe w pudełku 14 szt.',
            'linka o grubości 2 mm – 10 m, 1 szt.',
            'trytytka wielorazowa 20 cm, 10 szt.',
            'brelok EDC z retraktorem, 1 szt.',
            'zestaw do szycia, 1 szt.',
            'rękawice ochronne z poliestru powlekane poliuretanem – rozmiar 8, 1 para'
             
           
        ] 
    },

    'orientation': { 
        number: 'Moduł 02', 
        title: 'Orientacja', 
        desc: 'Znajdź drogę, utrzymaj świadomość sytuacyjną i komunikację.', 
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop', 
        items: [
               'mapa samochodowa Polski w skali 1:700000 (wersja 01.2026), 1 szt.',
               'notes wodoodporny, 1 szt.',
               'radio awaryjne z latarką LED i powerbankiem (2000 mAh), zasilane akumulatorem typu 18650 (3.7V) ładowane korbką lub panelem solarnym 1 szt.',
               'latarka czołowa LED 1500 lumenów o zasięgu 300 m, zasilana 2 x akumulatorem typu 18650 (3.7V) ładowanie ładowarką sieciową lub samochodową 1 szt.',
               'wodoodporne etui na dokumenty, 1 szt.',
               'gwizdek z kompasem i termometrem, 1 szt.'
               
        ] 
    },

    'shelter': { 
        number: 'Moduł 03', 
        title: 'Schronienie', 
        desc: 'Ochrona przed żywiołami i izolacja termiczna.', 
        image: 'https://images.unsplash.com/photo-1504280390224-3ea3391b1513?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'kurta przeciwdeszczowa rozmiar L, 1 szt.',
            'śpiwór awaryjny w worku z gwizdkiem, wymiary 215 x 90 cm, 1 szt.',
            'ogrzewacz do rąk, 1 para',
            'ogrzewacz do stóp, 1 para'
            
        ] 
    },

    'nutrition': { 
        number: 'Moduł 04', 
        title: 'Wyżywienie', 
        desc: 'Kluczowe nawodnienie i wysokoenergetyczne paliwo kognitywne.', 
        image: 'https://images.unsplash.com/photo-1622484211148-356ec37db7bb?q=80&w=1200&auto=format&fit=crop', 
        items: [
           'baton energetyczny orzechowy NUT-RATION 100 g (550 kcal), 1 szt.',
            'batony energetyczne daktylowe NUTRIBASE 660 g (2500 kcal), 1 szt.',
            'elektrolity w proszku HID-RATION 3 g, 9 szt.',
            'składana szeroka butelka 1 L, 1 szt.',
            'worek doypack 1 L do uzdatniania wody, 1 szt.',
            'tabletki do uzdatniania wody, 20 szt.',
            'pudełko na tabletki, 1 szt.',
            'indywidualny filtr do wody, 1 szt.',
            'kubek z pokrywką ze stali nierdzewnej 600 ml, 1 szt.',
            'składany łyżkowidelec, 1 szt.',
            'składana kuchenka na paliwo stałe i drewno, 1 szt.',
            'paliwo stałe do kuchenki (8 tabletek w tubie), 1 szt.'
            
        ] 
    },

    'hygiene': { 
        number: 'Moduł 05', 
        title: 'Higiena', 
        desc: 'Prewencja chorobowa i czystość operacyjna w każdych warunkach.', 
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop', 
        items: [
           'żel i szampon 2w1 20 ml, 1 szt.',
            'sól fizjologiczna, 3 szt.',
            'chusteczki higieniczne 10 szt., 1 paczka',
            'chusteczki nawilżające, 3 szt.',
            'chusteczki do dezynfekcji, 3 szt.',
            'płatki higieniczne, 4 szt.',
            'patyczki do uszu, 4 szt.',
            'zatyczki do uszu w pudełku, 1 para',
            'szczoteczka do zębów, 1 szt.',
            'osłonka na szczoteczkę do zębów, 1 szt.',
            'koncentrat pasty do zębów 6 ml, 1 szt.',
            'skompresowany ręcznik jednorazowy, 4 szt.'
            
        ] 
    },

    'medical': { 
        number: 'Moduł 06', 
        title: 'Pierwsza Pomoc', 
        desc: 'Zabezpieczenie ran, urazów i wsparcie medyczne.', 
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1200&auto=format&fit=crop', 
        items: [
           'apteczka wraz z panelem rzepowym systemu Molle - 1 szt.',
            'gumki (troki) mocujące szybkiego montażu - 2 szt.',
            'rękawiczki diagnostyczne nitrylowe - 4 szt.',
            'maseczka do RKO z filtrem - 1 szt.',
            'opatrunek z wkładem chłonnym 5 x 7,2 cm - 4 szt.',
            'paski do zamykania ran 3 x 75 mm - 1 blister',
            'paski do zamykania ran 12 x 100 mm - 1 blister',
            'siatka opatrunkowa nr 3, długość 1 m - 1 szt.',
            'siatka opatrunkowa nr 6, długość 1 m - 1 szt.',
            'plaster z opatrunkiem - 3 szt.',
            'pęseta jednorazowa - 1 szt.',
            'chusta trójkątna włókninowa - 2 szt.',
            'nożyczki ratownicze Black Front Standard - 1 szt.',
            'opaska elastyczna 12 cm x 4 m - 2 szt.',
            'opaska dziana 10 cm x 4 m - 2 szt.',
            'gaza opatrunkowa jałowa 1 m² - 1 szt.',
            'kompres gazowe jałowe 10 x 10 cm - 3 szt.',
            'koc ratunkowy NRC (folia izotermiczna) - 1 szt.',
            'żel schładzający o pojemności 120ml - 1 szt.',
            'kleszczołapki - 1 szt.',
            'opaska uciskowa, staza taktyczna Black Front (fluo) - 1 szt.',
            'marker permanentny - 1 szt.'
            
        ] 
    }, 

    // === PLECAK RODZINNY ===
    
    'tools-family': { 
        number: 'Moduł 01', 
        title: 'Narzędzia', 
        desc: 'Wszystko, co pozwoli Ci działać. Niezbędny hardware do przetrwania w terenie.', 
        image: 'https://images.unsplash.com/photo-1589104052309-84b2c15e83ce?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'narzędzie wielofunkcyjne, 1 szt.',
            'nóż taktyczny z krzesiwem, osełką i gwizdkiem, 1 szt.',
            'taśma naprawcza 5 cm x 2,5 m, 1 szt.',
            'zapałki sztormowe w pudełku 14 szt.',
            'linka o grubości 2 mm – 10 m, 1 szt.',
            'trytytka wielorazowa 20 cm, 10 szt.',
            'brelok EDC z retraktorem, 2 szt.',
            'zestaw do szycia, 1 szt.',
            'rękawice ochronne z poliestru powlekane poliuretanem – rozmiar 8, 2 pary'
        ] 
    },

    'orientation-family': { 
        number: 'Moduł 02', 
        title: 'Orientacja', 
        desc: 'Znajdź drogę, utrzymaj świadomość sytuacyjną i komunikację.', 
        image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'mapa samochodowa Polski w skali 1:700000 (wersja 01.2026), 1 szt.',
               'notes wodoodporny, 1 szt.',
               'radio awaryjne z latarką LED i powerbankiem (2000 mAh), zasilane akumulatorem typu 18650 (3.7V) ładowane korbką lub panelem solarnym 2 szt.',
               'latarka czołowa LED 1500 lumenów o zasięgu 300 m, zasilana 2 x akumulatorem typu 18650 (3.7V) ładowanie ładowarką sieciową lub samochodową 2 szt.',
               'wodoodporne etui na dokumenty, 4 szt.',
               'gwizdek z kompasem i termometrem, 2 szt.'
        ] 
    },

    'shelter-family': { 
        number: 'Moduł 03', 
        title: 'Schronienie', 
        desc: 'Ochrona przed żywiołami i izolacja termiczna.', 
        image: 'https://images.unsplash.com/photo-1504280390224-3ea3391b1513?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'kurta przeciwdeszczowa rozmiar L, 2 szt.',
            'kurta przeciwdeszczowa rozmiar M, 2 szt.',
            'śpiwór awaryjny w worku z gwizdkiem, wymiary 215 x 90 cm, 4 szt.',
            'ogrzewacz do rąk, 4 pary',
            'ogrzewacz do stóp, 4 pary'
        ] 
    },

    'nutrition-family': { 
        number: 'Moduł 04', 
        title: 'Wyżywienie', 
        desc: 'Kluczowe nawodnienie i wysokoenergetyczne paliwo kognitywne.', 
        image: 'https://images.unsplash.com/photo-1622484211148-356ec37db7bb?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'baton energetyczny orzechowy NUT-RATION 100 g (550 kcal), 4 szt.',
            'batony energetyczne daktylowe NUTRIBASE 660 g (2500 kcal), 2 szt.',
            'elektrolity HID-RATION (28 tabletek w tubie), 1 szt.',
            'składana szeroka butelka 1 L, 2 szt.',
            'worek doypack 1 L do uzdatniania wody, 2 szt.',
            'tabletki do uzdatniania wody, 30 szt.',
            'pudełko na tabletki, 1 szt.',
            'indywidualny filtr do wody, 2 szt.',
            'kubek z pokrywką ze stali nierdzewnej 600 ml, 4 szt.',
            'składany łyżkowidelec, 4 szt.',
            'składana kuchenka na paliwo stałe i drewno, 1 szt.',
            'paliwo stałe do kuchenki (8 tabletek w tubie), 2 szt.'
        ] 
    },

    'hygiene-family': { 
        number: 'Moduł 05', 
        title: 'Higiena', 
        desc: 'Prewencja chorobowa i czystość operacyjna w każdych warunkach.', 
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop', 
        items: [
             ' 4 zestawy:',
            'żel i szampon 2w1 20 ml, 1 szt.',
            'sól fizjologiczna, 3 szt.',
            'chusteczki higieniczne 10 szt., 1 paczka',
            'chusteczki nawilżające, 3 szt.',
            'chusteczki do dezynfekcji, 3 szt.',
            'płatki higieniczne, 4 szt.',
            'patyczki do uszu, 4 szt.',
            'zatyczki do uszu w pudełku, 1 para',
            'szczoteczka do zębów, 1 szt.',
            'osłonka na szczoteczkę do zębów, 1 szt.',
            'koncentrat pasty do zębów 6 ml, 1 szt.',
            'skompresowany ręcznik jednorazowy, 4 szt.'
        ] 
    },

    'medical-family': { 
        number: 'Moduł 06', 
        title: 'Pierwsza Pomoc', 
        desc: 'Zabezpieczenie ran, urazów i wsparcie medyczne.', 
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1200&auto=format&fit=crop', 
        items: [
            'apteczka wraz z panelem rzepowym systemu Molle - 1 szt.',
            'gumki (troki) mocujące szybkiego montażu - 2 szt.',
            'rękawiczki diagnostyczne nitrylowe - 4 szt.',
            'maseczka do RKO z filtrem - 1 szt.',
            'opatrunek z wkładem chłonnym 5 x 7,2 cm - 4 szt.',
            'paski do zamykania ran 3 x 75 mm - 1 blister',
            'paski do zamykania ran 12 x 100 mm - 1 blister',
            'siatka opatrunkowa nr 3, długość 1 m - 1 szt.',
            'siatka opatrunkowa nr 6, długość 1 m - 1 szt.',
            'plaster z opatrunkiem - 3 szt.',
            'pęseta jednorazowa - 1 szt.',
            'chusta trójkątna włókninowa - 2 szt.',
            'nożyczki ratownicze Black Front Standard - 1 szt.',
            'opaska elastyczna 12 cm x 4 m - 2 szt.',
            'opaska dziana 10 cm x 4 m - 2 szt.',
            'gaza opatrunkowa jałowa 1 m² - 1 szt.',
            'kompres gazowe jałowe 10 x 10 cm - 3 szt.',
            'koc ratunkowy NRC (folia izotermiczna) - 1 szt.',
            'żel schładzający o pojemności 120ml - 1 szt.',
            'kleszczołapki - 1 szt.',
            'opaska uciskowa, staza taktyczna Black Front (fluo) - 1 szt.',
            'marker permanentny - 1 szt.'
        ] 
    }
}; 

/* =========================================================================
   GLOBALNE FUNKCJE LOGIKI PRODUKTU
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

    setTimeout(() => { document.body.style.overflow = ''; }, 700); 
};

// 1. Kontroler Ilości (odbiera kliknięcie)
window.updateQuantity = function(change) {
    const input = document.getElementById('qty-input');
    if (!input) return;
    
    let currentValue = parseInt(input.value);
    let newValue = currentValue + change;
    
    if (newValue >= 1 && newValue <= 10) { 
        input.value = newValue;
        window.updatePriceDisplay(newValue); // Przekazuje nową ilość do widoku
    }
};

// 2. Motion that whispers: Aktualizacja wizualna z animacją (zwrócona do kodu)
window.updatePriceDisplay = function(quantity) {
    const priceElement = document.getElementById('price-display');
    if (priceElement) {
        // Dynamiczne czytanie ceny: zadziała i dla 1700 i dla 3700
        const basePrice = parseInt(priceElement.getAttribute('data-base-price')) || 1700;
        const formattedPrice = (basePrice * quantity).toLocaleString('pl-PL');
        
        priceElement.style.opacity = '0.5';
        setTimeout(() => {
            priceElement.innerText = `${formattedPrice} PLN`;
            priceElement.style.opacity = '1';
        }, 150);
    }
};

// 3. The Invisible Expensive Stuff: Cicha synchronizacja przy starcie Barba.js
window.syncPriceDisplay = function() {
    const priceElement = document.getElementById('price-display');
    const qtyInput = document.getElementById('qty-input');
    
    if (priceElement && qtyInput) {
        const basePrice = parseInt(priceElement.getAttribute('data-base-price')) || 1700;
        const currentValue = parseInt(qtyInput.value) || 1;
        
        priceElement.innerText = `${(basePrice * currentValue).toLocaleString('pl-PL')} PLN`;
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
   CONTEXTUAL NAVIGATION (INSTANT EDITORIAL HIDE + FROSTED ONYX)
   ========================================================================= */
window.initSmartHeader = function() {
    const nav = document.getElementById('premium-nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;
    
    window.removeEventListener('scroll', window._smartHeaderScroll);
    
    window._smartHeaderScroll = function() {
        const currentScrollY = window.scrollY;
        
        // 1. KONTROLA WIDOCZNOŚCI (Natychmiastowa reakcja)
        // Jeśli scrollujemy w dół (i minęliśmy próg 10px chroniący przed drganiem touchpada) -> Chowamy!
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
            nav.classList.add('-translate-y-full');
        } 
        // Jeśli scrollujemy w górę -> Pokazujemy z powrotem
        else if (currentScrollY < lastScrollY) {
            nav.classList.remove('-translate-y-full');
        }
        
        // 2. KONTROLA MATERIAŁU (Przezroczystość vs Matowe szkło)
        // Jeśli jesteśmy oderwani od samej góry (> 50px), nawigacja (gdy się pojawi) musi mieć tło
        if (currentScrollY > 50) {
            nav.classList.add('bg-brand-dark/60', 'backdrop-blur-lg', 'shadow-2xl');
            nav.classList.remove('bg-transparent');
            
            // Kompaktowy tryb (niższy pasek, żeby mniej zasłaniał)
            nav.classList.remove('py-6');
            nav.classList.add('py-4');
        } else {
            // Jesteśmy na absolutnym szczycie sekcji Hero -> Pełna przezroczystość i oddech
            nav.classList.remove('bg-brand-dark/60', 'backdrop-blur-lg', 'shadow-2xl', 'py-4');
            nav.classList.add('bg-transparent', 'py-6');
        }
        
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', window._smartHeaderScroll, { passive: true });
    
    // Wymuszenie kalkulacji startowej
    window._smartHeaderScroll();
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
function initCinematicMedia() {
    const cinematicVideos = document.querySelectorAll('video[autoplay]');
    
    cinematicVideos.forEach(video => {
        // USUNIĘTO: video.load(); - Nie niszczymy natywnego bufora przeglądarki!
        
        // Sprawdzamy, czy wideo faktycznie potrzebuje naszej pomocy do startu
        // (np. po przejściu Barba.js z innej podstrony)
        if (video.paused) {
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("[Amber Resilience | Premium Engine] Zablokowano autoodtwarzanie:", error);
                });
            }
        }
    });
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
function initObfuscatedEmails() {
    const emailLinks = document.querySelectorAll('.obfuscated-link');
    
    emailLinks.forEach(link => {
        const user = link.getAttribute('data-user');
        const domain = link.getAttribute('data-domain');
        
        if (user && domain) {
            const emailAddress = `${user}@${domain}`;
            link.href = `mailto:${emailAddress}`;
            link.textContent = emailAddress;
            
            // Oczyszczamy DOM z atrybutów technicznych dla bezwzględnej estetyki kodu
            link.removeAttribute('data-user');
            link.removeAttribute('data-domain');
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
function initMobileMenu() {
    const trigger = document.getElementById('mobile-menu-trigger');
    const closeBtn = document.getElementById('mobile-menu-close');
    const overlay = document.getElementById('mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');
    
    if (!trigger || !overlay) return;

    // Klonowanie przycisków zapobiega wyciekom pamięci w Barba.js
    const newTrigger = trigger.cloneNode(true);
    trigger.parentNode.replaceChild(newTrigger, trigger);
    
    const newCloseBtn = closeBtn ? closeBtn.cloneNode(true) : null;
    if (closeBtn) closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

    // Oś czasu GSAP (wstrzymana)
    const tl = gsap.timeline({ paused: true, reversed: true });
    
    tl.to(overlay, { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power2.inOut" })
      .fromTo(overlay.querySelectorAll('.mobile-nav-link'), 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 
          "-=0.2"
      )
      .fromTo(overlay.querySelector('.mobile-nav-footer'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.4"
      );

    function toggleMenu() {
        if (tl.reversed()) {
            document.body.style.overflow = 'hidden';
            tl.play();
        } else {
            document.body.style.overflow = '';
            tl.reverse();
        }
    }

    newTrigger.addEventListener('click', toggleMenu);
    if (newCloseBtn) newCloseBtn.addEventListener('click', toggleMenu);

    // Gdy użytkownik klika w link, zamknij menu z animacją
    links.forEach(link => {
        link.addEventListener('click', () => {
            document.body.style.overflow = '';
            tl.reverse();
            
            // Obsługa skoku do zakotwiczenia (anchor) dla mobilnej nawigacji
            const href = link.getAttribute('href');
            if(href.includes('#')) {
                const hashPart = href.split('#')[1];
                if (document.getElementById(hashPart)) {
                    setTimeout(() => window.scrollToAnchor('#' + hashPart), 400);
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cookieModal = document.getElementById('premium-cookie-modal');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const acceptEssentialBtn = document.getElementById('cookie-accept-essential');
    
    const cookieConsentName = 'amber_resilience_consent';

    // Jeśli brak panelu w kodzie HTML, przerywamy skrypt by uniknąć błędów
    if (!cookieModal) return; 

    // GSAP Animation Timeline
    const tlCookie = gsap.timeline({ paused: true });
    
    tlCookie.to(cookieModal, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        onStart: () => {
            cookieModal.classList.remove('pointer-events-none');
        }
    });

    const closeCookieModal = () => {
        gsap.to(cookieModal, {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
            onComplete: () => {
                cookieModal.classList.add('pointer-events-none');
            }
        });
    };

    // Sprawdzenie stanu (czy użytkownik już zaakceptował)
    if (!localStorage.getItem(cookieConsentName)) {
        setTimeout(() => tlCookie.play(), 2500); 
    }

    // Handlery przycisków wewnątrz panelu
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', () => {
            localStorage.setItem(cookieConsentName, 'all');
            closeCookieModal();
        });
    }

    if (acceptEssentialBtn) {
        acceptEssentialBtn.addEventListener('click', () => {
            localStorage.setItem(cookieConsentName, 'essential');
            closeCookieModal();
        });
    }

    // ROZWIĄZANIE PROBLEMU: Delegacja zdarzeń (Event Delegation)
    // Nasłuchujemy na całym dokumencie, co rozwiązuje konflikt z dynamicznie ładowaną stopką
    document.addEventListener('click', (e) => {
        // Sprawdzamy, czy kliknięty element to nasz przycisk, lub czy znajduje się w jego wnętrzu (np. ikona SVG)
        const openSettingsBtn = e.target.closest('#open-cookie-settings');
        
        if (openSettingsBtn) {
            e.preventDefault(); // Blokujemy domyślne zachowanie linku
            tlCookie.restart(); // Otwieramy panel cookies
        }
    });
});

/* =========================================================================
   PORTAL ENGINE 
   ========================================================================= */
function setupPortals() {
    const dossier = document.getElementById('dossier-overlay');
    const lightbox = document.getElementById('lightbox-overlay');
    
    if (dossier && dossier.parentNode !== document.body) {
        document.body.appendChild(dossier);
    }
    if (lightbox && lightbox.parentNode !== document.body) {
        document.body.appendChild(lightbox);
    }
}

/* =========================================================================
   FAQ ENGINE | DATA-DRIVEN ARCHITECTURE
   ========================================================================= */

/* =========================================================================
   FAQ ENGINE | DATA-DRIVEN ARCHITECTURE
   ========================================================================= */

const faqDatabase = [
    {
        question: "Czym jest plecak awaryjny i do czego służy?",
        answer: `Plecak awaryjny to wcześniej przygotowany zestaw najważniejszych rzeczy potrzebnych podczas
konieczności nagłego wystąpienia sytuacji kryzysowej. Może być wykorzystywany podczas awarii
infrastruktury, ewakuacji, długotrwałego braku prądu, klęsk żywiołowych lub innych
nieprzewidzianych zdarzeń.`
    },
    {
        question: "Jaka jest różnica między plecakiem awaryjnym a ewakuacyjnym?",
        answer: `Obie nazwy w ujęciu potocznym często występują zamiennie. Plecak awaryjny jest pojęciem szerszym
i może służyć podczas różnych sytuacji kryzysowych w miejscu, w którym aktualnie przebywamy.
Takie sytuacje to m.in. blackout, paraliż komunikacyjny czy też nagłe zdarzenie podczas wyprawy.
Plecak ewakuacyjny jest przygotowany głównie z myślą o szybkim opuszczeniu miejsca zamieszkania i
samodzielnym funkcjonowaniu i zabezpieczeniu podstawowych potrzeb przez określony czas w z
góry zaplanowanym miejscu docelowym.
W obliczu możliwości wystąpienia różnych rodzajów kryzysów, nazewnictwo często ma mniejsze
znaczenie dla praktycznego wykorzystania, może mieć jednak znaczenie psychologiczne. Ewakuacja
często kojarzy się z konfliktami zbrojnymi czy poważnymi katastrofami naturalnymi, co w przypadku
braku poczucia bezpośredniego zagrożenia wpływa na brak potrzeby zabezpieczenia. Możliwość
wystąpienia awarii lokalnej czy krajowej jest bardziej prawdopodobna i ta myśl powinna być punktem
wyjścia do decyzji o zaopatrzeniu się w plecak awaryjny.`
    },
    {
        question: "Na ile dni powinien wystarczyć plecak awaryjny?",
        answer: `Najczęściej rekomenduje się przygotowanie plecaka awaryjnego na minimum 72 godziny. To czas, który często uznaje się za kluczowy podczas pierwszej fazy sytuacji kryzysowej lub ograniczonego dostępu do pomocy. Po tym czasie pomoc powinna zostać ustrukturyzowana i działania powinny być koordynowane przed odpowiednie służby. W kontekście przeznaczenia na 72 godziny, najważniejszą kwestią jest zabezpieczenie się w adekwatną ilość żywności i wody, ponieważ są to zasoby, których ilość maleje w czasie.`
    },
    {
        question: "Jaką żywność powinien zawierać plecak awaryjny?",
        answer: `Wg wytycznych WHO (ang. World Health Organisation) w sytuacjach awaryjnych zaleca się
dostarczenie organizmowi ilości energii na poziomie 2100 kcal/ dobę [Food and Nutrition Needs in
Emergencies, WHO 2004], co przekłada się na ponad 6000 kcal/ 72 godziny. Dla porównania w
przypadku racji awaryjnych dla żołnierzy wytyczne stanowią, że wystarczająca wartość energetyczna
restrykcyjnej racji pokarmowej na przetrwanie wynosi ok. 1500 kcal/ dobę (Bertrandt J. i wsp., Racja
pokarmowa na przetrwanie., Problemy Higieny i Epidemiologii 2011). Wobec przytoczonych danych
decyzja o ilości zaplanowanej żywności może wydawać się trudna. Zatem należy racjonalnie
podchodzić do ilości pożywienia na 72 h i pamiętać, że w sytuacji kryzysowej najważniejsze jest
zabezpieczenie najbardziej podstawowych potrzeb żywieniowych. Nie należy również marginalizować
kwestii walorów odżywczo-smakowych, które w warunkach kryzysu mogą mieć niebagatelny wpływ
na kondycję psychofizyczną.`
    },
    {
        question: "Co powinien zawierać plecak ewakuacyjny?",
        answer: `Plecak awaryjny powinien zawierać podstawowe wyposażenie pozwalające przetrwać minimum 72
godziny poza miejscem zamieszkania. Co oczywiste, każdy element plecaka może być użyteczny w
innych okolicznościach, dlatego na zawartość plecaka należy patrzeć kompleksowo, ze świadomością,
że niektóre elementy będę wykorzystywane częściej, a niektóre być może wcale. Plecak awaryjny ma
dawać poczucie bezpieczeństwa w różnych warunkach. Co do samej zawartości, najczęściej
wymieniane są: zapas wody i/lub akcesoria do jej uzdatniania, żywność o długim terminie
przydatności do spożycia, apteczka, latarka, powerbank, radio, dokumenty, odzież, środki higieniczne
oraz narzędzia wielofunkcyjne. Dokładną zawartość należy określić indywidualnie i zależy ona m.in.
od takich czynników jak pora roku czy docelowe miejsce przebywania w razie wystąpienia sytuacji
kryzysowej.`
    },
    {
        question: "Dlaczego warto mieć gotowy plecak w domu?",
        answer: `TAK — gotowy plecak pozwala zaoszczędzić czas i ograniczyć stres w razie wystąpienia sytuacji
wymagającej szybkiego działania. Regularnie sprawdzany i uzupełniany zestaw zwiększa gotowość na
nieprzewidziane zdarzenia. Plecak można również wykorzystywać podczas bardziej codziennych
sytuacji (np. wielogodzinnych wypraw czy wyjazdów), aby sprawdzić lub przećwiczyć działanie
wyposażenia. Może to być pomocne w razie wystąpienia realnego zagrożenia.`
    },
    {
        question: "Gdzie przechowywać plecak awaryjny?",
        answer: `Najlepiej przechowywać go w miejscu łatwo dostępnym dla domowników — np. przy wyjściu z domu,
w szafie w przedpokoju lub innym miejscu umożliwiającym szybkie zabranie plecaka. Gdy często
poruszamy się samochodem, warto rozważyć przechowywanie plecaka w samochodzie.`
    },
    {
        question: "Jak często należy aktualizować zawartość plecaka?",
        answer: `Warto sprawdzać zawartość co najmniej raz na 6 miesięcy. Należy kontrolować terminy ważności
żywności, leków czy mniej oczywistych elementów takich jak tabletki do uzdatniania wody czy
ogrzewacze do rąk/ stóp. Można sprawdzić działanie baterii i ewentualnie je naładować. Okresowy
przegląd zawartości plecaka pomoże dostosowywać wyposażenie do aktualnych potrzeb.`
    },
    {
        question: "Czym wyróżnia się plecak rodzinny?",
        answer: `Zgodnie z wytycznymi zaleca się, aby każdy domownik, w tym dzieci powyżej 10 roku życia posiadały
własny plecak awaryjny. Nie precyzuje się co dokładnie powinien zawierać plecak awaryjny dla dzieci,
tym bardziej tych będących w wieku poniżej 10 lat. Założenie ogólne są teoretyczne. Plecak rodzinny
jest rozwiązaniem, które wspiera rodziny z dziećmi. Dzieci, zwłaszcza te które nie miały styczności z
survivalem czy też realną sytuacją kryzysową będą potrzebowały wsparcia ze strony rodziców –
niezależnie od tego czy są w wieku poniżej lub powyżej 10 lat. Odrębną kwestią są dzieci czy nawet
osoby dorosłe z niepełnosprawnościami, które wymagają szczególnej opieki. Wiele z takich osób nie
będzie w stanie poradzić sobie samemu w sytuacji kryzysowej, dodatkowo z obciążeniem w postaci
plecaka. W plecaku rodzinnym tylko wybrane elementy są przewidziane dla każdej osoby. Część
elementów jest wspólna, co znacznie obniża ciężar całego plecaka. Z uwagi na fakt, że dzieci inaczej
znoszą sytuacje stresujące, elementem dodatkowym, o który warto zadbać indywidualnie we
własnym zakresie są przedmioty, które zapewnią dzieciom namiastkę normalności – np. przenośne
gry czy dla najmłodszych – przytulanki.`
    },
   {
        question: "Ile powinien ważyć plecak awaryjny?",
        answer: `Przyjmuje się, że w celu komfortowego użytkowania, plecak z wyposażeniem nie powinien
przekraczać 10-20% masy ciała, osoby, która będzie go nosić. Jednak w realnych sytuacjach, zależy to
w dużej mierze od kilku czynników takich jak wiek czy ogólne możliwości użytkownika. Generalnie im
lżejszy plecak tym lepiej. Warto mieć na uwadze możliwość wystąpienia sytuacji, w której zajdzie
potrzeba pomocy innym.`
    },
   {
        question: "Czy posiadanie plecaka awaryjnego oznacza szykowanie się na wojne?",
        answer: `NIE. Prawdą jest, że o potrzebie posiadania plecaków awaryjnych mówi się więcej od momentu
wybuchu wojny na Ukrainie i dalszej kolejności zmianami prawnymi w Polsce w odniesieniu do
ochrony ludności i obrony cywilnej. Pamiętać jednak należy, że dosyć stabilna sytuacja polityczna w
Europie w ostatnich dekadach spowodowała być może zbyt duży spokój wśród polityków i w
społeczeństwie. Wyposażenie plecaka awaryjnego jest na tyle uniwersalne, że z powodzeniem można
z niego korzystać w wielu innych sytuacjach – podczas podróży, nagłego paraliżu komunikacyjnego
czy awarii prądu w domu. Wszystkie niezbędne elementy mamy pod ręką.`
    },
      {
        question: "Czy gotowy plecak jest lepszy niż samodzielnie skompletowany?",
        answer: `W dyskusji o plecakach awaryjnych nie chodzi o wskazywanie lepszych lub gorszych rozwiązań.
Nawet bardzo podstawowy zestaw elementów będzie skuteczniejszy niż brak czegokolwiek. Gotowy
zestaw pozwala osiągnąć podstawowy poziom przygotowania od razu, przy czym należy pamiętać, że
trzeba się z zawartością plecaka zapoznać, aby umieć z niego skorzystać. Gotowy plecak gwarantuje
również profesjonalny dobór elementów. Wiele osób, z różnych względów chętniej skorzysta z
gotowych sprawdzonych rozwiązań, zamiast samodzielnie wyszukiwać pojedyncze elementy. Warto
zwrócić jeszcze uwagę na fakt, że plecak awaryjny można rozbudowywać na bardzo wiele sposobów,
zależnie od indywidualnych potrzeb. Gotowy plecak daje pewną podstawę i punkt wyjścia do
ewentualnego rozszerzenia zawartości.`
    }
];

function renderFAQ() {
    const container = document.getElementById('faq-dynamic-container');
    if (!container) return;

    container.innerHTML = ''; // Czyszczenie przed renderowaniem

    faqDatabase.forEach((item) => {
        const faqHTML = `
            <div class="faq-item border-b border-white/10 group">
                <button aria-expanded="false" class="faq-trigger w-full text-left py-8 flex justify-between items-center outline-none focus-visible:bg-white/[0.02]">
                    <h3 class="font-display text-2xl md:text-3xl text-brand-ivory group-hover:text-brand-gold transition-colors duration-500 pr-8">
                        ${item.question}
                    </h3>
                    <span class="faq-icon text-brand-gold transform transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                </button>
                <div class="faq-content grid grid-rows-[0fr] transition-[grid-template-rows] duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div class="overflow-hidden">
                        <p class="pb-8 text-brand-muted font-light text-lg leading-relaxed max-w-3xl">
                            ${item.answer}
                        </p>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', faqHTML);
    });
}


/* =========================================================================
   STRIPE PAYMENT ENGINE | SECURE CHECKOUT DRAWER
   ========================================================================= */
window.initStripeDrawer = function() {
    const orderBtn = document.getElementById('order-btn'); 
    const qtyInput = document.getElementById('qty-input'); 
    const closeBtn = document.getElementById('close-payment');
    const overlay = document.getElementById('payment-overlay');
    const drawer = document.getElementById('payment-drawer');

    if (!orderBtn || !drawer) return; // Ignorujemy na podstronach bez koszyka

    // Klonowanie przycisku zapobiega wielokrotnemu bindowaniu zdarzeń przez Barba.js
    const newOrderBtn = orderBtn.cloneNode(true);
    orderBtn.parentNode.replaceChild(newOrderBtn, orderBtn);

    let paymentDrawerTimeline = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut", duration: 0.8 } });
    
    paymentDrawerTimeline
        .to(overlay, { opacity: 1, pointerEvents: "auto", duration: 0.5 })
        .to(drawer, { x: "0%", duration: 0.8 }, "-=0.4");

    newOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const quantity = parseInt(qtyInput ? qtyInput.value : 1);
        const basePrice = parseInt(newOrderBtn.getAttribute('data-base-price')) || 1700;
        const productId = newOrderBtn.getAttribute('data-product-id') || 'indywidualny';
        const productName = newOrderBtn.getAttribute('data-product-name') || 'Amber Resilience - Indywidualny';
        const productImg = newOrderBtn.getAttribute('data-product-img') || '/photo/pi1.png';
        
        const totalPrice = basePrice * quantity;
        const formattedPrice = totalPrice.toLocaleString('pl-PL');

        // Wstrzyknięcie danych do luksusowego panelu podsumowania
        const imgElement = document.getElementById('drawer-product-img');
        if (imgElement) imgElement.src = productImg;

        document.getElementById('drawer-product-name').innerText = productName;
        document.getElementById('drawer-qty').innerText = quantity;
        document.getElementById('drawer-total-price').innerText = `${formattedPrice} PLN`;
        document.getElementById('button-text').innerText = `Zapłać ${formattedPrice} PLN`;

        document.body.style.overflow = 'hidden'; 
        paymentDrawerTimeline.play();
        
        if (typeof Stripe === 'undefined') {
            console.error("[Premium Engine] Brak biblioteki Stripe.js. Dodaj skrypt w <head>.");
            return;
        }
        initializeStripe(productId, quantity); 
    });

    const closeDrawer = () => {
        paymentDrawerTimeline.reverse();
        setTimeout(() => { document.body.style.overflow = ''; }, 800);
    };
    
    if(closeBtn) {
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        newCloseBtn.addEventListener('click', closeDrawer);
    }
    if(overlay) overlay.addEventListener('click', closeDrawer);

    let stripeInstance, elements;

    async function initializeStripe(productId, quantity) {
        if(stripeInstance) return; 
        stripeInstance = Stripe("pk_test_TWOJ_KLUCZ_PUBLICZNY_STRIPE"); // TUTAJ PODMIENISZ KLUCZ

        try {
            const response = await fetch("/create-payment-intent.php", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: productId, quantity: quantity })
            });

            if (!response.ok) throw new Error('Payment API Error');

            const { clientSecret } = await response.json();

            const appearance = {
                theme: 'night',
                variables: {
                    fontFamily: '"Outfit", sans-serif',
                    colorBackground: '#111111',
                    colorText: '#F9F7F2',
                    borderRadius: '0px',
                    colorPrimary: '#C5A059',
                },
                rules: {
                    '.Input': { backgroundColor: 'transparent', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px 12px', fontFamily: '"JetBrains Mono", monospace' },
                    '.Input:focus': { border: '1px solid #C5A059', outline: 'none' },
                    '.Label': { textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '9px', fontFamily: '"JetBrains Mono", monospace', color: '#A3A3A3' }
                }
            };

            elements = stripeInstance.elements({ clientSecret, appearance });
            const paymentElement = elements.create("payment", { layout: "tabs" });
            paymentElement.mount("#payment-element");
        } catch (error) {
            const msg = document.getElementById('payment-message');
            if(msg) {
                msg.innerText = "Błąd połączenia z serwerem. Odśwież stronę.";
                msg.classList.remove('hidden');
            }
        }
    }
};
/* =========================================================================
   GŁÓWNY INICJATOR
   ========================================================================= */
async function initAll(targetHash = null) {
// 1. THE $10K ARCHITECTURE: Pobieramy i montujemy stopkę PRZED odpaleniem animacji.
    const footerContainer = document.getElementById('dynamic-footer');
    
    // Sprawdzamy, czy kontener istnieje i czy jest pusty, aby zapobiec pobieraniu tego samego kodu 
    // przy każdym przejściu między podstronami przez Barba.js
    if (footerContainer && footerContainer.innerHTML.trim() === '') {
        try {
            const response = await fetch('/assets/components/footer.html');
            if (response.ok) {
                footerContainer.innerHTML = await response.text();
                console.log("[Premium Engine] Stopka została pomyślnie zamontowana w DOM.");
            } else {
                console.error("[Premium Engine] Błąd ładowania pliku footer.html:", response.status);
            }
        } catch (error) {
            console.error("[Premium Engine] Krytyczny błąd sieci przy ładowaniu stopki:", error);
        }
    }
   
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
    
    setTimeout(() => {
        setupPortals();
        renderFAQ();
        initAnimations();
        initCinematicMedia();
        initBackpackCardsAnimation();
        initHeroAndThreatAnimations();
        initFeatureGridAnimation();
        initFAQ();
        initLightboxBind();
        initContactForm();
        initObfuscatedEmails();
        initNavLinks();
        initMobileMenu();
        window.syncPriceDisplay();
        window.initSmartHeader();
        window.initStripeDrawer();
       
       
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
        sync: false, 
        transitions: [{
            name: 'cinematic-focus',
            async leave(data) {
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(t => t.kill());
                
                const hero = document.querySelector("#hero");
                if (hero) gsap.set(hero, { clearProps: "all" });

                document.body.style.overflow = '';
                document.querySelectorAll('body > #dossier-overlay, body > #lightbox-overlay').forEach(el => el.remove());

                return gsap.to(data.current.container, {
                    y: 40, opacity: 0, filter: "blur(15px)", duration: 0.6, ease: "power2.inOut"
                });
            },
            async enter(data) {
                window.scrollTo(0, 0); 
                gsap.set(data.next.container, { y: -40, opacity: 0, filter: "blur(15px)" });
                
                return gsap.to(data.next.container, {
                    y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                    clearProps: "all" 
                });
            },
            after() {
                initAll();
            }
        }]
    });
}
