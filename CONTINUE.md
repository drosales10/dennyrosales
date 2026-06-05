# CONTINUE.md

Guia rapida para trabajar con Continue en este proyecto.

## Estado de accesos verificados

Se validaron correctamente los accesos necesarios para generar este archivo:

- Descubrimiento de archivos (equivalente a `file_glob_search`): OK
- Lectura de archivos (equivalente a `read_file`): OK
- Exploracion de directorios (equivalente a `ls`): OK
- Creacion de archivos (equivalente a `create_new_file`): OK

## Configuracion activa de Continue

- Archivo principal: `.continue/config.yaml`
- Archivo de workspace: `.vscode/settings.json`
- Proveedor local: Ollama (`http://127.0.0.1:11434`)

## Contexto

El contexto fue configurado al maximo practico en los modelos principales usando:

- `contextLength: 131072`

Nota: el limite real final depende del modelo y de Ollama.

## Reglas clave del proyecto (resumen)

- Usar `pnpm` (no `npm`).
- Mantener respuestas y mensajes en espanol.
- En UI, usar `sileo` para notificaciones y confirmaciones.
- Antes de cerrar modulos, validar con lint, typecheck, tests y build.

## Comandos utiles

```powershell
# Cambiar modelo por defecto de Continue
./scripts/set-continue-default-model.ps1 -Model "deepseek-coder-6.7b"

# Verificar Ollama
ollama list
Invoke-RestMethod -Method Get -Uri http://127.0.0.1:11434/api/tags
```

# CONTINUE.md

## Project Overview

- **Purpose**: The project aims to provide a comprehensive guide for developers working on the codebase. It includes setup instructions, architecture details, and common tasks.
- **Key Technologies Used**:
  - Next.js 16 with App Router
  - React 19 with React Compiler
  - PostgreSQL 15 + Prisma 5 + PostGIS
  - NextAuth v5 for authentication
  - Tailwind CSS v4 + shadcn/ui + Radix UI
  - Zustand for global state management
  - Google Earth Engine for satellite carbon analysis
  - deck.gl + Leaflet + react-map-gl for maps

## Getting Started

### Prerequisites
- Node.js >=20
- pnpm (version 10.33.0)
- Docker

### Installation Instructions
1. Enable corepack and install dependencies:
   ```sh
   corepack enable && pnpm install
   ```
2. Start the development server:
   ```sh
   pnpm dev
   ```
3. Set up environment variables by copying `.env.example` to `.env`.
4. Generate Prisma client:
   ```sh
   pnpm db:generate
   ```
5. Run migrations:
   ```sh
   pnpm db:migrate
   ```
6. Seed the database:
   ```sh
   pnpm db:seed
   ```

### Basic Usage Examples
- Running tests:
  ```sh
  pnpm test:all
  ```

## Project Structure

- **src/app/api/**: API handlers (CRUD, geo, auth)
- **src/components/ui/**: Componentes shadcn base
- **src/workers/**: Workers asíncronos (geo + assets)
- **src/validations/**: Esquemas Zod
- **src/actions/**: Server Actions de Next.js
- **src/lib/**: Utilidades compartidas (auth, prisma, ee-server, rbac)
- **prisma/migrations/**: Migraciones de BD

## Development Workflow

### Coding Standards or Conventions
- Use `pnpm` for package management.
- Maintain responses and messages in Spanish.
- Follow React Compiler conventions where applicable.

### Testing Approach
- Run lint, typecheck, tests, and build before closing modules.

### Build and Deployment Process
- Build using Webpack: `next build --webpack`.
- Clean build if types are corrupted: `pnpm build:clean`.

### Contribution Guidelines
- Submit pull requests following the template in `.github/PULL_REQUEST_TEMPLATE.md`.
- PRs require approval from Iris, Vera (for multiorg changes), Dario (for Prisma/PostgreSQL/PostGIS changes), and Gaia (for geoespacial changes).
- Docs updates should be pushed to `mintlify-docs`.

## Key Concepts

- **Domain-Specific Terminology**: Terms related to the project's domain, such as "carbon footprint," "satellite analysis."
- **Core Abstractions**: Higher-level concepts used in the codebase, like state management with Zustand.
- **Design Patterns Used**: Patterns applied throughout the project, such as using Server Actions for server-side logic.

## Common Tasks

### Step-by-step Guides
1. **Setting Up a New Environment**:
   - Clone the repository.
   - Install dependencies.
   - Run migrations and seed the database.
2. **Running Tests**:
   - Execute unit tests: `pnpm test:unit`
   - Execute integration tests: `pnpm test:integration`

### Examples of Common Operations
- Executing a migration:
  ```sh
  pnpm db:migrate
  ```

## Troubleshooting

### Common Issues and Their Solutions
- Build fails due to corrupted type files:
  ```sh
  pnpm build:clean
  ```
- Mintlify doesn't start:
  ```sh
  pnpm docs:reset-cache && pnpm docs:sync:smyeg
  ```

## References

- [Project README](README.md)
- [Mintlify Docs for AGENTS](mintlify-docs/AGENTS.md)
