import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Moon, Sun, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          RechargeApp
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plans">Plans</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <button onClick={toggleDarkMode} className="theme-toggle">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <span className="user-name">{user.name}</span>
              <Link to="/profile" className="profile-link">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link">Admin</Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={toggleDarkMode} className="theme-toggle">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/login?admin=true" className="btn-admin">Admin</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;