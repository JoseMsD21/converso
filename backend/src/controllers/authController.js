const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendSuccess, sendError } = require('../utils/response');

// Simple in-memory users store (replace with SQL Server implementation when configured)
const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_dev_key';
const TOKEN_EXPIRES = '7d';

exports.register = async (request, reply) => {
  try {
    const { email, password, name } = request.body || {};
    if (!email || !password) return sendError(reply, 'email y password requeridos', 400);
    const exists = users.find(u => u.email === email);
    if (exists) return sendError(reply, 'Usuario ya existe', 409);
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, email, name: name || email, password: hashed };
    users.push(user);
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
    sendSuccess(reply, { user: { id: user.id, email: user.email, name: user.name }, token }, 201);
  } catch (err) {
    sendError(reply, 'Error al registrar', 500);
  }
};

exports.login = async (request, reply) => {
  try {
    const { email, password } = request.body || {};
    if (!email || !password) return sendError(reply, 'email y password requeridos', 400);
    const user = users.find(u => u.email === email);
    if (!user) return sendError(reply, 'Usuario no encontrado', 404);
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return sendError(reply, 'Credenciales inválidas', 401);
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
    sendSuccess(reply, { user: { id: user.id, email: user.email, name: user.name }, token }, 200);
  } catch (err) {
    sendError(reply, 'Error al autenticar', 500);
  }
};
