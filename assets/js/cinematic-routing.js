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
// 5. Silnik Przejść Barba.js
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