import apiClient from './api';

export const chatService = {
  getConversations: async () => {
    const response = await apiClient.get('/chat/conversations');
    return response.data;
  },

  // Placeholder para futuras funcionalidades
  sendMessage: async (conversationId, message) => {
    const response = await apiClient.post(`/chat/${conversationId}/messages`, {
      message,
    });
    return response.data;
  },

  createConversation: async (participantId) => {
    const response = await apiClient.post('/chat/conversations', {
      participantId,
    });
    return response.data;
  },
};

export default chatService;
