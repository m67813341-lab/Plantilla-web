/* =========================================================
   PLANTILLA WEB — SCRIPT PRINCIPAL
   Sistema dinámico + animaciones + SEO + accesibilidad
   ========================================================= */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       1. SEGURIDAD / CONFIGURACIÓN
       ===================================================== */

    if (typeof CONFIG === "undefined") {
        console.error("CONFIG no está definido.");
        return;
    }


    /* =====================================================
       2. UTILIDADES
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const setText = (selector, value) => {
        const element = $(selector);

        if (element && value !== undefined && value !== null) {
            element.textContent = value;
        }
    };

    const setAttr = (selector, attribute, value) => {
        const element = $(selector);

        if (
            element &&
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {
            element.setAttribute(attribute, value);
        }
    };

    const normalizeUrl = (url) => {
        if (!url) return "";

        try {
            return new URL(url, window.location.href).href;
        } catch {
            return "";
        }
    };

    const escapeText = (value) => {
        if (value === undefined || value === null) return "";
        return String(value);
    };


    /* =====================================================
       3. DATOS PRINCIPALES
       ===================================================== */

    const negocio = CONFIG.negocio || {};
    const seo = CONFIG.seo || {};
    const imagenes = CONFIG.imagenes || {};
    const colores = CONFIG.colores || {};
    const contacto = CONFIG.contacto || {};
    const redes = CONFIG.redes || {};
    const sitio = CONFIG.sitio || {};
    const textos = CONFIG.textos || {};
    const botones = CONFIG.botones || {};


    /* =====================================================
       4. COLORES
       ===================================================== */

    const root = document.documentElement;

    if (colores.principal) {
        root.style.setProperty("--black", colores.principal);
    }

    if (colores.secundario) {
        root.style.setProperty("--cream", colores.secundario);
    }

    if (colores.fondo) {
        root.style.setProperty("--white", colores.fondo);
    }

    if (colores.texto) {
        root.style.setProperty("--text", colores.texto);
    }

    if (colores.textoSuave) {
        root.style.setProperty("--text-soft", colores.textoSuave);
        root.style.setProperty("--gray", colores.textoSuave);
    }

    if (colores.acento) {
        root.style.setProperty("--acento", colores.acento);
    }


    /* =====================================================
       5. INFORMACIÓN GENERAL
       ===================================================== */

    $$("[data-negocio]").forEach(element => {
        element.textContent = negocio.nombre || "";
    });

    $$("[data-slogan]").forEach(element => {
        element.textContent = negocio.slogan || "";
    });

    $$("[data-descripcion]").forEach(element => {
        element.textContent = negocio.descripcion || "";
    });

    $$("[data-categoria]").forEach(element => {
        element.textContent = negocio.categoria || "";
    });

    $$("[data-etiqueta-hero]").forEach(element => {
        element.textContent = negocio.etiquetaHero || "";
    });

    $$("[data-mensaje-hero]").forEach(element => {
        element.textContent = negocio.mensajeHero || "";
    });


    /* =====================================================
       6. MARQUEE
       ===================================================== */

    const marqueeItems = $$(".marquee-item");

    if (marqueeItems.length && negocio.textoMarquee) {
        marqueeItems.forEach(item => {
            item.textContent = negocio.textoMarquee;
        });
    }


    /* =====================================================
       7. SEO
       ===================================================== */

    if (seo.titulo) {
        document.title = seo.titulo;
    } else if (negocio.nombre) {
        document.title = negocio.nombre;
    }

    setAttr('meta[name="description"]', "content", seo.descripcion);

    if (seo.color) {
        setAttr(
            'meta[name="theme-color"]',
            "content",
            seo.color
        );
    }

    const currentUrl = normalizeUrl(
        sitio.url || window.location.href
    );

    const seoImage = normalizeUrl(
        seo.imagen || imagenes.nosotros || imagenes.principal
    );

    setAttr(
        'meta[property="og:title"]',
        "content",
        seo.titulo || negocio.nombre
    );

    setAttr(
        'meta[property="og:description"]',
        "content",
        seo.descripcion || negocio.descripcion
    );

    setAttr(
        'meta[property="og:image"]',
        "content",
        seoImage
    );

    setAttr(
        'meta[property="og:url"]',
        "content",
        currentUrl
    );

    setAttr(
        'meta[property="og:site_name"]',
        "content",
        negocio.nombre
    );

    setAttr(
        'meta[name="twitter:title"]',
        "content",
        seo.titulo || negocio.nombre
    );

    setAttr(
        'meta[name="twitter:description"]',
        "content",
        seo.descripcion || negocio.descripcion
    );

    setAttr(
        'meta[name="twitter:image"]',
        "content",
        seoImage
    );


    /* =====================================================
       8. CANONICAL
       ===================================================== */

    const canonical = $("link[rel='canonical']");

    if (canonical && currentUrl) {
        canonical.href = currentUrl;
    }


    /* =====================================================
       9. FAVICON
       ===================================================== */

    if (seo.favicon) {

        $$("link[rel='icon']").forEach(link => {
            link.href = seo.favicon;
        });

        $$("link[rel='apple-touch-icon']").forEach(link => {
            link.href = seo.favicon;
        });
    }


    /* =====================================================
       10. IMÁGENES
       ===================================================== */

    const imageMap = {
        principal: imagenes.principal,
        nosotros: imagenes.nosotros
    };

    Object.entries(imageMap).forEach(([key, source]) => {

        if (!source) return;

        $$(`[data-imagen="${key}"]`).forEach(image => {

            image.src = source;

            if (!image.alt) {
                image.alt =
                    `${negocio.nombre || "Negocio"} — ${key}`;
            }
        });
    });


    /* =====================================================
       11. TEXTOS DE SECCIONES
       ===================================================== */

    const textMap = {

        "servicios-etiqueta":
            textos.serviciosEtiqueta,

        "titulo-servicios":
            textos.tituloServicios,

        "subtitulo-servicios":
            textos.subtituloServicios,

        "nosotros-etiqueta":
            textos.nosotrosEtiqueta,

        "titulo-nosotros":
            textos.tituloNosotros,

        "nosotros-texto-1":
            textos.nosotrosTexto1,

        "nosotros-texto-2":
            textos.nosotrosTexto2,

        "proceso-etiqueta":
            textos.procesoEtiqueta,

        "titulo-proceso":
            textos.tituloProceso,

        "subtitulo-proceso":
            textos.subtituloProceso,

        "galeria-etiqueta":
            textos.galeriaEtiqueta,

        "titulo-galeria":
            textos.tituloGaleria,

        "subtitulo-galeria":
            textos.subtituloGaleria,

        "testimonios-etiqueta":
            textos.testimoniosEtiqueta,

        "titulo-testimonios":
            textos.tituloTestimonios,

        "subtitulo-testimonios":
            textos.subtituloTestimonios,

        "faq-etiqueta":
            textos.faqEtiqueta,

        "titulo-faq":
            textos.tituloFaq,

        "subtitulo-faq":
            textos.subtituloFaq,

        "cta-etiqueta":
            textos.ctaEtiqueta,

        "titulo-cta":
            textos.tituloCta,

        "contacto-etiqueta":
            textos.contactoEtiqueta,

        "titulo-contacto":
            textos.tituloContacto,

        "texto-contacto":
            textos.textoContacto,

        "contacto-card-etiqueta":
            textos.contactoCardEtiqueta,

        "contacto-card-titulo":
            textos.contactoCardTitulo,

        "contacto-card-texto":
            textos.contactoCardTexto,

        "contacto-boton":
            textos.contactoBoton,

        "beneficios-etiqueta":
            textos.beneficiosEtiqueta,

        "titulo-beneficios":
            textos.tituloBeneficios,

        "subtitulo-beneficios":
            textos.subtituloBeneficios
    };

    Object.entries(textMap).forEach(([key, value]) => {

        if (value === undefined) return;

        $$(`[data-texto="${key}"]`).forEach(element => {
            element.textContent = value;
        });
    });


    /* =====================================================
       12. BOTONES
       ===================================================== */

    setText("[data-boton='hero-principal']", botones.heroPrincipal);
    setText("[data-boton='hero-secundario']", botones.heroSecundario);
    setText("[data-boton='nosotros']", botones.nosotros);
    setText("[data-boton='cta']", textos.botonCta);


    /* =====================================================
       13. HEADER CTA
       ===================================================== */

    const headerButton = $("[data-header-cta]");

    if (headerButton) {
        headerButton.textContent =
            botones.header || "Hablemos";
    }


    /* =====================================================
       14. ESTADÍSTICAS
       ===================================================== */

    const statsContainer = $("[data-estadisticas]");

    if (statsContainer && Array.isArray(CONFIG.estadisticas)) {

        statsContainer.innerHTML = "";

        CONFIG.estadisticas.forEach((stat, index) => {

            const item = document.createElement("div");

            item.className = "stat reveal";
            item.style.setProperty(
                "--delay",
                `${index * 0.08}s`
            );

            const number = document.createElement("strong");

            number.className = "stat-number";
            number.textContent = stat.numero || "";

            const text = document.createElement("span");

            text.className = "stat-label";
            text.textContent = stat.texto || "";

            item.appendChild(number);
            item.appendChild(text);

            statsContainer.appendChild(item);
        });
    }


    /* =====================================================
       15. HERO STATS
       ===================================================== */

    const heroStats = $$(".hero-stat");

    if (heroStats.length && Array.isArray(CONFIG.estadisticas)) {

        const stats = CONFIG.estadisticas;

        heroStats.forEach((item, index) => {

            if (!stats[index]) return;

            const number = $(".hero-stat-number", item);
            const label = $(".hero-stat-label", item);

            if (number) {
                number.textContent =
                    stats[index].numero || "";
            }

            if (label) {
                label.textContent =
                    stats[index].texto || "";
            }
        });
    }


    /* =====================================================
       16. SERVICIOS
       ===================================================== */

    const servicesContainer = $("[data-servicios]");

    if (
        servicesContainer &&
        Array.isArray(CONFIG.servicios)
    ) {

        servicesContainer.innerHTML = "";

        CONFIG.servicios.forEach((service, index) => {

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

            top.className = "service-card-top";

            const number =
                document.createElement("span");

            number.className = "service-number";
            number.textContent =
                service.numero || "";

            const icon =
                document.createElement("span");

            icon.className = "service-icon";
            icon.textContent =
                service.icono || "↗";

            top.appendChild(number);
            top.appendChild(icon);

            const title =
                document.createElement("h3");

            title.textContent =
                service.titulo || "";

            const description =
                document.createElement("p");

            description.textContent =
                service.descripcion || "";

            article.appendChild(top);
            article.appendChild(title);
            article.appendChild(description);

            if (service.enlace) {

                const link =
                    document.createElement("a");

                link.href =
                    service.url || "#contacto";

                link.className =
                    "service-link";

                link.textContent =
                    service.enlace;

                article.appendChild(link);
            }

            servicesContainer.appendChild(article);
        });
    }


    /* =====================================================
       17. BENEFICIOS
       ===================================================== */

    const benefitsContainer = $("[data-beneficios]");

    if (benefitsContainer) {

        const benefits =
            Array.isArray(CONFIG.beneficios)
                ? CONFIG.beneficios
                : [
                    {
                        icono: "✓",
                        titulo: "Pensado para tu negocio",
                        descripcion:
                            "Cada detalle se adapta a tus necesidades."
                    },
                    {
                        icono: "◇",
                        titulo: "Diseño profesional",
                        descripcion:
                            "Una presencia digital clara y moderna."
                    },
                    {
                        icono: "↗",
                        titulo: "Enfocado en resultados",
                        descripcion:
                            "Todo está pensado para ayudarte a crecer."
                    }
                ];

        benefitsContainer.innerHTML = "";

        benefits.forEach((benefit, index) => {

            const article =
                document.createElement("article");

            article.className =
                "benefit-card reveal";

            article.style.setProperty(
                "--delay",
                `${index * 0.08}s`
            );

            const icon =
                document.createElement("span");

            icon.className = "benefit-icon";
            icon.textContent =
                benefit.icono || "✓";

            const title =
                document.createElement("h3");

            title.textContent =
                benefit.titulo || "";

            const description =
                document.createElement("p");

            description.textContent =
                benefit.descripcion || "";

            article.appendChild(icon);
            article.appendChild(title);
            article.appendChild(description);

            benefitsContainer.appendChild(article);
        });
    }


    /* =====================================================
       18. PUNTOS DE NOSOTROS
       ===================================================== */

    const points = [
        1,
        2,
        3
    ];

    points.forEach(number => {

        setText(
            `[data-nosotros-punto="${number}-titulo"]`,
            textos[`nosotrosPunto${number}Titulo`]
        );

        setText(
            `[data-nosotros-punto="${number}-texto"]`,
            textos[`nosotrosPunto${number}Texto`]
        );
    });


    /* =====================================================
       19. PROCESO
       ===================================================== */

    const processContainer = $("[data-proceso]");

    if (
        processContainer &&
        Array.isArray(CONFIG.proceso)
    ) {

        processContainer.innerHTML = "";

        CONFIG.proceso.forEach((step, index) => {

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
                step.numero || "";

            const icon =
                document.createElement("span");

            icon.className =
                "process-icon";

            icon.textContent =
                step.icono || "○";

            const title =
                document.createElement("h3");

            title.textContent =
                step.titulo || "";

            const description =
                document.createElement("p");

            description.textContent =
                step.descripcion || "";

            article.appendChild(number);
            article.appendChild(icon);
            article.appendChild(title);
            article.appendChild(description);

            processContainer.appendChild(article);
        });
    }


    /* =====================================================
       20. GALERÍA
       ===================================================== */

    const galleryContainer = $("[data-galeria]");
    const galleryImages = [];

    if (
        galleryContainer &&
        Array.isArray(CONFIG.galeria)
    ) {

        galleryContainer.innerHTML = "";

        CONFIG.galeria.forEach((item, index) => {

            const imageSource =
                imagenes[item.imagen] || item.imagen || "";

            if (!imageSource) return;

            galleryImages.push({
                src: imageSource,
                title: item.titulo || ""
            });

            const figure =
                document.createElement("figure");

            figure.className =
                "gallery-item reveal";

            if (index === 0) {
                figure.classList.add(
                    "gallery-item-large"
                );
            }

            figure.style.setProperty(
                "--delay",
                `${index * 0.08}s`
            );

            const image =
                document.createElement("img");

            image.src = imageSource;
            image.alt =
                item.titulo ||
                `${negocio.nombre || "Proyecto"} ${index + 1}`;

            image.loading =
                index === 0 ? "eager" : "lazy";

            image.decoding = "async";

            const overlay =
                document.createElement("div");

            overlay.className = "gallery-overlay";

const number =
    document.createElement("span");

number.className =
    "gallery-number";

number.textContent =
    item.numero || `0${index + 1}`;

const title =
    document.createElement("span");

title.className =
    "gallery-title";

title.textContent =
    item.titulo || "";

overlay.appendChild(number);
overlay.appendChild(title);

figure.appendChild(image);
figure.appendChild(overlay);

figure.setAttribute("tabindex", "0");
figure.setAttribute("role", "button");

figure.setAttribute(
    "aria-label",
    `Ver ${item.titulo || "imagen"}`
);

figure.dataset.galleryIndex = index;

galleryContainer.appendChild(figure);
                /* =====================================================
       21. LIGHTBOX
       ===================================================== */

    const lightbox = $("#lightbox");
    const lightboxImage = $("#lightbox-image");
    const lightboxCaption = $("#lightbox-caption");
    const lightboxClose = $(".lightbox-close");
    const lightboxPrev = $(".lightbox-prev");
    const lightboxNext = $(".lightbox-next");

    let currentGalleryIndex = 0;

    const openLightbox = index => {

        if (
            !lightbox ||
            !lightboxImage ||
            !galleryImages.length
        ) {
            return;
        }

        currentGalleryIndex =
            (index + galleryImages.length) %
            galleryImages.length;

        const item =
            galleryImages[currentGalleryIndex];

        lightboxImage.src = item.src;
        lightboxImage.alt = item.title;

        if (lightboxCaption) {
            lightboxCaption.textContent =
                item.title;
        }

        lightbox.classList.add("active");

        document.body.classList.add(
            "lightbox-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        if (lightboxClose) {
            lightboxClose.focus();
        }
    };

    const closeLightbox = () => {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.classList.remove(
            "lightbox-open"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        if (lightboxImage) {
            lightboxImage.src = "";
        }
    };

    const changeLightbox = direction => {

        if (!galleryImages.length) return;

        openLightbox(
            currentGalleryIndex + direction
        );
    };


    $$(".gallery-item").forEach(item => {

        const index =
            Number(item.dataset.galleryIndex);

        item.addEventListener("click", () => {
            openLightbox(index);
        });

        item.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openLightbox(index);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener(
            "click",
            () => changeLightbox(-1)
        );
    }

    if (lightboxNext) {
        lightboxNext.addEventListener(
            "click",
            () => changeLightbox(1)
        );
    }

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }
            }
        );
    }


    /* =====================================================
       22. TESTIMONIOS
       ===================================================== */

    const testimonialsContainer =
        $("[data-testimonios]");

    if (
        testimonialsContainer &&
        Array.isArray(CONFIG.testimonios)
    ) {

        testimonialsContainer.innerHTML = "";

        CONFIG.testimonios.forEach(
            (testimonial, index) => {

                const article =
                    document.createElement("article");

                article.className =
                    "testimonial reveal";

                article.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );

                const top =
                    document.createElement("div");

                top.className =
                    "testimonial-top";

                const avatar =
                    document.createElement("div");

                avatar.className =
                    "testimonial-avatar";

                avatar.textContent =
                    testimonial.inicial || "?";

                const person =
                    document.createElement("div");

                person.className =
                    "testimonial-person";

                const name =
                    document.createElement("strong");

                name.textContent =
                    testimonial.nombre || "";

                const type =
                    document.createElement("span");

                type.textContent =
                    testimonial.tipo || "Cliente";

                person.appendChild(name);
                person.appendChild(type);

                top.appendChild(avatar);
                top.appendChild(person);

                const text =
                    document.createElement("p");

                text.textContent =
                    `“${testimonial.texto || ""}”`;

                article.appendChild(top);
                article.appendChild(text);

                testimonialsContainer.appendChild(
                    article
                );
            }
        );
    }


    /* =====================================================
       23. FAQ
       ===================================================== */

    const faqContainer = $("[data-faq]");

    if (faqContainer) {

        const faq =
            Array.isArray(CONFIG.faq)
                ? CONFIG.faq
                : [];

        faqContainer.innerHTML = "";

        faq.forEach((item, index) => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "faq-item reveal";

            wrapper.style.setProperty(
                "--delay",
                `${index * 0.06}s`
            );

            const button =
                document.createElement("button");

            button.className =
                "faq-question";

            button.type = "button";

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            button.setAttribute(
                "aria-controls",
                `faq-answer-${index}`
            );

            const title =
                document.createElement("span");

            title.textContent =
                item.pregunta || "";

            const icon =
                document.createElement("span");

            icon.className =
                "faq-icon";

            icon.textContent = "+";

            button.appendChild(title);
            button.appendChild(icon);

            const answer =
                document.createElement("div");

            answer.className =
                "faq-answer";

            answer.id =
                `faq-answer-${index}`;

            answer.hidden = true;

            const paragraph =
                document.createElement("p");

            paragraph.textContent =
                item.respuesta || "";

            answer.appendChild(paragraph);

            button.addEventListener(
                "click",
                () => {

                    const isOpen =
                        button.getAttribute(
                            "aria-expanded"
                        ) === "true";

                    $$(".faq-question").forEach(
                        otherButton => {

                            otherButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            const otherAnswer =
                                document.getElementById(
                                    otherButton.getAttribute(
                                        "aria-controls"
                                    )
                                );

                            if (otherAnswer) {
                                otherAnswer.hidden =
                                    true;
                            }

                            const otherIcon =
                                $(".faq-icon", otherButton);

                            if (otherIcon) {
                                otherIcon.textContent =
                                    "+";
                            }
                        }
                    );

                    if (!isOpen) {

                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                        answer.hidden = false;

                        icon.textContent = "−";
                    }
                }
            );

            wrapper.appendChild(button);
            wrapper.appendChild(answer);

            faqContainer.appendChild(wrapper);
        });
    }


    /* =====================================================
       24. CTA
       ===================================================== */

    const ctaButton =
        $("[data-boton='cta']");

    if (ctaButton) {
        ctaButton.textContent =
            textos.botonCta ||
            "Empezar un proyecto";
    }


    /* =====================================================
       25. CONTACTO
       ===================================================== */

    const email = contacto.email || "";
    const phone = contacto.telefono || "";
    const whatsapp = contacto.whatsapp || "";

    $$("[data-email]").forEach(element => {

        element.textContent = email;

        if (
            element.tagName === "A" &&
            email
        ) {
            element.href =
                `mailto:${email}`;
        }
    });

    $$("[data-telefono]").forEach(element => {

        element.textContent = phone;

        if (
            element.tagName === "A" &&
            phone
        ) {

            element.href =
                `tel:${phone.replace(/[^\d+]/g, "")}`;
        }
    });

    $$("[data-ciudad]").forEach(element => {
        element.textContent =
            sitio.ciudad || "";
    });

    $$("[data-horario]").forEach(element => {
        element.textContent =
            sitio.horario || "";
    });


    /* =====================================================
       26. WHATSAPP
       ===================================================== */

    const whatsappMessage =
        contacto.mensajeWhatsapp ||
        "Hola, quiero consultar por sus servicios.";

    const cleanWhatsapp =
        String(whatsapp)
            .replace(/\D/g, "");

    if (cleanWhatsapp) {

        const whatsappUrl =
            `https://wa.me/${cleanWhatsapp}?text=${
                encodeURIComponent(whatsappMessage)
            }`;

        $$("[data-whatsapp]").forEach(link => {

            link.href = whatsappUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });
    }


    /* =====================================================
       27. MAPA
       ===================================================== */

    const mapContainer = $("[data-mapa]");
    const mapLink = $("[data-mapa-link]");

    const mapsUrl =
        sitio.mapsUrl ||
        (
            sitio.ciudad
                ? `https://www.google.com/maps/search/?api=1&query=${
                    encodeURIComponent(sitio.ciudad)
                }`
                : ""
        );

    if (mapLink && mapsUrl) {

        mapLink.href = mapsUrl;
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
    }

    if (
        mapContainer &&
        sitio.ciudad
    ) {

        const text =
            $(".map-placeholder-text", mapContainer);

        if (text) {
            text.textContent =
                sitio.ciudad;
        }
    }


    /* =====================================================
       28. REDES SOCIALES
       ===================================================== */

    const socialMap = {
        instagram: redes.instagram,
        facebook: redes.facebook,
        tiktok: redes.tiktok,
        youtube: redes.youtube
    };

    Object.entries(socialMap).forEach(
        ([network, url]) => {

            $$(`[data-red="${network}"]`)
                .forEach(link => {

                    if (!url) {

                        link.hidden = true;
                        return;
                    }

                    link.href = url;
                    link.target = "_blank";
                    link.rel =
                        "noopener noreferrer";
                });
        }
    );


    /* =====================================================
       29. LEGALES
       ===================================================== */

    if (CONFIG.legales) {

        const legalMap = {
            privacidad:
                CONFIG.legales.privacidad,
            terminos:
                CONFIG.legales.terminos
        };

        Object.entries(legalMap).forEach(
            ([type, url]) => {

                if (!url) return;

                $$(`[data-legal="${type}"]`)
                    .forEach(link => {
                        link.href = url;
                    });
            }
        );
    }


    /* =====================================================
       30. AÑO AUTOMÁTICO
       ===================================================== */

    $$("[data-year]").forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });


    /* =====================================================
       31. JSON-LD / DATOS ESTRUCTURADOS
       ===================================================== */

    const structuredData =
        $("script[type='application/ld+json']");

    if (structuredData) {

        const data = {
            "@context": "https://schema.org",
            "@type":
                sitio.tipoNegocio ||
                "LocalBusiness",

            "name":
                negocio.nombre || "",

            "description":
                seo.descripcion ||
                negocio.descripcion ||
                "",

            "url":
                currentUrl,

            "image":
                seoImage
        };

        if (sitio.ciudad) {

            data.address = {
                "@type": "PostalAddress",
                "addressLocality":
                    sitio.ciudad
            };
        }

        if (contacto.telefono) {
            data.telephone =
                contacto.telefono;
        }

        if (contacto.email) {
            data.email =
                contacto.email;
        }

        structuredData.textContent =
            JSON.stringify(data);
    }


    /* =====================================================
       32. MENÚ MOBILE
       ===================================================== */

    const menuButton = $(".menu-btn");
    const navigation = $("#main-navigation");

    const closeMenu = () => {

        if (
            !menuButton ||
            !navigation
        ) {
            return;
        }

        menuButton.classList.remove(
            "active"
        );

        navigation.classList.remove(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    };

    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    navigation.classList.toggle(
                        "active"
                    );

                menuButton.classList.toggle(
                    "active",
                    isOpen
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );
            }
        );
    }


    /* =====================================================
       33. CERRAR MENÚ AL HACER CLICK
       ===================================================== */

    $$("#main-navigation a").forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );
    });


    /* =====================================================
       34. ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            closeMenu();

            if (
                lightbox &&
                lightbox.classList.contains("active")
            ) {
                closeLightbox();
            }
        }
    );


    /* =====================================================
       35. TECLAS LIGHTBOX
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }

            if (event.key === "ArrowLeft") {
                changeLightbox(-1);
            }

            if (event.key === "ArrowRight") {
                changeLightbox(1);
            }
        }
    );


    /* =====================================================
       36. HEADER SCROLL
       ===================================================== */

    const header = $(".site-header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };


    /* =====================================================
       37. PROGRESO DE SCROLL
       ===================================================== */

    const progress =
        $(".scroll-progress");

    const updateProgress = () => {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;
    };


    /* =====================================================
       38. BACK TO TOP
       ===================================================== */

    const backTop = $(".back-top");

    const updateBackTop = () => {

        if (!backTop) return;

        if (window.scrollY > 600) {
            backTop.classList.add("visible");
        } else {
            backTop.classList.remove("visible");
        }
    };

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
       39. SCROLL OPTIMIZADO
       ===================================================== */

    let ticking = false;

    const onScroll = () => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {

            updateHeader();
            updateProgress();
            updateBackTop();

            ticking = false;
        });
    };

    window.addEventListener(
        "scroll",
        onScroll,
        { passive: true }
    );

    updateHeader();
    updateProgress();
    updateBackTop();


        /* =====================================================
       40. REVEAL ANIMATIONS
       ===================================================== */

    const revealElements =
        $$(".reveal, .reveal-left, .reveal-right");

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "active"
                        );

                        revealObserver.unobserve(
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

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }


    /* =====================================================
       41. CONTADORES DE ESTADÍSTICAS
       ===================================================== */

    const parseNumber = value => {

        const match =
            String(value)
                .replace(",", ".")
                .match(/-?\d+(\.\d+)?/);

        return match
            ? Number(match[0])
            : null;
    };

    const animateCounter = element => {

        if (
            !element ||
            element.dataset.counted
        ) {
            return;
        }

        const original =
            element.textContent.trim();

        const number =
            parseNumber(original);

        if (number === null) return;

        const suffix =
            original.replace(
                /-?\d+(\.\d+)?/,
                ""
            );

        const duration = 1200;

        const start =
            performance.now();

        const update = now => {

            const progress =
                Math.min(
                    (now - start) / duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const current =
                number * eased;

            const decimals =
                number % 1 !== 0
                    ? 1
                    : 0;

            element.textContent =
                `${current.toFixed(decimals)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent =
                    original;

                element.dataset.counted =
                    "true";
            }
        };

        requestAnimationFrame(update);
    };


    if (
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.5
                }
            );

        $$(".stat-number").forEach(
            element => {
                counterObserver.observe(
                    element
                );
            }
        );
    }


    /* =====================================================
       42. PARALLAX HERO
       ===================================================== */

    const heroImage =
        $(".hero-image img");

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        heroImage &&
        !reduceMotion
    ) {

        let parallaxTicking = false;

        const updateParallax = () => {

            if (parallaxTicking) return;

            parallaxTicking = true;

            requestAnimationFrame(() => {

                const offset =
                    Math.min(
                        window.scrollY * 0.06,
                        40
                    );

                heroImage.style.transform =
                    `translate3d(0, ${offset}px, 0) scale(1.025)`;

                parallaxTicking = false;
            });
        };

        window.addEventListener(
            "scroll",
            updateParallax,
            { passive: true }
        );
    }


    /* =====================================================
       43. NAVEGACIÓN SUAVE
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    $(href);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: Math.max(
                        targetPosition,
                        0
                    ),
                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth"
                });

                history.replaceState(
                    null,
                    "",
                    href
                );

                closeMenu();
            }
        );
    });


    /* =====================================================
       44. ARIA / ACCESIBILIDAD
       ===================================================== */

    if (menuButton) {

        if (
            !menuButton.hasAttribute(
                "aria-label"
            )
        ) {
            menuButton.setAttribute(
                "aria-label",
                "Abrir menú"
            );
        }
    }

    if (lightbox) {

        lightbox.setAttribute(
            "aria-hidden",
            lightbox.classList.contains(
                "active"
            )
                ? "false"
                : "true"
        );
    }


    /* =====================================================
       45. RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {
                closeMenu();
            }
        },
        { passive: true }
    );


    /* =====================================================
       46. API INTERNA
       ===================================================== */

    window.PlantillaWeb = {

        config: CONFIG,

        openLightbox,

        closeLightbox,

        changeLightbox,

        scrollTo: selector => {

            const target =
                $(selector);

            if (!target) return;

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            window.scrollTo({
                top:
                    target.offsetTop -
                    headerHeight -
                    15,

                behavior:
                    reduceMotion
                        ? "auto"
                        : "smooth"
            });
        }
    };


    /* =====================================================
       47. MENSAJE DE DESARROLLO
       ===================================================== */

    console.log(
        `%c${negocio.nombre || "Plantilla Web"}%c`,
        "font-size:18px;font-weight:bold;",
        "font-size:14px;"
    );

    console.log(
        "Plantilla Web cargada correctamente."
    );

});
