import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, User, Lock, Bell, Zap } from 'lucide-react';

export default function Settings() {
  const [formData, setFormData] = useState({
    companyName: 'Mi Empresa',
    email: 'info@miempresa.com',
    timezone: 'Europe/Madrid',
    notifications: true,
    autoResponder: true,
    language: 'es'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="space-y-2 sticky top-20">
            <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
              <User size={18} />
              General
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg text-gray-300 font-semibold transition">
              <Lock size={18} />
              Seguridad
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg text-gray-300 font-semibold transition">
              <Bell size={18} />
              Notificaciones
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg text-gray-300 font-semibold transition">
              <Zap size={18} />
              Integraciones
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* General Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User size={24} className="text-blue-500" />
              Configuración General
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Nombre de la Empresa</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Correo de Contacto</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Zona Horaria</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Europe/Madrid">Europe/Madrid</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="America/Mexico_City">America/Mexico_City</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Idioma</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell size={24} className="text-blue-500" />
              Notificaciones
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-semibold">Notificaciones por Email</p>
                  <p className="text-sm text-gray-400">Recibe alertas de nuevos mensajes</p>
                </div>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  className="w-6 h-6 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-semibold">Respuestas Automáticas</p>
                  <p className="text-sm text-gray-400">Activa las respuestas automáticas</p>
                </div>
                <input
                  type="checkbox"
                  name="autoResponder"
                  checked={formData.autoResponder}
                  onChange={handleChange}
                  className="w-6 h-6 rounded"
                />
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap size={24} className="text-blue-500" />
              Integraciones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['WhatsApp', 'Telegram', 'Facebook', 'Instagram'].map((platform) => (
                <div key={platform} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition cursor-pointer">
                  <p className="text-white font-semibold mb-2">{platform}</p>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    Conectar →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 hover:bg-gray-700 rounded-lg text-gray-300 font-semibold transition">
              Cancelar
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
