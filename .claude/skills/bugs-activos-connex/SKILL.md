---
name: bugs-activos-connex
description: Lista de bugs conocidos y activos en CONNEX ordenados por prioridad. Consulta esta habilidad antes de empezar cualquier tarea para evitar construir sobre código roto.
---

## Bugs activos — ordenados por prioridad

### CRÍTICO 1 — Flujo de navegación roto
**Archivo:** frontend/src/App.jsx
**Problema:** `showLanding` se inicializa en `true` pero ningún botón de Landing.jsx llama a `setShowLanding(false)`. La app está bloqueada en la Landing, nadie puede llegar al Login ni al Dashboard.
**Fix requerido:**
En Landing.jsx, los botones "Comenzar Gratis" e "Iniciar Sesión" deben recibir la prop `onEnter` y llamarla al hacer click. En App.jsx, pasar `setShowLanding` como prop a Landing.

### CRÍTICO 2 — Login no autentica realmente
**Archivo:** frontend/src/components/Login.jsx
**Problema:** El formulario llama directamente a `setIsAuthenticated(true)` sin llamar al backend. No valida credenciales, no obtiene token JWT, no guarda nada en localStorage.
**Fix requerido:**
```js
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('connex_token', res.data.token);
    setIsAuthenticated(true);
  } catch (err) {
    setError('Credenciales inválidas');
  }
};
```

### CRÍTICO 3 — sendMessage falla silenciosamente
**Archivo:** frontend/src/components/Inbox.jsx línea ~65
**Problema:** Verifica si hay token en localStorage pero si no hay, solo setea un error en estado local. El usuario no sabe qué pasó. Además, si el usuario llegó al Dashboard sin autenticarse (por el bug 1 y 2), nunca habrá token.
**Fix requerido:** Se resuelve automáticamente al corregir los bugs 1 y 2.

### ALTO 4 — package.json del backend desactualizado
**Archivo:** backend/package.json (el de la raíz del proyecto)
**Problema:** Las dependencias listadas no coinciden con el package-lock.json real. Falta @fastify/cors, socket.io, uuid, bcryptjs, jsonwebtoken, mssql.
**Fix requerido:** Reemplazar con el package.json correcto que refleje las dependencias reales instaladas.

### MEDIO 5 — Race condition en Socket.IO
**Archivo:** backend/src/index.js
**Problema:** Socket.IO se inicializa después del `fastify.listen()`. Las primeras requests que lleguen muy rápido pueden ejecutar `request.server.io` antes de que exista.
**Fix requerido:** Inicializar Socket.IO antes de `fastify.listen()` o mover la inicialización a un plugin de Fastify registrado en el startup.

### RESUELTO (no tocar)
- Exportación de rutas en chatRoutes.js ✅
- Middleware errorHandler centralizado ✅
- Interceptor de token en api.js ✅
- Fallback en memoria en chatService.js ✅