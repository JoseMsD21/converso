// Utilidades para respuestas estandarizadas
const sendSuccess = (reply, data = {}, statusCode = 200) => {
  reply.status(statusCode).send({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  });
};

const sendError = (reply, message, statusCode = 500) => {
  reply.status(statusCode).send({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = { sendSuccess, sendError };
