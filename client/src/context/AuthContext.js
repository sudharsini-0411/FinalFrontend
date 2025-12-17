import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/api';
import { clearUserData, clearGlobalData } from '../utils/userDataIsolation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Clear old global data on app start
  useEffect(() => {
    clearGlobalData();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await apiService.login(credentials);
      console.log('Login response:', response);
      const { token, user: userData } = response;
      
      localStorage.setItem('token', token);
      
      // Check if admin credentials
      if (credentials.email === 'sudharsini.r2024aids@sece.ac.in') {
        setUser({ ...userData, role: 'admin' });
      } else {
        setUser({ ...userData, role: 'user' });
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      // Show user-friendly error message
      if (error.message.includes('Backend server is not running')) {
        console.warn('Backend not available, using demo mode');
        // Still allow login in demo mode
        const demoUser = {
          id: 'demo',
          name: credentials.email === 'sudharsini.r2024aids@sece.ac.in' ? 'Admin' : 'Demo User',
          email: credentials.email,
          role: credentials.email === 'sudharsini.r2024aids@sece.ac.in' ? 'admin' : 'user'
        };
        localStorage.setItem('token', 'demo-token');
        setUser(demoUser);
        return { token: 'demo-token', user: demoUser };
      }
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiService.register(userData);
      const { token, user } = response;
      
      localStorage.setItem('token', token);
      setUser({ ...user, role: 'user' });
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const logout = () => {
    // Clear user-specific data
    if (user?.id) {
      clearUserData(user.id);
    }
    localStorage.removeItem('token');
    clearGlobalData(); // Clear any old global data
    setUser(null);
  };

  const updateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;