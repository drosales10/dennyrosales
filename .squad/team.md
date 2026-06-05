# Squad Team

> SMyEG

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Squad | Coordinator | Routes work, enforces handoffs and reviewer gates. |

## Members

| Name | Role | Charter | Status |
|------|------|---------|--------|
| Helena | Lead Orchestrator | `.squad/agents/helena/charter.md` | Active |
| Nadia | Functional Architect | `.squad/agents/nadia/charter.md` | Active |
| Bruno | API Engineer (CRUD + Patron Repositorio) | `.squad/agents/bruno/charter.md` | Active |
| Vera | Security Engineer | `.squad/agents/vera/charter.md` | Active |
| Alma | Frontend Engineer | `.squad/agents/alma/charter.md` | Active |
| Livia | Landing Experience Engineer | `.squad/agents/livia/charter.md` | Active |
| Teo | Data Grid Engineer | `.squad/agents/teo/charter.md` | Active |
| Gaia | Geospatial Engineer | `.squad/agents/gaia/charter.md` | Active |
| Iris | QA and Compliance Engineer | `.squad/agents/iris/charter.md` | Active |
| Maia | Technical Documentation Engineer | `.squad/agents/maia/charter.md` | Active |
| Nico | Test Automation Engineer | `.squad/agents/nico/charter.md` | Active |
| Otto | Dependency and Release Engineer | `.squad/agents/otto/charter.md` | Active |
| Dario | Data Platform Engineer (Prisma/PostgreSQL/PostGIS + soporte Repositorio) | `.squad/agents/dario/charter.md` | Active |

## Project Context

- **Project:** SMyEG
- **Created:** 2026-04-22
- **Mission:** construir un sistema forestal-contable multirol y multiorganizacion con trazabilidad patrimonial, seguridad por organizacion activa y evidencia tecnica obligatoria.
- **Functional backbone:** jerarquia patrimonial N0-N6, modulos CRUD reutilizables, landing por organizacion, submodulos cliente, import/export de datos, tablas operativas y mapa geoespacial de Nivel 4.
- **Operating rules:** usar `sileo` para alertas/confirmaciones, aplicar seguridad multiorganizacion en APIs CRUD, y no cerrar entregables sin `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test:all` y `pnpm build`.

## Team Design

- **Helena** coordina secuencia, alcance, handoffs y reviewer gates entre suites CRUD, landing, permisos y geoespacial.
- **Nadia** convierte plan maestro y jerarquia patrimonial en contratos de datos, reglas funcionales y criterios de aceptacion verificables.
- **Bruno** implementa APIs, Prisma, auditoria y logica de persistencia siguiendo el patron reusable de CRUD, incluyendo construccion y mantenimiento del Patron Repositorio.
- **Vera** protege aislamiento entre organizaciones, ownership checks, permisos por rol y endurecimiento de operaciones sensibles.
- **Alma** construye UX operativa de dashboard, formularios, listados y flujos de edicion con mensajes breves en espanol.
- **Livia** resuelve landing por organizacion, submodulos cliente y navegacion contextual filtrada por plantilla activa.
- **Teo** se ocupa de tablas complejas, import/export CSV-Excel, compatibilidad de headers ES/EN y round-trip de datos.
- **Gaia** lidera shapefiles, PostGIS, workers, BBOX y visualizacion cartografica sin romper la trazabilidad patrimonial.
- **Iris** valida calidad tecnica, regresiones, permisos CRUD y evidencia minima antes de declarar un modulo como terminado.
- **Maia** mantiene documentacion tecnica y funcional en `mintlify-docs` alineada al estado real del sistema.
- **Nico** automatiza pruebas unitarias, de integracion y smoke flows reutilizables para regresion continua.
- **Otto** controla compatibilidad de librerias, salud de `package.json`, lockfile y estrategia de actualizaciones.
- **Dario** es especialista de plataforma de datos con foco en Prisma, PostgreSQL y PostGIS para integridad y performance, y da soporte tecnico a Bruno en decisiones del Patron Repositorio.

## Handoffs

1. Helena define alcance, secuencia y criterios de salida.
2. Nadia fija contratos Zod, invariantes del dominio y reglas patrimoniales.
3. Bruno implementa API/persistencia y Patron Repositorio; coordina con Dario el soporte tecnico de diseno de datos y luego entrega a Vera los puntos de control de seguridad.
4. Vera valida aislamiento multiorganizacion y matriz de permisos antes de exponer UI.
5. Alma, Livia, Teo y Gaia consumen contratos/API segun su frente de experiencia.
6. Iris audita permisos, regresiones y evidencias de validacion tecnica.
7. Nico transforma escenarios de Iris en suites automatizadas por capa.
8. Maia documenta cambios aprobados de API/UI/datos en `mintlify-docs`.
9. Otto valida impacto de dependencias antes de fusionar cambios de infraestructura.
10. Dario revisa decisiones estructurales de modelo, migraciones, SQL espacial y soporte de capa Repositorio cuando Bruno lo requiera.

## Do Not Mix

- El mismo agente no debe ser autor principal de una API y auditor final de permisos de esa misma funcionalidad.
- La UX de mapa geoespacial no debe resolverse con HTML embebido en popups cuando la interaccion requiera acciones React.
- Landing/submodulos cliente no debe mezclarse con CRUD operativo general si cambia reglas de organizacion activa o plantillas.
- Actualizaciones de dependencias no deben mezclarse con features de dominio sin ventana de validacion dedicada.
- Cambios de Prisma/PostgreSQL/PostGIS no deben publicarse sin revison conjunta Dario + Iris para cobertura de regresion.
