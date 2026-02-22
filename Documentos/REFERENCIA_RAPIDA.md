# 🔍 REFERENCIA RÁPIDA - CONVERSO

## 📍 Ubicaciones Importantes

| Necesidad | Ruta |
|-----------|------|
| Punto de entrada Backend | `backend/src/index.js` |
| Punto de entrada Frontend | `frontend/src/index.jsx` |
| Rutas del Chat | `backend/src/routes/chatRoutes.js` |
| Controlador del Chat | `backend/src/controllers/chatController.js` |
| Servicios del Backend | `backend/src/services/chatService.js` |
| Cliente API | `frontend/src/services/api.js` |
| Servicios del Frontend | `frontend/src/services/chatService.js` |
| Hook de Conversaciones | `frontend/src/hooks/useConversations.js` |
| Estilos | `frontend/src/index.css` |
| Componente Principal | `frontend/src/App.jsx` |
| Config Tailwind | `frontend/tailwind.config.js` |
| Config Vite | `frontend/vite.config.js` |

---

## 🚀 Comandos Rápidos

### Backend

```bash
# Iniciar en desarrollo (con recarga)
npm run dev

# Iniciar en producción
npm run start

# Verificar health
curl http://localhost:4000/api/health

# Ver conversaciones
curl http://localhost:4000/api/chat/conversations
```

### Frontend

```bash
# Iniciar servidor Vite
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 🔌 Endpoints del API

| Método | Endpoint | Descripción |
|--------|----------|------------|
| GET | `/api/health` | Health check |
| GET | `/api/chat/conversations` | Obtener conversaciones |

*Próximos endpoints a implementar:*
- `POST /api/chat/conversations` - Crear conversación
- `GET /api/chat/{id}` - Obtener conversación
- `POST /api/chat/{id}/messages` - Enviar mensaje
- `GET /api/chat/{id}/messages` - Obtener mensajes

---

## 📦 Estructura de Respuestas

### ✅ Éxito (2xx)
```json
{
  "success": true,
  "data": {
    "total": 0,
    "conversations": []
  },
  "timestamp": "2026-02-22T22:00:00.000Z"
}
```

### ❌ Error (4xx/5xx)
```json
{
  "success": false,
  "error": "Descripción del error",
  "timestamp": "2026-02-22T22:00:00.000Z"
}
```

---

## 🛠️ Agregar Nueva Funcionalidad

### Backend

**1. Crear ruta:**
```javascript
// routes/chatRoutes.js
fastify.post('/conversations', chatController.createConversation);
```

**2. Crear controlador:**
```javascript
// controllers/chatController.js
exports.createConversation = async (request, reply) => {
  try {
    const data = await chatService.createConversation(request.body);
    sendSuccess(reply, data, 201);
  } catch (error) {
    sendError(reply, error.message, 500);
  }
};
```

**3. Crear servicio:**
```javascript
// services/chatService.js
exports.createConversation = async (data) => {
  // Lógica aquí
  return { id: 1, ...data };
};
```

### Frontend

**1. Usar servicio:**
```javascript
import chatService from '../services/chatService';

const result = await chatService.createConversation(data);
```

**2. En componente:**
```jsx
import useConversations from '../hooks/useConversations';

function MyComponent() {
  const { conversations, loading, error } = useConversations();
  // Usar conversaciones
}
```

---

## 🐛 Debugging

### Backend Logs
```bash
# Ver logs en tiempo real
npm run dev
# Los logs aparecen automáticamente
```

### Frontend Console
```javascript
// Abre DevTools (F12) en el navegador
console.log(data);  // Ver datos
console.error(error); // Ver errores
```

### Health Check
```bash
curl http://localhost:4000/api/health
```

---

## 🔐 Variables de Entorno

### Backend `.env`
```
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:4000/api
```

---

## 📚 Importes Comunes

### Backend
```javascript
// Express-like (Fastify)
const chatController = require('./controllers/chatController');
const { sendSuccess, sendError } = require('./utils/response');
const AppError = require('./utils/AppError');
```

### Frontend
```javascript
// React
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Custom
import chatService from '../services/chatService';
import useConversations from '../hooks/useConversations';
import Sidebar from '../components/Sidebar';
```

---

## 🎨 Tailwind Clases Útiles

```jsx
// Layout
className="flex justify-center items-center h-screen"

// Colores
className="bg-blue-600 text-white"

// Hover
className="hover:bg-blue-700 transition"

// Responsive
className="md:flex lg:grid-cols-2"

// Espacios
className="p-6 mb-4 mx-2"
```

---

## ⚙️ Configuración Importante

### Autenticación (TODO)
```javascript
// Agregar en middleware/
const jwtMiddleware = require('./middleware/jwtAuth');
fastify.register(jwtMiddleware);
```

### Base de Datos (TODO)
```javascript
// Agregar en services/
const db = require('./utils/database');
const conversations = await db.query('SELECT * FROM conversations');
```

### WebSockets (TODO)
```javascript
// Agregar Socket.io
const io = require('socket.io');
io.on('connection', (socket) => {
  socket.on('message', (data) => {
    // Manejar mensaje
  });
});
```

---

## 📊 Performance

### Backend
- Logs: ✅ Activos
- Compresión: ⏳ Próxima
- Caching: ⏳ Próxima
- Rate Limiting: ⏳ Próxima

### Frontend
- Lazy Loading: ⏳ Próxima
- Code Splitting: ✅ Vite incluye
- Bundling: ✅ Vite optimizado
- Tree Shaking: ✅ Vite incluye

---

## 🧪 Testing (Próximo)

```bash
# Backend - Jest
npm test

# Frontend - Vitest
npm run test

# Coverage
npm run test:coverage
```

---

## 📱 Responsive Design

```jsx
// Mobile First
className="
  text-sm md:text-base lg:text-lg
  w-full md:w-1/2 lg:w-1/3
  flex-col md:flex-row lg:grid lg:grid-cols-3
"
```

---

## 🚀 Deployment

### Heroku Backend
```bash
git push heroku main
```

### Vercel Frontend
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

---

## 💡 Tips Profesionales

1. **Siempre usa Try-Catch** en funciones async
2. **Standariza respuestas** del API
3. **Valida inputs** en backend
4. **Usa tipos** (JSDoc o TypeScript)
5. **Escribe tests** mientras desarrollas
6. **Documenta** funciones complejas
7. **Usa variables de entorno** para secretos
8. **Implementa logs** para debugging
9. **Sigue DRY** (Don't Repeat Yourself)
10. **Haz commits** frecuentes

---

## 🎯 Checklist Pre-Deploy

- [ ] Todos los tests pasan
- [ ] No hay console.log() en producción
- [ ] Variables de entorno configuradas
- [ ] Tokens/secretos en .env (no en código)
- [ ] Errores manejados correctamente
- [ ] API documentada
- [ ] Código revisado
- [ ] Performance optimizado
- [ ] CORS configurado correctamente
- [ ] Documentación actualizada

---

## 📞 Contacto de Referencia

| Archivo | Propósito |
|---------|----------|
| README.md | Guía general |
| QUICK_START.md | Inicio rápido |
| CAMBIOS.md | Qué cambió |
| RESUMEN_FINAL.md | Resumen ejecutivo |
| INVENTARIO_ARCHIVOS.md | Listado de archivos |
| Este archivo | Referencia rápida |

---

**¡Listo para desarrollar!** 🚀

