// Middleware para manejo centralizado de errores
const errorHandler = async (error, request, reply) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Error interno del servidor';

  console.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message,
    path: request.url,
  });

  reply.status(statusCode).send({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
