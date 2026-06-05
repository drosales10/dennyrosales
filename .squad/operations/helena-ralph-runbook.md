# Runbook Operativo - Helena y Ralph

Objetivo: ejecutar un flujo diario predecible para que el equipo procese backlog sin perder control de calidad, seguridad ni trazabilidad.

## 1) Preparacion diaria (inicio de sesion)

1. Ejecutar `squad doctor` y confirmar estado saludable.
2. Revisar etiquetas sincronizadas (`squad:*`, `area:*`, `needs:*`).
3. Confirmar que el issue source y miembros activos esten al dia en `.squad/team.md`.

## 2) Apertura de issue

1. Elegir plantilla adecuada en `.github/ISSUE_TEMPLATE/`.
2. Completar contexto, alcance, handoffs y criterios de salida.
3. Aplicar labels base:
   - `squad`
   - `area:*`
   - `priority:*` (si aplica)
   - `needs:*` (si aplica)

## 3) Triage inicial (Helena)

1. Leer issue y validar que no mezcle mas de un frente principal.
2. Si mezcla frentes, dividir en sub-issues y relacionarlos.
3. Asignar owner principal con `squad:{member}`.
4. Confirmar co-checks obligatorios:
   - `needs:permissions-check`
   - `needs:data-platform-check`
   - `needs:compatibility-check`
   - `needs:mintlify-update`
5. Dejar comentario de triage con:
   - alcance final
   - criterios de salida
   - riesgos conocidos

## 4) Ejecucion (equipo)

1. Owner principal implementa cambios de su area.
2. Co-owners intervienen por handoff, no por reemplazo del owner.
3. Si surge bloqueo, escalar a Helena con evidencia puntual.
4. Registrar decisiones importantes en `.squad/decisions/inbox/`.

## 5) Monitoreo continuo (Ralph)

1. Escanear tablero por rondas:
   - `squad` sin owner
   - `squad:{member}` sin avance
   - PRs con `CHANGES_REQUESTED`
   - PRs aprobados listos para merge
2. Priorizar en este orden:
   - seguridad/permisos
   - bloqueos de release
   - regresiones cliente
   - deuda de docs/deps
3. Cada 3-5 rondas, reportar estado resumido y continuar.

## 6) Gate de calidad (Iris + Nico)

1. Validar evidencia tecnica minima:
   - `pnpm lint`
   - `pnpm exec tsc --noEmit`
   - `pnpm test:all`
   - `pnpm build`
2. Verificar pruebas de permisos y organizacion activa cuando aplique.
3. Exigir pruebas automatizadas para riesgos recurrentes.

## 7) Gate de seguridad y datos

1. Vera valida aislamiento multiorganizacion y permisos por rol.
2. Dario valida migraciones, indices y SQL critico cuando aplique.
3. Sin estos checks, no cerrar incidentes de seguridad ni cambios estructurales.

## 8) Gate de documentacion (Maia)

1. Si el cambio impacta uso funcional o API, actualizar `mintlify-docs`.
2. Confirmar que ejemplos y rutas documentadas coincidan con implementacion real.
3. Marcar `needs:mintlify-update` como resuelto antes del cierre.

## 9) Cierre de issue

1. Confirmar que todos los checks requeridos estan verdes.
2. Adjuntar evidencia de pruebas y notas de riesgo residual (si existe).
3. Remover labels `needs:*` resueltos.
4. Cerrar issue con resumen final:
   - que se corrigio
   - que se valido
   - que queda pendiente

## 9.1) Apertura y cierre de PR

1. Crear PR usando `.github/PULL_REQUEST_TEMPLATE.md`.
2. Completar secciones de evidencia, seguridad, datos, pruebas y documentacion.
3. Incluir referencia explicita al issue (por ejemplo `Issue relacionado: #123` o `Closes #123`).
4. Asegurar que el PR no este en Draft al momento del gate final (usar `Ready for review`).
5. Si hubo cambios de dependencias, incluir revision de Otto.
6. Si hubo cambios de Prisma/PostgreSQL/PostGIS, incluir revision de Dario.
7. No aprobar merge con labels `needs:*` pendientes.
8. Verificar workflow `.github/workflows/pr-guardrails.yml` en verde antes de merge.

## 10) Cadencia semanal recomendada

1. Revision de backlog: 2 veces por semana.
2. Limpieza de labels y estados: 1 vez por semana.
3. Auditoria de plantillas y routing: cada cambio mayor de proceso.
4. Revalidacion de equipo (charters/routing/team): al cierre de sprint.

## 11) Incidente recurrente: 404 en admin geo import

Sintoma recurrente:

- `404` en `/api/admin/geo/import/n1/features` o `/api/admin/geo/import/n1/jobs` (igual para `n2` y `n3`).

Causa raiz observada:

- Aparicion de carpetas estaticas vacias `src/app/api/admin/geo/import/n1|n2|n3` que colisionan con la ruta dinamica `src/app/api/admin/geo/import/[level]`.

Respuesta operativa estandar:

1. Ejecutar `pnpm guard:admin-geo-routes` para detectar/limpiar colisiones.
2. Verificar endpoints con status esperado (sin sesion: `401`):
   - `/api/admin/geo/import/n1`
   - `/api/admin/geo/import/n1/jobs`
   - `/api/admin/geo/import/n1/features`
3. Si el incidente reaparece, activar monitoreo forense:
   - `pnpm watch:admin-geo-routes`
4. Adjuntar evidencia del log `logs/admin-geo-route-watch.log` en el issue/PR.

Controles preventivos permanentes:

- `predev` y `prebuild` ejecutan automaticamente `pnpm guard:admin-geo-routes`.
- Si el guard detecta archivos dentro de `n1|n2|n3`, falla para evitar borrar trabajo legitimo.
