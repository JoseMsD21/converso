import React, { useState } from 'react';
import { Plus, Mail, MessageCircle, Phone } from 'lucide-react';

const MOCK_CONTACTS = [
  {
    id: 1,
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+34 612 345 678',
    company: 'Tech Solutions',
    lastInteraction: '2 min',
    conversations: 5,
    avatar: 'MG'
  },
  {
    id: 2,
    name: 'Juan López',
    email: 'juan.lopez@email.com',
    phone: '+34 623 456 789',
    company: 'Marketing Pro',
    lastInteraction: '15 min',
    conversations: 3,
    avatar: 'JL'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+34 634 567 890',
    company: 'Design Studio',
    lastInteraction: '1 hora',
    conversations: 8,
    avatar: 'AM'
  }
];

export default function Contacts({ searchTerm = '' }) {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.includes(searchTerm) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="flex h-full bg-gray-900">
      {/* Contacts List */}
      <div className="w-96 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            <Plus size={18} />
            Nuevo Contacto
          </button>
        </div>

        {filteredContacts.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No se encontraron contactos</p>
            </div>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-gray-800 cursor-pointer transition ${
                selectedContact?.id === contact.id
                  ? 'bg-gray-800'
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.company}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {contact.conversations} conversación{contact.conversations !== 1 ? 'es' : ''}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Detail */}
      {selectedContact && !showForm ? (
        <div className="flex-1 flex flex-col bg-gray-800">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {selectedContact.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{selectedContact.name}</h2>
                <p className="text-gray-400 mb-4">{selectedContact.company}</p>
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition">
                    <Mail size={16} />
                    {selectedContact.email}
                  </a>
                  <a href={`tel:${selectedContact.phone}`} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition">
                    <Phone size={16} />
                    {selectedContact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Información de Contacto</h3>
            <div className="space-y-3 text-gray-300">
              <div>
                <p className="text-sm text-gray-400 mb-1">Correo Electrónico</p>
                <p>{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Teléfono</p>
                <p>{selectedContact.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Empresa</p>
                <p>{selectedContact.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Última Interacción</p>
                <p>{selectedContact.lastInteraction}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Conversaciones</p>
                <p>{selectedContact.conversations}</p>
              </div>
            </div>
          </div>
        </div>
      ) : showForm ? (
        <div className="flex-1 flex items-center justify-center bg-gray-800">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Nuevo Contacto</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nombre completo" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" />
              <input type="email" placeholder="Correo electrónico" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" />
              <input type="tel" placeholder="Teléfono" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" />
              <input type="text" placeholder="Empresa" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500" />
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition">
                  Cancelar
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
                  Crear Contacto
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Selecciona un contacto</p>
            <p className="text-sm">para ver sus detalles</p>
          </div>
        </div>
      )}
    </div>
  );
}
