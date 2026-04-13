import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import DashboardNavbar from '../Components/DashboardNavbar';
import AuthModal from '../Components/Auth/AuthModal';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalType, setModalType] = useState('login');
  
  const { user } = useAuth();

  const openModal = (type) => {
    setModalType(type);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen overflow-x-hidden relative">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        type={modalType}
      />

      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className={`flex-1 transition-all duration-500 ease-in-out min-h-screen flex flex-col ${isSidebarCollapsed ? 'lg:ml-[96px]' : 'lg:ml-[300px]'} ${isAuthModalOpen ? 'blur-md' : ''}`}>
        <DashboardNavbar 
          onLoginClick={() => openModal('login')} 
          onSignupClick={() => openModal('signup')}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Global Announcement Banner */}
        <div className="bg-yellow-400 text-black py-2.5 px-8 text-center font-bold text-sm tracking-wide shadow-sm flex items-center justify-center gap-2">
          <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] uppercase">New</span>
          Scale your operations with eFormx infrastructure! Check out our new features.
        </div>
        
        <div className="flex-1">
          {children}
        </div>

        <footer className="mt-auto p-10 text-center text-slate-400 text-sm font-bold border-t border-slate-100 bg-white/50 backdrop-blur-sm">
          &copy; 2026 eFormX Digital Solutions Pvt. Ltd. | Designed with ❤️ for India
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
