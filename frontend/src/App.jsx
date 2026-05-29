import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Login from './components/Login';

export default function App() {
  const [currentView, setCurrentView] = useState('inbox');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('connex_token'));
  const [showLanding, setShowLanding] = useState(() => !localStorage.getItem('connex_token'));

  if (showLanding) {
    return <Landing setShowLanding={setShowLanding} />;
  }

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar setCurrentView={setCurrentView} currentView={currentView} onLogout={() => setIsAuthenticated(false)} />
      <main className="flex-grow overflow-hidden">
        <Dashboard currentView={currentView} />
      </main>
    </div>
  );
}