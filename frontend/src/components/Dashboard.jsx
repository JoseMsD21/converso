import React, { useState } from 'react';
import Inbox from './Inbox';
import Contacts from './Contacts';
import Settings from './Settings';
import Reports from './Reports';
import Header from './Header';

export default function Dashboard({ currentView = 'inbox' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const renderView = () => {
    switch (currentView) {
      case 'inbox':
        return <Inbox searchTerm={searchTerm} filterStatus={filterStatus} />;
      case 'contacts':
        return <Contacts searchTerm={searchTerm} />;
      case 'settings':
        return <Settings />;
      case 'reports':
        return <Reports />;
      default:
        return <Inbox searchTerm={searchTerm} filterStatus={filterStatus} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header 
        currentView={currentView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <div className="flex-1 overflow-auto">
        {renderView()}
      </div>
    </div>
  );
}
