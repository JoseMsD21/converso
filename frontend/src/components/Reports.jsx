import React, { useState } from 'react';
import { BarChart3, TrendingUp, MessageCircle, Clock } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('week');

  const metrics = [
    { label: 'Conversaciones Totales', value: '1,234', change: '+12%', icon: MessageCircle, color: 'text-blue-400' },
    { label: 'Tiempo Promedio de Respuesta', value: '2.3 min', change: '-5%', icon: Clock, color: 'text-green-400' },
    { label: 'Tasa de Resolución', value: '94.2%', change: '+3%', icon: TrendingUp, color: 'text-purple-400' },
    { label: 'Satisfacción del Cliente', value: '4.8/5', change: '+0.2', icon: BarChart3, color: 'text-orange-400' }
  ];

  const conversationsByChannel = [
    { channel: 'WhatsApp', count: 582, percentage: 47 },
    { channel: 'Telegram', count: 364, percentage: 30 },
    { channel: 'Facebook', count: 196, percentage: 16 },
    { channel: 'Email', count: 92, percentage: 7 }
  ];

  const topContacts = [
    { name: 'María García', conversations: 24, status: 'top-customer' },
    { name: 'Juan López', conversations: 18, status: 'engaged' },
    { name: 'Ana Martínez', conversations: 15, status: 'engaged' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reportes y Analytics</h1>
          <p className="text-gray-400 mt-1">Análisis de tu actividad</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          <option value="day">Hoy</option>
          <option value="week">Esta Semana</option>
          <option value="month">Este Mes</option>
          <option value="year">Este Año</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </div>
                <Icon size={24} className={metric.color} />
              </div>
              <p className="text-sm text-green-400">↑ {metric.change}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversations by Channel */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-400" />
            Conversaciones por Canal
          </h2>

          <div className="space-y-4">
            {conversationsByChannel.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{item.channel}</span>
                  <span className="text-white font-semibold">{item.count}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full transition"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contacts */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-400" />
            Contactos Top
          </h2>

          <div className="space-y-3">
            {topContacts.map((contact, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                <div>
                  <p className="text-white font-semibold">{contact.name}</p>
                  <p className="text-sm text-gray-400">{contact.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{contact.conversations}</p>
                  <p className="text-xs text-gray-400">conversaciones</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Actividad en los Últimos 7 Días</h2>

        <div className="flex items-end justify-between h-64 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
            const height = Math.random() * 100 + 20;
            return (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-400 hover:to-blue-300 transition cursor-pointer"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-400">{day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
          Exportar Reporte
        </button>
      </div>
    </div>
  );
}
