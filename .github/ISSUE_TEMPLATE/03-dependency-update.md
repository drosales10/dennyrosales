---
name: Dependency Update
description: Alta o actualizacion de librerias, package.json o lockfile
about: Crear una tarea para cambios de dependencias con analisis de compatibilidad
title: "[DEPS] <paquete>: <resumen>"
labels: ["squad", "area:deps", "needs:compatibility-check"]
assignees: []
---

## Paquete(s) objetivo
- Dependencia(s):
- Version actual:
- Version propuesta:
- Tipo: (runtime / devDependency / tooling)

## Justificacion
- Problema que resuelve:
- Riesgo de breaking change:
- Plan de rollback:

## Labels sugeridos
- Obligatorio: `squad`, `area:deps`, `needs:compatibility-check`
- Owner propuesto: `squad:otto`
- Co-check opcional: `needs:data-platform-check` (si toca Prisma/DB)

## Handoffs esperados
1. Otto evalua compatibilidad y estrategia de upgrade.
2. Dario revisa impacto en Prisma/PostgreSQL/PostGIS (si aplica).
3. Iris + Nico validan regresion tecnica.
4. Maia actualiza notas tecnicas si cambia setup o comandos.

## Criterios de salida (obligatorio)
- [ ] Lockfile actualizado y consistente
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test:all`
- [ ] `pnpm build`
- [ ] Registro de riesgos residuales y monitoreo post-merge
