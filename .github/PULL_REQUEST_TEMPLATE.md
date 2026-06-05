## Summary

- Issue relacionado: #<numero> (o URL del issue)
- Tipo de cambio: feature / bug / docs / deps / security / geo
- Modulo(s) afectado(s):

## Scope

- [ ] Alcance acotado a un frente principal
- [ ] Si hubo mezcla de frentes, se dividio en sub-issues
- [ ] Se actualizaron labels needs:* segun riesgo real

## Evidence

### Technical validation (mandatory)

- [ ] pnpm lint
- [ ] pnpm exec tsc --noEmit
- [ ] pnpm test:all
- [ ] pnpm build

Adjuntar resultados o referencia de ejecucion:

## Security and permissions

- [ ] No rompe aislamiento multiorganizacion
- [ ] Ownership checks validados en operaciones mutables
- [ ] Matriz de permisos por rol verificada (si aplica)
- [ ] Vera participo cuando el cambio lo requiere

## Data platform (Prisma / PostgreSQL / PostGIS)

- [ ] Cambios de schema/migraciones revisados por Dario (si aplica)
- [ ] Indices/constraints evaluados (si aplica)
- [ ] Plan de rollback definido para cambios estructurales (si aplica)
- [ ] Verificado `pnpm db:status` antes de migrar en entornos con datos
- [ ] Para entornos con datos, se usó `pnpm db:deploy` (no `db:migrate`)

## Tests

- [ ] Casos unitarios actualizados o agregados
- [ ] Casos integrales actualizados o agregados
- [ ] Regresion cubierta para riesgo principal
- [ ] Iris y Nico validaron gate de pruebas

## Documentation

- [ ] Se actualizo documentacion en mintlify-docs (si aplica)
- [ ] Rutas/endpoints documentados coinciden con implementacion real
- [ ] Maia reviso cambios de documentacion (si aplica)

## Dependency changes

- [ ] Cambios en package.json/lockfile fueron revisados por Otto (si aplica)
- [ ] Riesgo de compatibilidad evaluado y documentado

## Reviewer checklist

- [ ] Riesgo residual declarado (o explicito que no hay)
- [ ] Criterios de salida del issue fueron cumplidos
- [ ] Labels needs:* resueltos y limpiados antes de merge

## Notes for merge

- Impacto esperado en produccion:
- Monitoreo post-merge recomendado:
- Pendientes fuera de alcance:
