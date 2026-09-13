document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ANIMACIONES AL HACER SCROLL
    // =========================

    const elementos = document.querySelectorAll(
        ".seccion, .contacto"
    );

    const observador = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });


    // =========================
    // AÑO AUTOMÁTICO
    // =========================

    const footer = document.querySelector("footer p");

    if (footer) {
        footer.textContent =
            `© ${new Date().getFullYear()} Nombre del Negocio`;
    }


    // =========================
    // EFECTO SUAVE EN BOTONES
    // =========================

    const botones = document.querySelectorAll(".boton");

    botones.forEach((boton) => {

        boton.addEventListener("mouseenter", () => {
            boton.style.transform = "translateY(-3px)";
        });

        boton.addEventListener("mouseleave", () => {
            boton.style.transform = "";
        });

    });

});
