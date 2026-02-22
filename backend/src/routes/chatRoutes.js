const chatController = require('../controllers/chatController');

module.exports = async function routes(fastify, options) {
  fastify.get('/conversations', chatController.getConversations);
};