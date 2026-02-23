const chatService = require('../services/chatService');
const agentService = require('../services/agentService');
const { sendSuccess, sendError } = require('../utils/response');
const AppError = require('../utils/AppError');

exports.getConversations = async (request, reply) => {
  try {
    const { search, status } = request.query || {};
    const conversations = await chatService.fetchConversations({ search, status });
    sendSuccess(reply, conversations, 200);
  } catch (error) {
    sendError(reply, 'Error al obtener conversaciones', 500);
  }
};

exports.getConversationById = async (request, reply) => {
  try {
    const { id } = request.params;
    const conv = await chatService.getConversationById(id);
    if (!conv) return sendError(reply, 'Conversación no encontrada', 404);
    sendSuccess(reply, conv, 200);
  } catch (error) {
    sendError(reply, 'Error al obtener conversación', 500);
  }
};

exports.createConversation = async (request, reply) => {
  try {
    const { name, participantId, channel } = request.body || {};
    const conv = await chatService.createConversation({ name, participantId, channel });
    sendSuccess(reply, conv, 201);
  } catch (error) {
    sendError(reply, 'Error al crear conversación', 500);
  }
};

exports.postMessage = async (request, reply) => {
  try {
    const { id } = request.params;
    const { content, senderId } = request.body || {};
    if (!content) return sendError(reply, 'Mensaje vacío', 400);
    
    const msg = await chatService.addMessage(id, { content, senderId });
    if (!msg) return sendError(reply, 'Conversación no encontrada', 404);
    
    // Emit Socket.IO event if server is available
    try {
      if (request.server && request.server.io) {
        const io = request.server.io;
        const room = `conversation:${id}`;
        io.to(room).emit('message', { 
          conversationId: id, 
          message: msg 
        });
        console.log(`Message emitted to room ${room}`);
      }
    } catch (e) {
      console.warn('Socket emit warning:', e.message);
    }
    
    sendSuccess(reply, msg, 201);
  } catch (error) {
    console.error('postMessage error:', error);
    sendError(reply, 'Error al enviar mensaje', 500);
  }
};