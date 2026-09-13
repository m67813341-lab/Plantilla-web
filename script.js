document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       HEADER AL HACER SCROLL
    ========================= */

    const header = document.querySelector("header");

    function actualizarHeader() {
        if (window.scrollY > 30) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", actualizarHeader);
    actualizarHeader();


    /* =========================
       BARRA DE PROGRESO
    ========================= */

    const progress = document.querySelector(".scroll-progress");

    function actualizarProgreso() {

        if (!progress) return;

        const altura =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const porcentaje =
            altura > 0
                ? (window.scrollY / altura) * 100
                : 0;

        progress.style.width = `${porcentaje}%`;
    }

    window.addEventListener("scroll", actualizarProgreso);


    /* =========================
       MENU MOBILE
    ========================= */

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");

    menuBtn?.addEventListener("click", () => {

        menuBtn.classList.toggle("active");
        nav?.classList.toggle("open");
        document.body.classList.toggle("menu-open");

    });


    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            menuBtn?.classList.remove("active");
            nav?.classList.remove("open");
            document.body.classList.remove("menu-open");

        });

    });


    /* =========================
       ANIMACIONES
    ========================= */

    const elementos = document.querySelectorAll(".reveal");

    const observador = new IntersectionObserver(
        entradas => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("active");

                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    elementos.forEach(elemento => {
        observador.observe(elemento);
    });


    /* =========================
       BOTON VOLVER ARRIBA
    ========================= */

    const backTop = document.querySelector(".back-top");

    window.addEventListener("scroll", () => {

        if (!backTop) return;

        if (window.scrollY > 600) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }

    });

    backTop?.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================
       AÑO AUTOMATICO
    ========================= */

    document.querySelectorAll("[data-year]").forEach(elemento => {

        elemento.textContent = new Date().getFullYear();

    });


    /* =========================
       BOTONES CON MOVIMIENTO
    ========================= */

    document.querySelectorAll(".btn").forEach(btn => {

        btn.addEventListener("mouseenter", () => {
            btn.style.transform = "translateY(-4px)";
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "";
        });

    });


    /* =========================
       PARALLAX SUAVE EN HERO
    ========================= */

    const heroImage = document.querySelector(".hero-image img");

    window.addEventListener("scroll", () => {

        if (!heroImage || window.innerWidth < 700) return;

        const movimiento = Math.min(window.scrollY * 0.05, 35);

        heroImage.style.transform =
            `scale(1.02) translateY(${movimiento}px)`;

    });

});
