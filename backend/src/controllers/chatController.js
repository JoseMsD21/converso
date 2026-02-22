const chatService = require('../services/chatService');
const { sendSuccess, sendError } = require('../utils/response');
const AppError = require('../utils/AppError');

exports.getConversations = async (request, reply) => {
  try {
    const conversations = await chatService.fetchConversations();
    sendSuccess(reply, conversations, 200);
  } catch (error) {
    sendError(reply, 'Error al obtener conversaciones', 500);
  }
};