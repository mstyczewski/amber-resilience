/* =========================================================================
AMBER RESILIENCE | CINEMATIC ROUTING ENGINE (FIXED)
======================================================================== */

let premiumScrollTarget = null;

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        location.reload();
    }
});

if (
    typeof gsap !== 'undefined' &&
    typeof ScrollTrigger !== 'undefined'
) {
    gsap.registerPlugin(ScrollTrigger);
}

/* =========================
GLOBAL FUNCTIONS SYNC
========================= */

function syncWindowFunctions() {

    [
        'updateQuantity',
        'openDossier',
        'closeDossier',
        'changeMainImage',
        'navigateMainImage',
        'scrollThumbnails'
    ].forEach(fn => {

        if (
            typeof window[fn] !== 'function' &&
            typeof globalThis[fn] === 'function'
        ) {
            window[fn] = globalThis[fn];
        }

    });

}

/* =========================
EVENT DELEGATION
========================= */

function initDelegation() {

    if (document.body.dataset.eventsReady)
        return;

    document.body.dataset.eventsReady = '1';

    document.addEventListener('click', (e) => {

        const qty =
            e.target.closest('.btn-qty');

        if (
            qty &&
            typeof window.updateQuantity ===
                'function'
        ) {

            e.preventDefault();

            window.updateQuantity(
                Number(
                    qty.dataset.action
                )
            );

            return;
        }

        const dossier =
            e.target.closest(
                '.btn-dossier'
            );

        if (
            dossier &&
            typeof window.openDossier ===
                'function'
        ) {

            e.preventDefault();

            window.openDossier(
                dossier.dataset.id
            );
        }

    });

}

/* =========================
ANIMATIONS
========================= */

function initAnimations() {

    document
        .querySelectorAll(
            '.fade-in-up'
        )
        .forEach(el => {

            el.classList.remove(
                'visible'
            );

            const obs =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        'visible'
                                    );

                                    obs.disconnect();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.1
                    }
                );

            obs.observe(el);

        });

}

function initLightbox() {

    const img =
        document.getElementById(
            'dossier-image'
        );

    if (!img)
        return;

    img.style.cursor =
        'zoom-in';

    img.onclick =
        window.openLightbox;

}

function scrollToAnchor(
    hash
) {

    if (!hash)
        return;

    const el =
        document.getElementById(
            hash.replace(
                '#',
                ''
            )
        );

    if (!el)
        return;

    gsap.to(
        document.scrollingElement,
        {
            scrollTop:
                el.offsetTop -
                100,
            duration:
                1.5
        }
    );

}

/* =========================
MASTER INIT
========================= */

function initAll() {

    syncWindowFunctions();

    if (
        typeof ScrollTrigger !==
        'undefined'
    ) {

        ScrollTrigger
            .getAll()
            .forEach(t =>
                t.kill()
            );

    }

    initDelegation();

    initAnimations();

    initLightbox();

    if (
        typeof initFAQ ===
        'function'
    )
        initFAQ();

    if (
        typeof initContactForm ===
        'function'
    )
        initContactForm();

    if (
        typeof initNavLinks ===
        'function'
    )
        initNavLinks();

    requestAnimationFrame(
        () => {

            if (
                typeof ScrollTrigger !==
                'undefined'
            ) {

                ScrollTrigger.refresh();

            }

        }
    );

    const target =
        premiumScrollTarget ||
        window.location.hash;

    if (target) {

        scrollToAnchor(
            target
        );

        premiumScrollTarget =
            null;

    }

}

/* =========================
START
========================= */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initAll();

    }
);

/* =========================
BARBA
========================= */

if (
    typeof barba !==
    'undefined'
) {

    barba.init({

        sync: false,

        transitions: [

            {

                name:
                    'cinematic-focus',

                async leave(
                    data
                ) {

                    ScrollTrigger
                        ?.getAll()
                        .forEach(t =>
                            t.kill()
                        );

                    return gsap.to(
                        data.current
                            .container,
                        {
                            opacity:
                                0,
                            y:
                                40,
                            duration:
                                0.5
                        }
                    );

                },

                async enter(
                    data
                ) {

                    window.scrollTo(
                        0,
                        0
                    );

                    return gsap.fromTo(
                        data.next
                            .container,

                        {
                            opacity:
                                0
                        },

                        {
                            opacity:
                                1,

                            duration:
                                0.7
                        }
                    );

                },

                after() {

                    requestAnimationFrame(
                        () => {

                            requestAnimationFrame(
                                () => {

                                    initAll();

                                }
                            );

                        }
                    );

                }

            }

        ]

    });

}
