import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import DashboardNavbar from '../Components/DashboardNavbar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user, isSidebarCollapsed, toggleSidebar, openLogin, openSignup, isAuthModalOpen } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex bg-[#f8fafc] min-h-screen overflow-x-hidden relative">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
      
      <main className={`flex-1 transition-all duration-500 ease-in-out min-h-screen flex flex-col ${isSidebarCollapsed ? 'xl:ml-[96px]' : 'xl:ml-[300px]'} ${isAuthModalOpen ? 'blur-md' : ''}`}>
        <DashboardNavbar 
          onLoginClick={openLogin} 
          onSignupClick={openSignup}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />


        {/* Global Announcement Banner */}
        <div className="bg-yellow-400 text-black py-2.5 px-8 text-center font-bold text-sm tracking-wide shadow-sm flex items-center justify-center gap-2">
          <div className='flex gap-2 items-center animate-marquee whitespace-nowrap'>
          <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] uppercase">New</span>
          <p>Scale your operations with eFormx infrastructure! Check out our new features.</p>
          </div>
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
