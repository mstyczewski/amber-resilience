/* =========================================================================
   AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (REFACTORED)
   ========================================================================= */

// --- STATE MANAGER ---
let premiumScrollTarget = null;

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

// --- DELEGACJA ZDARZEŃ (NAPRAWA BRAKU REAKCJI NA MOBILE) ---
document.addEventListener('click', (e) => {
    // Obsługa przycisków ilości
    const qtyBtn = e.target.closest('.btn-qty');
    if (qtyBtn && typeof window.updateQuantity === 'function') {
        const action = parseInt(qtyBtn.dataset.action);
        window.updateQuantity(action);
    }

    // Obsługa kliknięć w moduły (Dossier)
    const dossierBtn = e.target.closest('.btn-dossier');
    if (dossierBtn && typeof window.openDossier === 'function') {
        window.openDossier(dossierBtn.dataset.id);
    }
});

// --- SILNIKI ANIMACJI ---

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
            scrollTrigger: {
                trigger: "#wybor-plecaka",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
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
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            stagger: 0.5, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".threat-grid",
                start: "top 70%",
                end: "top 0%",
                scrub: 4
            }
        }
    );
}

function initFeatureGridAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length === 0) return;

    gsap.fromTo(featureCards, 
        { y: 40, opacity: 0 }, 
        {
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            stagger: 0.4, 
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".feature-grid-container", 
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        }
    );
}

// --- OBSŁUGA LIGHTBOXA ---
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

function initLightbox() {
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
                gsap.fromTo(submitBtn, 
                    { scale: 0.98 }, 
                    { scale: 1, duration: 0.4, ease: "back.out(1.5)" }
                );
            }
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-40', 'pointer-events-none', 'grayscale');
        }
    });
}

// --- FUNKCJA PŁYNNEGO SCROLLOWANIA DO KOTWICY ---
function scrollToAnchor(hash) {
    if (!hash || typeof hash !== 'string') return; 
    
    const targetId = hash.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const navOffset = 100;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;
        
        document.documentElement.classList.remove('scroll-smooth');
        
        gsap.to(document.scrollingElement, {
            scrollTop: targetPosition,
            duration: 1.8,
            ease: "power4.inOut",
            overwrite: "auto",
            onComplete: () => {
                document.documentElement.classList.add('scroll-smooth');
            }
        });
    }
}

// --- INTELIGENTNA OBSŁUGA KLIKNIĘĆ W MENU ---
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

// 3. Główny Inicjator (Bez setTimeout)
function initAll() {
    // Czyścimy wszystko przed startem
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
    
    initAnimations();
    initBackpackCardsAnimation();
    initHeroAndThreatAnimations();
    initFeatureGridAnimation();
    initFAQ();
    initLightbox();
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
}

window.addEventListener("load", () => initAll());

// --- SILNIK INTEGRACJI BARBA.JS + GSAP ---
if (typeof barba !== 'undefined') {
    barba.init({
        sync: false,
        transitions: [{
            name: 'cinematic-focus',
            async leave(data) {
                // Czyścimy animacje przy wyjściu
                ScrollTrigger.getAll().forEach(t => t.kill());
                // Resetujemy stan wizualny sekcji Hero i kontenera
                const hero = document.querySelector("#hero");
                if (hero) gsap.set(hero, { clearProps: "all" });
                
                return gsap.to(data.current.container, {
                    y: 40, opacity: 0, filter: "blur(15px)", duration: 0.6, ease: "power2.inOut"
                });
            },
            async enter(data) {
                window.scrollTo(0, 0); 
                gsap.set(data.next.container, { y: -40, opacity: 0, filter: "blur(15px)" });
                return gsap.to(data.next.container, {
                    y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
                    clearProps: "filter"
                });
            },
            after() {
                initAll();
            }
        }]
    });
}
