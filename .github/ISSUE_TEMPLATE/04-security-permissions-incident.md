---
name: Security and Permissions Incident
description: Incidente o riesgo en permisos, roles o aislamiento multiorganizacion
about: Reportar y gestionar incidentes de autorizacion y fuga de datos entre organizaciones
title: "[SECURITY] <modulo>: <resumen>"
labels: ["squad", "area:security", "needs:permissions-check"]
assignees: []
---

## Tipo de incidente
- [ ] Acceso no autorizado a recurso
- [ ] Fuga de datos entre organizaciones
- [ ] Bypass incorrecto de permisos por rol
- [ ] Operacion sensible sin confirmacion/guardas
- [ ] Otro (describir)

## Contexto
- Modulo/ruta afectada:
- Endpoint o accion UI:
- Rol(es) involucrados:
- Organizacion activa esperada:
- Comportamiento actual:
- Comportamiento esperado:

## Evidencia
- Pasos de reproduccion:
1. 
2. 
3. 
- Resultado observado:
- Logs o trazas relevantes:
- Capturas (si aplica):

## Labels sugeridos
- Obligatorio: `squad`, `area:security`, `needs:permissions-check`
- Owner propuesto: `squad:vera`
- Co-checks opcionales: `needs:data-platform-check`, `needs:mintlify-update`

## Handoffs esperados
1. Helena valida prioridad y alcance de contencion.
2. Vera lidera analisis de seguridad y plan de correccion.
3. Bruno y/o Dario corrigen API/modelo segun causa raiz.
4. Iris + Nico validan regresion manual y automatizada.
5. Maia actualiza documentacion de reglas de permisos (si aplica).

## Criterios de salida (obligatorio)
- [ ] Vulnerabilidad corregida y reproducibilidad cerrada
- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test:all`
- [ ] `pnpm build`
- [ ] Evidencia de pruebas por rol y organizacion
- [ ] Riesgo residual documentado
