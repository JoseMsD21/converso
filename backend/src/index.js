require('dotenv').config();
const fastify = require('fastify')({ logger: true });

// Rutas
const chatRoutes = require('./routes/chatRoutes');
fastify.register(chatRoutes, { prefix: '/api/chat' });

// Ruta health check
fastify.get('/api/health', async (request, reply) => {
  return { 
    status: 'OK', 
    service: 'CONNEX Backend',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };
});

// Manejo centralizado de errores (registro después de las rutas)
const errorHandler = require('./middleware/errorHandler');
fastify.setErrorHandler(errorHandler);

const start = async () => {
  try {
    const port = process.env.PORT || 4000;
    const host = process.env.HOST || '127.0.0.1';
    await fastify.listen({ port, host });
    console.log(`✓ Backend listening on port ${port} (${process.env.NODE_ENV || 'development'})`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();