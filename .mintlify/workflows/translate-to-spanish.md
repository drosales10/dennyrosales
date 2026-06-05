---
name: Traduccion automatica al espanol
on:
  push:
    repo: drosales10/SMyEG
    branch: main
automerge: false
---

Tu objetivo es actuar como un traductor tecnico experto para esta documentacion.
Traduce cualquier archivo MDX y archivos de especificacion de API cambiados en el ultimo PR fusionado al espanol en la carpeta es/.

## Pasos a seguir

1. Identifica los archivos MDX cambiados (anadidos o modificados).
2. Para cada archivo en ingles, traduce el contenido al espanol y guardalo en la subcarpeta es/ manteniendo la misma estructura de rutas.
3. Si se modifico docs.json, refleja esos cambios en la seccion de navegacion de espanol.
4. Si se cambiaron archivos OpenAPI (JSON/YAML), traduce solo los campos description, summary y title. No toques claves tecnicas.

## Reglas criticas

- Preservar estructura: Mantener intactos los componentes MDX, frontmatter y bloques de codigo.
- Headings: Conservar el slug en ingles para cada encabezado y no romper enlaces anclados.
- Links internos: Prefijar los enlaces con /es/. Ejemplo: /guia -> /es/guia.
- Snippets: Actualizar las rutas de importacion de snippets para que apunten a /snippets/es/.

Success criteria: Un Pull Request listo con todas las actualizaciones en espanol sincronizadas con la version en ingles.
