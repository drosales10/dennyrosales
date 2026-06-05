# Instrucciones de Copilot para este proyecto

- Para cualquier aviso, alerta, confirmación o notificación en la UI, usar `sileo`.
- No usar `window.alert`, `window.confirm` ni `window.prompt`.
- Para confirmaciones de acciones sensibles (por ejemplo eliminar), usar `sileo.action` con botón explícito.
- Para éxito/error/advertencia, usar `sileo.success`, `sileo.error` y `sileo.warning`.
- Mantener mensajes breves y en español.
- Para cualquier implementación o ajuste de API CRUD, aplicar el estándar de seguridad multiorganización definido en `internal-docs/agents/05-seguridad-multiorganizacion-agent.md`.
- Ningún módulo se considera terminado sin validación técnica y evidencia de pruebas ejecutadas.
- Antes de cerrar un módulo o submódulo, ejecutar como mínimo: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test:all` y `pnpm build`.
- Si el cambio no tiene aún pruebas automatizadas de su capa, se debe dejar explícito qué pruebas faltan y por qué; no declarar "listo" sin ese reporte.
- Para cambios CRUD o con permisos, ejecutar además los checklist de `internal-docs/agents/04-qa-crud-agent.md` y `internal-docs/agents/08-qa-permisos-roles-crud-agent.md` antes del cierre.
