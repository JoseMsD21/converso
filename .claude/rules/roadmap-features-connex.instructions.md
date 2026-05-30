---
description: Features pendientes y contexto del roadmap de CONNEX para que los agentes sepan qué viene
---

CONNEX es una plataforma omnichannel de atención al cliente que va de proyecto personal a producto empresarial. Este contexto ayuda a los agentes a tomar decisiones de arquitectura que escalen.

BUGS CRÍTICOS ACTIVOS que deben corregirse antes de cualquier feature nueva:
1. App.jsx: showLanding=true permanente. Ningún botón de Landing.jsx llama setShowLanding(false).
2. Login.jsx: no llama a POST /api/auth/login ni guarda el token JWT en localStorage.
3. Inbox.jsx: sendMessage falla silenciosamente si no hay token en localStorage.
4. useConversations.js: importa el default export de chatService que no tiene el método getConversations.

FASE 1 - ESTABILIZACIÓN (inmediata):
- Corregir los 4 bugs críticos anteriores
- Conectar Login con el endpoint real de autenticación
- Verificar flujo completo: registro → login → ver conversaciones → enviar mensaje

FASE 2 - CANALES (próxima):
- Integración WhatsApp Business Cloud API (Meta)
- Integración Telegram Bot API
- Sistema de webhooks para recibir mensajes entrantes
- Cola de mensajes para manejar alto volumen

FASE 3 - IA Y AUTOMATIZACIÓN:
- Integración OpenAI o Claude API para respuestas automáticas
- Sistema RAG con base de conocimiento por empresa
- Workflows visuales de automatización
- Detección de intención y sentimiento

FASE 4 - CRM AVANZADO:
- Módulo de contactos con campos personalizados
- Historial completo del cliente unificado por canal
- Etiquetas y segmentación
- Módulo legal de PQR (derechos de petición automatizados para Colombia)

FASE 5 - EMPRESARIAL:
- Multi-tenant: cada empresa tiene su espacio aislado
- Roles y permisos granulares por empresa
- Analytics avanzado con exportación
- API pública para integraciones de terceros
- SLA y métricas de tiempo de respuesta
- Facturación y planes por suscripción

DECISIONES DE ARQUITECTURA YA TOMADAS:
- Backend: Fastify (no Express) por rendimiento
- Base de datos: SQL Server con fallback en memoria para desarrollo
- Real-time: Socket.IO (no WebSockets puros) por compatibilidad
- Auth: JWT stateless (no sesiones) para escalar horizontalmente
- Frontend: React + Vite (no Next.js) por simplicidad inicial

Cuando propongas una solución técnica, considera siempre si escala a multi-tenant y si es compatible con la arquitectura existente.