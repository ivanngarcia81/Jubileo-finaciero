# Jubileo Financiero — Sitio web

Sitio web estático (HTML, CSS y JavaScript vanilla, sin frameworks ni build tools) para **Jubileo Financiero**, una práctica independiente de coaching financiero personal en español. Funciona en cualquier hosting estático: GitHub Pages, Hostinger, Netlify, etc.

## Estructura de archivos

```
/
├── index.html                  # Inicio: hero, Baby Steps, proceso, testimonios, CTA
├── servicios.html              # Servicios, precios y botones de Acuity
├── blog.html                   # Índice del blog
├── contacto.html               # Formulario (Formspree) + iframe de Acuity + datos
├── herramientas.html           # Índice de herramientas gratuitas
├── iglesias.html               # Los 7 Pasos de Bebé para Iglesias
├── blog/
│   ├── comportamiento-y-deudas.html
│   ├── presupuesto-base-cero.html
│   └── perspectiva-biblica-del-dinero.html
├── herramientas/
│   ├── diagnostico.html        # Quiz: ¿en qué Baby Step estás?
│   ├── reto-30-dias.html       # Tracker del reto sin gastos hormiga
│   ├── remesas.html            # Planificador de remesas inteligente
│   └── credito.html            # Guía: el crédito no mide tu éxito
├── css/styles.css              # Todos los estilos (paleta, componentes, responsive)
├── js/
│   ├── main.js                 # Menú hamburguesa y año del footer
│   ├── diagnostico.js          # Lógica del quiz de diagnóstico
│   ├── reto.js                 # Tracker de 30 días (guarda en localStorage)
│   └── remesas.js              # Cálculos del planificador de remesas
└── README.md
```

## 1. Reemplazar los placeholders

Busca y reemplaza estos valores antes de publicar. Puedes usar la función "Buscar en archivos" de tu editor.

### Nombre del coach (obligatorio)

En el footer de **todas** las páginas aparece el texto `[Nombre del coach]` dentro del descargo de Ramsey Solutions. Reemplázalo por el nombre real en los 7 archivos HTML.

### Precios (servicios.html)

Los tres montos son de ejemplo: `$99`, `$449` y `$799`. Edita las líneas con la clase `precio-tarjeta__monto` en `servicios.html`. También puedes ajustar los textos de "qué incluye" en cada lista.

### URLs de Acuity Scheduling

1. **Botones "Agendar y pagar"** (`servicios.html`): hay 3 enlaces con esta forma:
   ```
   https://app.acuityscheduling.com/schedule.php?owner=XXXX&appointmentType=SESION_INICIAL
   https://app.acuityscheduling.com/schedule.php?owner=XXXX&appointmentType=PAQUETE_3_MESES
   https://app.acuityscheduling.com/schedule.php?owner=XXXX&appointmentType=PAQUETE_6_MESES
   ```
   Reemplaza `owner=XXXX` con tu ID de cuenta y `appointmentType=...` con el ID numérico real de cada tipo de cita. En Acuity: **Scheduling Page Link → Direct links & embedding → Appointment type links**.

2. **Iframe del calendario** (`contacto.html`, sección `#agendar`): reemplaza `owner=XXXX` en el atributo `src` del `<iframe>` con tu ID de cuenta. El pago se procesa dentro de Acuity; el sitio no necesita lógica de pago propia.

3. **Botón del resultado del quiz** (`herramientas/diagnostico.html`): el botón "Agenda tu sesión de coaching" apunta al placeholder `#ACUITY_URL`. Reemplázalo con tu enlace directo de Acuity (o con `../contacto.html#agendar` si prefieres llevar al usuario a la página de contacto).

### Formspree (contacto.html)

El formulario apunta a `https://formspree.io/f/TU_ID_DE_FORMSPREE`. Crea un formulario gratuito en [formspree.io](https://formspree.io), copia tu ID (algo como `xyzabcde`) y reemplaza `TU_ID_DE_FORMSPREE`.

### Datos de contacto

En `contacto.html` y en el footer de todas las páginas:
- Correo: `hola@jubileofinanciero.com` (reemplázalo por el real).
- WhatsApp: `+1 (555) 000-0000`.
- Horario de atención.

### Testimonios (index.html)

Los 3 testimonios de la sección "Historias reales de libertad financiera" son placeholders realistas. Reemplaza el texto, el nombre, el detalle y la letra del avatar (la inicial del nombre) por testimonios reales — siempre con permiso de tus clientes.

### Open Graph / dominio

Las etiquetas `og:url` usan `https://www.jubileofinanciero.com/...` como ejemplo. Reemplázalas con tu dominio real en cada página.

## 2. Agregar artículos nuevos al blog

1. Duplica cualquier archivo de `/blog/` (por ejemplo `presupuesto-base-cero.html`) y renómbralo con un slug descriptivo: `blog/mi-nuevo-articulo.html`.
2. Edita en el nuevo archivo:
   - `<title>` y `<meta name="description">` (únicos por artículo),
   - las etiquetas Open Graph (`og:title`, `og:description`, `og:url`),
   - el `<h1>`, la fecha (`<time datetime="AAAA-MM-DD">`) y el contenido dentro de `<article class="articulo">`.
3. Agrega una tarjeta del artículo en `blog.html`: copia un bloque `<article class="tarjeta articulo-tarjeta">...</article>` existente, y actualiza título, enlace, fecha y extracto.
4. Los artículos viven en `/blog/`, así que sus rutas internas usan `../` (por ejemplo `../css/styles.css`, `../index.html`). Si duplicas un artículo existente, esto ya queda correcto.

## 3. Publicar el sitio

### GitHub Pages

1. Sube el repositorio a GitHub.
2. En el repositorio: **Settings → Pages**.
3. En "Build and deployment", elige **Deploy from a branch**, selecciona la rama principal (`main`) y la carpeta `/ (root)`. Guarda.
4. En unos minutos el sitio estará en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.
5. (Opcional) Dominio propio: agrega tu dominio en la misma pantalla y configura los DNS según la guía de GitHub Pages.

### Hostinger (o cualquier hosting con cPanel/FTP)

1. Entra al administrador de archivos o conéctate por FTP.
2. Sube **todo el contenido del proyecto** (manteniendo la estructura de carpetas) a la carpeta pública, normalmente `public_html/`.
3. Verifica que `index.html` quede directamente dentro de `public_html/`.
4. Listo: el sitio queda disponible en tu dominio.

### Netlify

1. Arrastra la carpeta del proyecto a [app.netlify.com/drop](https://app.netlify.com/drop), o conecta el repositorio de GitHub.
2. No hay paso de build: deja el comando de build vacío y el directorio de publicación en la raíz.

## Notas de diseño

- **Paleta:** negro carbón `#0C0F10`, gris claro de fondo `#EEEFF1`, blanco `#FFFFFF`, acento teal `#0FBFA6`, gris medio `#8A9094`. Definida como variables CSS al inicio de `css/styles.css` (`:root`) — cámbiala ahí si quieres ajustar la marca.
- **Tipografía:** Playfair Display (títulos y cifras) e Inter (cuerpo y UI), cargadas desde Google Fonts.
- **Responsive:** enfoque mobile-first con menú hamburguesa por debajo de 860px de ancho.
- **Sin imágenes de stock:** todo lo visual son fondos de color, gradientes sutiles e iconos SVG inline (con `aria-hidden` o textos alternativos según corresponda).
