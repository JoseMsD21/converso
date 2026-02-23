import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const SOCKET_URL = API_URL.replace('/api', ''); // Get base URL (http://localhost:4000)

let socket = null;

export const socketService = {
  // Initialize socket connection
  connect: () => {
    if (socket && socket.connected) {
      console.log('Socket already connected');
      return socket;
    }

    console.log('Connecting to Socket.IO at', SOCKET_URL);
    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('✓ Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('✗ Socket disconnected');
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });

    return socket;
  },

  // Disconnect socket
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // Listen for new messages (real-time)
  onMessage: (callback) => {
    if (!socket) socketService.connect();
    socket.on('message', callback);
  },

  // Listen for message updates
  onMessageUpdate: (callback) => {
    if (!socket) socketService.connect();
    socket.on('messageUpdate', callback);
  },

  // Listen for conversation updates
  onConversationUpdate: (callback) => {
    if (!socket) socketService.connect();
    socket.on('conversationUpdate', callback);
  },

  // Emit message (sent from frontend, received by backend)
  sendMessageEvent: (conversationId, message) => {
    if (!socket) socketService.connect();
    socket.emit('sendMessage', { conversationId, message });
  },

  // Join a conversation room (for targeted messages)
  joinConversation: (conversationId) => {
    if (!socket) socketService.connect();
    socket.emit('joinConversation', { conversationId });
  },

  // Leave a conversation room
  leaveConversation: (conversationId) => {
    if (!socket) socketService.connect();
    socket.emit('leaveConversation', { conversationId });
  },

  // Get current socket instance
  getSocket: () => socket,
};
