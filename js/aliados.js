/* Jubileo Financiero — Red de profesionales aliados
   El contenido base de las categorías es HTML estático (indexable) en aliados.html.
   Este archivo SOLO mejora la página:
     1) Cuando una categoría de js/aliados-data.js tiene profesionales, los inyecta
        en su tarjeta (reemplazando el mensaje "en formación").
     2) Habilita un filtro de búsqueda accesible (teclado y touch) sobre las tarjetas.
   Sin JavaScript, todas las categorías se ven igual y siguen siendo indexables. */

(function () {
  "use strict";

  // Quita acentos y pasa a minúsculas para comparar de forma tolerante.
  function normalizar(texto) {
    return (texto || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  // ---- 1) Inyecta los profesionales que existan en los datos ----
  if (Array.isArray(window.ALIADOS)) {
    window.ALIADOS.forEach(function (cat) {
      var tieneProfesionales =
        Array.isArray(cat.profesionales) && cat.profesionales.length > 0;
      if (!tieneProfesionales) return;

      var tarjeta = document.getElementById("aliado-" + cat.id);
      if (!tarjeta) return;
      var cuerpo = tarjeta.querySelector("[data-cuerpo]");
      if (!cuerpo) return;

      cuerpo.innerHTML = "";
      var lista = document.createElement("ul");
      lista.className = "aliado__profesionales";

      cat.profesionales.forEach(function (pro) {
        var item = document.createElement("li");
        item.className = "aliado__profesional";

        if (pro.logo && pro.logo.src) {
          var logo = document.createElement("img");
          logo.className = "aliado__logo";
          logo.src = pro.logo.src;
          logo.alt = pro.logo.alt || pro.nombre;
          logo.loading = "lazy";
          item.appendChild(logo);
        }

        var nombre = document.createElement("strong");
        nombre.textContent = pro.nombre;
        item.appendChild(nombre);

        var detalle = document.createElement("span");
        detalle.textContent = [pro.especialidad, pro.ciudad, pro.idioma]
          .filter(Boolean)
          .join(" · ");
        item.appendChild(detalle);

        // Uno o varios enlaces de contacto.
        var contactos = Array.isArray(pro.contactos)
          ? pro.contactos
          : (pro.contacto ? [{ href: pro.contacto, texto: "Contactar a " + pro.nombre }] : []);

        contactos.forEach(function (cto) {
          if (!cto || !cto.href) return;
          var enlace = document.createElement("a");
          enlace.href = cto.href;
          enlace.textContent = cto.texto || cto.href;
          if (/^https?:/.test(cto.href)) {
            enlace.rel = "noopener";
            enlace.target = "_blank";
          }
          item.appendChild(enlace);
        });

        lista.appendChild(item);
      });

      cuerpo.appendChild(lista);
    });
  }

  // ---- 2) Filtro de búsqueda accesible ----
  var filtro = document.querySelector("[data-aliados-filtro]");
  var input = document.getElementById("aliados-buscar");
  var tarjetas = Array.prototype.slice.call(
    document.querySelectorAll("#aliados-lista [data-aliado]")
  );
  var sinResultados = document.querySelector("[data-sin-resultados]");

  if (!filtro || !input || !tarjetas.length) return;

  // El filtro solo tiene sentido con JS: se revela ahora.
  filtro.hidden = false;

  function aplicarFiltro() {
    var q = normalizar(input.value.trim());
    var visibles = 0;

    tarjetas.forEach(function (tarjeta) {
      var coincide = q === "" || normalizar(tarjeta.textContent).indexOf(q) !== -1;
      tarjeta.hidden = !coincide;
      if (coincide) visibles++;
    });

    if (sinResultados) sinResultados.hidden = visibles !== 0;
  }

  input.addEventListener("input", aplicarFiltro);
  // Escape limpia el filtro rápidamente con el teclado.
  input.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      input.value = "";
      aplicarFiltro();
    }
  });
})();
