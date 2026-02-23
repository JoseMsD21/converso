# Integración Socket.IO - Guía de Prueba

## ✅ Componentes implementados

### Backend (`backend/src/`)
- **Socket.IO Server** inicializado en `index.js`
  - Escucha en el mismo puerto que Fastify (4000)
  - CORS habilitado para `http://localhost:5173` (frontend)
  - Maneja eventos: `joinConversation`, `leaveConversation`, `sendMessage`
  - Emite eventos a salas específicas: `conversation:${id}`

- **Chat Controller** (`controllers/chatController.js`)
  - Al recibir POST `/api/chat/conversations/:id/messages`
  - Emite evento `message` a todos en la sala `conversation:${id}`

### Frontend (`frontend/src/services/`)
- **Socket Service** (`socketService.js`)
  - `connect()` - Conecta al servidor Socket.IO
  - `onMessage(callback)` - Escucha mensajes en tiempo real
  - `joinConversation(conversationId)` - Se une a una sala
  - `leaveConversation(conversationId)` - Abandona una sala

- **Updated Inbox Component** (`components/Inbox.jsx`)
  - Se conecta automáticamente a Socket.IO en mount
  - Escucha eventos `message` en tiempo real
  - Actualiza UI inmediatamente cuando llega un mensaje
  - Muestra mensajes en historial con timestamp

## 🚀 Prueba rápida

### Terminal 1: Backend
```powershell
cd backend
npm run dev
# O si npm run dev no funciona:
node src/index.js
```

Esperado:
```
✓ Backend listening on port 4000 (development)
✓ Socket.IO initialized
```

### Terminal 2: Frontend
```powershell
cd frontend
npm run dev
```

Esperado:
```
VITE v4.5.x ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Prueba en navegador:
1. Abre `http://localhost:5173`
2. Inicia sesión (Login) o usa token de prueba
3. Ve a Inbox
4. Selecciona una conversación
5. Escribe un mensaje y presiona Enter
6. El mensaje debe aparecer instantáneamente (Socket.IO)
7. Abre otra pestaña y envía otro mensaje - ambas tabs recibirán el mensaje en tiempo real

## 🔌 Flujo de comunicación

```
Frontend (Tab 1)
    ↓
Input mensaje "Hola"
    ↓
chatService.sendMessage()
    ↓
POST /api/chat/conversations/:id/messages
    ↓
Backend Controller
    ↓
Guarda en DB
    ↓
Emite Socket: room="conversation:123"
    ↓
Frontend (Socket Listener)
    ↓
Actualiza UI
    ↓
Mensaje aparece en Inbox
```

## 📝 Eventos Socket.IO

### Escuchando (Frontend)
- `connect` - Conectado al servidor
- `message` - Nuevo mensaje recibido
- `disconnect` - Desconexión

### Emitiendo (Frontend)
- `joinConversation` - Entrar a sala
- `leaveConversation` - Salir de sala
- `sendMessage` - Enviar mensaje (uso alternativo)

### En el backend
- `connection` - Cliente conectado
- `joinConversation` - Cliente entra a sala
- `leaveConversation` - Cliente sale de sala
- `sendMessage` - Cliente envía mensaje
- `disconnect` - Cliente desconectado

## 🛠️ Troubleshooting

Si no ves mensajes en tiempo real:

1. **Revisa la consola del navegador** (F12 → Console)
   - Debe mostrar: `✓ Socket connected: socket-id`

2. **Verifica que backend está corriendo**
   - Test: `curl http://127.0.0.1:4000/api/health`
   - Debe retornar JSON con status OK

3. **Revisa los logs del backend**
   - Debe mostrar: `✓ Socket connected: socket-id`
   - Debe mostrar: `Message emitted to room conversation:xxx`

4. **Asegúrate que estás autenticado**
   - Necesitas un token JWT válido en localStorage

5. **Verifica CORS**
   - Backend debe permitir conexiones desde `http://localhost:5173`

## 📚 Archivos modificados

- `backend/src/index.js` - Socket.IO server setup
- `backend/src/controllers/chatController.js` - Emit events
- `frontend/src/services/socketService.js` - NEW Socket client
- `frontend/src/components/Inbox.jsx` - Socket integration
- `frontend/package.json` - socket.io-client added

## 🎯 Próximos pasos

1. ✅ Socket.IO bidireccional funcionando
2. [ ] Widget embebible (chat widget externo)
3. [ ] Notificaciones de escritura (typing indicators)
4. [ ] Leer confirmaciones (read receipts)
5. [ ] Tests de integración Socket.IO
