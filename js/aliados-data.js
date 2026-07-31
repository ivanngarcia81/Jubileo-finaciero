/* ============================================================================
   Red de profesionales aliados — ARCHIVO DE DATOS
   ============================================================================

   CÓMO AGREGAR UN PROFESIONAL A UNA CATEGORÍA
   -------------------------------------------
   1. Busca la categoría por su "id" (por ejemplo "hipotecas").
   2. Dentro de su lista "profesionales", agrega un objeto con esta forma:

        {
          nombre: "María Ejemplo",
          especialidad: "Compradores por primera vez",
          ciudad: "Houston, TX",
          idioma: "Español e inglés",
          contacto: "mailto:maria@ejemplo.com"   // o "https://su-sitio.com" o "tel:+15550000000"
        }

   3. Cambia el campo "estado" de esa categoría de "en-formacion" a "activo".
      - "en-formacion": la tarjeta muestra el badge "Red en formación".
      - "activo": la tarjeta muestra la lista de profesionales.

   4. Guarda el archivo y sube el cambio. No hay que tocar nada más:
      js/aliados.js lee este archivo y pinta las tarjetas automáticamente.

   NO borres ninguna categoría aunque esté vacía: el orden y los textos
   son parte del contenido de la página.
   ========================================================================== */

window.ALIADOS = [
  {
    id: "inversiones",
    categoria: "Inversiones y retiro",
    cuandoRefiero: "Cuando ya estás libre de deudas de consumo, tienes tu fondo de emergencia completo y toca decidir en qué invertir.",
    credencial: "Asesor de inversiones registrado (IAR/RIA) o CFP®. Verificable en adviserinfo.sec.gov.",
    estado: "en-formacion",
    profesionales: []
  },
  {
    id: "hipotecas",
    categoria: "Hipotecas",
    cuandoRefiero: "Cuando ya estás listo para precalificar y necesitas comparar opciones reales.",
    credencial: "Oficial de préstamos con licencia NMLS. Verificable en NMLS Consumer Access.",
    estado: "en-formacion",
    profesionales: []
  },
  {
    id: "bienes-raices",
    categoria: "Bienes raíces",
    cuandoRefiero: "Cuando ya tienes la entrada ahorrada y sales a buscar casa.",
    credencial: "Agente con licencia estatal, con experiencia en compradores por primera vez.",
    estado: "en-formacion",
    profesionales: []
  },
  {
    id: "impuestos",
    categoria: "Impuestos",
    cuandoRefiero: "Si trabajas por cuenta propia, tienes ITIN, debes dinero al IRS o necesitas un plan de pagos.",
    credencial: "Preparador de impuestos con PTIN vigente; CPA o Enrolled Agent para los casos que lo requieran.",
    estado: "activo",
    profesionales: [
      {
        nombre: "DGS Business Solutions",
        especialidad: "Income tax (personal, LLC y corporativo), bookkeeping, payroll y apertura de negocio. También traducciones y llenado de formularios oficiales (servicio de notario público, solo para completar trámites; no es asesoría legal)",
        ciudad: "Fair Lawn y Freehold, NJ",
        idioma: "Español e inglés",
        contactos: [
          { href: "https://wa.me/12013970580", texto: "WhatsApp" },
          { href: "mailto:dgsbusinesssolutions@gmail.com", texto: "Correo" }
        ]
      }
    ]
  },
  {
    id: "seguros",
    categoria: "Seguros",
    cuandoRefiero: "Cuando necesitas proteger a tu familia: vida a término, discapacidad, salud, auto y hogar.",
    credencial: "Agente independiente con licencia estatal de seguros.",
    estado: "activo",
    profesionales: [
      {
        nombre: "DGS Medicare Consultants",
        especialidad: "Corredores de seguros de salud con licencia: Medicare, GetCoveredNJ, discapacidad y menores de 65 años",
        ciudad: "Fair Lawn y Freehold, NJ",
        idioma: "Español e inglés",
        contactos: [
          { href: "https://wa.me/12013970580", texto: "WhatsApp" },
          { href: "mailto:dgsbusinesssolutions@gmail.com", texto: "Correo" }
        ]
      }
    ]
  },
  {
    id: "legal",
    categoria: "Asuntos legales",
    cuandoRefiero: "Demandas de cobranza, embargo de salario, bancarrota, contratos.",
    credencial: "Abogado con licencia activa en tu estado. Verificable con el colegio de abogados estatal.",
    estado: "en-formacion",
    profesionales: []
  },
  {
    id: "testamento",
    categoria: "Testamento y herencia",
    cuandoRefiero: "Cuando quieres dejar tu casa en orden para los tuyos.",
    credencial: "Abogado de planificación patrimonial.",
    estado: "en-formacion",
    profesionales: []
  },
  {
    id: "inmigracion",
    categoria: "Inmigración",
    cuandoRefiero: "Cuando tu situación migratoria afecta tus decisiones de dinero, trabajo o crédito.",
    credencial: "Abogado de inmigración o representante acreditado por el Departamento de Justicia. Nunca un notario público.",
    estado: "en-formacion",
    profesionales: []
  },
  {
    id: "salud-emocional",
    categoria: "Salud emocional y familiar",
    cuandoRefiero: "Cuando detrás del gasto hay ansiedad, compra compulsiva, ludopatía o una crisis de pareja que va más allá del dinero.",
    credencial: "Consejero o terapeuta con licencia estatal.",
    estado: "en-formacion",
    profesionales: []
  }
];
