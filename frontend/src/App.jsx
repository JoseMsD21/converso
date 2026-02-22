import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Login from './components/Login';

export default function App() {
  const [currentView, setCurrentView] = useState('inbox');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  if (showLanding) {
    return <Landing />;
  }

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar setCurrentView={setCurrentView} currentView={currentView} />
      <main className="flex-grow overflow-hidden">
        <Dashboard currentView={currentView} />
      </main>
    </div>
  );
}