# CONNEX - Plataforma Omnichannel de Atención al Cliente

## 🚀 Descripción

**CONNEX** es una plataforma moderna y profesional para gestionar la atención al cliente a través de múltiples canales como WhatsApp, Telegram, Facebook e Instagram. Con IA integrada, analytics avanzado y un diseño intuitivo, CONNEX te permite conectar, atender y crecer con tus clientes.

**Tagline:** _Conecta, Atiende, Crece_

---

## ✨ Características Principales

- **Omnichannel**: Gestiona conversaciones desde WhatsApp, Telegram, Facebook, Email y más
- **Dashboard Profesional**: Interfaz moderna basada en Respond.io
- **Bandeja de Entrada Inteligente**: Organiza conversaciones por estado
- **Gestión de Contactos**: Base de datos completa de tus clientes
- **Analytics Avanzado**: Reportes en tiempo real y métricas detalladas
- **IA Integrada**: Respuestas automáticas inteligentes
- **Configuración Flexible**: Personaliza todos los canales y comportamientos
- **Seguridad Enterprise**: Encriptación end-to-end y autenticación segura

---

## 📋 Requisitos Previos

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Git**

---

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/connex.git
cd connex
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuración

### Backend (.env)

Crea un archivo `.env` en la carpeta `backend`:

```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/connex
JWT_SECRET=tu_clave_secreta_aqui
WHATSAPP_API_KEY=tu_api_key
TELEGRAM_BOT_TOKEN=tu_bot_token
```

### Frontend (.env)

Crea un archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_WS_URL=ws://localhost:4000
```

---

## 🚀 Ejecutar la Aplicación

### Opción 1: Ejecutar ambos servidores en terminales separadas

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
El backend estará disponible en: **http://localhost:4000**

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
El frontend estará disponible en: **http://localhost:5173**

---

## 📁 Estructura del Proyecto

```
connex/
├── backend/
│   ├── src/
│   │   ├── index.js                 # Entrada principal
│   │   ├── middleware/
│   │   │   └── errorHandler.js      # Manejo centralizado de errores
│   │   ├── controllers/
│   │   │   └── chatController.js    # Controladores de chat
│   │   ├── routes/
│   │   │   └── chatRoutes.js        # Rutas de API
│   │   ├── services/
│   │   │   └── chatService.js       # Lógica de negocio
│   │   └── utils/
│   │       ├── response.js          # Utilidades de respuesta
│   │       └── AppError.js          # Clase de error personalizada
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── index.jsx                # Entrada React
│   │   ├── App.jsx                  # Componente raíz
│   │   ├── index.css                # Estilos globales
│   │   ├── components/
│   │   │   ├── Landing.jsx          # Página de inicio
│   │   │   ├── Login.jsx            # Página de login
│   │   │   ├── Dashboard.jsx        # Dashboard principal
│   │   │   ├── Header.jsx           # Barra de encabezado
│   │   │   ├── Sidebar.jsx          # Navegación lateral
│   │   │   ├── Inbox.jsx            # Bandeja de entrada
│   │   │   ├── Contacts.jsx         # Gestión de contactos
│   │   │   ├── Settings.jsx         # Configuración
│   │   │   └── Reports.jsx          # Reportes y analytics
│   │   ├── services/
│   │   │   ├── api.js               # Cliente HTTP
│   │   │   └── chatService.js       # Servicios de chat
│   │   └── hooks/
│   │       └── useConversations.js  # Hook personalizado
│   ├── index.html                   # Punto de entrada Vite
│   ├── vite.config.js               # Configuración Vite
│   ├── tailwind.config.js           # Configuración Tailwind
│   ├── postcss.config.js            # Configuración PostCSS
│   └── package.json
│
└── README.md
```

---

## 🎨 Identidad de Marca CONNEX

### Colores
- **Principal**: Azul `#0066FF`
- **Secundario**: Naranja `#FF6600`
- **Fondo**: Gris Oscuro `#111827`
- **Texto**: Blanco `#FFFFFF`

### Tipografía
- **Fuente**: Montserrat Bold (encabezados), Inter (cuerpo)

---

## 🔌 Stack Tecnológico

### Backend
- **Fastify** - Framework web rápido y eficiente
- **Node.js** - Runtime JavaScript
- **MongoDB** - Base de datos NoSQL
- **JWT** - Autenticación segura
- **Nodemon** - Recargar automáticamente durante desarrollo

### Frontend
- **React 18** - Librería de UI
- **Vite** - Bundler rápido
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Librería de iconos
- **Axios** - Cliente HTTP
- **React Router** - Enrutamiento

---

## 📊 Componentes Principales

### Landing Page
- Presentación de la plataforma
- Sección de características
- Planes de precios
- CTA (Call To Action)

### Login/Signup
- Autenticación de usuarios
- Opción de registro
- Recuperación de contraseña
- Integración con OAuth (Google, GitHub)

### Dashboard
- Bandeja de entrada con conversaciones
- Gestión de contactos
- Reportes y analytics
- Configuración de cuenta

---

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 📦 Build para Producción

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Los archivos compilados estarán en ./dist/
```

---

## 🔐 Seguridad

- ✅ Autenticación JWT
- ✅ Encriptación de datos sensibles
- ✅ Validación de entrada en servidor
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Sanitización de datos

---

## 📈 Roadmap

- [ ] Integración WhatsApp Business API
- [ ] Integración Telegram Bot API
- [ ] Integración Facebook Messenger
- [ ] Instagram Direct Messages
- [ ] Chatbot con IA (OpenAI/Claude)
- [ ] Sistema de ticketing avanzado
- [ ] Workflows automáticos
- [ ] CRM integrado
- [ ] Webhooks y API pública
- [ ] Mobile app (React Native)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre un issue primero para discutir los cambios propuestos.

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 📞 Contacto

- **Email**: contacto@connex.app
- **Website**: https://connex.app
- **Twitter**: [@ConnexApp](https://twitter.com/ConnexApp)
- **LinkedIn**: [CONNEX](https://linkedin.com/company/connex)

---

**CONNEX - Conecta, Atiende, Crece** 🚀
