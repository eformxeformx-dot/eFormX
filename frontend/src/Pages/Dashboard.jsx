import React, { useState } from 'react'
import Sidebar from '../../src/Components/Sidebar'
import DashboardNavbar from '../../src/Components/DashboardNavbar'
import ServiceCard from '../../src/Components/ServiceCard'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers, FiBookOpen, FiShield, FiFileText, FiEdit3, FiBriefcase, FiHome, FiCheckCircle } from 'react-icons/fi'
import { FaGraduationCap, FaGavel } from 'react-icons/fa'

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const services = [
    {
      icon: <FiUsers />,
      title: "All Vacancy",
      hindiTitle: "अन्य स्थानीय नौकरियाँ",
      ctaText: "View"
    },
    // ... rest of services
    {
      icon: <FaGraduationCap />,
      title: "Scholarship",
      hindiTitle: "स्कॉलरशिप से जुड़ी सेवा",
      ctaText: "Open"
    },
    {
      icon: <FaGavel />,
      title: "Legal Services",
      hindiTitle: "स्टाम्प • एग्रीमेंट",
      ctaText: "Get Service"
    },
    {
      icon: <FiShield />,
      title: "Insurance Service",
      hindiTitle: "बीमा सेवा",
      ctaText: "Apply"
    },
    {
      icon: <FiFileText />,
      title: "Document Filling",
      hindiTitle: "PAN • Income • Caste फॉर्म",
      ctaText: "Submit"
    },
    {
      icon: <FiEdit3 />,
      title: "Resume Builder",
      hindiTitle: "प्रोफेशनल रेज़्यूमे सेवा",
      ctaText: "Create"
    },
    {
      icon: <FiHome />,
      title: "Company Registration",
      hindiTitle: "कंपनी पंजीकरण सेवा",
      ctaText: "Apply"
    },
    {
      icon: <FiBriefcase />,
      title: "Business Support",
      hindiTitle: "MSME • GST • Documentation",
      ctaText: "Support"
    },
    {
      icon: <FiBookOpen />,
      title: "College Admission",
      hindiTitle: "फॉर्म • काउंसलिंग • सहायता",
      ctaText: "Apply"
    },
    {
      icon: <FiCheckCircle />,
      title: "Document Verification",
      hindiTitle: "दस्तावेज़ सत्यापन सेवा",
      ctaText: "Verify"
    }
  ]

  return (
    <div className="flex bg-[#f8fafc] min-h-screen overflow-x-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <main className={`flex-1 transition-all duration-500 ease-in-out min-h-screen flex flex-col ${isSidebarCollapsed ? 'ml-24' : 'ml-80'}`}>
        <DashboardNavbar />
        
        <div className="p-10 lg:p-14">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14 text-center lg:text-left"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-200 pb-10">
              <div className="space-y-2">
                <h1 className="text-5xl font-black text-slate-800 tracking-tighter">
                  Our Services
                </h1>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">
                  Choose a service to get started
                </p>
              </div>
              
              <div className="text-center lg:text-right">
                <h2 className="text-3xl font-hindi font-black text-secondary leading-tight">
                  EFORMX डिजिटल सेवाएँ
                </h2>
                <p className="text-slate-400 font-medium">India's leading service aggregator</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
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

        <footer className="mt-auto p-10 text-center text-slate-400 text-sm font-bold border-t border-slate-100 bg-white/50 backdrop-blur-sm">
          &copy; 2026 eFormX Digital Solutions Pvt. Ltd. | Designed with ❤️ for India
        </footer>
      </main>
    </div>
  )
}

export default Dashboard
