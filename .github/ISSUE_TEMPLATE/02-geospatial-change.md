---
name: Geospatial Change
description: Cambio en capa geoespacial, workers o visualizacion de mapa
about: Crear una tarea para PostGIS, shapefiles, jobs, BBOX o mapa de Nivel 4
title: "[GEO] <area>: <resumen>"
labels: ["squad", "area:geo", "needs:data-platform-check"]
assignees: []
---

## Contexto geoespacial
- Componente afectado: (API / worker / DB / UI)
- Endpoint(s):
- Tabla(s) / modelo(s):
- Impacto en Nivel 4:

## Alcance
- [ ] Ajustar modelo espacial (si aplica)
- [ ] Ajustar worker de importacion o recálculo (si aplica)
- [ ] Ajustar API de carga/estado/layers (si aplica)
- [ ] Ajustar mapa UI y overlays React (si aplica)
- [ ] Mantener versionado y trazabilidad de geometria

## Labels sugeridos
- Obligatorio: `squad`, `area:geo`, `needs:data-platform-check`
- Owner propuesto: `squad:gaia`
- Co-checks opcionales: `needs:permissions-check`, `needs:mintlify-update`

## Handoffs esperados
1. Helena valida alcance y dependencias.
2. Gaia implementa frente tecnico geoespacial.
3. Dario revisa modelo/migraciones/performance.
4. Vera valida aislamiento por organizacion.
5. Iris + Nico validan regresion y pruebas.
6. Maia actualiza documentacion tecnica/operativa.

## Criterios de salida (obligatorio)
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test:all`
- [ ] `pnpm build`
- [ ] Evidencia de aislamiento por organizacion
- [ ] Evidencia de estado de jobs y/o respuestas BBOX
- [ ] Evidencia de no regresion en dashboard mapa
