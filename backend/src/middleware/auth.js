const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_dev_key';

module.exports = async function authMiddleware(request, reply) {
  const authHeader = request.headers['authorization'] || request.headers['Authorization'];
  if (!authHeader) {
    reply.code(401).send({ success: false, error: 'Missing Authorization header' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    reply.code(401).send({ success: false, error: 'Invalid Authorization format' });
    return;
  }

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    request.user = payload;
  } catch (err) {
    reply.code(401).send({ success: false, error: 'Invalid or expired token' });
  }
};
