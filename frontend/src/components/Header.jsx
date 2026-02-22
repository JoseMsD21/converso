import React from 'react';
import { Search, Settings as SettingsIcon, Bell, User } from 'lucide-react';

export default function Header({ currentView, searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  const getTitleByView = () => {
    const titles = {
      inbox: 'Bandeja de Entrada',
      contacts: 'Contactos',
      settings: 'Configuración',
      reports: 'Reportes'
    };
    return titles[currentView] || 'Bandeja de Entrada';
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{getTitleByView()}</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition">
            <Bell size={20} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition">
            <User size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {(currentView === 'inbox' || currentView === 'contacts') && (
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder={currentView === 'inbox' ? "Buscar conversaciones..." : "Buscar contactos..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {currentView === 'inbox' && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">Todas</option>
              <option value="open">Abiertas</option>
              <option value="resolved">Resueltas</option>
              <option value="waiting">En espera</option>
            </select>
          )}
        </div>
      )}
    </div>
  );
}
