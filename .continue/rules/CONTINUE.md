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
