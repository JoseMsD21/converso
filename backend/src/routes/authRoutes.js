const authController = require('../controllers/authController');

module.exports = async function authRoutes(fastify, options) {
  fastify.post('/register', authController.register);
  fastify.post('/login', authController.login);
};
