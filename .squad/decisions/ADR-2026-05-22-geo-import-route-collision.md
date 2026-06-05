# ADR-2026-05-22 - Colision de rutas en admin geo import

## Estado

Activo

## Contexto

Se detecto un incidente recurrente donde endpoints validos del App Router devolvian `404`:

- `/api/admin/geo/import/n1/features`
- `/api/admin/geo/import/n1/jobs`

El mismo patron aplicaba a `n2` y `n3`.

## Diagnostico

La ruta dinamica `src/app/api/admin/geo/import/[level]` quedaba eclipsada por carpetas estaticas vacias:

- `src/app/api/admin/geo/import/n1`
- `src/app/api/admin/geo/import/n2`
- `src/app/api/admin/geo/import/n3`

Cuando esas carpetas existen, Next prioriza el segmento estatico y las subrutas `features`/`jobs` terminan en `not-found`.

## Decision

Adoptar mitigacion permanente en tres capas:

1. Guard de colisiones versionado:
   - `scripts/guard-admin-geo-route-collisions.mjs`
2. Ejecucion automatica preventiva:
   - `predev` y `prebuild` en `package.json`
3. Monitoreo forense para reincidencia:
   - `scripts/watch-admin-geo-route-collisions.ps1`
   - comando `pnpm watch:admin-geo-routes`

## Reglas operativas

1. Si hay 404 en `admin/geo/import/*/features|jobs`, ejecutar primero `pnpm guard:admin-geo-routes`.
2. Si reaparece, iniciar watcher y adjuntar `logs/admin-geo-route-watch.log` al issue.
3. El guard elimina solo directorios vacios colisionantes; si detecta archivos dentro de `n1|n2|n3`, falla para prevenir borrado accidental.

## Evidencia minima esperada

1. Resultado de `pnpm guard:admin-geo-routes`.
2. Verificacion de endpoints con status esperado (sin sesion: `401`).
3. En reincidencia, log de watcher con timestamp.

## Impacto

- Reduce regresion intermitente en geovisor admin.
- Estandariza respuesta del Squad ante el incidente.
- Evita ciclos manuales de crear/borrar carpetas sin trazabilidad.
