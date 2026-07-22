/* Jubileo Financiero — Diagnóstico Financiero en 3 minutos
   Quiz de 9 preguntas que determina el Baby Step actual del usuario.
   Una pregunta a la vez, con barra de progreso y navegación por teclado
   (los radios usan el manejo nativo de foco y flechas del navegador). */

(function () {
  "use strict";

  var PREGUNTAS = [
    {
      id: "fondo-inicial",
      texto: "¿Tienes al menos $1,000 ahorrados solo para emergencias?",
      opciones: [
        { valor: "si", texto: "Sí, tengo $1,000 o más apartados" },
        { valor: "no", texto: "No, todavía no llego a esa cantidad" },
        { valor: "nose", texto: "No estoy seguro de cuánto tengo" }
      ]
    },
    {
      id: "deudas",
      texto: "¿Tienes deudas de consumo? (tarjetas de crédito, préstamos personales, crédito de auto, dinero prestado)",
      opciones: [
        { valor: "si", texto: "Sí, tengo una o más deudas de consumo" },
        { valor: "no", texto: "No, solo debo mi casa (o nada)" }
      ]
    },
    {
      id: "presupuesto",
      texto: "¿Haces un presupuesto por escrito antes de que empiece cada mes?",
      opciones: [
        { valor: "siempre", texto: "Sí, cada mes" },
        { valor: "aveces", texto: "A veces, pero no soy constante" },
        { valor: "nunca", texto: "No, nunca lo he hecho" }
      ]
    },
    {
      id: "imprevisto",
      texto: "Si mañana tuvieras un gasto imprevisto de $500, ¿cómo lo pagarías?",
      opciones: [
        { valor: "ahorros", texto: "Con mis ahorros, sin problema" },
        { valor: "tarjeta", texto: "Con tarjeta de crédito o un préstamo" },
        { valor: "prestado", texto: "Pidiendo prestado a familia o amigos" }
      ]
    },
    {
      id: "fondo-completo",
      texto: "¿Tienes un fondo de emergencia equivalente a 3–6 meses de tus gastos?",
      opciones: [
        { valor: "si", texto: "Sí, completo" },
        { valor: "parcial", texto: "Tengo algo, pero menos de 3 meses" },
        { valor: "no", texto: "No, aún no" }
      ]
    },
    {
      id: "retiro",
      texto: "¿Inviertes al menos el 15% de tus ingresos para tu retiro?",
      opciones: [
        { valor: "si", texto: "Sí, el 15% o más" },
        { valor: "menos", texto: "Invierto, pero menos del 15%" },
        { valor: "no", texto: "No estoy invirtiendo para el retiro" }
      ]
    },
    {
      id: "hijos",
      texto: "¿Tienes hijos y ahorras para su educación universitaria?",
      opciones: [
        { valor: "sinhijos", texto: "No tengo hijos (o ya son independientes)" },
        { valor: "ahorro", texto: "Tengo hijos y ya ahorro para su educación" },
        { valor: "noahorro", texto: "Tengo hijos pero aún no ahorro para eso" }
      ]
    },
    {
      id: "vivienda",
      texto: "¿Cuál es tu situación de vivienda?",
      opciones: [
        { valor: "renta", texto: "Rento (o vivo con familia)" },
        { valor: "hipoteca", texto: "Tengo casa propia con hipoteca" },
        { valor: "pagada", texto: "Tengo casa propia totalmente pagada" }
      ]
    },
    {
      id: "control",
      texto: "¿Sabes, con números reales, cuánto gastas cada mes?",
      opciones: [
        { valor: "si", texto: "Sí, lo tengo claro" },
        { valor: "aprox", texto: "Más o menos, es un estimado" },
        { valor: "no", texto: "Honestamente, no lo sé" }
      ]
    }
  ];

  var PASOS = {
    1: {
      nombre: "Baby Step 1",
      titulo: "Ahorra $1,000 de fondo inicial de emergencia",
      descripcion: "Estás en el punto de partida, y eso es una buena noticia: ya sabes dónde estás. Tu primera meta es juntar $1,000 lo más rápido posible. Ese colchón básico evita que cualquier imprevisto — una llanta, una visita al médico — se convierta en deuda nueva.",
      acciones: [
        "Abre una cuenta separada (o un sobre aparte) solo para tu fondo de emergencia y ponle tu primera aportación esta semana, aunque sean $20.",
        "Haz una lista de cosas que puedas vender o de horas extra que puedas trabajar este mes para llegar más rápido a los $1,000.",
        "Haz tu primer presupuesto por escrito antes del próximo mes: ingresos arriba, gastos abajo, hasta llegar a cero."
      ]
    },
    2: {
      nombre: "Baby Step 2",
      titulo: "Paga todas tus deudas con la bola de nieve",
      descripcion: "Ya tienes tu colchón inicial: ahora toca atacar las deudas. En este paso eliminas todas tus deudas de consumo (excepto la hipoteca) con el método bola de nieve: de la más pequeña a la más grande, ganando impulso con cada victoria.",
      acciones: [
        "Escribe la lista completa de tus deudas ordenadas de menor a mayor saldo, sin importar la tasa de interés.",
        "Paga el mínimo en todas y destina todo el dinero extra a la deuda más pequeña hasta eliminarla.",
        "Congela el uso de las tarjetas: no puedes salir del hoyo mientras sigues cavando."
      ]
    },
    3: {
      nombre: "Baby Step 3",
      titulo: "Completa tu fondo de emergencia de 3 a 6 meses",
      descripcion: "¡Estás libre de deudas de consumo! Ahora conviertes tu colchón de $1,000 en un verdadero fondo de emergencia: de 3 a 6 meses de tus gastos. Con eso, un despido o una emergencia médica dejan de ser una catástrofe financiera.",
      acciones: [
        "Calcula tus gastos esenciales de un mes y multiplícalos por 3 y por 6: ese es tu rango meta.",
        "Destina al fondo el mismo monto mensual que antes usabas para pagar deudas — ya tienes el hábito, solo cambia el destino.",
        "Guarda el fondo en una cuenta de ahorro accesible pero separada de tu cuenta de gastos diarios."
      ]
    },
    4: {
      nombre: "Baby Step 4",
      titulo: "Invierte el 15% de tus ingresos para el retiro",
      descripcion: "Con tu fondo completo, es hora de construir riqueza. La meta es invertir el 15% de tus ingresos brutos para el retiro, de forma constante y aburrida — que es como se construye el patrimonio real.",
      acciones: [
        "Revisa si tu empleo ofrece un plan de retiro con aportación patronal y asegúrate de aprovecharlo al máximo.",
        "Automatiza tu aportación mensual para llegar al 15% — lo que se descuenta solo, no se gasta.",
        "Agenda una sesión para revisar tus opciones de inversión según tu país y situación."
      ]
    },
    5: {
      nombre: "Baby Step 5",
      titulo: "Ahorra para la universidad de tus hijos",
      descripcion: "Ya inviertes para tu retiro: ahora puedes ahorrar para la educación de tus hijos sin sacrificar tu propio futuro. Recuerda el orden: tu retiro va primero, porque para la universidad hay becas, pero para el retiro no hay préstamos.",
      acciones: [
        "Define una meta mensual de ahorro educativo realista que no toque tu 15% de retiro.",
        "Investiga los vehículos de ahorro educativo disponibles en tu país y abre una cuenta dedicada.",
        "Involucra a tus hijos según su edad: que conozcan la meta y el valor del dinero desde ahora."
      ]
    },
    6: {
      nombre: "Baby Step 6",
      titulo: "Paga tu casa por completo",
      descripcion: "Estás en la recta final: eliminar la hipoteca. Cada pago extra a capital acorta años de deuda. Imagina tu vida sin pago de vivienda — esa es la libertad que estás construyendo.",
      acciones: [
        "Pide a tu banco una tabla de amortización y calcula cuánto acorta un pago extra mensual a capital.",
        "Destina ingresos extraordinarios (aguinaldo, bonos, ingresos extra) directamente a capital.",
        "Celebra los hitos: cada año de hipoteca eliminado merece reconocerse en familia."
      ]
    },
    7: {
      nombre: "Baby Step 7",
      titulo: "Construye riqueza y da con generosidad",
      descripcion: "¡Felicidades! Estás en la cima del plan: sin deudas de ningún tipo, con fondo de emergencia e invirtiendo para el futuro. Ahora tu dinero tiene una misión mayor: construir patrimonio y bendecir a otros con generosidad.",
      acciones: [
        "Define tu plan de generosidad: a quién quieres ayudar este año y con cuánto.",
        "Revisa tu plan patrimonial: testamento, seguros y beneficiarios al día.",
        "Considera una sesión de coaching para optimizar inversiones y dejar un legado ordenado."
      ]
    }
  };

  var indice = 0;
  var respuestas = {};

  var formulario = document.getElementById("quiz-formulario");
  if (!formulario) return;

  var vistaQuiz = document.getElementById("quiz-activo");
  var vistaResultado = document.getElementById("quiz-resultado");
  var elPregunta = document.getElementById("quiz-pregunta");
  var elOpciones = document.getElementById("quiz-opciones");
  var elContador = document.getElementById("quiz-contador");
  var elProgreso = document.getElementById("quiz-progreso");
  var elBarra = document.getElementById("quiz-barra");
  var elError = document.getElementById("quiz-error");
  var botonAtras = document.getElementById("quiz-atras");
  var botonSiguiente = document.getElementById("quiz-siguiente");

  function pintarPregunta(enfocar) {
    var pregunta = PREGUNTAS[indice];
    elPregunta.textContent = pregunta.texto;
    elOpciones.innerHTML = "";
    elError.hidden = true;

    pregunta.opciones.forEach(function (opcion, i) {
      var etiqueta = document.createElement("label");
      etiqueta.className = "quiz__opcion";

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "respuesta";
      radio.value = opcion.valor;
      radio.checked = respuestas[pregunta.id] === opcion.valor;

      var texto = document.createElement("span");
      texto.textContent = opcion.texto;

      etiqueta.appendChild(radio);
      etiqueta.appendChild(texto);
      elOpciones.appendChild(etiqueta);

      // Al navegar entre preguntas, lleva el foco a la primera opción
      // (no en la carga inicial, para no robar el foco de la página)
      if (enfocar && i === 0) {
        radio.focus();
      }
    });

    elContador.textContent = "Pregunta " + (indice + 1) + " de " + PREGUNTAS.length;
    elProgreso.setAttribute("aria-valuenow", String(indice));
    elBarra.style.width = (indice / PREGUNTAS.length) * 100 + "%";
    botonAtras.disabled = indice === 0;
    botonSiguiente.textContent = indice === PREGUNTAS.length - 1 ? "Ver mi resultado" : "Siguiente";
  }

  function calcularPaso(r) {
    if (r["fondo-inicial"] !== "si") return 1;
    if (r["deudas"] === "si") return 2;
    if (r["fondo-completo"] !== "si") return 3;
    if (r["retiro"] !== "si") return 4;
    if (r["hijos"] === "noahorro") return 5;
    if (r["vivienda"] === "hipoteca") return 6;
    return 7;
  }

  function mostrarResultado() {
    var paso = PASOS[calcularPaso(respuestas)];

    document.getElementById("resultado-paso").textContent = paso.nombre + ": " + paso.titulo;
    document.getElementById("resultado-descripcion").textContent = paso.descripcion;

    var lista = document.getElementById("resultado-pasos");
    lista.innerHTML = "";
    paso.acciones.forEach(function (accion) {
      var item = document.createElement("li");
      item.textContent = accion;
      lista.appendChild(item);
    });

    vistaQuiz.hidden = true;
    vistaResultado.hidden = false;
    document.getElementById("resultado-paso").setAttribute("tabindex", "-1");
    document.getElementById("resultado-paso").focus();
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var seleccion = formulario.querySelector('input[name="respuesta"]:checked');
    if (!seleccion) {
      elError.hidden = false;
      return;
    }
    respuestas[PREGUNTAS[indice].id] = seleccion.value;

    if (indice < PREGUNTAS.length - 1) {
      indice += 1;
      pintarPregunta(true);
    } else {
      mostrarResultado();
    }
  });

  botonAtras.addEventListener("click", function () {
    if (indice > 0) {
      indice -= 1;
      pintarPregunta(true);
    }
  });

  var botonReiniciar = document.getElementById("quiz-reiniciar");
  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", function () {
      indice = 0;
      respuestas = {};
      vistaResultado.hidden = true;
      vistaQuiz.hidden = false;
      pintarPregunta(true);
    });
  }

  pintarPregunta();
})();
