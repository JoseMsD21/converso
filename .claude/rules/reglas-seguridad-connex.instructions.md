---
description: Reglas de seguridad obligatorias en todo el proyecto CONNEX
---

Nunca expongas el JWT_SECRET en logs, respuestas de error, ni comentarios de código.

En producción, si JWT_SECRET no está definido como variable de entorno, el servidor debe lanzar un error y no iniciar. Nunca uses el valor por defecto 'supersecret_dev_key' en producción.

Todos los endpoints que manejan datos de usuarios o conversaciones deben tener el middleware auth como preHandler. Los únicos endpoints públicos son: GET /api/health, POST /api/auth/login y POST /api/auth/register.

Las contraseñas siempre se hashean con bcrypt con mínimo 10 rounds antes de guardarlas. Nunca guardes contraseñas en texto plano ni uses md5 o sha1.

Los tokens JWT tienen expiración máxima de 7 días. Cuando se implemente refresh token, el access token debe tener expiración de 15 minutos.

Los mensajes de error de autenticación son siempre genéricos: "Credenciales inválidas". Nunca especifiques si el email no existe o si la contraseña es incorrecta. Esto previene enumeración de usuarios.

CORS está configurado para aceptar solo el origen del frontend. En producción nunca uses origin: '*'.

Todos los inputs del usuario se validan en el backend independientemente de si ya se validaron en el frontend. El frontend puede ser manipulado.

Los logs nunca incluyen: passwords, tokens JWT, números de tarjeta, datos bancarios, ni datos personales sensibles (DNI, dirección, teléfono) en texto plano.

Cuando se implemente rate limiting, los endpoints de auth tienen límite estricto: máximo 5 intentos por IP cada 15 minutos.

Los archivos subidos por usuarios (cuando se implemente) se validan por tipo MIME real, no solo por extensión. Se guardan fuera del directorio público.

Ante cualquier duda entre conveniencia y seguridad, elige seguridad y documenta el porqué.