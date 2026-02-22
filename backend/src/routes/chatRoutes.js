const chatController = require('../controllers/chatController');

module.exports = async function routes(fastify, options) {
  fastify.get('/conversations', chatController.getConversations);
  fastify.get('/conversations/:id', chatController.getConversationById);
  fastify.post('/conversations', { schema: { body: { type: 'object' } } }, chatController.createConversation);
  fastify.post('/conversations/:id/messages', { schema: { body: { type: 'object' } } }, chatController.postMessage);
};