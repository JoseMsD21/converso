---
name: esquema-db-connex
description: Esquema completo de la base de datos de CONNEX. Úsala cuando necesites crear queries, agregar tablas, o entender las relaciones entre entidades.
---

## Base de datos: connex_dev (SQL Server)

### Tabla: users
```sql
CREATE TABLE users (
  id           NVARCHAR(50)  PRIMARY KEY,
  username     NVARCHAR(100) NOT NULL UNIQUE,
  passwordHash NVARCHAR(200) NOT NULL,
  createdAt    DATETIME2     DEFAULT SYSUTCDATETIME()
)
```

### Tabla: agents (miembros del equipo de soporte)
```sql
CREATE TABLE agents (
  id        NVARCHAR(50)  PRIMARY KEY,
  name      NVARCHAR(100) NOT NULL,
  email     NVARCHAR(100) NULL,
  status    NVARCHAR(20)  DEFAULT 'available',
  createdAt DATETIME2     DEFAULT SYSUTCDATETIME()
)
-- status valores: 'available', 'busy', 'offline'
```

### Tabla: conversations
```sql
CREATE TABLE conversations (
  id            NVARCHAR(50)   PRIMARY KEY,
  name          NVARCHAR(200)  NULL,
  participantId NVARCHAR(100)  NULL,
  channel       NVARCHAR(50)   NULL,
  lastMessage   NVARCHAR(MAX)  NULL,
  assignedTo    NVARCHAR(50)   NULL,
  status        NVARCHAR(20)   DEFAULT 'open',
  createdAt     DATETIME2      DEFAULT SYSUTCDATETIME(),
  FOREIGN KEY (assignedTo) REFERENCES agents(id)
)
-- channel valores: 'web', 'whatsapp', 'telegram', 'facebook', 'email'
-- status valores: 'open', 'resolved', 'waiting'
```

### Tabla: messages
```sql
CREATE TABLE messages (
  id             NVARCHAR(50)  PRIMARY KEY,
  conversationId NVARCHAR(50)  NOT NULL,
  senderId       NVARCHAR(100) NULL,
  content        NVARCHAR(MAX) NULL,
  createdAt      DATETIME2     DEFAULT SYSUTCDATETIME(),
  FOREIGN KEY (conversationId) REFERENCES conversations(id)
)
```

### Tablas pendientes (próximas fases)
- contacts: clientes con nombre, email, teléfono, empresa, tags
- channels: configuración de canales por empresa (tokens WhatsApp, Telegram)
- workflows: flujos de automatización
- knowledge_base: documentos para RAG
- tenants: empresas en el sistema multi-tenant