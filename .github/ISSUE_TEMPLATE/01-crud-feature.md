---
name: CRUD Feature
description: Nueva funcionalidad o mejora CRUD para modulos operativos
about: Crear una tarea de implementacion CRUD con handoffs y criterios de salida completos
title: "[CRUD] <modulo>: <resumen>"
labels: ["squad", "area:crud"]
assignees: []
---

## Contexto
- Modulo:
- Ruta UI objetivo:
- Ruta API objetivo:
- Entidad principal:
- Nivel patrimonial (si aplica):

## Alcance
- [ ] Crear/ajustar validaciones de entrada (Zod)
- [ ] Implementar API CRUD (GET/POST/PATCH/DELETE)
- [ ] Aplicar seguridad multiorganizacion y ownership checks
- [ ] Implementar UI/formulario/listado/edicion inline
- [ ] Ajustar import/export (si aplica)

## Labels sugeridos
- Obligatorio: `squad`
- Owner propuesto: `squad:bruno` o `squad:alma` (segun naturaleza)
- Co-checks opcionales: `needs:permissions-check`, `needs:mintlify-update`

## Handoffs esperados
1. Helena define alcance y divide si esta sobredimensionado.
2. Nadia fija contratos y reglas funcionales.
3. Bruno/Alma implementan por capa.
4. Vera revisa seguridad si hay acceso a datos.
5. Iris + Nico validan QA manual y automatizada.
6. Maia sincroniza documentacion si el cambio es visible.

## Criterios de salida (obligatorio)
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test:all`
- [ ] `pnpm build`
- [ ] Evidencia de permisos por rol (cuando aplique)
- [ ] Evidencia de pruebas automatizadas nuevas o actualizadas
- [ ] Riesgos/pedientes documentados si algo no pudo automatizarse
