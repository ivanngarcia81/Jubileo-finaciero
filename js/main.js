/* Jubileo Financiero — JavaScript principal
   Menú hamburguesa accesible + año dinámico en el footer. */

(function () {
  "use strict";

  // Menú hamburguesa
  var boton = document.querySelector(".hamburguesa");
  var nav = document.getElementById("nav-principal");

  if (boton && nav) {
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      nav.classList.toggle("nav--abierta", !abierto);
    });

    // Cierra el menú con la tecla Escape y devuelve el foco al botón
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && nav.classList.contains("nav--abierta")) {
        boton.setAttribute("aria-expanded", "false");
        nav.classList.remove("nav--abierta");
        boton.focus();
      }
    });

    // Cierra el menú al hacer clic fuera de él
    document.addEventListener("click", function (evento) {
      if (
        nav.classList.contains("nav--abierta") &&
        !nav.contains(evento.target) &&
        !boton.contains(evento.target)
      ) {
        boton.setAttribute("aria-expanded", "false");
        nav.classList.remove("nav--abierta");
      }
    });
  }

  // Año actual en el footer
  var anio = document.getElementById("anio-actual");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }
})();
