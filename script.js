document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       1. SEGURIDAD / CONFIG
       ===================================================== */

    if (typeof CONFIG === "undefined") {

        console.error("CONFIG no está definido.");

        return;

    }


    /* =====================================================
       2. UTILIDADES
       ===================================================== */

    const $ = (
        selector,
        parent = document
    ) => parent.querySelector(selector);


    const $$ = (
        selector,
        parent = document
    ) => [
        ...parent.querySelectorAll(selector)
    ];


    const setText = (
        selector,
        value
    ) => {

        const element = $(selector);

        if (
            element &&
            value !== undefined &&
            value !== null
        ) {

            element.textContent = value;

        }

    };


    const setAttr = (
        selector,
        attribute,
        value
    ) => {

        const element = $(selector);

        if (
            element &&
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {

            element.setAttribute(
                attribute,
                value
            );

        }

    };


    const normalizeUrl = (
        url = ""
    ) => {

        if (!url) return "";

        return String(url).trim();

    };


    const escapeText = (
        value = ""
    ) => {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    };


    /* =====================================================
       3. REFERENCIAS
       ===================================================== */

    const root =
        document.documentElement;

    const body =
        document.body;


    /* =====================================================
       4. COLORES
       ===================================================== */

    if (CONFIG.colores) {

        const colores =
            CONFIG.colores;

        if (colores.principal) {

            root.style.setProperty(
                "--black",
                colores.principal
            );

        }

        if (colores.secundario) {

            root.style.setProperty(
                "--cream",
                colores.secundario
            );

        }

        if (colores.fondo) {

            root.style.setProperty(
                "--white",
                colores.fondo
            );

        }

        if (colores.texto) {

            root.style.setProperty(
                "--text",
                colores.texto
            );

        }

        if (colores.textoSuave) {

            root.style.setProperty(
                "--text-soft",
                colores.textoSuave
            );

        }

        if (colores.acento) {

            root.style.setProperty(
                "--acento",
                colores.acento
            );

        }

    }


    /* =====================================================
       5. INFORMACIÓN GENERAL
       ===================================================== */

    if (CONFIG.negocio) {

        setText(
            "[data-negocio]",
            CONFIG.negocio.nombre
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
            "[data-categoria]",
            CONFIG.negocio.categoria
        );

        setText(
            "[data-etiqueta-hero]",
            CONFIG.negocio.etiquetaHero
        );

        setText(
            "[data-mensaje-hero]",
            CONFIG.negocio.mensajeHero
        );

    }


    /* =====================================================
       6. MARQUEE
       ===================================================== */

    if (CONFIG.negocio?.textoMarquee) {

        $$(".marquee-text").forEach(
            element => {

                element.textContent =
                    CONFIG.negocio.textoMarquee;

            }
        );

    }


    /* =====================================================
       7. SEO
       ===================================================== */

    if (CONFIG.seo) {

        const seo =
            CONFIG.seo;


        if (seo.titulo) {

            document.title =
                seo.titulo;

        }


        setAttr(
            'meta[name="description"]',
            "content",
            seo.descripcion
        );


        setAttr(
            'meta[name="theme-color"]',
            "content",
            seo.color
        );


        setAttr(
            'meta[name="author"]',
            "content",
            seo.autor
        );


        setAttr(
            'meta[property="og:title"]',
            "content",
            seo.titulo
        );


        setAttr(
            'meta[property="og:description"]',
            "content",
            seo.descripcion
        );


        setAttr(
            'meta[property="og:image"]',
            "content",
            seo.imagen
        );


        setAttr(
            'meta[name="twitter:title"]',
            "content",
            seo.titulo
        );


        setAttr(
            'meta[name="twitter:description"]',
            "content",
            seo.descripcion
        );


        setAttr(
            'meta[name="twitter:image"]',
            "content",
            seo.imagen
        );

    }


    /* =====================================================
       8. CANONICAL
       ===================================================== */

    if (CONFIG.sitio?.url) {

        setAttr(
            'link[rel="canonical"]',
            "href",
            CONFIG.sitio.url
        );


        setAttr(
            'meta[property="og:url"]',
            "content",
            CONFIG.sitio.url
        );

    }


    /* =====================================================
       9. FAVICON
       ===================================================== */

    if (CONFIG.seo?.favicon) {

        setAttr(
            'link[rel="icon"]',
            "href",
            CONFIG.seo.favicon
        );

    }


    /* =====================================================
       10. IMÁGENES
       ===================================================== */

    const imagenes =
        CONFIG.imagenes || {};


    /*
       Esta función comprueba si una imagen existe.
       Si no existe, deja un placeholder oscuro.
    */

    const prepararImagen = (
        img,
        src,
        placeholder = "FOTO"
    ) => {

        if (!img) return;


        const contenedor =
            img.closest(
                ".hero-image, .about-image, .gallery-item, .image-wrapper, figure"
            ) || img.parentElement;


        const mostrarPlaceholder = () => {

            img.removeAttribute("src");

            img.style.display =
                "none";


            if (contenedor) {

                contenedor.classList.add(
                    "foto-placeholder"
                );

                contenedor.setAttribute(
                    "data-foto",
                    placeholder
                );

            }

        };


        const mostrarImagen = () => {

            img.style.display =
                "";

            if (contenedor) {

                contenedor.classList.remove(
                    "foto-placeholder"
                );

                contenedor.removeAttribute(
                    "data-foto"
                );

            }

        };


        if (!src) {

            mostrarPlaceholder();

            return;

        }


        img.addEventListener(
            "load",
            mostrarImagen,
            {
                once: true
            }
        );


        img.addEventListener(
            "error",
            mostrarPlaceholder,
            {
                once: true
            }
        );


        img.src = src;


        if (
            img.complete &&
            img.naturalWidth > 0
        ) {

            mostrarImagen();

        }

    };


    /*
       Coloca una imagen desde CONFIG.
    */

    const colocarImagen = (
        selector,
        clave,
        placeholder
    ) => {

        const img =
            $(selector);

        if (!img) return;


        const src =
            imagenes[clave] || "";


        prepararImagen(
            img,
            src,
            placeholder
        );


        if (src) {

            img.alt =
                img.alt ||
                placeholder;

        }

    };


    colocarImagen(
        '[data-imagen="principal"]',
        "principal",
        "FOTO PRINCIPAL"
    );


    colocarImagen(
        '[data-imagen="nosotros"]',
        "nosotros",
        "FOTO DEL NEGOCIO"
    );


    /* =====================================================
       11. TEXTOS DE SECCIONES
       ===================================================== */

    if (CONFIG.textos) {

        const textos =
            CONFIG.textos;


        const textosMapa = {

            serviciosEtiqueta:
                "[data-servicios-etiqueta]",

            tituloServicios:
                "[data-titulo-servicios]",

            subtituloServicios:
                "[data-subtitulo-servicios]",


            beneficiosEtiqueta:
                "[data-beneficios-etiqueta]",

            tituloBeneficios:
                "[data-titulo-beneficios]",

            subtituloBeneficios:
                "[data-subtitulo-beneficios]",


            nosotrosEtiqueta:
                "[data-nosotros-etiqueta]",

            tituloNosotros:
                "[data-titulo-nosotros]",

            nosotrosTexto1:
                "[data-nosotros-texto-1]",

            nosotrosTexto2:
                "[data-nosotros-texto-2]",


            procesoEtiqueta:
                "[data-proceso-etiqueta]",

            tituloProceso:
                "[data-titulo-proceso]",

            subtituloProceso:
                "[data-subtitulo-proceso]",


            galeriaEtiqueta:
                "[data-galeria-etiqueta]",

            tituloGaleria:
                "[data-titulo-galeria]",

            subtituloGaleria:
                "[data-subtitulo-galeria]",


            testimoniosEtiqueta:
                "[data-testimonios-etiqueta]",

            tituloTestimonios:
                "[data-titulo-testimonios]",

            subtituloTestimonios:
                "[data-subtitulo-testimonios]",


            faqEtiqueta:
                "[data-faq-etiqueta]",

            tituloFaq:
                "[data-titulo-faq]",

            subtituloFaq:
                "[data-subtitulo-faq]",


            ctaEtiqueta:
                "[data-cta-etiqueta]",

            tituloCta:
                "[data-titulo-cta]",

            botonCta:
                "[data-boton-cta]",


            contactoEtiqueta:
                "[data-contacto-etiqueta]",

            tituloContacto:
                "[data-titulo-contacto]",

            textoContacto:
                "[data-texto-contacto]",


            contactoCardEtiqueta:
                "[data-contacto-card-etiqueta]",

            contactoCardTitulo:
                "[data-contacto-card-titulo]",

            contactoCardTexto:
                "[data-contacto-card-texto]",

            contactoBoton:
                "[data-contacto-boton]",


            nosotrosPunto1Titulo:
                '[data-nosotros-punto="1-titulo"]',

            nosotrosPunto1Texto:
                '[data-nosotros-punto="1-texto"]',

            nosotrosPunto2Titulo:
                '[data-nosotros-punto="2-titulo"]',

            nosotrosPunto2Texto:
                '[data-nosotros-punto="2-texto"]',

            nosotrosPunto3Titulo:
                '[data-nosotros-punto="3-titulo"]',

            nosotrosPunto3Texto:
                '[data-nosotros-punto="3-texto"]'

        };


        Object.entries(
            textosMapa
        ).forEach(
            ([clave, selector]) => {

                if (
                    textos[clave] !==
                    undefined
                ) {

                    setText(
                        selector,
                        textos[clave]
                    );

                }

            }
        );

    }


    /* =====================================================
       12. BOTONES
       ===================================================== */

    if (CONFIG.botones) {

        setText(
            '[data-boton="hero-principal"]',
            CONFIG.botones.heroPrincipal
        );


        setText(
            '[data-boton="hero-secundario"]',
            CONFIG.botones.heroSecundario
        );


        setText(
            '[data-boton="nosotros"]',
            CONFIG.botones.nosotros
        );


        setText(
            '[data-boton="cta"]',
            CONFIG.botones.botonCta ||
            CONFIG.textos?.botonCta
        );


        setText(
            '[data-boton="header"]',
            CONFIG.botones.header
        );

    }


    /* =====================================================
       13. HEADER CTA
       ===================================================== */

    const headerButton =
        $("[data-header-cta]");

    if (
        headerButton &&
        CONFIG.botones?.header
    ) {

        headerButton.textContent =
            CONFIG.botones.header;

    }


    /* =====================================================
       14. ESTADÍSTICAS
       ===================================================== */

    const statsContainer =
        $("[data-estadisticas]");


    if (
        statsContainer &&
        Array.isArray(
            CONFIG.estadisticas
        )
    ) {

        statsContainer.innerHTML =
            CONFIG.estadisticas
                .map(
                    (item, index) => `

                    <div
                        class="stat reveal"
                        style="--delay:${index * 0.08}s"
                    >

                        <strong
                            class="stat-number"
                            data-stat-value="${escapeText(item.numero)}"
                        >
                            ${escapeText(item.numero)}
                        </strong>

                        <span>
                            ${escapeText(item.texto)}
                        </span>

                    </div>

                `
                )
                .join("");

    }


    /* =====================================================
       15. HERO STATS
       ===================================================== */

    const heroStats =
        $("[data-hero-stats]");


    if (heroStats) {

        const stats =
            CONFIG.estadisticas || [];


        const seleccionados =
            stats.slice(0, 2);


        heroStats.innerHTML =
            seleccionados
                .map(
                    item => `

                    <div class="hero-stat">

                        <strong>
                            ${escapeText(item.numero)}
                        </strong>

                        <span>
                            ${escapeText(item.texto)}
                        </span>

                    </div>

                `
                )
                .join("");

    }


    /* =====================================================
       16. SERVICIOS
       ===================================================== */

    const servicesContainer =
        $("[data-servicios]");


    if (
        servicesContainer &&
        Array.isArray(
            CONFIG.servicios
        )
    ) {

        servicesContainer.innerHTML =
            CONFIG.servicios
                .map(
                    (item, index) => `

                    <article
                        class="service-card reveal"
                        style="--delay:${index * 0.08}s"
                    >

                        <div class="service-top">

                            <span class="service-number">
                                ${escapeText(item.numero)}
                            </span>

                            <span class="service-icon">
                                ${escapeText(item.icono)}
                            </span>

                        </div>

                        <h3>
                            ${escapeText(item.titulo)}
                        </h3>

                        <p>
                            ${escapeText(item.descripcion)}
                        </p>

                        <a
                            href="${normalizeUrl(item.url || "#contacto")}"
                            class="service-link"
                        >
                            ${escapeText(item.enlace || "Saber más")}
                            <span aria-hidden="true">↗</span>
                        </a>

                    </article>

                `
                )
                .join("");

    }


    /* =====================================================
       17. BENEFICIOS
       ===================================================== */

    const benefitsContainer =
        $("[data-beneficios]");


    if (benefitsContainer) {

        const beneficios =
            Array.isArray(
                CONFIG.beneficios
            )
                ? CONFIG.beneficios
                : [];


        benefitsContainer.innerHTML =
            beneficios
                .map(
                    (item, index) => `

                    <article
                        class="benefit-card reveal"
                        style="--delay:${index * 0.08}s"
                    >

                        <div class="benefit-icon">
                            ${escapeText(item.icono)}
                        </div>

                        <h3>
                            ${escapeText(item.titulo)}
                        </h3>

                        <p>
                            ${escapeText(item.descripcion)}
                        </p>

                    </article>

                `
                )
                .join("");

    }


    /* =====================================================
       18. NOSOTROS — PUNTOS
       ===================================================== */

    if (CONFIG.textos) {

        setText(
            '[data-nosotros-punto="1-titulo"]',
            CONFIG.textos.nosotrosPunto1Titulo
        );

        setText(
            '[data-nosotros-punto="1-texto"]',
            CONFIG.textos.nosotrosPunto1Texto
        );

        setText(
            '[data-nosotros-punto="2-titulo"]',
            CONFIG.textos.nosotrosPunto2Titulo
        );

        setText(
            '[data-nosotros-punto="2-texto"]',
            CONFIG.textos.nosotrosPunto2Texto
        );

        setText(
            '[data-nosotros-punto="3-titulo"]',
            CONFIG.textos.nosotrosPunto3Titulo
        );

        setText(
            '[data-nosotros-punto="3-texto"]',
            CONFIG.textos.nosotrosPunto3Texto
        );

    }


    /* =====================================================
       19. PROCESO
       ===================================================== */

    const processContainer =
        $("[data-proceso]");


    if (
        processContainer &&
        Array.isArray(
            CONFIG.proceso
        )
    ) {

        processContainer.innerHTML =
            CONFIG.proceso
                .map(
                    (item, index) => `

                    <article
                        class="process-card reveal"
                        style="--delay:${index * 0.08}s"
                    >

                        <div class="process-top">

                            <span class="process-number">
                                ${escapeText(item.numero)}
                            </span>

                            <span class="process-icon">
                                ${escapeText(item.icono)}
                            </span>

                        </div>

                        <h3>
                            ${escapeText(item.titulo)}
                        </h3>

                        <p>
                            ${escapeText(item.descripcion)}
                        </p>

                    </article>

                `
                )
                .join("");

    }


    /* =====================================================
       20. GALERÍA
       ===================================================== */

    const galleryContainer =
        $("[data-galeria]");


    const galleryImages = [];


    if (
        galleryContainer &&
        Array.isArray(
            CONFIG.galeria
        )
    ) {

        galleryContainer.innerHTML = "";


        CONFIG.galeria.forEach(
            (item, index) => {

                const src =
                    imagenes[item.imagen] ||
                    "";


                galleryImages.push({
                    src,
                    titulo:
                        item.titulo || ""
                });


                const figure =
                    document.createElement(
                        "figure"
                    );


                figure.className =
                    "gallery-item reveal";


                figure.style.setProperty(
                    "--delay",
                    `${index * 0.08}s`
                );


                figure.dataset.galleryIndex =
                    index;


                const img =
                    document.createElement(
                        "img"
                    );


                img.loading =
                    "lazy";


                img.alt =
                    item.titulo ||
                    `Foto ${index + 1}`;


                const caption =
                    document.createElement(
                        "figcaption"
                    );


                caption.innerHTML = `

                    <span class="gallery-number">
                        ${escapeText(item.numero || String(index + 1).padStart(2, "0"))}
                    </span>

                    <strong>
                        ${escapeText(item.titulo || `Foto ${index + 1}`)}
                    </strong>

                `;


                figure.appendChild(img);

                figure.appendChild(caption);


                galleryContainer.appendChild(
                    figure
                );


                prepararImagen(
                    img,
                    src,
                    `FOTO ${String(index + 1).padStart(2, "0")}`
                );


                figure.setAttribute(
                    "tabindex",
                    "0"
                );


                figure.setAttribute(
                    "role",
                    "button"
                );


                figure.setAttribute(
                    "aria-label",
                    `Ver ${item.titulo || "imagen"}`
                );

            }
        );

    }


    /* =====================================================
       21. LIGHTBOX
       ===================================================== */

    const lightbox =
        $("#lightbox");

    const lightboxImage =
        $("#lightbox-image");

    const lightboxCaption =
        $("#lightbox-caption");

    const lightboxClose =
        $("#lightbox-close");

    const lightboxPrev =
        $("#lightbox-prev");

    const lightboxNext =
        $("#lightbox-next");


    let currentGalleryIndex =
        0;


    const abrirLightbox = (
        index
    ) => {

        if (
            !lightbox ||
            !lightboxImage ||
            !galleryImages.length
        ) return;


        const item =
            galleryImages[index];


        if (
            !item ||
            !item.src
        ) return;


        currentGalleryIndex =
            index;


        lightboxImage.src =
            item.src;


        lightboxImage.alt =
            item.titulo || "Imagen";


        if (lightboxCaption) {

            lightboxCaption.textContent =
                item.titulo || "";

        }


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "lightbox-open"
        );

    };


    const cerrarLightbox = () => {

        if (!lightbox) return;


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        body.classList.remove(
            "lightbox-open"
        );

    };


    const cambiarLightbox = (
        direccion
    ) => {

        if (!galleryImages.length)
            return;


        let nuevo =
            currentGalleryIndex +
            direccion;


        if (
            nuevo < 0
        ) {

            nuevo =
                galleryImages.length - 1;

        }


        if (
            nuevo >=
            galleryImages.length
        ) {

            nuevo = 0;

        }


        abrirLightbox(
            nuevo
        );

    };


    $$(".gallery-item").forEach(
        figure => {

            figure.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            figure.dataset.galleryIndex
                        );


                    abrirLightbox(
                        index
                    );

                }
            );


            figure.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                        "Enter" ||
                        event.key ===
                        " "
                    ) {

                        event.preventDefault();


                        const index =
                            Number(
                                figure.dataset.galleryIndex
                            );


                        abrirLightbox(
                            index
                        );

                    }

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            cerrarLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            () => cambiarLightbox(-1)
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            () => cambiarLightbox(1)
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    cerrarLightbox();

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
        Array.isArray(
            CONFIG.testimonios
        )
    ) {

        testimonialsContainer.innerHTML =
            CONFIG.testimonios
                .map(
                    (item, index) => `

                    <article
                        class="testimonial reveal"
                        style="--delay:${index * 0.08}s"
                    >

                        <div class="testimonial-top">

                            <div class="testimonial-avatar">
                                ${escapeText(item.inicial)}
                            </div>

                            <div>

                                <strong class="testimonial-name">
                                    ${escapeText(item.nombre)}
                                </strong>

                                <span class="testimonial-type">
                                    ${escapeText(item.tipo)}
                                </span>

                            </div>

                        </div>

                        <p>
                            “${escapeText(item.texto)}”
                        </p>

                    </article>

                `
                )
                .join("");

    }


    /* =====================================================
       23. FAQ
       ===================================================== */

    const faqContainer =
        $("[data-faq]");


    if (
        faqContainer &&
        Array.isArray(
            CONFIG.faq
        )
    ) {

        faqContainer.innerHTML =
            CONFIG.faq
                .map(
                    (item, index) => `

                    <article
                        class="faq-item reveal"
                        style="--delay:${index * 0.06}s"
                    >

                        <button
                            class="faq-question"
                            type="button"
                            aria-expanded="false"
                            aria-controls="faq-answer-${index}"
                        >

                            <span>
                                ${escapeText(item.pregunta)}
                            </span>

                            <span
                                class="faq-icon"
                                aria-hidden="true"
                            >
                                +
                            </span>

                        </button>

                        <div
                            id="faq-answer-${index}"
                            class="faq-answer"
                        >

                            <p>
                                ${escapeText(item.respuesta)}
                            </p>

                        </div>

                    </article>

                `
                )
                .join("");


        $$(".faq-question", faqContainer)
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const abierto =
                                button.getAttribute(
                                    "aria-expanded"
                                ) === "true";


                            $$(".faq-question", faqContainer)
                                .forEach(
                                    other => {

                                        other.setAttribute(
                                            "aria-expanded",
                                            "false"
                                        );

                                        other
                                            .closest(".faq-item")
                                            ?.classList
                                            .remove("active");

                                    }
                                );


                            if (!abierto) {

                                button.setAttribute(
                                    "aria-expanded",
                                    "true"
                                );

                                button
                                    .closest(".faq-item")
                                    ?.classList
                                    .add("active");

                            }

                        }
                    );

                }
            );

    }


    /* =====================================================
       24. CTA
       ===================================================== */

    setText(
        "[data-boton-cta]",
        CONFIG.textos?.botonCta
    );


    /* =====================================================
       25. CONTACTO
       ===================================================== */

    if (CONFIG.contacto) {

        const contacto =
            CONFIG.contacto;


        const whatsapp =
            contacto.whatsapp;


        const telefono =
            contacto.telefono;


        const email =
            contacto.email;


        setText(
            "[data-email]",
            email
        );


        setText(
            "[data-telefono]",
            telefono
        );


        setText(
            "[data-whatsapp]",
            whatsapp
        );


        if (email) {

            $$(
                '[data-contacto="email"]'
            ).forEach(
                element => {

                    element.href =
                        `mailto:${email}`;

                }
            );

        }


        if (telefono) {

            $$(
                '[data-contacto="telefono"]'
            ).forEach(
                element => {

                    element.href =
                        `tel:${telefono.replace(/[^\d+]/g, "")}`;

                }
            );

        }

    }


    /* =====================================================
       26. WHATSAPP
       ===================================================== */

    if (CONFIG.contacto?.whatsapp) {

        const numero =
            String(
                CONFIG.contacto.whatsapp
            ).replace(
                /\D/g,
                ""
            );


        const mensaje =
            encodeURIComponent(
                CONFIG.contacto.mensajeWhatsapp ||
                "Hola, quiero consultar por sus servicios."
            );


        const url =
            `https://wa.me/${numero}?text=${mensaje}`;


        $$(
            '[data-whatsapp-link]'
        ).forEach(
            link => {

                link.href =
                    url;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

            }
        );

    }


    /* =====================================================
       27. MAPA
       ===================================================== */

    const mapa =
        $("[data-mapa]");


    if (mapa) {

        const mapsUrl =
            CONFIG.sitio?.mapsUrl;


        const ciudad =
            CONFIG.sitio?.ciudad ||
            "";


        const mapaLink =
            $("[data-mapa-link]");


        const mapaTexto =
            $("[data-mapa-texto]");


        if (mapaTexto) {

            mapaTexto.textContent =
                ciudad ||
                "Ubicación";

        }


        if (
            mapaLink &&
            mapsUrl
        ) {

            mapaLink.href =
                mapsUrl;

            mapaLink.target =
                "_blank";

            mapaLink.rel =
                "noopener noreferrer";

        }

    }


    /* =====================================================
       28. REDES SOCIALES
       ===================================================== */

    if (CONFIG.redes) {

        Object.entries(
            CONFIG.redes
        ).forEach(
            ([network, url]) => {

                const links =
                    $$(
                        `[data-red="${network}"]`
                    );


                links.forEach(
                    link => {

                        if (url) {

                            link.href =
                                normalizeUrl(url);

                            link.target =
                                "_blank";

                            link.rel =
                                "noopener noreferrer";

                            link.hidden =
                                false;

                        } else {

                            link.hidden =
                                true;

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       29. LEGALES
       ===================================================== */

    if (CONFIG.legales) {

        const privacidad =
            $("[data-legal='privacidad']");

        const terminos =
            $("[data-legal='terminos']");


        if (
            privacidad &&
            CONFIG.legales.privacidad
        ) {

            privacidad.href =
                CONFIG.legales.privacidad;

        }


        if (
            terminos &&
            CONFIG.legales.terminos
        ) {

            terminos.href =
                CONFIG.legales.terminos;

        }

    }


    /* =====================================================
       30. AÑO ACTUAL
       ===================================================== */

    $$("[data-year]")
        .forEach(
            element => {

                element.textContent =
                    new Date().getFullYear();

            }
        );


    /* =====================================================
       31. JSON-LD
       ===================================================== */

    const businessType =
        CONFIG.sitio?.tipoNegocio ||
        "LocalBusiness";


    const structuredData = {

        "@context":
            "https://schema.org",

        "@type":
            businessType,

        name:
            CONFIG.negocio?.nombre ||
            "",

        description:
            CONFIG.seo?.descripcion ||
            CONFIG.negocio?.descripcion ||
            "",

        url:
            CONFIG.sitio?.url ||
            "",

        image:
            CONFIG.seo?.imagen ||
            "",

        telephone:
            CONFIG.contacto?.telefono ||
            "",

        email:
            CONFIG.contacto?.email ||
            "",

        address: {

            "@type":
                "PostalAddress",

            addressLocality:
                CONFIG.sitio?.ciudad ||
                ""

        },

        sameAs:
            Object.values(
                CONFIG.redes || {}
            ).filter(Boolean)

    };


    let jsonLd =
        $('script[type="application/ld+json"]');


    if (!jsonLd) {

        jsonLd =
            document.createElement(
                "script"
            );

        jsonLd.type =
            "application/ld+json";

        document.head.appendChild(
            jsonLd
        );

    }


    jsonLd.textContent =
        JSON.stringify(
            structuredData
        );


    /* =====================================================
       32. MENÚ MOBILE
       ===================================================== */

    const menuButton =
        $("#menu-toggle");

    const navigation =
        $("#main-navigation");


    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const abierto =
                    menuButton.getAttribute(
                        "aria-expanded"
                    ) === "true";


                menuButton.setAttribute(
                    "aria-expanded",
                    String(!abierto)
                );


                navigation.classList.toggle(
                    "active",
                    !abierto
                );


                body.classList.toggle(
                    "menu-open",
                    !abierto
                );

            }
        );

    }


    /* =====================================================
       33. CERRAR MENÚ AL NAVEGAR
       ===================================================== */

    $$(
        "#main-navigation a"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    if (
                        !menuButton ||
                        !navigation
                    ) return;


                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    navigation.classList.remove(
                        "active"
                    );


                    body.classList.remove(
                        "menu-open"
                    );

                }
            );

        }
    );


    /* =====================================================
       34. ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                cerrarLightbox();


                if (
                    menuButton &&
                    navigation
                ) {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    navigation.classList.remove(
                        "active"
                    );

                    body.classList.remove(
                        "menu-open"
                    );

                }

            }

        }
    );


    /* =====================================================
       35. TECLADO LIGHTBOX
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox?.classList.contains(
                    "active"
                )
            ) return;


            if (
                event.key ===
                "ArrowLeft"
            ) {

                cambiarLightbox(-1);

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                cambiarLightbox(1);

            }

        }
    );


    /* =====================================================
       36. HEADER SCROLL
       ===================================================== */

    const header =
        $(".site-header");


    const updateHeader =
        () => {

            if (!header) return;


            header.classList.toggle(
                "scrolled",
                window.scrollY > 30
            );

        };


    /* =====================================================
       37. SCROLL PROGRESS
       ===================================================== */

    const scrollProgress =
        $("#scroll-progress");


    const updateScrollProgress =
        () => {

            if (!scrollProgress)
                return;


            const scrollTop =
                window.scrollY;


            const scrollHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;


            const progress =
                scrollHeight > 0
                    ? scrollTop /
                      scrollHeight
                    : 0;


            scrollProgress.style.transform =
                `scaleX(${progress})`;

        };


    /* =====================================================
       38. BACK TO TOP
       ===================================================== */

    const backTop =
        $("#back-top");


    const updateBackTop =
        () => {

            if (!backTop)
                return;


            backTop.classList.toggle(
                "visible",
                window.scrollY > 600
            );

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

    let ticking =
        false;


    const updateScroll =
        () => {

            updateHeader();

            updateScrollProgress();

            updateBackTop();


            ticking =
                false;

        };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateScroll
                );

                ticking =
                    true;

            }

        },
        {
            passive: true
        }
    );


    updateScroll();


    /* =====================================================
       40. REVEAL ANIMATIONS
       ===================================================== */

    const revealElements =
        $$(".reveal");


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       41. CONTADORES DE ESTADÍSTICAS
       ===================================================== */

    const statNumbers =
        $$(".stat-number");


    const animarNumero =
        element => {

            const valorOriginal =
                element.dataset.statValue ||
                element.textContent;


            const numero =
                parseFloat(
                    valorOriginal.replace(
                        /[^\d.,-]/g,
                        ""
                    ).replace(
                        ",",
                        "."
                    )
                );


            if (
                Number.isNaN(numero)
            ) return;


            const prefijo =
                valorOriginal.match(
                    /^[^\d-]*/
                )?.[0] || "";


            const sufijo =
                valorOriginal.match(
                    /[^\d.,-]+$/
                )?.[0] || "";


            const tieneDecimal =
                valorOriginal.includes(".") ||
                valorOriginal.includes(",");


            const duracion =
                1000;


            const inicio =
                performance.now();


            const actualizar =
                tiempo => {

                    const progreso =
                        Math.min(
                            (tiempo - inicio) /
                            duracion,
                            1
                        );


                    const suavizado =
                        1 -
                        Math.pow(
                            1 - progreso,
                            3
                        );


                    const actual =
                        numero *
                        suavizado;


                    element.textContent =
                        prefijo +
                        (
                            tieneDecimal
                                ? actual.toFixed(1)
                                : Math.round(actual)
                        ) +
                        sufijo;


                    if (
                        progreso < 1
                    ) {

                        requestAnimationFrame(
                            actualizar
                        );

                    } else {

                        element.textContent =
                            valorOriginal;

                    }

                };


            requestAnimationFrame(
                actualizar
            );

        };


    if (
        "IntersectionObserver"
        in window &&
        statNumbers.length
    ) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                animarNumero(
                                    entry.target
                                );


                                statsObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        statNumbers.forEach(
            element => {

                statsObserver.observe(
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


    if (
        heroImage &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        let parallaxTicking =
            false;


        const actualizarParallax =
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


                parallaxTicking =
                    false;

            };


        window.addEventListener(
            "scroll",
            () => {

                if (!parallaxTicking) {

                    requestAnimationFrame(
                        actualizarParallax
                    );

                    parallaxTicking =
                        true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       43. NAVEGACIÓN SUAVE
       ===================================================== */

    $$(
        'a[href^="#"]'
    ).forEach(
        link => {

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
                    ) return;


                    const destino =
                        document.querySelector(
                            id
                        );


                    if (!destino)
                        return;


                    event.preventDefault();


                    destino.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }
            );

        }
    );


    /* =====================================================
       44. ACCESIBILIDAD
       ===================================================== */

    if (menuButton) {

        menuButton.setAttribute(
            "aria-controls",
            "main-navigation"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (navigation) {

        navigation.setAttribute(
            "aria-label",
            "Navegación principal"
        );

    }


    /* =====================================================
       45. RESIZE
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768 &&
                menuButton &&
                navigation
            ) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navigation.classList.remove(
                    "active"
                );

                body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       46. API PÚBLICA
       ===================================================== */

    window.PlantillaWeb = {

        config:
            CONFIG,

        abrirLightbox,

        cerrarLightbox,

        cambiarLightbox,

        actualizarScroll:
            updateScroll

    };


    /* =====================================================
       47. FINAL
       ===================================================== */

    console.log(
        "Plantilla Web cargada correctamente."
    );


});
