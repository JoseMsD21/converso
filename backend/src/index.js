require('dotenv').config();
const fastify = require('fastify')({ logger: true });

// Rutas
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
fastify.register(authRoutes, { prefix: '/api/auth' });
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
    
    // Setup Socket.IO after server is listening
    try {
      const { Server } = require('socket.io');
      const io = new Server(fastify.server, { 
        cors: { 
          origin: process.env.VITE_API_URL || 'http://localhost:5173',
          methods: ['GET', 'POST'],
        },
        reconnection: true,
      });
      
      // Decorate fastify instance with io
      fastify.decorate('io', io);
      
      io.on('connection', (socket) => {
        console.log('✓ Socket connected:', socket.id);
        
        // Listen for join conversation event
        socket.on('joinConversation', (data) => {
          const room = `conversation:${data.conversationId}`;
          socket.join(room);
          console.log(`  → Socket ${socket.id} joined ${room}`);
        });
        
        // Listen for leave conversation event
        socket.on('leaveConversation', (data) => {
          const room = `conversation:${data.conversationId}`;
          socket.leave(room);
          console.log(`  → Socket ${socket.id} left ${room}`);
        });
        
        // Listen for send message event
        socket.on('sendMessage', (data) => {
          const room = `conversation:${data.conversationId}`;
          io.to(room).emit('message', data);
          console.log(`  → Message broadcast to ${room}`);
        });
        
        socket.on('disconnect', () => {
          console.log('✗ Socket disconnected:', socket.id);
        });
      });
      
      console.log('✓ Socket.IO initialized');
    } catch (err) {
      console.warn('Socket.IO initialization warning:', err.message);
    }
    
    console.log(`✓ Backend listening on port ${port} (${process.env.NODE_ENV || 'development'})`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();