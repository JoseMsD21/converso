import apiClient from './api';

export const chatService = {
  getConversations: async () => {
    const response = await apiClient.get('/chat/conversations');
    return response;
  },

  getConversationById: async (id) => {
    const response = await apiClient.get(`/chat/conversations/${id}`);
    return response;
  },

  // Placeholder para futuras funcionalidades
  sendMessage: async (conversationId, message) => {
    const response = await apiClient.post(`/chat/conversations/${conversationId}/messages`, message);
    return response;
  },

  createConversation: async (payload) => {
    const response = await apiClient.post('/chat/conversations', payload);
    return response;
  },
};

export default chatService;
