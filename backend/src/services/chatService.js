// Servicio simple en memoria para conversaciones y mensajes
const { v4: uuidv4 } = require('uuid');

const conversations = [
  {
    id: '1',
    name: 'María García',
    participantId: 'u1',
    channel: 'WhatsApp',
    lastMessage: 'Hola, ¿cuál es el precio del producto?',
    timestamp: new Date().toISOString(),
    status: 'open',
    unread: 3,
    messages: [
      { id: uuidv4(), from: 'user', text: 'Hola, ¿cuál es el precio del producto?', timestamp: new Date().toISOString() }
    ]
  },
  {
    id: '2',
    name: 'Juan López',
    participantId: 'u2',
    channel: 'Telegram',
    lastMessage: 'Gracias por la información',
    timestamp: new Date().toISOString(),
    status: 'resolved',
    unread: 0,
    messages: [
      { id: uuidv4(), from: 'user', text: 'Gracias por la información', timestamp: new Date().toISOString() }
    ]
  }
];

exports.fetchConversations = async (opts = {}) => {
  const { search = '', status } = opts;
  let list = conversations;
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(c => c.name.toLowerCase().includes(q) || (c.lastMessage || '').toLowerCase().includes(q));
  }
  if (status) {
    list = list.filter(c => c.status === status);
  }

  return {
    total: list.length,
    conversations: list
  };
};

exports.getConversationById = async (id) => {
  return conversations.find(c => c.id === id) || null;
};

exports.createConversation = async ({ name, participantId, channel }) => {
  const conv = {
    id: uuidv4(),
    name: name || `Usuario ${participantId || 'anon'}`,
    participantId: participantId || uuidv4(),
    channel: channel || 'unknown',
    lastMessage: null,
    timestamp: new Date().toISOString(),
    status: 'open',
    unread: 0,
    messages: []
  };
  conversations.unshift(conv);
  return conv;
};

exports.addMessage = async (conversationId, message) => {
  const conv = conversations.find(c => c.id === conversationId);
  if (!conv) return null;
  const msg = { id: uuidv4(), from: message.from || 'agent', text: message.text, timestamp: new Date().toISOString() };
  conv.messages.push(msg);
  conv.lastMessage = message.text;
  conv.timestamp = new Date().toISOString();
  conv.unread = message.from === 'agent' ? 0 : (conv.unread || 0) + 1;
  return msg;
};

exports._internal = { conversations };