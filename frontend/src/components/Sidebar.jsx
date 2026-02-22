import React from 'react';
import { MessageCircle, Users, Settings, BarChart3, LogOut, Plus } from 'lucide-react';

export default function Sidebar({ setCurrentView, currentView }) {
  const menuItems = [
    { id: 'inbox', label: 'Bandeja de Entrada', icon: MessageCircle },
    { id: 'contacts', label: 'Contactos', icon: Users },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg flex flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 font-bold text-2xl border-b border-gray-700 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <MessageCircle size={24} className="text-white" />
        </div>
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">CONNEX</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}

        {/* Sections */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <h3 className="uppercase text-xs tracking-wider text-gray-500 mb-3 px-4 font-semibold">
            Canales
          </h3>
          <div className="space-y-2 px-2">
            {['WhatsApp', 'Telegram', 'Facebook', 'Email'].map((channel) => (
              <button
                key={channel}
                className="w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition text-sm"
              >
                {channel}
              </button>
            ))}
          </div>
          <button className="w-full flex items-center gap-2 px-4 py-2 mt-2 text-blue-400 hover:text-blue-300 transition text-sm">
            <Plus size={16} />
            Añadir Canal
          </button>
        </div>

        {/* Custom Inboxes */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="uppercase text-xs tracking-wider text-gray-500 mb-3 px-4 font-semibold">
            Estados
          </h3>
          <div className="space-y-2 px-2 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span className="text-gray-300">Nuevos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-300">En progreso</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-300">Resueltos</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        <div className="p-3 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300 font-semibold mb-1">Mi Empresa</p>
          <p className="text-xs text-gray-400">Plan Profesional</p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg text-gray-300 transition text-sm">
          <LogOut size={16} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}