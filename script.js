document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPALES
    ===================================================== */

    const body = document.body;
    const header = document.querySelector(".header");
    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".menu-btn");
    const backTop = document.querySelector(".back-top");
    const progress = document.querySelector(".scroll-progress");


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    if (typeof CONFIG === "undefined") {

        console.error("CONFIG no está disponible.");

        return;

    }


    /* =====================================================
       FUNCIONES AUXILIARES
    ===================================================== */

    function setText(selector, value) {

        document.querySelectorAll(selector).forEach(element => {

            if (value !== undefined && value !== null) {

                element.textContent = value;

            }

        });

    }


    function setImage(key) {

        const image = CONFIG.imagenes?.[key];

        if (!image) return;

        document
            .querySelectorAll(`[data-imagen="${key}"]`)
            .forEach(element => {

                element.src = image;

            });

    }


    /* =====================================================
       INFORMACIÓN DEL NEGOCIO
    ===================================================== */

    setText(
        "[data-negocio]",
        CONFIG.negocio.nombre
    );


    setText(
        "[data-descripcion]",
        CONFIG.negocio.descripcion
    );


    setText(
        "[data-categoria]",
        CONFIG.negocio.categoria
    );


    /* =====================================================
       TEXTOS
    ===================================================== */

    setText(
        '[data-texto="subtituloServicios"]',
        CONFIG.textos.subtituloServicios
    );


    setText(
        '[data-texto="tituloNosotros"]',
        CONFIG.textos.tituloNosotros
    );


    setText(
        '[data-texto="tituloProceso"]',
        CONFIG.textos.tituloProceso
    );


    setText(
        '[data-texto="tituloGaleria"]',
        CONFIG.textos.tituloGaleria
    );


    setText(
        '[data-texto="tituloTestimonios"]',
        CONFIG.textos.tituloTestimonios
    );


    setText(
        '[data-texto="tituloContacto"]',
        CONFIG.textos.tituloContacto
    );


    setText(
        '[data-texto="textoContacto"]',
        CONFIG.textos.textoContacto
    );


    /* =====================================================
       IMÁGENES
    ===================================================== */

    Object.keys(CONFIG.imagenes || {}).forEach(key => {

        setImage(key);

    });


    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    setText(
        '[data-estadistica="clientes"]',
        CONFIG.estadisticas.clientes
    );


    setText(
        '[data-estadistica="proyectos"]',
        CONFIG.estadisticas.proyectos
    );


    setText(
        '[data-estadistica="experiencia"]',
        CONFIG.estadisticas.experiencia
    );


    setText(
        '[data-estadistica="satisfaccion"]',
        CONFIG.estadisticas.satisfaccion
    );


    /* =====================================================
       CONTACTO
    ===================================================== */

    document
        .querySelectorAll("[data-whatsapp]")
        .forEach(element => {

            const number = CONFIG.contacto.whatsapp;

            if (number) {

                element.href =
                    `https://wa.me/${number}`;

            }

        });


    document
        .querySelectorAll("[data-email]")
        .forEach(element => {

            element.href =
                `mailto:${CONFIG.contacto.email}`;

            if (
                element.tagName === "STRONG" ||
                element.classList.contains("contact-detail")
            ) {

                element.textContent =
                    CONFIG.contacto.email;

            }

        });


    document
        .querySelectorAll("[data-telefono]")
        .forEach(element => {

            element.href =
                `tel:${CONFIG.contacto.telefono}`;

            const strong =
                element.querySelector("strong");

            if (strong) {

                strong.textContent =
                    CONFIG.contacto.telefono;

            }

        });


    /* =====================================================
       REDES SOCIALES
    ===================================================== */

    document
        .querySelectorAll("[data-instagram]")
        .forEach(element => {

            if (CONFIG.redes.instagram) {

                element.href =
                    CONFIG.redes.instagram;

            }

        });


    document
        .querySelectorAll("[data-facebook]")
        .forEach(element => {

            if (CONFIG.redes.facebook) {

                element.href =
                    CONFIG.redes.facebook;

            }

        });


    document
        .querySelectorAll("[data-tiktok]")
        .forEach(element => {

            if (CONFIG.redes.tiktok) {

                element.href =
                    CONFIG.redes.tiktok;

            }

        });


    document
        .querySelectorAll("[data-youtube]")
        .forEach(element => {

            if (CONFIG.redes.youtube) {

                element.href =
                    CONFIG.redes.youtube;

            }

        });


    /* =====================================================
       UBICACIÓN Y HORARIO
    ===================================================== */

    setText(
        "[data-ciudad]",
        CONFIG.sitio.ciudad
    );


    setText(
        "[data-horario]",
        CONFIG.sitio.horario
    );


    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    document
        .querySelectorAll("[data-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       HEADER
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

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width = "0%";

            return;

        }


        const percentage =
            (scrollTop / documentHeight) * 100;


        progress.style.width =
            `${percentage}%`;

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

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (menuBtn && nav) {

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        menuBtn.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("open");


            body.classList.toggle(
                "menu-open",
                isOpen
            );


            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );

        });


        nav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });

    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ANIMACIONES REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;


                        entry.target.classList.add(
                            "active"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
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
       DELAY DE TARJETAS
    ===================================================== */

    const groups = [

        ".services-grid",

        ".testimonials-grid",

        ".process-grid",

        ".stats-grid"

    ];


    groups.forEach(selector => {

        const container =
            document.querySelector(selector);


        if (!container) return;


        Array
            .from(container.children)
            .forEach((item, index) => {

                item.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );

            });

    });


    /* =====================================================
       PARALLAX DEL HERO
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image img");


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        heroImage &&
        !prefersReducedMotion
    ) {

        let ticking = false;


        function updateParallax() {

            if (ticking) return;


            window.requestAnimationFrame(() => {

                const scroll =
                    window.scrollY;


                if (
                    scroll <
                    window.innerHeight
                ) {

                    const movement =
                        scroll * 0.08;


                    heroImage.style.transform =
                        `translateY(${movement}px) scale(1.02)`;

                }


                ticking = false;

            });


            ticking = true;

        }


        window.addEventListener(
            "scroll",
            updateParallax,
            { passive: true }
        );

    }


    /* =====================================================
       NAVEGACIÓN SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        });


    /* =====================================================
       SCROLL
    ===================================================== */

    function handleScroll() {

        updateHeader();

        updateProgress();

        updateBackTop();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "✨ Plantilla premium cargada correctamente."
    );

});
