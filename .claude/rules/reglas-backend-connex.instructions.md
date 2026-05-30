---
description: Reglas específicas para todo el código backend de CONNEX
paths:
  - "backend/**"
---

Siempre sigue el patrón: routes → controllers → services → db. Nunca pongas lógica de negocio en controllers ni queries directas en controllers.

Todo controller debe tener try/catch y usar sendSuccess() o sendError() de utils/response.js. Nunca uses reply.send() directo.

Todo service debe verificar db.isConfigured antes de intentar conectar a SQL Server. Si la conexión falla, usa el fallback en memoria y registra el warning con console.warn().

Los IDs siempre se generan con uuidv4() del paquete uuid. Nunca uses IDs incrementales ni Math.random().

Las fechas siempre en formato ISO string: new Date().toISOString(). Nunca pases objetos Date directamente en respuestas JSON.

Valida el body antes de usarlo: const { campo } = request.body || {}. Nunca confíes en que request.body existe.

Las rutas privadas siempre llevan { preHandler: auth } como segundo argumento en la definición de la ruta.

Socket.IO se inicializa una sola vez en index.js. Los eventos se emiten desde los controllers usando request.server?.io. Nunca importes io directamente en services.

Si agregas una tabla nueva, actualiza initDb.js con el bloque IF NOT EXISTS correspondiente.

Nunca hardcodees credenciales. Todo valor sensible va en variables de entorno con un fallback explícito solo para desarrollo, no para producción.

Los logs de producción nunca deben incluir passwords, tokens, ni datos personales de usuarios.

Cuando implementes un endpoint nuevo, incluye al final el comando curl de prueba correspondiente.