/* =========================================================================
   AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (FINAL ARCHITECTURE)
   ========================================================================= */

let premiumScrollTarget = null;
const BASE_PRICE = 1600;

// Baza danych modułów (przeniesiona z HTML do JS)
const moduleDatabase = {
    'tools': { number: 'Moduł 01', title: 'Narzędzia', desc: 'Wszystko, co pozwoli Ci działać. Niezbędny hardware do przetrwania w terenie.', image: 'https://images.unsplash.com/photo-1589104052309-84b2c15e83ce?q=80&w=1200&auto=format&fit=crop', items: ['Piła strunowa 65cm', 'Nóż składany 63mm', 'Karta survivalowa 15w1', 'Latarka czołowa LED', 'Zestaw do wędkowania'] },
    'orientation': { number: 'Moduł 02', title: 'Orientacja', desc: 'Znajdź drogę, utrzymaj świadomość sytuacyjną i komunikację.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop', items: ['Baterie AA x4', 'Wodoodporne etui 130x200mm', 'Mapa Polski 1:700 000'] },
    'shelter': { number: 'Moduł 03', title: 'Schronienie', desc: 'Ochrona przed żywiołami i izolacja termiczna.', image: 'https://images.unsplash.com/photo-1504280390224-3ea3391b1513?q=80&w=1200&auto=format&fit=crop', items: ['Śpiwór NRC', 'Namiot termiczny 240x110x90cm', 'Ponczo Texar Olive'] },
    'nutrition': { number: 'Moduł 04', title: 'Wyżywienie', desc: 'Kluczowe nawodnienie i wysokoenergetyczne paliwo kognitywne.', image: 'https://images.unsplash.com/photo-1622484211148-356ec37db7bb?q=80&w=1200&auto=format&fit=crop', items: ['Tabletki Javel x20', 'Racje Seven Oceans 2500 kcal', 'Kubek termiczny M-Tac 280ml'] },
    'hygiene': { number: 'Moduł 05', title: 'Higiena', desc: 'Prewencja chorobowa i czystość operacyjna w każdych warunkach.', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200&auto=format&fit=crop', items: ['Żel/Szampon 30ml x4', 'Zestaw dentystyczny', 'Kosmetyczka M-Tac'] },
    'medical': { number: 'Moduł 06', title: 'Pierwsza Pomoc', desc: 'Zabezpieczenie ran, urazów i wsparcie medyczne.', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1200&auto=format&fit=crop', items: ['Ogrzewacz dłoni', 'Apteczka DIN 13164'] }
};

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }

window.addEventListener('pageshow', function (event) {
    if (event.persisted) { window.location.reload(); }
});

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* --------------------------------------------------
   GLOBALNE FUNKCJE DOSTĘPNE DLA HTML (Fallback)
   -------------------------------------------------- */
window.closeDossier = function() {
    const overlay = document.getElementById('dossier-overlay');
    const panel = document.getElementById('dossier-panel');
    if(overlay && panel) {
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        panel.classList.remove('translate-y-0');
        panel.classList.add('translate-y-12');
        setTimeout(() => { document.body.style.overflow = ''; }, 700); 
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

/* --------------------------------------------------
   SILNIK DOM & LOGIKA PODSTRON (Re-inicjalizowany przez Barba)
   -------------------------------------------------- */
function initProductLogic() {
    // 1. Obsługa modułów (Dossier)
    const dossierTriggers = document.querySelectorAll('.dossier-trigger');
    dossierTriggers.forEach(trigger => {
        // Usuwamy stare eventy by uniknąć wycieków
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        newTrigger.addEventListener('click', () => {
            const moduleId = newTrigger.getAttribute('data-module');
            const data = moduleDatabase[moduleId];
            if (!data) return;

            const dossierImage = document.getElementById('dossier-image');
            if(dossierImage) dossierImage.style.backgroundImage = `url('${data.image}')`;
            
            document.getElementById('dossier-number').innerText = data.number;
            document.getElementById('dossier-title').innerText = data.title;
            document.getElementById('dossier-desc').innerText = data.desc;
            
            const list = document.getElementById('dossier-list');
            list.innerHTML = data.items.map(item => `
                <li class="flex items-start gap-4">
                    <span class="text-brand-gold mt-1 font-mono text-[10px]">///</span>
                    <span class="leading-relaxed text-sm font-light">${item}</span>
                </li>
            `).join('');

            document.body.style.overflow = 'hidden';
            const overlay = document.getElementById('dossier-overlay');
            const panel = document.getElementById('dossier-panel');
            
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'pointer-events-auto');
            panel.classList.remove('translate-y-12');
            panel.classList.add('translate-y-0');
        });
    });

    // 2. Obsługa Galerii
    const thumbnails = document.querySelectorAll('.thumbnail-btn');
    thumbnails.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', () => {
            const mainBg = document.getElementById('main-image-bg');
            const imageUrl = newBtn.getAttribute('data-image');
            
            mainBg.style.opacity = '0';
            setTimeout(() => {
                mainBg.style.backgroundImage = `url('${imageUrl}')`;
                mainBg.style.opacity = '1';
            }, 150);

            document.querySelectorAll('.thumbnail-btn').forEach(b => {
                b.classList.remove('border-brand-gold');
                b.classList.add('border-white/5');
                b.querySelector('.thumbnail-inner').classList.add('brightness-50');
            });
            
            newBtn.classList.remove('border-white/5');
            newBtn.classList.add('border-brand-gold');
            newBtn.querySelector('.thumbnail-inner').classList.remove('brightness-50');
        });
    });

    // 3. Obsługa Ilości (Quantity)
    const qtyBtns = document.querySelectorAll('.btn-qty');
    const qtyInput = document.getElementById('qty-input');
    
    qtyBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', () => {
            if(!qtyInput) return;
            const action = parseInt(newBtn.getAttribute('data-action'));
            let val = parseInt(qtyInput.value) + action;
            
            if (val >= 1 && val <= 10) {
                qtyInput.value = val;
                const priceEl = document.getElementById('price-display');
                if(priceEl) {
                    priceEl.style.opacity = '0.5';
                    setTimeout(() => {
                        priceEl.innerText = `${(BASE_PRICE * val).toLocaleString('pl-PL')} PLN`;
                        priceEl.style.opacity = '1';
                    }, 150);
                }
            }
        });
    });
}

function initGeneralLogic() {
    // Lightbox
    const dossierImage = document.getElementById('dossier-image');
    if (dossierImage) {
        dossierImage.style.cursor = 'zoom-in';
        dossierImage.addEventListener('click', () => {
            const imageUrl = dossierImage.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
            const lightbox = document.getElementById('lightbox-overlay');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox && lightboxImg) {
                lightboxImg.src = imageUrl;
                lightbox.classList.remove('opacity-0', 'pointer-events-none');
                setTimeout(() => { lightboxImg.classList.remove('scale-90'); }, 50);
            }
        });
    }

    // Scroll Anchor Nav Links
    document.querySelectorAll('a[href*="#wybor-plecaka"], a[href*="#opis-produktu"]').forEach(link => {
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        newLink.addEventListener('click', (e) => {
            e.preventDefault(); 
            const href = newLink.getAttribute('href');
            const [pathPart, hashPart] = href.split('#');
            const currentClean = window.location.pathname.replace(/\/$/, '').replace('/index.html', '');
            const targetClean = pathPart ? pathPart.replace(/\/$/, '').replace('/index.html', '') : currentClean;

            if (currentClean === targetClean) {
                scrollToAnchor(hashPart);
            } else {
                premiumScrollTarget = hashPart;
                if (typeof barba !== 'undefined') barba.go(pathPart || '/'); 
                else window.location.href = href; 
            }
        });
    });
}

function scrollToAnchor(hash) {
    if (!hash || typeof hash !== 'string') return; 
    const targetElement = document.getElementById(hash.replace('#', ''));
    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        document.documentElement.classList.remove('scroll-smooth');
        gsap.to(document.scrollingElement, {
            scrollTop: targetPosition, duration: 1.8, ease: "power4.inOut", overwrite: "auto",
            onComplete: () => document.documentElement.classList.add('scroll-smooth')
        });
    }
}

// --- GŁÓWNY INICJATOR ---
function initAll() {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(t => t.kill());
    
    // Inicjalizacja komponentów
    initProductLogic();
    initGeneralLogic();
    // [Tutaj wywołaj swoje initAnimations(), initGSAP() itp. jeśli je masz w pliku]
    
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();

    if (premiumScrollTarget) {
        scrollToAnchor(premiumScrollTarget);
        premiumScrollTarget = null;
    } else if (window.location.hash) {
        scrollToAnchor(window.location.hash);
    }
}

window.addEventListener("load", () => initAll());

// --- SILNIK INTEGRACJI BARBA.JS ---
if (typeof barba !== 'undefined') {
    barba.init({
        sync: false,
        transitions: [{
            name: 'cinematic-focus',
            async leave(data) {
                if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.getAll().forEach(t => t.kill());
                return gsap.to(data.current.container, { y: 40, opacity: 0, filter: "blur(15px)", duration: 0.6, ease: "power2.inOut" });
            },
            async enter(data) {
                window.scrollTo(0, 0); 
                gsap.set(data.next.container, { y: -40, opacity: 0, filter: "blur(15px)" });
                return gsap.to(data.next.container, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out", clearProps: "filter" });
            },
            after() {
                initAll(); // To jest kluczowe! Uruchamia wszystkie skrypty na nowo po załadowaniu podstrony.
            }
        }]
    });
}
