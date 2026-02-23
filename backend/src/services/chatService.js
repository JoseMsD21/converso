const { v4: uuidv4 } = require('uuid');
const db = require('../db/sqlServer');

// in-memory fallback (kept for development when MSSQL not configured)
let conversations = [
  {
    id: 'conv-1',
    name: 'Demo Conversation',
    participantId: 'demo1',
    channel: 'web',
    lastMessage: 'Hola desde CONNEX',
    messages: [
      { id: 'm-1', senderId: 'demo1', content: 'Hola, ¿en qué puedo ayudar?', createdAt: new Date().toISOString() },
    ],
  },
];

module.exports = {
  // Fetch conversations (SQL when configured, else in-memory)
  fetchConversations: async ({ search, status } = {}) => {
    if (db.isConfigured) {
      try {
        const pool = await db.connect();
        const res = await pool.request().query('SELECT * FROM dbo.conversations ORDER BY createdAt DESC');
        return { total: res.recordset.length, items: res.recordset };
      } catch (err) {
        console.warn('DB fetchConversations failed, falling back to memory:', err.message || err);
      }
    }
    return { total: conversations.length, items: conversations };
  },

  getConversationById: async (id) => {
    if (db.isConfigured) {
      try {
        const pool = await db.connect();
        const res = await pool.request().input('id', db.mssql.NVarChar(50), id).query('SELECT * FROM dbo.conversations WHERE id = @id');
        if (res.recordset.length === 0) return null;
        const conv = res.recordset[0];
        const msgs = await pool.request().input('convId', db.mssql.NVarChar(50), id).query('SELECT * FROM dbo.messages WHERE conversationId = @convId ORDER BY createdAt ASC');
        conv.messages = msgs.recordset || [];
        return conv;
      } catch (err) {
        console.warn('DB getConversationById failed, falling back to memory:', err.message || err);
      }
    }
    return conversations.find(c => c.id === id) || null;
  },

  createConversation: async (payload) => {
    const newConv = {
      id: 'conv-' + uuidv4(),
      name: payload.name || null,
      participantId: payload.participantId || payload.participant || null,
      channel: payload.channel || 'web',
      lastMessage: payload.lastMessage || null,
      createdAt: new Date().toISOString(),
      messages: [],
    };

    if (db.isConfigured) {
      try {
        const pool = await db.connect();
        await pool.request()
          .input('id', db.mssql.NVarChar(50), newConv.id)
          .input('name', db.mssql.NVarChar(200), newConv.name)
          .input('participantId', db.mssql.NVarChar(100), newConv.participantId)
          .input('channel', db.mssql.NVarChar(50), newConv.channel)
          .input('lastMessage', db.mssql.NVarChar(db.mssql.MAX), newConv.lastMessage)
          .query('INSERT INTO dbo.conversations (id, name, participantId, channel, lastMessage, createdAt) VALUES (@id, @name, @participantId, @channel, @lastMessage, SYSUTCDATETIME())');
        return newConv;
      } catch (err) {
        console.warn('DB createConversation failed, falling back to memory:', err.message || err);
      }
    }

    conversations.unshift(newConv);
    return newConv;
  },

  addMessage: async (conversationId, message) => {
    const newMsg = {
      id: 'm-' + uuidv4(),
      conversationId,
      senderId: message.senderId || 'system',
      content: message.content || '',
      createdAt: new Date().toISOString(),
    };

    if (db.isConfigured) {
      try {
        const pool = await db.connect();
        await pool.request()
          .input('id', db.mssql.NVarChar(50), newMsg.id)
          .input('conversationId', db.mssql.NVarChar(50), newMsg.conversationId)
          .input('senderId', db.mssql.NVarChar(100), newMsg.senderId)
          .input('content', db.mssql.NVarChar(db.mssql.MAX), newMsg.content)
          .query('INSERT INTO dbo.messages (id, conversationId, senderId, content, createdAt) VALUES (@id, @conversationId, @senderId, @content, SYSUTCDATETIME())');

        // update lastMessage on conversation
        await pool.request()
          .input('conversationId', db.mssql.NVarChar(50), conversationId)
          .input('lastMessage', db.mssql.NVarChar(db.mssql.MAX), newMsg.content)
          .query('UPDATE dbo.conversations SET lastMessage = @lastMessage WHERE id = @conversationId');

        return newMsg;
      } catch (err) {
        console.warn('DB addMessage failed, falling back to memory:', err.message || err);
      }
    }

    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.messages.push(newMsg);
      conv.lastMessage = newMsg.content;
    }
    return newMsg;
  },

  assignConversation: async (conversationId, agentId) => {
    if (db.isConfigured) {
      try {
        const pool = await db.connect();
        await pool.request()
          .input('conversationId', db.mssql.NVarChar(50), conversationId)
          .input('agentId', db.mssql.NVarChar(50), agentId)
          .query('UPDATE dbo.conversations SET assignedTo = @agentId WHERE id = @conversationId');
        return { success: true };
      } catch (err) {
        console.error('Error assigning conversation:', err);
        return { success: false, error: err.message };
      }
    }

    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.assignedTo = agentId;
      return { success: true };
    }
    return { success: false, error: 'Conversation not found' };
  },

  updateConversationStatus: async (conversationId, status) => {
    if (db.isConfigured) {
      try {
        const pool = await db.connect();
        await pool.request()
          .input('conversationId', db.mssql.NVarChar(50), conversationId)
          .input('status', db.mssql.NVarChar(20), status)
          .query('UPDATE dbo.conversations SET status = @status WHERE id = @conversationId');
        return { success: true };
      } catch (err) {
        console.error('Error updating conversation status:', err);
        return { success: false, error: err.message };
      }
    }

    const conv = conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.status = status;
      return { success: true };
    }
    return { success: false, error: 'Conversation not found' };
  },
};
