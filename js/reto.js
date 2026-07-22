/* Jubileo Financiero — Reto 30 días sin gastos hormiga
   Tracker de 30 casillas con monto por día y contador acumulado.
   El progreso se guarda en localStorage bajo la clave "jf-reto-30". */

(function () {
  "use strict";

  var CLAVE = "jf-reto-30";
  var TOTAL_DIAS = 30;

  var rejilla = document.getElementById("reto-rejilla");
  if (!rejilla) return;

  var panel = document.getElementById("reto-panel");
  var panelTitulo = document.getElementById("reto-panel-titulo");
  var campoMonto = document.getElementById("reto-monto");
  var botonDesmarcar = document.getElementById("reto-desmarcar");
  var botonCancelar = document.getElementById("reto-cancelar");
  var celebracion = document.getElementById("reto-celebracion");
  var elDias = document.getElementById("reto-dias");
  var elTotal = document.getElementById("reto-total");
  var elTotalFinal = document.getElementById("reto-total-final");

  var diaSeleccionado = null;

  function cargar() {
    try {
      var crudo = localStorage.getItem(CLAVE);
      if (crudo) {
        var datos = JSON.parse(crudo);
        if (datos && Array.isArray(datos.dias) && datos.dias.length === TOTAL_DIAS) {
          return datos;
        }
      }
    } catch (error) {
      // Datos corruptos o localStorage no disponible: empezamos de cero.
    }
    var dias = [];
    for (var i = 0; i < TOTAL_DIAS; i++) {
      dias.push({ hecho: false, monto: 0 });
    }
    return { dias: dias };
  }

  function guardar() {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(estado));
    } catch (error) {
      // Modo privado o almacenamiento lleno: el reto sigue funcionando en memoria.
    }
  }

  var estado = cargar();

  function formatearMonto(numero) {
    return "$" + numero.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function totales() {
    var hechos = 0;
    var suma = 0;
    estado.dias.forEach(function (dia) {
      if (dia.hecho) {
        hechos += 1;
        suma += Number(dia.monto) || 0;
      }
    });
    return { hechos: hechos, suma: suma };
  }

  function pintar() {
    rejilla.innerHTML = "";

    estado.dias.forEach(function (dia, i) {
      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "reto__dia" + (dia.hecho ? " reto__dia--hecho" : "");
      boton.setAttribute(
        "aria-label",
        "Día " + (i + 1) + (dia.hecho ? ", cumplido, " + formatearMonto(Number(dia.monto) || 0) + " rescatados" : ", pendiente")
      );
      boton.setAttribute("aria-pressed", String(dia.hecho));

      var numero = document.createElement("span");
      numero.className = "reto__dia-numero";
      numero.textContent = "Día " + (i + 1);

      var monto = document.createElement("span");
      monto.className = "reto__dia-monto";
      monto.textContent = dia.hecho ? (dia.monto > 0 ? formatearMonto(Number(dia.monto)) : "✓") : "";

      boton.appendChild(numero);
      boton.appendChild(monto);
      boton.addEventListener("click", function () {
        abrirPanel(i);
      });
      rejilla.appendChild(boton);
    });

    var t = totales();
    elDias.textContent = String(t.hechos);
    elTotal.textContent = formatearMonto(t.suma);

    var completo = t.hechos === TOTAL_DIAS;
    celebracion.hidden = !completo;
    if (completo) {
      elTotalFinal.textContent = formatearMonto(t.suma);
    }
  }

  function abrirPanel(indice) {
    diaSeleccionado = indice;
    var dia = estado.dias[indice];
    panelTitulo.textContent = "Día " + (indice + 1);
    campoMonto.value = dia.hecho && dia.monto > 0 ? String(dia.monto) : "";
    botonDesmarcar.hidden = !dia.hecho;
    panel.hidden = false;
    campoMonto.focus();
  }

  function cerrarPanel() {
    panel.hidden = true;
    diaSeleccionado = null;
  }

  panel.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (diaSeleccionado === null) return;
    var monto = parseFloat(campoMonto.value);
    estado.dias[diaSeleccionado] = {
      hecho: true,
      monto: isNaN(monto) || monto < 0 ? 0 : monto
    };
    guardar();
    cerrarPanel();
    pintar();
  });

  botonDesmarcar.addEventListener("click", function () {
    if (diaSeleccionado === null) return;
    estado.dias[diaSeleccionado] = { hecho: false, monto: 0 };
    guardar();
    cerrarPanel();
    pintar();
  });

  botonCancelar.addEventListener("click", cerrarPanel);

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !panel.hidden) {
      cerrarPanel();
    }
  });

  var botonReiniciar = document.getElementById("reto-reiniciar");
  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", function () {
      var confirmado = window.confirm("¿Seguro que quieres borrar tu progreso y empezar un nuevo reto de 30 días?");
      if (!confirmado) return;
      estado = { dias: [] };
      for (var i = 0; i < TOTAL_DIAS; i++) {
        estado.dias.push({ hecho: false, monto: 0 });
      }
      guardar();
      pintar();
    });
  }

  pintar();
})();
