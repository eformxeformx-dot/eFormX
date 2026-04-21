import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProfile } from '../services/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login');

  // Set initial session expiry (7 days from now)
  const refreshSessionExpiry = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    setSessionExpiry(expiry);
    localStorage.setItem('session_expiry', expiry.toISOString());
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
        // Map the API data structure to a flatter format if needed, 
        // or just store the whole object. The user provided:
        // res.data.kyc.first_name, res.data.wallet.balance, etc.
        setUser(res.data);
        
        // Restore or refresh expiry
        const savedExpiry = localStorage.getItem('session_expiry');
        if (savedExpiry) {
          const expiryDate = new Date(savedExpiry);
          if (expiryDate > new Date()) {
            setSessionExpiry(expiryDate);
          } else {
            refreshSessionExpiry();
          }
        } else {
          refreshSessionExpiry();
        }
      } else {
        // Token might be invalid
        localStorage.removeItem('auth_token');
        localStorage.removeItem('session_expiry');
        setUser(null);
      }
    } catch (error) {
      console.error("Profile fetch failed:", error);
      // Don't logout on network error, only on 401/403 which should be handled in Api.js or here
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
    localStorage.removeItem('session_expiry');
    setUser(null);
    setSessionExpiry(null);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const openLogin = () => {
    setModalType('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setModalType('signup');
    setIsAuthModalOpen(true);
  };

  const openForgotPassword = () => {
    setModalType('forgot-password');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
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
      sessionExpiry,
      isAuthModalOpen,
      modalType,
      openLogin,
      openSignup,
      openForgotPassword,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
