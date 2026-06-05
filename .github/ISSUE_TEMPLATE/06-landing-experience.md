---
name: Landing Experience
description: Nueva funcionalidad o fase de implementacion para la landing profesional
about: Crear una tarea de implementacion para la experiencia visual, narrativa y de conversion de la landing
title: "[LANDING] <seccion o slice>: <resumen>"
labels: ["squad", "area:landing"]
assignees: []
---

## Contexto
- Seccion objetivo:
- Objetivo de negocio:
- Audiencia principal: reclutadores / clientes / aliados / otro
- Dependencias previas:

## Alcance
- [ ] Ajustar arquitectura de contenido
- [ ] Implementar layout responsive
- [ ] Definir o aplicar tokens visuales
- [ ] Integrar CTAs y jerarquia visual
- [ ] Preparar contenido dinamico si aplica

## Labels sugeridos
- Obligatorio: `squad`, `area:landing`
- Owner propuesto: `squad:livia`
- Co-checks opcionales: `needs:mintlify-update`, `needs:permissions-check`

## Handoffs esperados
1. Helena delimita el slice y dependencias.
2. Nadia convierte el requerimiento en criterios verificables.
3. Livia lidera la experiencia de landing.
4. Alma implementa componentes reutilizables si la seccion los requiere.
5. Iris valida UX, regresion y evidencia tecnica.
6. Maia actualiza documentacion cuando la seccion quede implementada.

## Criterios de salida
- [ ] La seccion comunica valor tecnico de forma clara y escaneable.
- [ ] Responsive correcto en desktop y mobile.
- [ ] CTAs, estados visuales y contenido quedan definidos.
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test:all`
- [ ] `pnpm build`
- [ ] Evidencia visual o notas de verificacion manual adjuntas