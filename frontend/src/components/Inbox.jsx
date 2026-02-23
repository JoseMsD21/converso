import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { chatService } from '../services/chatService';
import { socketService } from '../services/socketService';

export default function Inbox({ searchTerm = '', filterStatus = 'all' }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize Socket.IO and load conversations
  useEffect(() => {
    socketService.connect();
    loadConversations();

    // Listen for real-time messages
    socketService.onMessage((data) => {
      console.log('New message received:', data);
      updateConversationWithMessage(data);
    });

    return () => {
      // socketService.disconnect(); // Keep connection alive
    };
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const res = await chatService.getConversations();
      const items = res?.data?.items || res?.items || [];
      setConversations(items);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Error cargando conversaciones');
    } finally {
      setLoading(false);
    }
  };

  const updateConversationWithMessage = (messageData) => {
    // messageData: { conversationId, message: { id, senderId, content, createdAt } }
    setConversations((prevConvs) =>
      prevConvs.map((conv) => {
        if (conv.id === messageData.conversationId) {
          return {
            ...conv,
            lastMessage: messageData.message.content,
            messages: [...(conv.messages || []), messageData.message],
          };
        }
        return conv;
      })
    );

    // Update selected conversation if it's the active one
    if (selectedConversation?.id === messageData.conversationId) {
      setSelectedConversation((prev) => ({
        ...prev,
        lastMessage: messageData.message.content,
        messages: [...(prev.messages || []), messageData.message],
      }));
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      const token = localStorage.getItem('connex_token');
      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        return;
      }

      await chatService.sendMessage(selectedConversation.id, {
        senderId: 'current-user',
        content: messageText,
      });

      setMessageText('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error enviando mensaje');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = !searchTerm || 
      (conv.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (conv.lastMessage || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Cargando conversaciones...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-900">
      {/* Conversation List */}
      <div className="w-96 border-r border-gray-700 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Bandeja de entrada vacía</p>
              <p className="text-sm">Aquí aparecerán tus conversaciones</p>
            </div>
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 border-b border-gray-800 cursor-pointer transition ${
                selectedConversation?.id === conv.id
                  ? 'bg-gray-800'
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {(conv.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{conv.name || 'Sin nombre'}</h3>
                  <p className="text-sm text-gray-400 truncate">{conv.lastMessage || 'Sin mensajes'}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{conv.channel || 'web'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Conversation Detail */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-gray-800">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {(selectedConversation.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-white font-semibold">{selectedConversation.name}</h2>
                  <p className="text-sm text-gray-400">{selectedConversation.channel || 'web'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages && selectedConversation.messages.length > 0 ? (
              selectedConversation.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-lg px-4 py-2 max-w-xs ${
                    msg.senderId === 'current-user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No hay mensajes</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-700">
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
            <div className="flex gap-2">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg px-4 py-2 transition flex items-center gap-2"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Selecciona una conversación</p>
          </div>
        </div>
      )}
    </div>
  );
}