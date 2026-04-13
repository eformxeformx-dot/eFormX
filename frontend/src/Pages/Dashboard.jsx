import React, { useState, useEffect } from 'react'
import Sidebar from '../../src/Components/Sidebar'
import DashboardNavbar from '../../src/Components/DashboardNavbar'
import ServiceCard from '../../src/Components/ServiceCard'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers, FiBookOpen, FiShield, FiFileText, FiEdit3, FiBriefcase, FiHome, FiCheckCircle } from 'react-icons/fi'
import { FaGraduationCap, FaGavel } from 'react-icons/fa'

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setShowSidebar(false);
        setIsSidebarCollapsed(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      icon: <FiUsers />,
      title: "All Vacancy",
      hindiTitle: "Other local job services",
      ctaText: "View"
    },
    // ... rest of services
    {
      icon: <FaGraduationCap />,
      title: "Scholarship",
      hindiTitle: "Scholarship-related services",
      ctaText: "Open"
    },
    {
      icon: <FaGavel />,
      title: "Legal Services",
      hindiTitle: "Stamp paper & agreements",
      ctaText: "Get Service"
    },
    {
      icon: <FiShield />,
      title: "Insurance Service",
      hindiTitle: "Insurance services",
      ctaText: "Apply"
    },
    {
      icon: <FiFileText />,
      title: "Document Filling",
      hindiTitle: "PAN, Income,& Caste Certificate",
      ctaText: "Submit"
    },
    {
      icon: <FiEdit3 />,
      title: "Resume Builder",
      hindiTitle: "Professional resume services",
      ctaText: "Create"
    },
    {
      icon: <FiHome />,
      title: "Company Registration",
      hindiTitle: "Company registration services",
      ctaText: "Apply"
    },
    {
      icon: <FiBriefcase />,
      title: "Business Support",
      hindiTitle: "MSME,GST,Documentation",
      ctaText: "Support"
    },
    {
      icon: <FiBookOpen />,
      title: "College Admission",
      hindiTitle: "Forms, counseling, and assistance",
      ctaText: "Apply"
    },
    {
      icon: <FiCheckCircle />,
      title: "Document Verification",
      hindiTitle: "Document verification services",
      ctaText: "Verify"
    }
  ]

  return (
    <div className="bg-light min-h-screen">
      {/* Mobile Overlay */}
      {isMobile && showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar - Fixed on mobile, static on desktop */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'fixed left-0 top-0 z-50'} 
        transition-transform duration-500 ease-in-out 
        ${isMobile ? (showSidebar ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}>
        <Sidebar 
          isCollapsed={isMobile ? false : isSidebarCollapsed} 
          toggleSidebar={() => {
            if (isMobile) {
              setShowSidebar(false);
            } else {
              setIsSidebarCollapsed(!isSidebarCollapsed);
            }
          }}
          isMobile={isMobile}
          onClose={() => setShowSidebar(false)}
        />
      </div>
      
      {/* Main Content */}
      <div className={`transition-all duration-500 ease-in-out min-h-screen flex flex-col ${
        isMobile 
          ? 'ml-0' 
          : isSidebarCollapsed 
            ? 'ml-24' 
            : 'ml-80'
      }`}>
        <DashboardNavbar onMenuClick={() => setShowSidebar(!showSidebar)} isMobile={isMobile} />
        
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" text-center lg:text-left"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 border-b border-gray-200 pb-6">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tighter">
                  Our Services
                </h1>
                <p className="text-muted font-bold tracking-widest uppercase text-xs sm:text-sm">
                  Choose a service to get started
                </p>
              </div>
              
              <div className="text-center lg:text-right">
                <h2 className="text-2xl sm:text-3xl font-hindi font-black text-secondary leading-tight">
                  EFORMX डिजिटल सेवाएँ
                </h2>
                <p className="text-muted font-medium text-xs sm:text-sm">India's leading service aggregator</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ServiceCard 
                  icon={service.icon}
                  title={service.title}
                  hindiTitle={service.hindiTitle}
                  ctaText={service.ctaText}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <footer className="mt-auto p-4 sm:p-6 md:p-10 text-center text-muted text-xs sm:text-sm font-bold border-t border-slate-100 bg-white/50 backdrop-blur-sm">
          &copy; 2026 eFormX Digital Solutions Pvt. Ltd. | Designed with ❤️ for India
        </footer>
      </div>
    </div>
  )
}

export default Dashboard
