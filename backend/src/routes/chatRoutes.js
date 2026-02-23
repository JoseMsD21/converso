const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

module.exports = async function routes(fastify, options) {
  fastify.get('/conversations', chatController.getConversations);
  fastify.get('/conversations/:id', chatController.getConversationById);
  // Protected: require valid JWT
  fastify.post('/conversations', { preHandler: auth, schema: { body: { type: 'object' } } }, chatController.createConversation);
  fastify.post('/conversations/:id/messages', { preHandler: auth, schema: { body: { type: 'object' } } }, chatController.postMessage);
};