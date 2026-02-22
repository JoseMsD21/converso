# 👋 GUÍA PARA NUEVOS DESARROLLADORES - CONVERSO

Bienvenido al equipo de desarrollo de **Converso**. Esta guía te ayudará a entender la estructura del proyecto y a contribuir efectivamente.

---

## 📖 Primero: Lee esto

1. **[README.md](README.md)** - Entender el proyecto (5 min)
2. **[QUICK_START.md](QUICK_START.md)** - Ejecutar localmente (10 min)
3. **[CAMBIOS.md](CAMBIOS.md)** - Qué se ha hecho (15 min)
4. Este archivo - Guía de desarrollo (20 min)

**Tiempo total**: ~50 minutos

---

## 🚀 Setup Inicial

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd CONVERSO
```

### 2. Instalar dependencias

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

**Backend** (`backend/.env`):
```
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:4000/api
```

### 4. Iniciar servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Esperado: "✓ Backend listening on port 4000"
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Esperado: "Local: http://localhost:5173/"
```

### 5. Verificar

```bash
# En otra terminal:
curl http://localhost:4000/api/health
# Debería responder con JSON
```

---

## 📁 Estructura Explicada

### Backend: Capas

```
controllers/     ← Recibe requests, llama servicios
    ↓
services/        ← Lógica de negocio
    ↓
utils/           ← Funciones helper
```

**Ejemplo de flujo:**
```
POST /api/chat/create
  ↓
chatController.createConversation()
  ↓
chatService.createConversation()
  ↓
Devuelve response { success, data, timestamp }
```

### Frontend: Componentes

```
App.jsx          ← Componente raíz
  ├── Sidebar    ← Navegación
  └── Inbox      ← Contenido principal
        ↓
    useConversations()  ← Hook que obtiene datos
        ↓
    chatService.js      ← Comunica con API
        ↓
    api.js              ← Cliente HTTP
```

---

## 🔄 Flujo de Desarrollo

### 1. Feature: Nueva funcionalidad

**Backend:**
1. Crear ruta en `routes/chatRoutes.js`
2. Crear controlador en `controllers/chatController.js`
3. Crear servicio en `services/chatService.js`
4. Testar con `curl` o Postman

**Frontend:**
1. Crear servicio en `services/chatService.js`
2. Crear hook (si es necesario) en `hooks/`
3. Usar en componente
4. Testar en navegador

### 2. Commit

```bash
git add .
git commit -m "feat: Agregar nueva feature"
git push origin feature-branch
```

---

## 💻 Comandos Útiles

### Backend

```bash
npm run dev      # Desarrollo (con recarga automática)
npm run start    # Producción
npm run lint     # Verificar código (próximamente)
npm test         # Tests (próximamente)
```

### Frontend

```bash
npm run dev      # Desarrollo (con HMR)
npm run build    # Build producción
npm run preview  # Ver build
npm run lint     # Verificar código (próximamente)
npm test         # Tests (próximamente)
```

---

## 📝 Convenciones de Código

### Nombres de archivos

```
✅ camelCase:     myComponent.jsx, chatService.js
✅ PascalCase:    Sidebar.jsx, ChatController.js
✅ kebab-case:    my-style.css (si aplica)
```

### Nombres de funciones

```javascript
// ✅ Bueno - verbo + sustantivo
function getConversations() {}
function createMessage() {}
function updateUser() {}
function deleteConversation() {}

// ❌ Malo
function conversationsGet() {}
function makeMessage() {}
```

### Estructura de funciones async

```javascript
// ✅ Bueno - Try-Catch
exports.getConversations = async (request, reply) => {
  try {
    const data = await service.get();
    sendSuccess(reply, data);
  } catch (error) {
    sendError(reply, error.message, 500);
  }
};

// ❌ Malo - Sin manejo de errores
exports.getConversations = async (request, reply) => {
  const data = await service.get();
  reply.send(data);
};
```

### Componentes React

```jsx
// ✅ Bueno - Función + Hooks
function Inbox() {
  const { conversations, loading, error } = useConversations();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="...">
      {conversations.map(c => (
        <div key={c.id}>{c.name}</div>
      ))}
    </div>
  );
}

export default Inbox;
```

---

## 🐛 Debugging

### Backend

```javascript
// En el código:
console.log('Valor:', variable);

// En terminal:
npm run dev
// Ver los logs

// Usar breakpoints (VS Code):
// 1. Poner breakpoint en el código
// 2. Ejecutar: node --inspect-brk src/index.js
// 3. Abrir chrome://inspect
```

### Frontend

```javascript
// En el código:
console.log('Estado:', state);

// En el navegador:
// Abrir DevTools (F12)
// Ver console
// Usar React Developer Tools extension

// Network tab:
// Ver requests al backend
// Verificar response
```

---

## ✅ Checklist antes de hacer PR

- [ ] El código corre sin errores
- [ ] No hay `console.log()` de debug
- [ ] Los estilos se ven bien
- [ ] Responsive en móvil
- [ ] Mensajes de error claros
- [ ] Código formateado
- [ ] Commits con mensajes descriptivos
- [ ] README actualizado (si aplica)

---

## 🚨 Errores Comunes

### Backend

**Error:** `Cannot find module`
```
Solución: npm install
```

**Error:** `Port 4000 already in use`
```bash
lsof -i :4000           # macOS/Linux
netstat -ano | findstr :4000  # Windows
kill -9 <PID>           # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

**Error:** `Plugin must be a function`
```
Solución: Revisar que chatRoutes.js exporte función async
```

### Frontend

**Error:** `Module not found`
```
Solución: npm install (revisar import path)
```

**Error:** `Styles not loading`
```
Solución: Revisar que index.css esté importado en index.jsx
```

**Error:** `API no responde`
```
Verificar: VITE_API_URL en .env
Verificar: Backend está corriendo
Ver: Network tab en DevTools
```

---

## 📚 Recursos Útiles

### Documentación
- [Fastify Docs](https://www.fastify.io/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

### Cursos
- Node.js Mastery
- React Advanced
- REST API Design

### Herramientas
- [Postman](https://www.postman.com/) - Testar API
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)
- [DevTools](https://developer.chrome.com/docs/devtools/)

---

## 🎯 Tareas para Contribuir

### Fácil (Primer día)
- [ ] Agregar comentarios a funciones
- [ ] Mejorar mensajes de error
- [ ] Documentar endpoints
- [ ] Criar tests básicos

### Intermedio (Primera semana)
- [ ] Conectar base de datos
- [ ] Implementar validación de inputs
- [ ] Agregar autenticación
- [ ] Tests unitarios

### Avanzado (Próximas semanas)
- [ ] WebSockets
- [ ] Caché
- [ ] Optimización de performance
- [ ] Deployment automático

---

## 🤝 Colaboración

### Ramas (Branching)

```
main              ← Producción (estable)
develop           ← Desarrollo (integración)
feature/xyz       ← Nueva feature
bugfix/xyz        ← Arreglo de bug
```

### Commits

```
feat: Agregar autenticación con JWT
fix: Corregir validación de emails
docs: Actualizar README
refactor: Simplificar chatService.js
test: Agregar tests para login
```

### Pull Request (PR)

```
Título: feat: Agregar autenticación

Descripción:
- Qué se agregó
- Por qué se agregó
- Cómo probar

Relacionado a: #123
```

---

## 💬 Comunicación

- **Slack/Teams**: Para preguntas rápidas
- **GitHub Issues**: Para bugs y features
- **Standups**: Diarios a las 10 AM
- **Code Review**: Antes de merge

---

## 📞 Preguntas?

Contacta a:
- 👨‍💼 Team Lead: [nombre]
- 👨‍💻 Tech Lead: [nombre]
- 📚 Documentation: Ver [README.md](README.md)

---

## 🎓 Próxima Lectura

1. [REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md) - Comandos y atajos
2. [INVENTARIO_ARCHIVOS.md](INVENTARIO_ARCHIVOS.md) - Dónde está cada cosa
3. Código actual - Lee el código existente

---

## ✨ Bienvenido al equipo!

Si tienes preguntas, ¡no dudes en preguntar!

**Happy Coding! 🚀**

---

*Última actualización: 22/02/2026*
*Versión: 1.0*

