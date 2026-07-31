# Jubileo Financiero — Sitio web

Sitio web estático (HTML, CSS y JavaScript vanilla, sin frameworks ni build tools) para **Jubileo Financiero**, una práctica independiente de coaching financiero personal en español. Funciona en cualquier hosting estático: GitHub Pages, Hostinger, Netlify, etc.

## Estructura de archivos

```
/
├── index.html                  # Inicio: hero, Baby Steps, proceso, testimonios, CTA
├── servicios.html              # Servicios, precios y botones de Acuity
├── blog.html                   # Índice del blog
├── contacto.html               # Formulario (Formspree) + iframe de Acuity + datos
├── sobre-mi.html               # Historia y credenciales del coach
├── herramientas.html           # Índice de herramientas gratuitas
├── iglesias.html               # Los 7 Pasos de Bebé para Iglesias
├── aliados.html                # Red de profesionales aliados
├── privacidad.html             # Aviso de privacidad
├── gracias.html                # Página de gracias tras enviar el formulario
├── 404.html                    # Página de error personalizada
├── favicon.svg                 # Ícono del sitio
├── og-image.png                # Imagen para compartir en redes (1200×630)
├── sitemap.xml                 # Mapa del sitio para buscadores
├── robots.txt                  # Directivas para buscadores
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
│   ├── remesas.js              # Cálculos del planificador de remesas
│   ├── aliados-data.js         # DATOS de la red de aliados (edita aquí)
│   └── aliados.js              # Pinta las tarjetas de la red de aliados
└── README.md
```

## 1. Reemplazar los placeholders

Busca y reemplaza estos valores antes de publicar. Puedes usar la función "Buscar en archivos" de tu editor.

### Nombre del coach

Ya está configurado como **Iván García** en el descargo del footer de todas las páginas, en el titular de `sobre-mi.html` y en el autor de los artículos del blog. Si algún día necesitas cambiarlo, busca "Iván García" en todos los archivos HTML y reemplázalo.

### Precios (servicios.html)

Los precios viven en la sección `id="precios"` de `servicios.html`, uno por tarjeta, en las líneas con la clase `precio-tarjeta__monto` (Gratis, $199, $349 con referencia $398 tachada, $499, $199, Cotización). Edita el monto directamente en el HTML de cada tarjeta.

### Acuity Scheduling (ya configurado)

La cuenta es `owner=39977052` y los enlaces reales ya están conectados en el sitio:

| Botón / lugar | Tipo de cita | appointmentType |
|---|---|---|
| "Agenda tu consulta gratis" (tarjeta + CTA final de `servicios.html`, y resultado del quiz) | Consulta inicial | `96429754` |
| "Reservar sesión de arranque" | Sesión de arranque | `96427185` |
| "Reservar el Plan Jubileo" | Plan Jubileo | `96431144` |
| "Reservar acompañamiento" | Acompañamiento de 3 meses | `96431666` |
| "Reservar seguimiento" | Sesión de seguimiento | `96431733` |

El iframe de `contacto.html` (sección `#agendar`) usa el enlace general con los 5 tipos de cita.

Si algún día cambias un tipo de cita en Acuity y su ID cambia, busca el número viejo en los archivos HTML y reemplázalo. El botón "Solicitar cotización" de Talleres y grupos apunta al formulario de contacto y no usa Acuity.

**Importante:** para cobrar las 4 sesiones de pago hay que conectar Stripe, Square o PayPal dentro de Acuity (menú → Payments), y mantener la suscripción activa después de la prueba gratuita.

### Formspree (ya configurado)

El formulario de `contacto.html` envía a `https://formspree.io/f/mnjerbby`, que entrega los mensajes a `hola@jubileofinanciero.com`. El plan gratuito permite 50 mensajes al mes.

El primer envío requiere confirmar el formulario desde el correo que manda Formspree — haz una prueba tú mismo cuando el sitio esté publicado.

### Datos de contacto

Ya configurados en `contacto.html` y en el footer de todas las páginas:
- Correo: `hola@jubileofinanciero.com`.
- WhatsApp: `+1 (862) 273-2134` (con enlace directo a wa.me).
- Si cambias alguno, busca el valor actual en todos los archivos HTML y reemplázalo. El horario de atención se edita en `contacto.html`.

### Testimonios (index.html)

Los 3 testimonios de la sección "Historias reales de libertad financiera" son placeholders realistas. Reemplaza el texto, el nombre, el detalle y la letra del avatar (la inicial del nombre) por testimonios reales — siempre con permiso de tus clientes.

### Open Graph / dominio

El dominio de ejemplo `https://www.jubileofinanciero.com` aparece en varios lugares. Reemplázalo con tu dominio real en:
- Las etiquetas `og:url` y `og:image` de cada página HTML.
- `sitemap.xml` (todas las URLs) y `robots.txt` (línea `Sitemap:`).
- Los bloques `<script type="application/ld+json">` de `index.html`, `servicios.html` y los artículos del blog.
- El campo oculto `_next` del formulario en `contacto.html` (redirige a `gracias.html` tras el envío; en el plan gratuito de Formspree este redirect puede no aplicarse y se usa su página de confirmación estándar).

### Página "Sobre mí" (sobre-mi.html)

La historia del coach y su foto (`img/foto-coach.jpg`) ya están integradas. Para editar la historia, modifica los tres párrafos dentro de `<article class="articulo">` en `sobre-mi.html`. Para cambiar la foto, reemplaza `img/foto-coach.jpg` manteniendo el mismo nombre.

### Imagen para redes sociales (og-image.png)

Se incluye una imagen de marca de 1200×630 px que aparece al compartir el sitio por WhatsApp, Facebook, etc. Si quieres personalizarla (por ejemplo, con tu foto), reemplaza el archivo `og-image.png` manteniendo el mismo nombre y tamaño.

### Página 404

`404.html` usa rutas absolutas desde la raíz (`/css/styles.css`, `/`). Funciona tal cual en Hostinger, Netlify o GitHub Pages con dominio propio. Si publicas en GitHub Pages como sitio de proyecto (`usuario.github.io/nombre-repo/`), cambia los `/` iniciales por `/nombre-repo/` (hay un comentario en el archivo que lo indica).

### Red de profesionales aliados (aliados.html)

Los datos de la red viven en **`js/aliados-data.js`** — nunca en el HTML. Al inicio de ese archivo hay instrucciones completas en español. En resumen: busca la categoría, agrega un objeto con `nombre`, `especialidad`, `ciudad`, `idioma` y `contacto` dentro de su lista `profesionales`, y cambia el `estado` de `"en-formacion"` a `"activo"`. Mientras una categoría esté vacía, la página muestra el badge "Red en formación" automáticamente.

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
