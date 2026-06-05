---
name: Client Tariffs Regression
description: Regresion funcional o tecnica en /cliente/tarifas
about: Reportar y gestionar fallos en navegacion, contexto por organizacion o calculo de tarifas del area cliente
title: "[CLIENTE-TARIFAS] <resumen>"
labels: ["squad", "area:cliente", "needs:mintlify-update"]
assignees: []
---

## Contexto de regresion
- Ruta afectada: `/cliente/tarifas`
- Flujo afectado: (navegacion / carga / calculo / persistencia)
- Organizacion activa:
- Rol del usuario:

## Alcance del problema
- [ ] Navegacion cliente inconsistente
- [ ] Contexto de organizacion incorrecto
- [ ] Selectores de departamento/empresa fallan
- [ ] API de escenarios/catalogo no responde como esperado
- [ ] Error de render/UI
- [ ] Error de validacion de datos

## Reproduccion
1. 
2. 
3. 

## Resultado esperado vs actual
- Esperado:
- Actual:

## Labels sugeridos
- Obligatorio: `squad`, `area:cliente`
- Owner propuesto: `squad:livia`
- Co-checks opcionales: `needs:permissions-check`, `needs:mintlify-update`

## Handoffs esperados
1. Helena define alcance y divide si cruza mas de un modulo.
2. Livia corrige flujo cliente y navegacion.
3. Bruno ajusta API/contexto si aplica.
4. Vera revisa permisos y organizacion activa si aplica.
5. Iris + Nico validan no regresion end-to-end.
6. Maia actualiza documentacion en mintlify-docs.

## Criterios de salida (obligatorio)
- [ ] Flujo cliente/tarifas estable en organizacion activa
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test:all`
- [ ] `pnpm build`
- [ ] Evidencia de pruebas de navegacion + API cliente/tarifas
