# Estructura Técnica y Visual

## Objetivo

Construir una landing page profesional de alto impacto para una trayectoria híbrida en:

- Ingeniería Forestal
- Arquitectura de Software
- Ciencia de Datos
- Soluciones Geoespaciales

El formato recomendado es una landing single-page scrollable con posibilidad de extender a subpáginas dinámicas para proyectos o casos de estudio robustos.

## Resumen Ejecutivo

La propuesta busca que el sitio comunique autoridad técnica, especialización multidisciplinaria y capacidad real de ejecución. La experiencia debe ser moderna, escaneable y orientada a conversión para reclutadores, clientes y aliados estratégicos.

## Layout Propuesto

### 1. Header / Navbar

- Logotipo o monograma personal en la izquierda.
- Navegación rápida con smooth scroll a:
  - `#inicio`
  - `#servicios`
  - `#portafolio`
  - `#trayectoria`
  - `#contacto`
- Navbar sticky con fondo translúcido y `backdrop-blur`.

### 2. Hero Section

#### Contenido principal

- Título maestro:

  > Optimizando el Futuro Ambiental a través de la Arquitectura de Software y la Ciencia de Datos Ecosistémica

- Subtítulo enfocado en plataformas geoespaciales, DevOps y desarrollo cloud.

#### CTAs

- Primario: Ver portafolio de proyectos
- Secundario: Conectar en LinkedIn / Descargar CV

#### Visual clave

- Sustituir fotografía corporativa tradicional por un componente interactivo.
- Opciones recomendadas:
  - cuadrícula de puntos interconectados
  - mapa de calor geoespacial estilizado
  - canvas abstracto con estética técnica en modo oscuro

### 3. Propuesta de Valor / Expertise Grid

Usar un bento grid para comunicar los pilares del perfil:

#### Tarjeta 1. Geo-Tech

- Monitoreo geoespacial
- Procesamiento satelital avanzado
- Analítica SIG

#### Tarjeta 2. DevOps & Architecture

- Arquitecturas robustas
- Microservicios
- Bases de datos espaciales
- Automatización de despliegues

#### Tarjeta 3. Data Science & AI

- Ciencia de datos aplicada a inventarios
- Modelos automatizados
- Integración de IA para análisis ecosistémico

### 4. Featured Projects

Sección central del sitio con tarjetas dinámicas de proyectos en grid de 2 o 3 columnas.

#### Filtros sugeridos

- Geospatial
- Software Architecture
- Data Analytics

#### Cada tarjeta debe incluir

- Visual o captura representativa
- Descripción orientada a impacto y desafío técnico resuelto
- Tech stack badges
  - Python
  - PostGIS
  - React
  - Next.js
  - Docker
  - Earth Engine
- Enlace a caso de estudio o repositorio, si aplica

### 5. Trayectoria y Avales

Sección tipo timeline vertical asimétrica o tabs conmutables.

#### Pestaña A. Hitos Profesionales

- Consultoría internacional
- Liderazgo en plataformas de monitoreo a gran escala
- Roles estratégicos y entregables de alto impacto

#### Pestaña B. Especialización Continua

- Certificaciones técnicas
- Formación en desarrollo web, nube, microservicios y metodologías ágiles
- Evidencia de actualización constante

### 6. Contacto y Footer

- Formulario de contacto para consultoría o colaboración técnica
- Enlaces a LinkedIn y GitHub
- Footer minimalista con copy breve

## Identidad Visual Recomendada

### Paleta base

- Fondo principal: `#0b0f19`
- Acento esmeralda: `#10b981`
- Acento cian tecnológico: `#06b6d4`
- Texto principal: blanco titanio
- Texto secundario: gris suave

### Dirección visual

- Modo oscuro nativo
- Contraste alto con acentos geobotánicos
- Estética que combine naturaleza, datos y software

### Tipografía

- Sans-serif geométrica y muy legible
- Referencias sugeridas:
  - Inter
  - Geist

## Secciones Nuevas de Alto Impacto

### 7. Insights & Publications

Puente hacia actividad editorial en LinkedIn, sin necesidad de montar un blog completo.

#### Formato

- Grid horizontal de mini-cards tipo newsletter o Medium

#### Cada tarjeta incluye

- Etiqueta de tópico
  - Análisis Satelital
  - Clean Architecture
- Título del artículo
- Resumen ejecutivo corto
- Indicador de lectura
  - ejemplo: `4 min de lectura`
- CTA:
  - Leer artículo completo en LinkedIn

#### Recomendación técnica

- Mantener artículos en JSON local o Markdown para renderizado dinámico

### 8. Featured Media & Events

Sección para videos, ponencias y presentaciones técnicas.

#### Layout

- Columna izquierda al 60% con reproductor de video
- Columna derecha al 40% con desglose técnico dinámico

#### Panel lateral dinámico

- Nombre del evento
- Fecha
- Rol desempeñado
- Abstract técnico en accordion
- Botón para descargar material de apoyo, si existe
- Carrusel de miniaturas para cambiar de evento

## Índice Visual Final de la Página

1. Header
2. Hero Section
3. Expertise Grid
4. Featured Projects
5. Featured Media & Events
6. Insights & Publications
7. Trajectory / Timeline
8. Contact & Footer

## Stack Recomendado

### Opción principal

- Astro como base por performance y enfoque de contenido
- Tailwind CSS para estilos utilitarios
- shadcn/ui para componentes interactivos

### Opción alineada al proyecto actual

Dado que la guía operativa del repositorio está orientada a Next.js, React y Tailwind, la implementación práctica puede arrancar sobre Next.js App Router manteniendo la misma arquitectura visual propuesta.

## Criterios de Implementación

- La landing debe cargar rápido y mantener buen SEO.
- El diseño debe ser escaneable desde desktop y mobile.
- Cada bloque debe demostrar autoridad técnica, no solo estética.
- Los componentes deben quedar listos para alimentar contenido dinámico.

## Backlog Inicial Sugerido

### Fase 1. Base visual

- Definir tokens visuales
- Diseñar hero
- Diseñar navbar sticky
- Diseñar grid de expertise

### Fase 2. Conversión

- Diseñar portafolio filtrable
- Diseñar sección de publicaciones
- Diseñar sección de eventos y videos

### Fase 3. Credibilidad

- Diseñar timeline profesional
- Diseñar bloque de certificaciones
- Diseñar formulario de contacto

## Arranque con Squad

### Enrutamiento propuesto

- Helena: divide entregables y secuencia de ejecución
- Nadia: transforma este documento en contratos funcionales y criterios de aceptación
- Livia: lidera la landing y la experiencia narrativa del sitio
- Alma: implementa componentes UI reutilizables y estados visuales
- Iris: valida criterios de salida y cobertura mínima
- Maia: sincroniza documentación funcional cuando exista implementación

### Primeros entregables sugeridos para Squad

1. Definir sitemap y bloques definitivos de la landing.
2. Acordar stack de implementación real en este repo.
3. Crear issue de arranque para hero, navegación y expertise grid.
4. Separar backlog en slices pequeñas para ejecución por agente.