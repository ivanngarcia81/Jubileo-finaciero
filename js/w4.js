/* Jubileo Financiero — Chequeo de retención / W-4
   Educativo: usa el reembolso (o lo que se debió) del año pasado para orientar
   sobre la retención de impuestos. Todo corre en el navegador; no envía datos.
   No es asesoría fiscal ni un cálculo oficial. */

(function () {
  "use strict";

  var form = document.getElementById("w4-formulario");
  if (!form) return;

  var salida = document.getElementById("w4-salida");
  var intro = document.getElementById("w4-intro");
  var error = document.getElementById("w4-error");
  var elTitulo = document.getElementById("w4-titulo");
  var elMensaje = document.getElementById("w4-mensaje");
  var cardAhorro = document.getElementById("w4-ahorro");
  var elPorMes = document.getElementById("w4-permes");
  var elPorCheque = document.getElementById("w4-percheque");

  function dinero(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function nombrePeriodo(periods) {
    if (periods === 52) return "cada semana";
    if (periods === 26) return "cada dos semanas";
    if (periods === 24) return "en cada cheque (dos veces al mes)";
    return "cada mes";
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var signoEl = form.querySelector('input[name="resultado"]:checked');
    var signo = signoEl ? signoEl.value : "";
    var montoBruto = parseFloat(document.getElementById("w4-monto").value);
    var periods = parseInt(document.getElementById("w4-frecuencia").value, 10);

    if (signo === "cero") {
      montoBruto = 0;
    }
    if (!signo || isNaN(montoBruto) || montoBruto < 0 || isNaN(periods)) {
      error.hidden = false;
      return;
    }
    error.hidden = true;

    // resultado: positivo = te devolvieron; negativo = tuviste que pagar.
    var resultado = signo === "pagado" ? -montoBruto : (signo === "cero" ? 0 : montoBruto);

    var titulo, mensaje, tono, mostrarAhorro = false;

    if (resultado >= 1000) {
      titulo = "Te retienen bastante de más";
      mensaje = "El año pasado te devolvieron " + dinero(resultado) + ". Suena bien, pero en realidad es dinero tuyo que le prestaste al gobierno todo el año, sin intereses. Podrías tenerlo en cada cheque.";
      tono = "teal";
      mostrarAhorro = true;
    } else if (resultado >= 400) {
      titulo = "Te retienen un poco de más";
      mensaje = "Te devolvieron " + dinero(resultado) + ". No está mal, pero podrías recuperar parte de ese dinero durante el año en vez de esperar al reembolso.";
      tono = "teal";
      mostrarAhorro = true;
    } else if (resultado >= -300) {
      titulo = "Estás en el punto justo";
      mensaje = "Tu retención va bastante equilibrada: ni le prestaste de más al gobierno ni te quedó un saldo grande por pagar. Así es justamente como conviene. Solo revísalo si cambia tu sueldo o tu familia.";
      tono = "neutro";
    } else if (resultado > -1000) {
      titulo = "Te retienen un poco de menos";
      mensaje = "Debiste " + dinero(-resultado) + " al IRS. No es grave, pero para no llevarte una sorpresa en abril puedes pedir que te retengan un poco más cada cheque.";
      tono = "aviso";
    } else {
      titulo = "Te retienen de menos";
      mensaje = "Debiste " + dinero(-resultado) + " al IRS. Si vuelve a pasar, además del pago podrías enfrentar una multa por retención insuficiente. Conviene ajustar tu W-4 para que te retengan más — o revisarlo con un preparador de impuestos.";
      tono = "aviso";
    }

    elTitulo.textContent = titulo;
    elTitulo.classList.toggle("w4-cifra--teal", tono === "teal");
    elMensaje.textContent = mensaje;

    if (mostrarAhorro) {
      var abs = Math.abs(resultado);
      elPorMes.textContent = dinero(abs / 12) + " al mes";
      elPorCheque.textContent = "≈ " + dinero(abs / periods) + " " + nombrePeriodo(periods) + ".";
      cardAhorro.hidden = false;
    } else {
      cardAhorro.hidden = true;
    }

    intro.hidden = true;
    salida.hidden = false;
  });
})();
