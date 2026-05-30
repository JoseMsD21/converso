---
name: estructura-proyecto-connex
description: Árbol completo de archivos del proyecto CONNEX con la responsabilidad de cada uno. Úsala cuando no sepas dónde crear un archivo nuevo o dónde está una funcionalidad específica.
---

## Estructura CONNEX
CONNEX/
├── backend/
│   ├── package.json
│   ├── nodemon.json
│   ├── .env                          ← Variables de entorno (NO commitear)
│   ├── .env.example                  ← Template de variables
│   └── src/
│       ├── index.js                  ← Entry point: Fastify + Socket.IO + rutas
│       ├── controllers/
│       │   ├── authController.js     ← Register, login (users en memoria por ahora)
│       │   └── chatController.js     ← CRUD conversaciones + mensajes + emit Socket
│       ├── routes/
│       │   ├── authRoutes.js         ← POST /register, POST /login
│       │   └── chatRoutes.js         ← GET/POST conversations y messages
│       ├── services/
│       │   ├── chatService.js        ← Lógica: fetchConversations, addMessage, etc.
│       │   └── agentService.js       ← Lógica: getAllAgents, createAgent, etc.
│       ├── middleware/
│       │   ├── auth.js               ← Verifica JWT en headers
│       │   └── errorHandler.js       ← Manejo centralizado de errores Fastify
│       ├── db/
│       │   ├── sqlServer.js          ← Pool de conexión + config + isConfigured flag
│       │   ├── initDb.js             ← Crea tablas con IF NOT EXISTS
│       │   └── testConnection.js     ← Script diagnóstico de conexión
│       └── utils/
│           ├── AppError.js           ← Clase de error con statusCode
│           └── response.js           ← sendSuccess() y sendError()
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html                    ← Entry point HTML
│   ├── .env                          ← VITE_API_URL=http://localhost:4000/api
│   └── src/
│       ├── index.jsx                 ← ReactDOM.createRoot
│       ├── App.jsx                   ← Estado global: showLanding, isAuthenticated
│       ├── index.css                 ← @tailwind base/components/utilities
│       ├── components/
│       │   ├── Landing.jsx           ← Página marketing con CTA
│       │   ├── Login.jsx             ← Formulario auth (register/login)
│       │   ├── Dashboard.jsx         ← Contenedor con Header + vista activa
│       │   ├── Header.jsx            ← Barra superior: título + search + filtros
│       │   ├── Sidebar.jsx           ← Navegación lateral: inbox/contacts/reports/settings
│       │   ├── Inbox.jsx             ← Lista conversaciones + chat en tiempo real
│       │   ├── Contacts.jsx          ← Lista y detalle de contactos
│       │   ├── Reports.jsx           ← Métricas y gráficos
│       │   └── Settings.jsx          ← Configuración general + integraciones
│       ├── services/
│       │   ├── api.js                ← Axios instance + interceptores + token JWT
│       │   ├── chatService.js        ← getConversations, sendMessage, createConversation
│       │   └── socketService.js      ← connect, onMessage, joinConversation
│       └── hooks/
│           └── useConversations.js   ← Estado de conversaciones con loading/error
│
├── .claude/
│   ├── agents/                       ← Agentes especializados
│   └── instructions/                 ← Instrucciones globales y por área
│
├── .gitignore
└── README.md

### Regla de ubicación para archivos nuevos:
- Nueva integración de canal (WhatsApp/Telegram): backend/src/services/ + backend/src/routes/ + backend/src/controllers/
- Nueva vista en el dashboard: frontend/src/components/ + frontend/src/services/ (si necesita API)
- Nueva tabla de DB: backend/src/db/initDb.js (agregar CREATE TABLE)
- Nueva utilidad reutilizable backend: backend/src/utils/
- Nuevo hook de estado frontend: frontend/src/hooks/