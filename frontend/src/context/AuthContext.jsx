import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProfile } from '../services/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  // Set initial mock expiry (4 hours from now)
  const refreshSessionExpiry = () => {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 4);
    setSessionExpiry(expiry);
  };

  // Check for existing token and fetch profile on load
  const loadProfile = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetchProfile();
      if (res.status) {
        setUser(res.data);
        refreshSessionExpiry();
      } else {
        // Token might be invalid
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error("Profile fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('auth_token', token);
    setUser(userData);
    refreshSessionExpiry();
    // Refresh profile to get latest balance etc.
    loadProfile();
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setSessionExpiry(null);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout, 
      refreshProfile: loadProfile,
      isSidebarCollapsed,
      toggleSidebar,
      sessionExpiry
    }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => useContext(AuthContext);
