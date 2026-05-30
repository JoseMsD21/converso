---
name: endpoints-api-connex
description: Todos los endpoints disponibles en la API de CONNEX con su método, ruta, autenticación requerida y body esperado. Úsala para saber qué endpoints existen antes de crear uno nuevo o para construir llamadas desde el frontend.
---

## API CONNEX — Base URL: http://localhost:4000/api

### Health
| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | /health | No | Estado del servidor |

### Auth
| Método | Ruta | Auth | Body |
|--------|------|------|------|
| POST | /auth/register | No | { email, password, name } |
| POST | /auth/login | No | { email, password } |

### Respuesta de login exitoso:
```json
{
  "success": true,
  "data": {
    "user": { "id": "uuid", "email": "...", "name": "..." },
    "token": "jwt_token_aqui"
  }
}
```

### Conversations
| Método | Ruta | Auth | Body/Params |
|--------|------|------|-------------|
| GET | /chat/conversations | No | Query: ?search=&status= |
| GET | /chat/conversations/:id | No | — |
| POST | /chat/conversations | Sí | { name, participantId, channel } |
| POST | /chat/conversations/:id/messages | Sí | { content, senderId } |

### Formato de respuesta estándar (siempre):
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

### Formato de error estándar:
```json
{
  "success": false,
  "error": "Descripción del error",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

### Auth header requerido en endpoints protegidos:
Authorization: Bearer <jwt_token>
### Endpoints pendientes de implementar (próximas fases):
- PUT /chat/conversations/:id/assign — asignar a agente
- PUT /chat/conversations/:id/status — cambiar estado
- GET /chat/conversations/:id/messages — mensajes paginados
- POST /auth/refresh — renovar token
- GET /agents — listar agentes disponibles
- POST /webhooks/whatsapp — recibir mensajes de WhatsApp
- POST /webhooks/telegram — recibir mensajes de Telegram