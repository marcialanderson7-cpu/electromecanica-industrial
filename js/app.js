
"use strict";

// ===============================
// ACORDEÓN DE SEMESTRES
// ===============================

const botonesSemestre = document.querySelectorAll(".boton-semestre");

botonesSemestre.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const contenido = boton.nextElementSibling;

        if (!contenido) return;

        contenido.classList.toggle("activo");

        const flecha = boton.querySelector("span");

        if (flecha) {
            flecha.textContent = contenido.classList.contains("activo")
                ? "▲"
                : "▼";
        }
    });
});


// ===============================
// BIBLIOTECA DE IMÁGENES
// ===============================

const buscador = document.getElementById("buscador");
const tarjetasImagen = document.querySelectorAll(".imagen-card");
const botonesCategoria = document.querySelectorAll(".categoria");
const mensajeSinResultados = document.getElementById("sin-resultados");

let categoriaActual = "todos";


// ===============================
// BUSCADOR
// ===============================

if (buscador) {
    buscador.addEventListener("input", filtrarImagenes);
}


// ===============================
// FILTROS POR CATEGORÍA
// ===============================

botonesCategoria.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesCategoria.forEach(function (otroBoton) {
            otroBoton.classList.remove("activa");
        });

        boton.classList.add("activa");
        categoriaActual = boton.getAttribute("data-categoria") || "todos";

        filtrarImagenes();
    });
});


// ===============================
// FILTRAR ILUSTRACIONES
// ===============================

function filtrarImagenes() {
    const texto = buscador
        ? buscador.value.toLowerCase().trim()
        : "";

    let resultados = 0;

    tarjetasImagen.forEach(function (tarjeta) {
        const nombre = (
            tarjeta.getAttribute("data-nombre") || ""
        ).toLowerCase();

        const categoria = tarjeta.getAttribute("data-categoria") || "";

        const coincideTexto = nombre.includes(texto);

        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;

        const mostrar = coincideTexto && coincideCategoria;

        tarjeta.style.display = mostrar ? "" : "none";

        if (mostrar) {
            resultados++;
        }
    });

    if (mensajeSinResultados) {
        mensajeSinResultados.style.display =
            resultados === 0 ? "block" : "none";
    }
}


// ===============================
// VISOR DE IMÁGENES
// ===============================

const visor = document.getElementById("visor-imagen");
const visorTitulo = document.getElementById("visor-titulo");
const visorFoto = document.getElementById("visor-foto");
const visorDescripcion = document.getElementById("visor-descripcion");
const cerrarVisor = document.getElementById("cerrar-visor");


// Abrir la ilustración al pulsar una tarjeta

tarjetasImagen.forEach(function (tarjeta) {
    const enlace = tarjeta.querySelector("a");
    const imagen = tarjeta.querySelector("img");

    if (!enlace || !imagen || !visor) return;

    enlace.addEventListener("click", function (evento) {
        evento.preventDefault();

        const titulo = tarjeta.querySelector("h3");
        const textoAlternativo = imagen.getAttribute("alt") || "";

        visorTitulo.textContent = titulo
            ? titulo.textContent.trim()
            : "Ilustración educativa";

        visorFoto.src = imagen.src;
        visorFoto.alt = textoAlternativo;

        visorDescripcion.textContent =
            tarjeta.getAttribute("data-descripcion") ||
            textoAlternativo;

        visor.showModal();
    });
});


// Cerrar mediante el botón X

if (cerrarVisor && visor) {
    cerrarVisor.addEventListener("click", function () {
        visor.close();
    });
}


// Cerrar al pulsar fuera del contenido

if (visor) {
    visor.addEventListener("click", function (evento) {
        if (evento.target === visor) {
            visor.close();
        }
    });
}
