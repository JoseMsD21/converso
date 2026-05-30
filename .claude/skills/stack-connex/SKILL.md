---
name: stack-connex

description: Versiones exactas del stack tecnológico de CONNEX. Úsala cuando necesites saber qué versión de una dependencia usar o verificar compatibilidad.
---

## Stack CONNEX

### Backend
- Runtime: Node.js 20+
- Framework: Fastify 4.29.1
- Real-time: Socket.IO 4.8.0
- Base de datos: mssql 9.3.2 (SQL Server)
- Auth: jsonwebtoken 9.0.3 + bcryptjs 2.4.3
- IDs: uuid 9.0.1
- Variables de entorno: dotenv 16.6.1
- CORS: @fastify/cors 11.2.0
- Dev: nodemon 2.0.22

### Frontend
- Framework: React 18.3.1
- Bundler: Vite 4.5.14
- Estilos: Tailwind CSS 3.4.19
- Router: React Router DOM 6.30.3
- HTTP client: Axios 1.13.5
- Iconos: lucide-react 0.575.0
- Real-time: socket.io-client 4.8.3
- Plugin React: @vitejs/plugin-react 4.7.0

### Puertos locales
- Backend: http://localhost:4000
- Frontend: http://localhost:5173
- SQL Server: localhost:1433

### Comandos de inicio
- Backend dev: cd backend && npm run dev
- Frontend dev: cd frontend && npm run dev
- Inicializar DB: cd backend && node src/db/initDb.js
- Test conexión DB: cd backend && node src/db/testConnection.js