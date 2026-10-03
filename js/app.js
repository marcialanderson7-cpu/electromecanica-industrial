// ===============================
// ACORDEÓN DE SEMESTRES
// ===============================

const botonesSemestre = document.querySelectorAll(".boton-semestre");

botonesSemestre.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const contenido = boton.nextElementSibling;

        contenido.classList.toggle("activo");

        const flecha = boton.querySelector("span");

        if (contenido.classList.contains("activo")) {

            flecha.textContent = "▲";

        } else {

            flecha.textContent = "▼";

        }

    });

});


// ===============================
// BIBLIOTECA DE IMÁGENES
// ===============================

const buscador = document.getElementById("buscador");

const tarjetasImagen = document.querySelectorAll(".imagen-card");

const botonesCategoria = document.querySelectorAll(".categoria");

const mensajeSinResultados =
    document.getElementById("sin-resultados");


let categoriaActual = "todos";


// BUSCADOR

if (buscador) {

    buscador.addEventListener("input", function() {

        filtrarImagenes();

    });

}


// CATEGORÍAS

botonesCategoria.forEach(function(boton) {

    boton.addEventListener("click", function() {

        botonesCategoria.forEach(function(boton) {

            boton.classList.remove("activa");

        });


        boton.classList.add("activa");


        categoriaActual =
            boton.getAttribute("data-categoria");


        filtrarImagenes();

    });

});


// FUNCIÓN PARA FILTRAR

function filtrarImagenes() {

    const texto =
        buscador.value.toLowerCase().trim();


    let resultados = 0;


    tarjetasImagen.forEach(function(tarjeta) {

        const nombre =
            tarjeta.getAttribute("data-nombre")
            .toLowerCase();


        const categoria =
            tarjeta.getAttribute("data-categoria");


        const coincideTexto =
            nombre.includes(texto);


        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;


        if (coincideTexto && coincideCategoria) {

            tarjeta.style.display = "block";

            resultados++;

        } else {

            tarjeta.style.display = "none";

        }

    });


    if (resultados === 0) {

        mensajeSinResultados.style.display = "block";

    } else {

        mensajeSinResultados.style.display = "none";

    }

}