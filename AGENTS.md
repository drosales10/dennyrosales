# AGENTS.md — SMyEG

> **Idioma:** Todos los mensajes de razonamiento, commits y respuestas deben generarse en **español**.

## Setup y comandos

- **Package manager:** `pnpm` (no `npm`). Versión: `pnpm@10.33.0`, Node.js `>=20`.
- **Setup rápido:** `corepack enable && pnpm install && docker compose up -d && cp .env.example .env && pnpm db:generate && pnpm db:migrate && pnpm db:seed`
- **Dev:** `pnpm dev`
- **Gate de calidad (obligatorio antes de PR):** `pnpm qa:module` (ejecuta lint → tsc → test:all → build)
- **Build usa Webpack:** `next build --webpack`. Si falla por tipos corruptos: `pnpm build:clean`

## Arquitectura

- **Next.js 16** con App Router. Rutas agrupadas en `(auth)/`, `(dashboard)/`, `admin/`, `cliente/`.
- **React 19** con React Compiler habilitado (`babel-plugin-react-compiler`).
- **PostgreSQL 15** + **Prisma 5** + **PostGIS**. Esquema en `prisma/schema.prisma` (~1750 líneas).
- **NextAuth v5** (beta) para autenticación.
- **Tailwind CSS v4** + **shadcn/ui** + **Radix UI**.
- **Zustand** para estado global. Ojo: hay **dos directorios** — `src/store/` (solo `useGeovisorStore`) y `src/stores/` (auth, dashboard, ui).
- **Google Earth Engine** (`@google/earthengine`) para análisis satelital de carbono.
- **deck.gl** + **Leaflet** + **react-map-gl** para mapas.

## Directorios clave

| Ruta | Propósito |
|---|---|
| `src/app/api/**` | API handlers (CRUD, geo, auth) |
| `src/components/ui/` | Componentes shadcn base |
| `src/workers/` | Workers asíncronos (geo + assets) |
| `src/validations/` | Esquemas Zod |
| `src/actions/` | Server Actions de Next.js |
| `src/lib/` | Utilidades compartidas (auth, prisma, ee-server, rbac) |
| `prisma/migrations/` | Migraciones de BD |
| `scripts/` | Scripts operativos (excluidos de tsconfig) |

## Prisma

- **Dev:** `pnpm db:migrate` (interactivo). **Prod:** `pnpm db:deploy` (no interactivo).
- Si `db:migrate` detecta drift y propone reset, **no aceptar** en entornos con datos relevantes; usar `pnpm db:status` y luego `pnpm db:deploy`.
- **Nunca usar `pnpm db:push` en producción** — solo para prototipado local.
- Verificar estado antes de migrar: `pnpm db:status`.
- Reset local (borra datos): `pnpm exec prisma migrate reset`.

## Tests

- **Unitarias:** `src/**/*.test.ts` → `pnpm test:unit` (vitest, env: node).
- **Integración:** `src/**/*.integration.test.ts` → `pnpm test:integration` (timeout: 30s).
- **Todas:** `pnpm test:all` (unit primero, luego integration).
- Sin mocks de BD en unitarias; integración requiere PostgreSQL corriendo.

## Workers

- **Geo worker:** `pnpm worker:geo` (scheduler continuo) o `pnpm worker:geo:once` (un ciclo).
- **Assets worker:** `pnpm worker:assets` o `pnpm worker:assets:once`.
- Ambos usan polling con intervalos configurables por env vars (`GEO_*`, `ASSET_MEASUREMENT_*`).

## Convenciones de rutas y alias

- Path alias `@/*` → `./src/*` (configurado en tsconfig y vitest).
- `scripts/**/*.ts` excluidos de tsconfig (no se type-checkean como parte del app).
- Server Actions en `src/actions/` usan `"use server"`.

## Squad (equipo de agentes)

El proyecto usa un sistema de agentes con roles definidos en `.squad/team.md` y routing en `.squad/routing.md`.

**Reglas de routing clave:**
- Nuevo issue → label `squad` → Helena triagea → asigna `squad:{member}`.
- PRs requieren template de `.github/PULL_REQUEST_TEMPLATE.md` y gate `PR Guardrails` en verde.
- **Iris** es reviewer gate obligatorio para todo PR.
- Cambios de permisos/multiorg → **Vera** obligatorio.
- Cambios de Prisma/PostgreSQL/PostGIS → **Dario** obligatorio.
- Cambios geoespaciales → **Gaia** owner técnico.
- Docs funcionales → **Maia** actualiza `mintlify-docs` antes de cierre.

## PM2 (producción)

`ecosystem.config.cjs` define 3 procesos: app, geo-worker, assets-worker.
Requiere `pnpm` disponible globalmente. Comandos: `pm2 start ecosystem.config.cjs`.

## Troubleshooting rápido

| Problema | Solución |
|---|---|
| Build falla por tipos `.next` corruptos | `pnpm build:clean` |
| Mintlify no arranca | `pnpm docs:reset-cache && pnpm docs:sync:smyeg` |
| Prisma drift local | `pnpm exec prisma migrate reset` (solo dev) |
| Worker no procesa jobs | `pnpm worker:geo:once` para diagnóstico |

## Fuentes de verdad adicionales

- `.squad/routing.md` — routing de trabajo y ownership matrix
- `.squad/team.md` — agentes y responsabilidades
- `.github/workflows/pr-guardrails.yml` — gates de PR
- `.github/ISSUE_TEMPLATE/` — plantillas de issues
- `README.md` — documentación completa del proyecto
- `mintlify-docs/AGENTS.md` — instrucciones para docs de Mintlify
