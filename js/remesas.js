/* Jubileo Financiero — Planificador de remesas inteligente
   Todos los cálculos ocurren en el navegador; nada se envía a un servidor.
   Rangos sugeridos (% del ingreso neto) según la etapa del plan:
   - pasos de bebé 1–3 (estabilizando): 5% a 10%
   - pasos de bebé 4–7 (construyendo):  10% a 15%
   Son puntos de partida para conversar, no reglas rígidas. */

(function () {
  "use strict";

  var formulario = document.getElementById("remesas-formulario");
  if (!formulario) return;

  var salida = document.getElementById("remesas-salida");
  var intro = document.getElementById("remesas-intro");
  var elError = document.getElementById("rem-error");

  function formatear(numero) {
    return "$" + numero.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var ingreso = parseFloat(document.getElementById("rem-ingreso").value);
    var esenciales = parseFloat(document.getElementById("rem-esenciales").value);
    var deudas = parseFloat(document.getElementById("rem-deudas").value);
    var envio = parseFloat(document.getElementById("rem-envio").value);
    var paso = document.getElementById("rem-paso").value;

    var valido =
      !isNaN(ingreso) && ingreso > 0 &&
      !isNaN(esenciales) && esenciales >= 0 &&
      !isNaN(deudas) && deudas >= 0 &&
      !isNaN(envio) && envio >= 0;

    if (!valido) {
      elError.hidden = false;
      salida.hidden = true;
      return;
    }
    elError.hidden = true;

    var porcentaje = (envio / ingreso) * 100;
    var disponible = ingreso - esenciales - deudas - envio;

    // Rango sugerido según etapa
    var estabilizando = paso === "1" || paso === "2" || paso === "3" || paso === "0";
    var rangoMin = estabilizando ? 5 : 10;
    var rangoMax = estabilizando ? 10 : 15;
    var montoMin = ingreso * (rangoMin / 100);
    var montoMax = ingreso * (rangoMax / 100);

    // Porcentaje actual
    document.getElementById("rem-porcentaje").textContent = porcentaje.toFixed(1) + "%";

    var comentario;
    if (disponible < 0) {
      comentario = "Con estos números, tus gastos, deudas y remesa suman más que tu ingreso: cada mes el faltante de " + formatear(Math.abs(disponible)) + " sale de deuda nueva o de ahorros. Esto no es sostenible, y resolverlo es un acto de amor hacia ti y hacia los tuyos.";
    } else if (porcentaje > rangoMax) {
      comentario = "Después de cubrir lo esencial, tu remesa y tus obligaciones te dejan " + formatear(disponible) + " al mes para avanzar en tu plan. Tu generosidad es admirable; el reto es que hoy podría estar frenando la estabilidad que a la larga multiplicará tu capacidad de ayudar.";
    } else {
      comentario = "Después de lo esencial, tu remesa y tus obligaciones te dejan " + formatear(disponible) + " libres al mes. Tu nivel de envío actual se ve razonable para tu situación — el siguiente paso es darle un trabajo claro a ese excedente.";
    }
    document.getElementById("rem-comentario-porcentaje").textContent = comentario;

    // Rango sugerido
    document.getElementById("rem-rango").textContent = rangoMin + "% – " + rangoMax + "%";
    var textoRango = estabilizando
      ? "Mientras construyes tu base (pasos de bebé 1 a 3), un rango de " + formatear(montoMin) + " a " + formatear(montoMax) + " mensuales te permite seguir presente con tu familia sin detener tu salida de deudas. Es temporal: cuando tu base esté firme, podrás dar más que nunca."
      : "Con tu base firme (paso de bebé 4 en adelante), un rango de " + formatear(montoMin) + " a " + formatear(montoMax) + " mensuales es sostenible — e incluso puedes planear envíos especiales con propósito: salud, educación o el negocio de la familia.";
    document.getElementById("rem-comentario-rango").textContent = textoRango;

    // Proyección de un ajuste temporal
    var proyeccion;
    if (envio > montoMax) {
      var liberado = envio - montoMax;
      proyeccion = "Si durante un tiempo ajustaras tu remesa de " + formatear(envio) + " al tope sugerido de " + formatear(montoMax) + ", liberarías " + formatear(liberado) + " cada mes: " + formatear(liberado * 12) + " en un año dirigidos a tu bola de nieve o a tu fondo de emergencia. Ese es el atajo hacia el día en que puedas ayudar sin que te duela el bolsillo — y con más capacidad que hoy.";
    } else if (disponible > 0) {
      proyeccion = "Tu remesa ya está dentro del rango sugerido. Si diriges con intención los " + formatear(disponible) + " disponibles de cada mes a tu paso de bebé actual, en 12 meses habrás avanzado " + formatear(disponible * 12) + " hacia tu libertad financiera — sin reducir ni un dólar de lo que envías a casa.";
    } else {
      proyeccion = "El primer paso no es recortar la remesa, sino sentarte con todos tus números en un presupuesto base cero. A veces la solución está en otros gastos, en renegociar deudas o en aumentar ingresos. Un plan claro te dirá exactamente dónde.";
    }
    document.getElementById("rem-proyeccion").textContent = proyeccion;

    intro.hidden = true;
    salida.hidden = false;
    salida.querySelector(".tarjeta").setAttribute("tabindex", "-1");
    salida.querySelector(".tarjeta").focus();
  });
})();
