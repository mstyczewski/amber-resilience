/* =========================================================================
   AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (SCALABLE ARCHITECTURE)
   ========================================================================= */

let premiumScrollTarget = null;
let isInitialLoad = true;

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

/* =========================================================================
   GLOBALNE FUNKCJE LOGIKI PRODUKTU
   ========================================================================= */

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

// 2. Motion that whispers: Aktualizacja wizualna z animacją
window.updatePriceDisplay = function(quantity) {
    const priceElement = document.getElementById('price-display');
    if (priceElement) {
        // Dynamiczne czytanie ceny
        const basePrice = parseInt(priceElement.getAttribute('data-base-price')) || 1900;
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
        const basePrice = parseInt(priceElement.getAttribute('data-base-price')) || 1900;
        const currentValue = parseInt(qtyInput.value) || 1;
        
        priceElement.innerText = `${(basePrice * currentValue).toLocaleString('pl-PL')} PLN`;
    }
};

window.changeMainImage = function(imageUrl, btnElement) {
    const mainBg = document.getElementById('main-image-bg');
    if (mainBg) {
        mainBg.style.opacity = '0';
        setTimeout(() => {
            // Jawne wymuszenie containment
            mainBg.style.backgroundImage = `url('${imageUrl}')`;
            mainBg.style.backgroundSize = 'contain';
            mainBg.style.backgroundRepeat = 'no-repeat';
            mainBg.style.backgroundPosition = 'center';
            mainBg.style.opacity = '1';
        }, 150); 
    }
    
    const thumbnails = document.querySelectorAll('.thumbnail-btn');
    thumbnails.forEach(btn => {
        btn.classList.remove('border-brand-gold');
        btn.classList.add('border-white/5');
        const imgInner = btn.querySelector('.thumbnail-inner');
        if (imgInner) imgInner.classList.remove('brightness-50');
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

/* =========================================================================
   CINEMATIC LIGHTBOX ENGINE (FULLSCREEN INSPECTION)
   ========================================================================= */

window.openLightbox = function() {
    const activeImage = document.getElementById('dossier-active-image');
    if (!activeImage) return;

    const bgImageStyle = activeImage.style.backgroundImage;
    const imageUrl = bgImageStyle.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
    
    if (!imageUrl) return;

    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageUrl;
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100', 'pointer-events-auto');
        setTimeout(() => { 
            lightboxImg.classList.remove('scale-90'); 
            lightboxImg.classList.add('scale-100');
        }, 50);
    }
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-90');
        lightbox.classList.remove('opacity-100', 'pointer-events-auto');
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
        
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
            nav.classList.add('-translate-y-full');
        } 
        else if (currentScrollY < lastScrollY) {
            nav.classList.remove('-translate-y-full');
        }
        
        if (currentScrollY > 50) {
            nav.classList.add('bg-brand-dark/60', 'backdrop-blur-lg', 'shadow-2xl');
            nav.classList.remove('bg-transparent');
            
            nav.classList.remove('py-6');
            nav.classList.add('py-4');
        } else {
            nav.classList.remove('bg-brand-dark/60', 'backdrop-blur-lg', 'shadow-2xl', 'py-4');
            nav.classList.add('bg-transparent', 'py-6');
        }
        
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', window._smartHeaderScroll, { passive: true });
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
        gsap.fromTo(hero, 
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            {
                scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
                scale: 0.95, opacity: 0.5, filter: "blur(10px)", ease: "none"
            }
        );
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
    // THE $10K UPDATE: Animacja dostosowana do nowej architektury HTML (.module-row)
    const moduleRows = document.querySelectorAll('.module-row');
    if (moduleRows.length === 0) return;

    moduleRows.forEach(row => {
        gsap.fromTo(row, 
            { y: 60, opacity: 0 }, 
            {
                y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                scrollTrigger: { 
                    trigger: row, 
                    start: "top 80%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );
    });
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
    const form = document.getElementById('premium-contact-form');
    const privacyCheckbox = document.getElementById('privacy-policy');
    const submitBtn = document.getElementById('submit-btn');

    if (!form || !privacyCheckbox || !submitBtn) return;

    const newCheckbox = privacyCheckbox.cloneNode(true);
    privacyCheckbox.parentNode.replaceChild(newCheckbox, privacyCheckbox);

    newCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnText = submitBtn.querySelector('span.relative.z-10');
        const originalText = btnText.innerText;
        
        btnText.innerText = 'WYSYŁANIE...';
        submitBtn.classList.add('opacity-70', 'pointer-events-none');
        gsap.to(submitBtn, { opacity: 0.5, yoyo: true, repeat: -1, duration: 0.6, ease: "power1.inOut" });

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/mailer.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            gsap.killTweensOf(submitBtn);

            if (result.success) {
                submitBtn.classList.remove('opacity-70', 'border-brand-gold/30');
                submitBtn.classList.add('border-brand-gold', 'bg-brand-gold/10');
                gsap.to(submitBtn, { opacity: 1, duration: 0.3 });
                btnText.innerText = 'WIADOMOŚĆ PRZEKAZANA';
                btnText.classList.remove('text-brand-gold');
                btnText.classList.add('text-brand-ivory');
                form.reset();
                newCheckbox.checked = false;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('[Amber Resilience | Error]', error);
            gsap.killTweensOf(submitBtn);
            gsap.to(submitBtn, { opacity: 1, duration: 0.3 });
            
            gsap.fromTo(submitBtn, 
                { x: -5 }, 
                { x: 5, duration: 0.1, yoyo: true, repeat: 5, ease: "none", 
                  onComplete: () => { btnText.innerText = 'BŁĄD. SPRÓBUJ PONOWNIE'; }
                }
            );
            
            setTimeout(() => {
                btnText.innerText = originalText;
                submitBtn.classList.remove('pointer-events-none');
            }, 3000);
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
    
    if (!trigger || !overlay) return;

    const newTrigger = trigger.cloneNode(true);
    trigger.parentNode.replaceChild(newTrigger, trigger);
    
    const newCloseBtn = closeBtn ? closeBtn.cloneNode(true) : null;
    if (closeBtn) closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

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

    const links = document.querySelectorAll('.mobile-nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            document.body.style.overflow = '';
            tl.reverse();
            
            const href = link.getAttribute('href');
            if(href && href.includes('#')) {
                const hashPart = href.split('#')[1];
                if (document.getElementById(hashPart)) {
                    setTimeout(() => window.scrollToAnchor('#' + hashPart), 400);
                }
            }
        });
    });

    const subLinks = document.querySelectorAll('.mobile-sub-link');
    subLinks.forEach(subLink => {
        subLink.addEventListener('click', () => {
            document.body.style.overflow = '';
            tl.reverse();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const cookieModal = document.getElementById('premium-cookie-modal');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const acceptEssentialBtn = document.getElementById('cookie-accept-essential');
    
    const cookieConsentName = 'amber_resilience_consent';

    if (!cookieModal) return; 

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

    if (!localStorage.getItem(cookieConsentName)) {
        setTimeout(() => tlCookie.play(), 2500); 
    }

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

    document.addEventListener('click', (e) => {
        const openSettingsBtn = e.target.closest('#open-cookie-settings');
        
        if (openSettingsBtn) {
            e.preventDefault(); 
            tlCookie.restart(); 
        }
    });
});

/* =========================================================================
   PORTAL ENGINE 
   ========================================================================= */
function setupPortals() {
    const lightbox = document.getElementById('lightbox-overlay');
    if (lightbox && lightbox.parentNode !== document.body) {
        document.body.appendChild(lightbox);
    }
}

/* =========================================================================
   LUXURY DROPDOWN & MOBILE ACCORDION ENGINE (Hybryda Desktop + Mobile)
   ========================================================================= */
function initBackpacksDropdown() {
    const container = document.querySelector('.dropdown-container');
    const trigger = document.getElementById('backpacks-dropdown-trigger');
    const menu = document.getElementById('backpacks-dropdown-menu');

    if (container && trigger && menu) {
        const newContainer = container.cloneNode(true);
        container.parentNode.replaceChild(newContainer, container);

        const freshContainer = document.querySelector('.dropdown-container');
        const freshTrigger = document.getElementById('backpacks-dropdown-trigger');
        const freshMenu = document.getElementById('backpacks-dropdown-menu');
        const freshArrow = freshTrigger.querySelector('.dropdown-arrow');

        let hoverTimeout = null;

        function openMenu() {
            clearTimeout(hoverTimeout);
            freshTrigger.setAttribute('aria-expanded', 'true');
            freshMenu.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
            freshMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            if (freshArrow) freshArrow.style.transform = 'rotate(180deg)';
        }

        function closeMenu() {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                freshTrigger.setAttribute('aria-expanded', 'false');
                freshMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                freshMenu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                if (freshArrow) freshArrow.style.transform = 'rotate(0deg)';
            }, 100);
        }

        freshContainer.addEventListener('mouseenter', openMenu);
        freshContainer.addEventListener('mouseleave', closeMenu);
        
        freshTrigger.addEventListener('click', (e) => {
            if (window.matchMedia('(pointer: coarse)').matches) {
                e.preventDefault();
                const isExpanded = freshTrigger.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }
        });
    }

    const mobileToggle = document.getElementById('mobile-backpacks-toggle');
    const mobileSubmenu = document.getElementById('mobile-backpacks-submenu');
    const mobileArrow = document.getElementById('mobile-backpacks-arrow');

    if (mobileToggle && mobileSubmenu) {
        const newMobileToggle = mobileToggle.cloneNode(true);
        mobileToggle.parentNode.replaceChild(newMobileToggle, mobileToggle);

        const freshToggle = document.getElementById('mobile-backpacks-toggle');
        const freshSubmenu = document.getElementById('mobile-backpacks-submenu');
        const freshArrowMob = document.getElementById('mobile-backpacks-arrow');

        freshToggle.addEventListener('click', () => {
            const isExpanded = freshToggle.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                freshToggle.setAttribute('aria-expanded', 'false');
                freshSubmenu.style.gridTemplateRows = '0fr';
                if (freshArrowMob) freshArrowMob.style.transform = 'rotate(0deg)';
            } else {
                freshToggle.setAttribute('aria-expanded', 'true');
                freshSubmenu.style.gridTemplateRows = '1fr';
                if (freshArrowMob) freshArrowMob.style.transform = 'rotate(180deg)';
            }
        });

        const subLinks = document.querySelectorAll('.mobile-sub-link');
        const menuOverlay = document.getElementById('mobile-menu-overlay');
        
        subLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.style.overflow = '';
                if (menuOverlay) {
                    menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
                    menuOverlay.classList.add('opacity-0', 'pointer-events-none');
                }
            });
        });
    }
}

/* =========================================================================
   OFF-CANVAS CHECKOUT ENGINE (CLEAN ARCHITECTURE & SPA SAFE)
   ========================================================================= */
function initStripeCheckout() {
    const triggerBtn = document.getElementById('stripe-checkout-btn');
    let drawer = document.getElementById('checkout-drawer');
    let overlay = document.getElementById('checkout-drawer-overlay');
    let closeBtn = document.getElementById('close-drawer-btn');
    let form = document.getElementById('premium-checkout-form');
    
    if (!triggerBtn || !drawer || !form) return;

    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    form = newForm;

    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    closeBtn = newCloseBtn;

    const newOverlay = overlay.cloneNode(true);
    overlay.parentNode.replaceChild(newOverlay, overlay);
    overlay = newOverlay;

    setTimeout(() => {
        drawer.classList.add('transition-all', 'duration-[0.8s]', 'ease-[cubic-bezier(0.16,1,0.3,1)]');
    }, 100);

    const updateDrawerPrice = () => {
        const qtyInput = document.getElementById('qty-input');
        const priceDisplay = document.getElementById('price-display');
        const drawerPrice = document.getElementById('drawer-price');
        
        if (!qtyInput || !priceDisplay || !drawerPrice) return;

        const qty = parseInt(qtyInput.value) || 1;
        const base = parseInt(priceDisplay.getAttribute('data-base-price')) || 0;
        drawerPrice.innerText = (base * qty).toLocaleString('pl-PL') + ' PLN';
    };

    triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateDrawerPrice();
        document.body.style.overflow = 'hidden';
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
        
        drawer.classList.remove('translate-x-full', 'shadow-none');
        drawer.classList.add('translate-x-0', 'shadow-2xl');
    });

    const closeDrawer = () => {
        document.body.style.overflow = '';
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        
        drawer.classList.remove('translate-x-0', 'shadow-2xl');
        drawer.classList.add('translate-x-full', 'shadow-none');
    };

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('final-checkout-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        submitBtn.classList.add('pointer-events-none');
        if (typeof gsap !== 'undefined') {
            gsap.to(submitBtn, { opacity: 0.7, yoyo: true, repeat: -1, duration: 0.6 });
        }
        btnText.innerText = 'ŁĄCZENIE ZE STRIPE...';
        
        const customerTypeRadio = form.querySelector('input[name="customer_type"]:checked');
        const colorRadio = form.querySelector('input[name="backpack_color"]:checked');
		const deliveryRadio = form.querySelector('input[name="delivery_method"]:checked'); 
        const qtyInput = document.getElementById('qty-input');
        const priceDisplay = document.getElementById('price-display');
        
        const payload = {
            quantity: qtyInput ? (parseInt(qtyInput.value) || 1) : 1,
            basePrice: priceDisplay ? (parseInt(priceDisplay.getAttribute('data-base-price')) || 0) : 0,
            customer_type: customerTypeRadio ? customerTypeRadio.value : 'person',
            backpack_color: colorRadio ? colorRadio.value : 'Czarny',
			delivery_method: deliveryRadio ? deliveryRadio.value : 'shipping' 
        };

        try {
            const response = await fetch('/api/stripe-checkout.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url; 
            } else {
                throw new Error('Serwer odrzucił sesję.');
            }
        } catch (err) {
            console.error('[Terminal Error]', err);
            
            if (typeof gsap !== 'undefined') {
                gsap.killTweensOf(submitBtn);
                gsap.to(submitBtn, { opacity: 1, duration: 0.3 });
            }
            
            btnText.innerText = 'BŁĄD POŁĄCZENIA';
            
            setTimeout(() => {
                btnText.innerText = 'AUTORYZUJ TRANSAKCJĘ';
                submitBtn.classList.remove('pointer-events-none');
            }, 3000);
        }
    });
}

/* =========================================================================
   GŁÓWNY INICJATOR Z ZINTEGROWANYM PRELOADEREM (Zoptymalizowany)
   ========================================================================= */
async function initAll(targetHash = null) {
    const preloader = document.getElementById('premium-preloader');
    
    if (isInitialLoad && preloader) {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);

        const logo = document.getElementById('preloader-logo');
        const line = document.getElementById('preloader-line');
        const meta = document.getElementById('preloader-meta');
        const counterEl = document.getElementById('preloader-counter');
        const topPanel = preloader.querySelector('.top-panel');
        const bottomPanel = preloader.querySelector('.bottom-panel');
        const video = document.getElementById('hero-video'); 
        const counter = { val: 0 };

        const tlIntro = gsap.timeline();
        tlIntro.to(logo, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power2.out" }, "+=0.1")
               .to(line, { width: "140px", duration: 1.5, ease: "expo.out" }, "-=1.5")
               .to(meta, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=1.2");

        const tlCounter = gsap.to(counter, {
            val: 85, duration: 2.8, ease: "power1.inOut",
            onUpdate: function() {
                if (counterEl) counterEl.innerText = Math.round(this.targets()[0].val).toString().padStart(3, '0');
            }
        });

        const luxuryBrandingTime = 3500; 

        setTimeout(() => {
            tlCounter.kill();
            
            gsap.set('.hero-overlay + div', { y: 40, opacity: 0, filter: "blur(5px)" });
            
            const closeTl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    preloader.remove();
                    
                    initHeroAndThreatAnimations(); 
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                    if (hashToScroll) scrollToAnchor(hashToScroll);
                    isInitialLoad = false; 
                }
            });

            closeTl.to(counter, {
                val: 100, duration: 0.6, ease: "power4.out",
                onUpdate: function() {
                    if (counterEl) counterEl.innerText = Math.round(this.targets()[0].val).toString().padStart(3, '0');
                }
            })
            .to(counterEl, { color: '#C5A059', duration: 0.3 }, "-=0.2")
            .to([logo, meta, line], { opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1, ease: "power2.inOut" }, "+=0.3")
            .to(topPanel, { yPercent: -100, duration: 1.5, ease: "expo.inOut" }, "-=0.2")
            .to(bottomPanel, { yPercent: 100, duration: 1.5, ease: "expo.inOut" }, "<")
            .to('.hero-overlay + div', { y: 0, opacity: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }, "-=1.0"); 
            
            if (video && video.paused) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn("[Premium Architecture] Chromium zablokowało autoplay. Fallback do postera zaaplikowany.");
                    });
                }
            }
        }, luxuryBrandingTime);
    }
    
    const footerContainer = document.getElementById('dynamic-footer');
    if (footerContainer && footerContainer.innerHTML.trim() === '') {
        try {
            const response = await fetch('/assets/components/footer.html');
            if (response.ok) {
                footerContainer.innerHTML = await response.text();
            }
        } catch (error) {
            console.error("[Premium Engine] Krytyczny błąd sieci przy ładowaniu stopki:", error);
        }
    }
   
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
    
    setupPortals();
    initAnimations();
    initCinematicMedia();
    initBackpackCardsAnimation();
    initFeatureGridAnimation();
    initFAQ();
    initLightboxBind();
    initContactForm();
    initStripeCheckout();
    initObfuscatedEmails();
    initNavLinks();
    initMobileMenu();
    initBackpacksDropdown();
    window.syncPriceDisplay();
    window.initSmartHeader();
       
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

    if (!isInitialLoad || !preloader) {
        initHeroAndThreatAnimations();
        if (hashToScroll) scrollToAnchor(hashToScroll);
        isInitialLoad = false;
    }
}

document.addEventListener("DOMContentLoaded", () => initAll());

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
                document.querySelectorAll('body > #lightbox-overlay').forEach(el => el.remove());

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
