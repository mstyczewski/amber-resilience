/* =========================================================================
   AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (REFACTORED)
   ========================================================================= */

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

// --- SILNIKI ANIMACJI ---

function initAnimations() {
    gsap.utils.toArray('.fade-in-up').forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0, y: 30 }, 
            { 
                opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
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
    if (document.querySelector("#hero")) {
        gsap.to("#hero", {
            scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 },
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
// Przypisujemy do obiektu window, aby HTML mógł się do nich odwołać (onclick)
window.openLightbox = function() {
    const dossierImage = document.getElementById('dossier-image');
    if (!dossierImage) return;

    // Pobieranie URL zdjęcia z tła
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
    // Sprawdzamy czy na stronie istnieje element dossier-image
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
// --- OBSŁUGA FORMULARZA KONTAKTOWEGO ---
function initContactForm() {
    const checkbox = document.getElementById('privacy-policy');
    const submitBtn = document.getElementById('submit-btn');

    // Sprawdzenie czy jesteśmy na stronie z formularzem
    if (!checkbox || !submitBtn) return;

    // Reset przycisku przy ładowaniu strony
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-40', 'pointer-events-none', 'grayscale');

    // Dodanie nasłuchiwania zdarzenia
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Odblokowanie
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-40', 'pointer-events-none', 'grayscale');
        } else {
            // Zablokowanie
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-40', 'pointer-events-none', 'grayscale');
        }
    });
}
// Obsługa menu mobilnego
function initMobileMenu() {
    const menuBtn = document.querySelector('.md\\:hidden'); // Przycisk hamburgera
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Opcjonalnie: zablokuj przewijanie strony, gdy menu jest otwarte
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
    });
    
    // Zamykanie menu po kliknięciu w link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });
}


// 3. Główny Inicjator
function initAll() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
    
    setTimeout(() => {
        initAnimations();
        initBackpackCardsAnimation();
        initHeroAndThreatAnimations();
        initFeatureGridAnimation();
        initFAQ();
	initLightbox();
	initContactForm();
	initMobileMenu();
	
        
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 300);
}

window.addEventListener("load", initAll);

if (typeof barba !== 'undefined') {
    barba.init({
        transitions: [{
            name: 'cinematic-focus',
            async leave(data) {
                return gsap.to(data.current.container, {
                    y: 40, opacity: 0, filter: "blur(15px)", duration: 0.6, ease: "power2.inOut"
                });
            },
            async enter(data) {
                window.scrollTo(0, 0);
                gsap.set(data.next.container, { y: -40, opacity: 0, filter: "blur(15px)" });
                return gsap.to(data.next.container, {
                    y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out"
                });
            },
            after() {
                initAll();
            }
        }]
    });
}
