import React, { useState } from 'react';
import { MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: 'María García',
    phone: '+34 612 345 678',
    channel: 'WhatsApp',
    lastMessage: 'Hola, ¿cuál es el precio del producto?',
    timestamp: '2 min',
    status: 'open',
    unread: 3,
    avatar: 'MG'
  },
  {
    id: 2,
    name: 'Juan López',
    phone: '+34 623 456 789',
    channel: 'Telegram',
    lastMessage: 'Gracias por la información',
    timestamp: '15 min',
    status: 'waiting',
    unread: 0,
    avatar: 'JL'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    phone: '+34 634 567 890',
    channel: 'WhatsApp',
    lastMessage: 'Necesito ayuda con mi pedido',
    timestamp: '1 hora',
    status: 'open',
    unread: 1,
    avatar: 'AM'
  },
  {
    id: 4,
    name: 'Carlos Rodríguez',
    phone: '+34 645 678 901',
    channel: 'Facebook',
    lastMessage: 'Problema resuelto, gracias',
    timestamp: '3 horas',
    status: 'resolved',
    unread: 0,
    avatar: 'CR'
  },
  {
    id: 5,
    name: 'Laura Fernández',
    phone: '+34 656 789 012',
    channel: 'WhatsApp',
    lastMessage: 'Detalles de envío',
    timestamp: 'Ayer',
    status: 'resolved',
    unread: 0,
    avatar: 'LF'
  }
];

export default function Inbox({ searchTerm = '', filterStatus = 'all' }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.phone.includes(searchTerm) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'open':
        return <AlertCircle size={16} className="text-orange-400" />;
      case 'waiting':
        return <Clock size={16} className="text-yellow-400" />;
      case 'resolved':
        return <CheckCircle2 size={16} className="text-green-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      open: 'Abierta',
      waiting: 'En espera',
      resolved: 'Resuelta'
    };
    return labels[status] || status;
  };

  if (filteredConversations.length === 0 && searchTerm) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No se encontraron conversaciones</p>
          <p className="text-sm">Intenta con otro término de búsqueda</p>
        </div>
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
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{conv.name}</h3>
                    {getStatusIcon(conv.status)}
                  </div>
                  <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{conv.channel}</span>
                    {conv.unread > 0 && (
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</div>
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
                  {selectedConversation.avatar}
                </div>
                <div>
                  <h2 className="text-white font-semibold">{selectedConversation.name}</h2>
                  <p className="text-sm text-gray-400">{selectedConversation.phone} • {selectedConversation.channel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 flex items-center gap-1">
                  {getStatusIcon(selectedConversation.status)}
                  {getStatusLabel(selectedConversation.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg px-4 py-2 max-w-xs">
                <p className="text-white text-sm">{selectedConversation.lastMessage}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-600 rounded-lg px-4 py-2 max-w-xs">
                <p className="text-white text-sm">Te ayudaremos con eso inmediatamente</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu respuesta..."
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Selecciona una conversación</p>
            <p className="text-sm">para ver los detalles y responder</p>
          </div>
        </div>
      )}
    </div>
  );
}