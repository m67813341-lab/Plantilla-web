document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    if (typeof CONFIG === "undefined") {

        console.error("CONFIG no está disponible.");

        return;

    }


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const root = document.documentElement;
    const body = document.body;

    const header =
        document.querySelector(".header");

    const nav =
        document.querySelector(".nav");

    const menuBtn =
        document.querySelector(".menu-btn");

    const backTop =
        document.querySelector(".back-top");

    const progress =
        document.querySelector(".scroll-progress");


    /* =====================================================
       FUNCIONES GENERALES
    ===================================================== */

    function setText(selector, value) {

        if (
            value === undefined ||
            value === null
        ) {
            return;
        }

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.textContent = value;

            });

    }


    function setAttribute(
        selector,
        attribute,
        value
    ) {

        if (!value) return;

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.setAttribute(
                    attribute,
                    value
                );

            });

    }


    /* =====================================================
       COLORES
    ===================================================== */

    if (CONFIG.colores) {

        root.style.setProperty(
            "--black",
            CONFIG.colores.principal
        );

        root.style.setProperty(
            "--dark",
            CONFIG.colores.principal
        );

        root.style.setProperty(
            "--white",
            CONFIG.colores.fondo
        );

        root.style.setProperty(
            "--cream",
            CONFIG.colores.secundario
        );

        root.style.setProperty(
            "--gray",
            CONFIG.colores.textoSuave
        );

        root.style.setProperty(
            "--text",
            CONFIG.colores.texto
        );

        root.style.setProperty(
            "--acento",
            CONFIG.colores.acento
        );

    }


    /* =====================================================
       INFORMACIÓN GENERAL
    ===================================================== */

    setText(
        "[data-negocio]",
        CONFIG.negocio.nombre
    );

    setText(
        "[data-categoria]",
        CONFIG.negocio.categoria
    );

    setText(
        "[data-slogan]",
        CONFIG.negocio.slogan
    );

    setText(
        "[data-descripcion]",
        CONFIG.negocio.descripcion
    );

    setText(
        "[data-mensaje-hero]",
        CONFIG.negocio.mensajeHero
    );

    setText(
        "[data-etiqueta-hero]",
        CONFIG.negocio.etiquetaHero
    );


    /* =====================================================
       SEO
    ===================================================== */

    if (CONFIG.seo) {

        if (CONFIG.seo.titulo) {

            document.title =
                CONFIG.seo.titulo;

        }

        setAttribute(
            'meta[name="description"]',
            "content",
            CONFIG.seo.descripcion
        );

        setAttribute(
            'meta[name="theme-color"]',
            "content",
            CONFIG.seo.color
        );

        setAttribute(
            'meta[property="og:title"]',
            "content",
            CONFIG.seo.titulo
        );

        setAttribute(
            'meta[property="og:description"]',
            "content",
            CONFIG.seo.descripcion
        );

        setAttribute(
            'meta[property="og:image"]',
            "content",
            CONFIG.seo.imagen
        );

    }


    /* =====================================================
       IMÁGENES
    ===================================================== */

    function setImage(key) {

        const image =
            CONFIG.imagenes?.[key];

        if (!image) return;

        document
            .querySelectorAll(
                `[data-imagen="${key}"]`
            )
            .forEach(element => {

                element.src = image;

            });

    }


    Object
        .keys(CONFIG.imagenes || {})
        .forEach(key => {

            setImage(key);

        });


    /* =====================================================
       TEXTOS
    ===================================================== */

    Object
        .keys(CONFIG.textos || {})
        .forEach(key => {

            setText(
                `[data-texto="${key}"]`,
                CONFIG.textos[key]
            );

        });


    /* =====================================================
       BOTONES
    ===================================================== */

    Object
        .keys(CONFIG.botones || {})
        .forEach(key => {

            setText(
                `[data-boton="${key}"]`,
                CONFIG.botones[key]
            );

        });


    setText(
        '[data-boton="header"]',
        "Hablemos"
    );


    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    const statsContainer =
        document.querySelector(
            "[data-estadisticas]"
        );


    if (
        statsContainer &&
        Array.isArray(CONFIG.estadisticas)
    ) {

        CONFIG.estadisticas.forEach(
            (stat, index) => {

                const article =
                    document.createElement("div");

                article.className =
                    "stat reveal";

                article.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );


                const strong =
                    document.createElement("strong");

                strong.textContent =
                    stat.numero;


                const span =
                    document.createElement("span");

                span.textContent =
                    stat.texto;


                article.appendChild(strong);

                article.appendChild(span);

                statsContainer.appendChild(article);

            }
        );

    }


    /* =====================================================
       ESTADÍSTICAS DEL HERO
    ===================================================== */

    if (
        Array.isArray(CONFIG.estadisticas)
    ) {

        const clientes =
            CONFIG.estadisticas.find(
                item =>
                    item.texto
                        ?.toLowerCase()
                        .includes("cliente")
            );

        const experiencia =
            CONFIG.estadisticas.find(
                item =>
                    item.texto
                        ?.toLowerCase()
                        .includes("experiencia")
            );


        if (clientes) {

            setText(
                '[data-hero-estadistica="clientes"]',
                clientes.numero
            );

            setText(
                "[data-hero-badge]",
                clientes.numero
            );

        }


        if (experiencia) {

            setText(
                '[data-hero-estadistica="experiencia"]',
                experiencia.numero
            );

        }

    }


    /* =====================================================
       SERVICIOS
    ===================================================== */

    const servicesContainer =
        document.querySelector(
            "[data-servicios]"
        );


    if (
        servicesContainer &&
        Array.isArray(CONFIG.servicios)
    ) {

        CONFIG.servicios.forEach(
            (service, index) => {

                const article =
                    document.createElement("article");

                article.className =
                    "service-card reveal";

                article.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );


                const top =
                    document.createElement("div");

                top.className =
                    "service-top";


                const number =
                    document.createElement("span");

                number.className =
                    "service-number";

                number.textContent =
                    service.numero;


                const icon =
                    document.createElement("span");

                icon.className =
                    "service-icon";

                icon.textContent =
                    service.icono;


                top.appendChild(number);

                top.appendChild(icon);


                const title =
                    document.createElement("h3");

                title.textContent =
                    service.titulo;


                const description =
                    document.createElement("p");

                description.textContent =
                    service.descripcion;


                const link =
                    document.createElement("a");

                link.href =
                    "#contacto";

                link.innerHTML =
                    `${service.enlace} <span>→</span>`;


                article.appendChild(top);

                article.appendChild(title);

                article.appendChild(description);

                article.appendChild(link);

                servicesContainer.appendChild(
                    article
                );

            }
        );

    }


    /* =====================================================
       PROCESO
    ===================================================== */

    const processContainer =
        document.querySelector(
            "[data-proceso]"
        );


    if (
        processContainer &&
        Array.isArray(CONFIG.proceso)
    ) {

        CONFIG.proceso.forEach(
            (item, index) => {

                const article =
                    document.createElement("article");

                article.className =
                    "process-card reveal";

                article.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );


                const number =
                    document.createElement("span");

                number.className =
                    "process-number";

                number.textContent =
                    item.numero;


                const icon =
                    document.createElement("div");

                icon.className =
                    "process-icon";

                icon.textContent =
                    item.icono;


                const title =
                    document.createElement("h3");

                title.textContent =
                    item.titulo;


                const description =
                    document.createElement("p");

                description.textContent =
                    item.descripcion;


                article.appendChild(number);

                article.appendChild(icon);

                article.appendChild(title);

                article.appendChild(description);


                processContainer.appendChild(
                    article
                );

            }
        );

    }


    /* =====================================================
       GALERÍA
    ===================================================== */

    const galleryContainer =
        document.querySelector(
            "[data-galeria]"
        );


    if (
        galleryContainer &&
        Array.isArray(CONFIG.galeria)
    ) {

        CONFIG.galeria.forEach(
            (item, index) => {

                const article =
                    document.createElement("article");

                article.className =
                    "gallery-item reveal";


                if (index === 0) {

                    article.classList.add(
                        "gallery-item-large"
                    );

                }


                const image =
                    document.createElement("img");

                image.src =
                    CONFIG.imagenes?.[item.imagen] || "";

                image.alt =
                    item.titulo;

                image.loading =
                    "lazy";


                const overlay =
                    document.createElement("div");

                overlay.className =
                    "gallery-overlay";


                const number =
                    document.createElement("span");

                number.textContent =
                    item.numero;


                const title =
                    document.createElement("strong");

                title.textContent =
                    item.titulo;


                overlay.appendChild(number);

                overlay.appendChild(title);


                article.appendChild(image);

                article.appendChild(overlay);


                galleryContainer.appendChild(
                    article
                );

            }
        );

    }


    /* =====================================================
       TESTIMONIOS
    ===================================================== */

    const testimonialsContainer =
        document.querySelector(
            "[data-testimonios]"
        );


    if (
        testimonialsContainer &&
        Array.isArray(CONFIG.testimonios)
    ) {

        CONFIG.testimonios.forEach(
            (item, index) => {

                const article =
                    document.createElement("article");

                article.className =
                    "testimonial reveal";

                article.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );


                const stars =
                    document.createElement("div");

                stars.className =
                    "testimonial-stars";

                stars.textContent =
                    "★★★★★";


                const quote =
                    document.createElement("blockquote");

                quote.textContent =
                    `“${item.texto}”`;


                const author =
                    document.createElement("div");

                author.className =
                    "testimonial-author";


                const avatar =
                    document.createElement("div");

                avatar.className =
                    "testimonial-avatar";

                avatar.textContent =
                    item.inicial;


                const info =
                    document.createElement("div");


                const name =
                    document.createElement("strong");

                name.textContent =
                    item.nombre;


                const type =
                    document.createElement("span");

                type.textContent =
                    item.tipo;


                info.appendChild(name);

                info.appendChild(type);


                author.appendChild(avatar);

                author.appendChild(info);


                article.appendChild(stars);

                article.appendChild(quote);

                article.appendChild(author);


                testimonialsContainer.appendChild(
                    article
                );

            }
        );

    }


    /* =====================================================
       CONTACTO
    ===================================================== */

    const whatsappNumber =
        CONFIG.contacto?.whatsapp;


    if (whatsappNumber) {

        const message =
            encodeURIComponent(
                CONFIG.contacto.mensajeWhatsapp || ""
            );


        document
            .querySelectorAll(
                "[data-whatsapp]"
            )
            .forEach(element => {

                element.href =
                    `https://wa.me/${whatsappNumber}?text=${message}`;

            });

    }


    document
        .querySelectorAll("[data-email]")
        .forEach(element => {

            const email =
                CONFIG.contacto.email;

            if (!email) return;

            element.href =
                `mailto:${email}`;


            const strong =
                element.querySelector("strong");


            if (strong) {

                strong.textContent =
                    email;

            }

        });


    document
        .querySelectorAll("[data-telefono]")
        .forEach(element => {

            const phone =
                CONFIG.contacto.telefono;

            if (!phone) return;

            element.href =
                `tel:${phone}`;


            const strong =
                element.querySelector("strong");


            if (strong) {

                strong.textContent =
                    phone;

            }

        });


    /* =====================================================
       REDES SOCIALES
    ===================================================== */

    const socialMap = {

        instagram:
            CONFIG.redes?.instagram,

        facebook:
            CONFIG.redes?.facebook,

        tiktok:
            CONFIG.redes?.tiktok,

        youtube:
            CONFIG.redes?.youtube

    };


    Object
        .entries(socialMap)
        .forEach(([network, url]) => {

            document
                .querySelectorAll(
                    `[data-${network}]`
                )
                .forEach(element => {

                    if (url) {

                        element.href =
                            url;

                    } else {

                        element.style.display =
                            "none";

                    }

                });

        });


    /* =====================================================
       UBICACIÓN
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
       AÑO
    ===================================================== */

    setText(
        "[data-year]",
        new Date().getFullYear()
    );


    /* =====================================================
       MENÚ MOBILE
    ===================================================== */

    function closeMenu() {

        if (!nav || !menuBtn) return;

        nav.classList.remove("open");

        body.classList.remove(
            "menu-open"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (menuBtn && nav) {

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    nav.classList.toggle(
                        "open"
                    );


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

            }
        );


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
       REVEAL
    ===================================================== */

    function activateReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(element => {

                element.classList.add(
                    "active"
                );

            });

            return;

        }


        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "active"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        elements.forEach(element => {

            observer.observe(element);

        });

    }


    activateReveal();


    /* =====================================================
       HEADER
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }


    /* =====================================================
       PROGRESO
    ===================================================== */

    function updateProgress() {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const maxScroll =
            document.documentElement
                .scrollHeight
            - window.innerHeight;


        if (maxScroll <= 0) {

            progress.style.width =
                "0%";

            return;

        }


        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    (scrollTop / maxScroll) * 100
                )
            );


        progress.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       VOLVER ARRIBA
    ===================================================== */

    function updateBackTop() {

        if (!backTop) return;

        backTop.classList.toggle(
            "show",
            window.scrollY > 600
        );

    }


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       PARALLAX
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image img"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        heroImage &&
        !reducedMotion
    ) {

        let ticking = false;


        window.addEventListener(
            "scroll",
            () => {

                if (ticking) return;

                window.requestAnimationFrame(
                    () => {

                        const scroll =
                            window.scrollY;


                        if (
                            scroll <
                            window.innerHeight
                        ) {

                            heroImage.style.transform =
                                `translateY(${scroll * 0.06}px) scale(1.025)`;

                        }


                        ticking = false;

                    }
                );


                ticking = true;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       NAVEGACIÓN SUAVE
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
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
        {
            passive: true
        }
    );


    handleScroll();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {

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
               
