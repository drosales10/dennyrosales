# Continue + Ollama (local)

Esta carpeta contiene la configuracion de Continue para usar modelos locales de Ollama.

## Requisitos

- Ollama ejecutandose en `http://127.0.0.1:11434`
- Extension Continue instalada en VS Code
- Config de workspace en `.vscode/settings.json`

## Modelos configurados

- `qwen2.5-coder:7b` (chat/edit por defecto)
- `deepseek-coder:6.7b` (chat/edit)
- `llama3.1:8b` (chat)
- `glm-5:cloud` (chat)
- `glm-5.1:cloud` (chat)
- `kimi-k2.6:cloud` (chat)
- `qwen2.5-coder:1.5b-base` (edit)
- `qwen2.5-coder:1.5b` (autocomplete)
- `nomic-embed-text:latest` (embeddings)

## Cambiar modelo por defecto rapido

Ejecuta en PowerShell desde la raiz del repo:

```powershell
./scripts/set-continue-default-model.ps1 -Model "deepseek-coder-6.7b"
```

Modelos validos para `-Model` son los `name` declarados en `.continue/config.yaml`.

## Verificacion rapida

```powershell
ollama list
Invoke-RestMethod -Method Get -Uri http://127.0.0.1:11434/api/tags
```

Si Continue no muestra modelos, reinicia VS Code (`Developer: Reload Window`).
