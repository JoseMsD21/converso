import React from 'react';
import { ArrowRight, MessageCircle, Users, BarChart3, Zap, Globe, Lock } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">CONNEX</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition">Características</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Precios</a>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Plataforma Omnichannel para Atención al Cliente
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Conecta con tus clientes en WhatsApp, Telegram, Facebook y más. Gestiona todas tus conversaciones desde una única plataforma impulsada por IA.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition flex items-center gap-2">
              Comenzar Gratis
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-3 border border-gray-700 hover:border-gray-600 rounded-lg text-white font-semibold text-lg transition">
              Ver Demo
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-16 p-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center text-gray-600">
              <MessageCircle size={64} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-800/50 border-y border-gray-700">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-400">50+</p>
            <p className="text-gray-400 mt-2">Empresas Confían</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">100K+</p>
            <p className="text-gray-400 mt-2">Conversaciones Mensuales</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-400">99.9%</p>
            <p className="text-gray-400 mt-2">Disponibilidad</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">Características Principales</h2>
          <p className="text-gray-400 text-center mb-16">Todo lo que necesitas para gestionar tus clientes</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Omnichannel', desc: 'WhatsApp, Telegram, Facebook, Email y más' },
              { icon: Users, title: 'Gestión de Contactos', desc: 'Base de datos completa de tus clientes' },
              { icon: BarChart3, title: 'Analytics Avanzado', desc: 'Reportes y métricas en tiempo real' },
              { icon: Zap, title: 'IA Integrada', desc: 'Respuestas automáticas inteligentes' },
              { icon: Lock, title: 'Seguridad Enterprise', desc: 'Encriptación end-to-end' },
              { icon: MessageCircle, title: 'Chat Bot IA', desc: 'Atención automática 24/7' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-blue-500 transition">
                  <Icon size={32} className="text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-800/50 border-y border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Planes Simples y Transparentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Startup', price: '$29', features: ['Hasta 1,000 conversaciones', 'Un canal', 'Soporte por email'] },
              { name: 'Profesional', price: '$99', features: ['Hasta 10,000 conversaciones', '5 canales', 'IA integrada', 'Soporte prioritario'], highlighted: true },
              { name: 'Enterprise', price: 'Custom', features: ['Conversaciones ilimitadas', 'Todos los canales', 'IA avanzada', 'Integración personalizada', 'Soporte 24/7'] }
            ].map((plan, idx) => (
              <div key={idx} className={`p-8 rounded-lg border transition ${
                plan.highlighted
                  ? 'bg-blue-600/10 border-blue-500 ring-2 ring-blue-500/20'
                  : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
              }`}>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.price}/mes</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}>
                  Comenzar Ahora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para transformar tu atención al cliente?</h2>
          <p className="text-gray-400 text-lg mb-8">Únete a los equipos que ya confían en CONNEX</p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition">
            Obtén 14 Días Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-900 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-4">Producto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Características</a></li>
              <li><a href="#" className="hover:text-white transition">Precios</a></li>
              <li><a href="#" className="hover:text-white transition">Seguridad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Acerca de</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Términos</a></li>
              <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Conecta</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm border-t border-gray-700 pt-8">
          <p>&copy; 2024 CONNEX. Todos los derechos reservados. Conecta, Atiende, Crece.</p>
        </div>
      </footer>
    </div>
  );
}
