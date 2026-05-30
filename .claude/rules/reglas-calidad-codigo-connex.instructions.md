---
description: Estándares de calidad y estructura de código para escalar CONNEX a nivel empresarial
---

Ninguna función debe superar 30 líneas. Si es más larga, divídela en funciones auxiliares con nombres descriptivos.

Los nombres de variables y funciones son descriptivos y en inglés. Nunca uses nombres como x, temp, data2, aux, cosa, variable1. El nombre debe explicar qué contiene o qué hace.

Si la misma lógica se repite en 2 o más lugares, extráela a una función utilitaria en utils/. Aplica el principio DRY (Don't Repeat Yourself).

Los números mágicos siempre tienen una constante con nombre:
MAL: if (content.length > 1000)
BIEN: const MAX_MESSAGE_LENGTH = 1000; if (content.length > MAX_MESSAGE_LENGTH)

Async/await de forma consistente. No mezcles .then().catch() con await en el mismo archivo a menos que sea necesario por manejo especial de errores.

Cada archivo tiene una sola responsabilidad. Un controller no es también un service. Un componente de UI no contiene lógica de negocio compleja.

Los comentarios explican el PORQUÉ, no el QUÉ. El código debe ser lo suficientemente claro para explicar qué hace. Si necesitas comentar qué hace una línea, probablemente necesitas renombrar la variable o función.

Antes de marcar una tarea como completada, verifica: ¿funciona el happy path? ¿funciona cuando el input es inválido? ¿funciona cuando la base de datos no está disponible?

Todo código nuevo que se agregue al proyecto debe ser compatible con el fallback en memoria del backend. No asumas que SQL Server siempre está disponible.

Cuando el proyecto pase a producción, todo console.log de debug debe estar eliminado. Solo se permiten console.error para errores reales y console.warn para situaciones de fallback esperadas.

Al refactorizar código existente, no cambies el comportamiento observable. Solo mejora la estructura interna. Si necesitas cambiar comportamiento, es una feature nueva, no un refactor.