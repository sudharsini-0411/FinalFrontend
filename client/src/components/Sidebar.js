import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, User, Settings, History } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Overview' },
    { path: '/dashboard/history', icon: History, label: 'History' },
    { path: '/dashboard/profile', icon: User, label: 'Profile' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;