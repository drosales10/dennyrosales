import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL no esta definida en .env");
}

const adapter = new PrismaPg(databaseUrl);
const prisma = new PrismaClient({ adapter });

const hero = {
  badge: "Ingenieria Geoespacial + Arquitectura TI",
  title: "Optimizando el Futuro Ambiental a traves de la Arquitectura de Software y la Ciencia de Datos Ecosistemica",
  subtitle:
    "Especializacion en plataformas geoespaciales, DevOps y desarrollo cloud para transformar datos complejos en decisiones ejecutables.",
  primaryLabel: "Ver Portafolio de Proyectos",
  primaryHref: "#portafolio",
  secondaryLabel: "Conectar en LinkedIn / Descargar CV",
  secondaryHref: "#contacto",
};

const contact = {
  message: "Disponible para consultorias tecnicas, colaboraciones de producto y proyectos geoespaciales de alto impacto.",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
};

const expertise = [
  {
    key: "geo-tech",
    title: "Geo-Tech",
    description: "Monitoreo geoespacial, procesamiento satelital avanzado y analitica SIG.",
    sortOrder: 1,
    content: {
      points: [
        "Monitoreo geoespacial con indicadores operativos.",
        "Procesamiento satelital avanzado para inventarios.",
        "Analitica SIG aplicada a decisiones de negocio.",
      ],
    },
  },
  {
    key: "devops-architecture",
    title: "DevOps & Architecture",
    description: "Arquitecturas robustas, microservicios y despliegues automatizados.",
    sortOrder: 2,
    content: {
      points: [
        "Diseno de arquitecturas de software robustas.",
        "Microservicios y observabilidad de procesos.",
        "Bases de datos espaciales y automatizacion de despliegues.",
      ],
    },
  },
  {
    key: "data-science-ai",
    title: "Data Science & AI",
    description: "Ciencia de datos e integracion de IA para analisis ecosistemico.",
    sortOrder: 3,
    content: {
      points: [
        "Ciencia de datos aplicada a inventarios y proyecciones.",
        "Modelos automatizados para soporte de decisiones.",
        "Integracion de IA para analisis ecosistemico.",
      ],
    },
  },
];

const projects = [
  {
    key: "smyeg-platform",
    title: "Plataforma de Monitoreo Forestal Multiorganizacion",
    description:
      "Integracion de trazabilidad patrimonial y cartografia operativa para monitoreo de activos a escala regional.",
    sortOrder: 1,
    content: {
      category: "Geoespacial",
      impact: "Reduccion del 42% en tiempos de verificacion territorial y consolidacion de reportes automatizados.",
      stack: ["PostGIS", "Next.js", "Prisma", "Leaflet", "Docker"],
      link: "#",
    },
  },
  {
    key: "microservices-suite",
    title: "Suite de Microservicios para Gestion de Inventarios",
    description:
      "Arquitectura de servicios desacoplados para catalogos, escenarios tarifarios y flujos contables forestales.",
    sortOrder: 2,
    content: {
      category: "Arquitectura Software",
      impact: "Escalabilidad horizontal en picos de procesamiento y despliegues continuos con menor riesgo.",
      stack: ["Node.js", "PostgreSQL", "Redis", "OpenAPI", "GitHub Actions"],
      link: "#",
    },
  },
  {
    key: "ecosystem-analytics",
    title: "Motor Analitico de Indicadores Ecosistemicos",
    description:
      "Pipeline de ciencia de datos para estimaciones, alertas y modelos comparativos de comportamiento ambiental.",
    sortOrder: 3,
    content: {
      category: "Analisis Datos",
      impact: "Mayor precision de decisiones tecnicas mediante tableros con indicadores interpretables por negocio.",
      stack: ["Python", "Pandas", "Earth Engine", "dbt", "Power BI"],
      link: "#",
    },
  },
  {
    key: "geo-ops-center",
    title: "Centro de Control de Operaciones SIG",
    description: "Visualizacion avanzada con capas dinamicas, recortes BBOX y prioridades de atencion territorial.",
    sortOrder: 4,
    content: {
      category: "Geoespacial",
      impact: "Respuesta operativa 30% mas rapida en intervenciones de campo y seguimiento de incidencias.",
      stack: ["Mapbox", "PostGIS", "React", "TypeScript", "Kubernetes"],
      link: "#",
    },
  },
  {
    key: "data-product-framework",
    title: "Framework de Arquitectura para Productos de Datos",
    description:
      "Modelo de referencia para equipos mixtos de producto, datos e infraestructura con enfoque de mantenibilidad.",
    sortOrder: 5,
    content: {
      category: "Arquitectura Software",
      impact: "Reduccion de deuda tecnica en integraciones y mayor velocidad de entrega de funcionalidades.",
      stack: ["Clean Architecture", "DDD", "Zod", "Prisma", "TurboRepo"],
      link: "#",
    },
  },
  {
    key: "risk-scoring",
    title: "Predictor de Riesgo Operativo en Activos Naturales",
    description:
      "Modelo de scoring para priorizar acciones sobre activos forestales segun variables satelitales y de campo.",
    sortOrder: 6,
    content: {
      category: "Analisis Datos",
      impact: "Priorizacion de recursos basada en evidencia con aumento en eficacia de planes de intervencion.",
      stack: ["Python", "Scikit-learn", "PostgreSQL", "Airflow", "Grafana"],
      link: "#",
    },
  },
];

const events = [
  {
    key: "summit-latam-geointeligencia",
    title: "Summit LATAM de Geointeligencia Aplicada",
    subtitle: "Ponente Principal",
    description:
      "Arquitectura de un sistema de monitoreo geoespacial con trazabilidad patrimonial, ingestion de capas operativas y visualizacion estrategica.",
    sortOrder: 1,
    content: {
      date: "Octubre 2025",
      venue: "Bogota, Colombia",
      metrics: "Caso expuesto con mas de 1.2M de registros georreferenciados en produccion.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      materialUrl: "#",
    },
  },
  {
    key: "foro-arquitectura-territorios",
    title: "Foro de Arquitectura de Software para Territorios",
    subtitle: "Consultor Tecnico",
    description:
      "Patrones para separar dominio, persistencia y seguridad multiorganizacion en plataformas con alta exigencia de auditoria.",
    sortOrder: 2,
    content: {
      date: "Mayo 2025",
      venue: "Quito, Ecuador",
      metrics: "Implementacion replicada en 3 equipos regionales con reduccion de incidencias criticas.",
      videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
      materialUrl: "#",
    },
  },
  {
    key: "encuentro-datos-ia",
    title: "Encuentro de Datos Ambientales e IA",
    subtitle: "Speaker",
    description:
      "Estrategias para combinar analitica avanzada, observabilidad de pipelines y modelos predictivos en contextos ecosistemicos complejos.",
    sortOrder: 3,
    content: {
      date: "Enero 2026",
      venue: "Lima, Peru",
      metrics: "Presentacion destacada por enfoque tecnico aplicado y resultados cuantificables.",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      materialUrl: "#",
    },
  },
];

const articles = [
  {
    key: "pixel-impacto",
    title: "Del pixel al impacto: como convertir imagen satelital en decisiones ejecutables",
    description:
      "Marco tecnico para transformar datos satelitales en rutas operativas priorizadas con control de incertidumbre.",
    sortOrder: 1,
    content: {
      topic: "Analisis Satelital",
      readTime: "4 min de lectura",
      link: "#",
    },
  },
  {
    key: "clean-architecture-geo",
    title: "Disenando plataformas geoespaciales que no colapsen con el crecimiento",
    description:
      "Principios de desacoplamiento para evolucionar modulos SIG, APIs y pipelines sin sacrificar velocidad.",
    sortOrder: 2,
    content: {
      topic: "Clean Architecture",
      readTime: "6 min de lectura",
      link: "#",
    },
  },
  {
    key: "indicadores-ecosistemicos",
    title: "Indicadores ecosistemicos accionables para equipos de negocio",
    description:
      "Como construir indicadores que conecten ciencia de datos con decisiones reales de campo y presupuesto.",
    sortOrder: 3,
    content: {
      topic: "Data Science",
      readTime: "5 min de lectura",
      link: "#",
    },
  },
];

const timeline = [
  {
    key: "consultoria-internacional",
    title: "Consultoria internacional en plataformas de monitoreo a gran escala.",
    sortOrder: 1,
  },
  {
    key: "liderazgo-integracion",
    title: "Liderazgo en integracion de arquitectura TI con operaciones ambientales.",
    sortOrder: 2,
  },
  {
    key: "soluciones-multiorg",
    title: "Diseno de soluciones multiorganizacion con trazabilidad y seguridad.",
    sortOrder: 3,
  },
];

const certifications = [
  { key: "cloud-architecture", title: "Cloud Architecture", sortOrder: 1 },
  { key: "microservices", title: "Microservices", sortOrder: 2 },
  { key: "data-science", title: "Data Science", sortOrder: 3 },
  { key: "devops", title: "DevOps", sortOrder: 4 },
  { key: "gis-advanced", title: "GIS Advanced", sortOrder: 5 },
  { key: "agile-delivery", title: "Agile Delivery", sortOrder: 6 },
];

function withSection(section, entries) {
  return entries.map((entry) => ({
    section,
    key: entry.key,
    title: entry.title,
    subtitle: entry.subtitle ?? null,
    description: entry.description ?? null,
    content: entry.content ?? null,
    sortOrder: entry.sortOrder,
  }));
}

async function main() {
  await prisma.landingEntry.deleteMany();
  await prisma.landingSingleton.deleteMany();

  const entries = [
    ...withSection("expertise", expertise),
    ...withSection("projects", projects),
    ...withSection("events", events),
    ...withSection("articles", articles),
    ...withSection("timeline", timeline),
    ...withSection("certifications", certifications),
  ];

  await prisma.landingEntry.createMany({ data: entries });

  await prisma.landingSingleton.createMany({
    data: [
      { key: "hero", value: hero },
      { key: "contact", value: contact },
    ],
  });

  console.log(`Seed completado: ${entries.length} registros y 2 configuraciones base.`);
}

main()
  .catch((error) => {
    console.error("Error ejecutando seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
