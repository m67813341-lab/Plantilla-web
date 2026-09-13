/* =========================================================
   SCRIPT.JS — PLANTILLA PREMIUM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const header = document.querySelector(".header");
    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".menu-btn");
    const backTop = document.querySelector(".back-top");
    const progress = document.querySelector(".scroll-progress");

    /* =====================================================
       HEADER AL HACER SCROLL
       ===================================================== */

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }


    /* =====================================================
       BARRA DE PROGRESO
       ===================================================== */

    function updateProgress() {
        if (!progress) return;

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (documentHeight <= 0) {
            progress.style.width = "0%";
            return;
        }

        const percentage = (scrollTop / documentHeight) * 100;

        progress.style.width = `${percentage}%`;
    }


    /* =====================================================
       BOTÓN VOLVER ARRIBA
       ===================================================== */

    function updateBackTop() {
        if (!backTop) return;

        if (window.scrollY > 500) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    }

    if (backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       MENÚ MOBILE
       ===================================================== */

    function closeMenu() {
        if (!nav || !menuBtn) return;

        nav.classList.remove("open");
        body.classList.remove("menu-open");

        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && nav) {

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            body.classList.toggle("menu-open", isOpen);

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        /* Cerrar al tocar un enlace */

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

    }


    /* =====================================================
       CERRAR MENÚ CON ESC
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       ANIMACIONES REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* =====================================================
       ANIMACIÓN ESCALONADA DE TARJETAS
       ===================================================== */

    const groups = [
        ".services-grid",
        ".testimonials-grid",
        ".process-grid",
        ".stats-grid"
    ];

    groups.forEach(selector => {

        const container = document.querySelector(selector);

        if (!container) return;

        const items = container.children;

        Array.from(items).forEach((item, index) => {

            item.style.setProperty(
                "--delay",
                `${index * 0.08}s`
            );

        });

    });


    /* =====================================================
       PARALLAX SUAVE DEL HERO
       ===================================================== */

    const heroImage = document.querySelector(".hero-image img");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (heroImage && !prefersReducedMotion) {

        let ticking = false;

        function updateParallax() {

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    const scroll = window.scrollY;

                    if (scroll < window.innerHeight) {

                        const movement = scroll * 0.08;

                        heroImage.style.transform =
                            `translateY(${movement}px) scale(1.02)`;

                    }

                    ticking = false;

                });

                ticking = true;
            }

        }

        window.addEventListener("scroll", updateParallax, {
            passive: true
        });

    }


    /* =====================================================
       CONTADORES DE ESTADÍSTICAS
       ===================================================== */

    const stats = document.querySelectorAll(".stat strong");

    function animateCounter(element) {

        const original = element.textContent.trim();

        const match = original.match(/^(\D*)(\d+)(.*)$/);

        if (!match) return;

        const prefix = match[1];
        const target = Number(match[2]);
        const suffix = match[3];

        if (target <= 0) return;

        let current = 0;
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;
            const progressValue =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progressValue, 3);

            current = Math.floor(target * eased);

            element.textContent =
                `${prefix}${current}${suffix}`;

            if (progressValue < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent =
                    `${prefix}${target}${suffix}`;
            }
        }

        requestAnimationFrame(updateCounter);
    }


    if (stats.length && "IntersectionObserver" in window) {

        const statsObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const element = entry.target;

                    if (element.dataset.animated === "true") {
                        return;
                    }

                    element.dataset.animated = "true";

                    animateCounter(element);

                    statsObserver.unobserve(element);

                });

            },
            {
                threshold: 0.5
            }
        );

        stats.forEach(stat => {
            statsObserver.observe(stat);
        });

    }


    /* =====================================================
       AÑO AUTOMÁTICO DEL FOOTER
       ===================================================== */

    document.querySelectorAll("[data-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       SUAVIZAR LINKS INTERNOS
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       EVENTOS DE SCROLL
       ===================================================== */

    function handleScroll() {
        updateHeader();
        updateProgress();
        updateBackTop();
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });


    /* =====================================================
       ESTADO INICIAL
       ===================================================== */

    handleScroll();


    /* =====================================================
       CAMBIO DE TAMAÑO DE VENTANA
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });


    console.log("✨ Plantilla premium cargada correctamente.");

});
/* =====================================================
   CONFIGURACIÓN DEL NEGOCIO
   ===================================================== */

document.querySelectorAll("[data-negocio]").forEach(element => {
    element.textContent = CONFIG.negocio.nombre;
});

document.querySelectorAll("[data-descripcion]").forEach(element => {
    element.textContent = CONFIG.negocio.descripcion;
});

document.querySelectorAll("[data-whatsapp]").forEach(element => {
    element.href = `https://wa.me/${CONFIG.contacto.whatsapp}`;
});

document.querySelectorAll("[data-email]").forEach(element => {
    element.href = `mailto:${CONFIG.contacto.email}`;
    element.textContent = CONFIG.contacto.email;
});

document.querySelectorAll("[data-telefono]").forEach(element => {
    element.href = `tel:${CONFIG.contacto.telefono}`;
    element.textContent = CONFIG.contacto.telefono;
});

document.querySelectorAll("[data-instagram]").forEach(element => {
    element.href = CONFIG.redes.instagram;
});

document.querySelectorAll("[data-ciudad]").forEach(element => {
    element.textContent = CONFIG.sitio.ciudad;
});
