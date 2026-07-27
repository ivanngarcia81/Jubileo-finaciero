/* Jubileo Financiero — Red de profesionales aliados
   Pinta las tarjetas de categorías a partir de window.ALIADOS
   (definido en js/aliados-data.js). Sin dependencias.

   Estados por categoría:
   - profesionales vacío (o estado "en-formacion"): badge "Red en formación".
   - profesionales con elementos: lista de cada profesional con nombre,
     especialidad, ciudad, idioma y enlace de contacto. */

(function () {
  "use strict";

  var contenedor = document.getElementById("aliados-lista");
  if (!contenedor || !Array.isArray(window.ALIADOS)) return;

  window.ALIADOS.forEach(function (cat) {
    var tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta aliado";

    var titulo = document.createElement("h3");
    titulo.textContent = cat.categoria;
    tarjeta.appendChild(titulo);

    var cuando = document.createElement("p");
    cuando.textContent = cat.cuandoRefiero;
    tarjeta.appendChild(cuando);

    var credencial = document.createElement("p");
    credencial.className = "aliado__credencial";
    var rotulo = document.createElement("strong");
    rotulo.textContent = "Qué credencial verifico: ";
    credencial.appendChild(rotulo);
    credencial.appendChild(document.createTextNode(cat.credencial));
    tarjeta.appendChild(credencial);

    var tieneProfesionales = Array.isArray(cat.profesionales) && cat.profesionales.length > 0;

    if (tieneProfesionales) {
      var lista = document.createElement("ul");
      lista.className = "aliado__profesionales";

      cat.profesionales.forEach(function (pro) {
        var item = document.createElement("li");
        item.className = "aliado__profesional";

        var nombre = document.createElement("strong");
        nombre.textContent = pro.nombre;
        item.appendChild(nombre);

        var detalle = document.createElement("span");
        detalle.textContent = [pro.especialidad, pro.ciudad, pro.idioma]
          .filter(Boolean)
          .join(" · ");
        item.appendChild(detalle);

        if (pro.contacto) {
          var enlace = document.createElement("a");
          enlace.href = pro.contacto;
          enlace.textContent = "Contactar a " + pro.nombre;
          if (/^https?:/.test(pro.contacto)) {
            enlace.rel = "noopener";
            enlace.target = "_blank";
          }
          item.appendChild(enlace);
        }

        lista.appendChild(item);
      });

      tarjeta.appendChild(lista);
    } else {
      var insignia = document.createElement("span");
      insignia.className = "aliado__insignia";
      insignia.textContent = "Red en formación";
      tarjeta.appendChild(insignia);
    }

    contenedor.appendChild(tarjeta);
  });
})();
