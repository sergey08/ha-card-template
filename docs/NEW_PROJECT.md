# New project checklist / Lista de nuevo proyecto

## English
1. Use GitHub **Use this template** once the repository is marked as a template.
2. Rename `ha-card-template.js`, custom element names, config type, `hacs.json` filename and workflow/test references.
3. Replace sample logic, translations and editor fields with the actual card.
4. Update the README (English first, Spanish second), license attribution, screenshot and topics.
5. Run `node --check <your-file>.js` and `node --test tests/card.test.cjs`; update assertions for renamed files.
6. Test in a Home Assistant dashboard; never assume automated tests prove hardware functionality.
7. Add an official HACS validation workflow, publish a release after checks pass, then request inclusion in hacs/default.

## Español
1. Usa **Use this template** cuando el repositorio esté marcado como plantilla.
2. Renombra el JS, los elementos personalizados, el tipo de tarjeta, el nombre en `hacs.json` y las referencias en pruebas.
3. Sustituye la lógica de ejemplo, traducciones y campos del editor.
4. Actualiza README (inglés primero, español después), atribución de licencia, captura y etiquetas.
5. Ejecuta las pruebas y adapta las aserciones al nuevo nombre.
6. Prueba la tarjeta en Home Assistant; los tests automáticos no sustituyen la validación funcional.
7. Publica una Release tras pasar las validaciones y solicita inclusión en hacs/default.
