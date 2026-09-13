// =========================
// ANIMACIÓN AL APARECER
// =========================

const elementos = document.querySelectorAll(
    ".seccion, .tarjeta, .contacto"
);

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15
    }
);

elementos.forEach((elemento) => {
    observador.observe(elemento);
});


// =========================
// AÑO AUTOMÁTICO DEL FOOTER
// =========================

const footer = document.querySelector("footer p");

if (footer) {
    footer.textContent =
        `© ${new Date().getFullYear()} Nombre del Negocio`;
}
