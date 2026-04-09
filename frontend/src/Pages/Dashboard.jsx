import React from 'react'
import Sidebar from '../../src/Components/Sidebar'
import DashboardNavbar from '../../src/Components/DashboardNavbar'
import ServiceCard from '../../src/Components/ServiceCard'
import { FiUsers, FiBookOpen, FiShield, FiFileText, FiEdit3, FiBriefcase, FiHome, FiCheckCircle } from 'react-icons/fi'
import { FaGraduationCap, FaGavel } from 'react-icons/fa'

const Dashboard = () => {
  const services = [
    {
      icon: <FiUsers />,
      title: "All Vacancy",
      hindiTitle: "अन्य स्थानीय नौकरियाँ",
      ctaText: "View"
    },
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
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-80 min-h-screen flex flex-col">
        <DashboardNavbar />
        
        <div className="p-8 md:p-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-4">
              Our Services <span className="text-purple-200">/</span> <span className="font-hindi text-purple">हमारी सेवाएँ</span>
            </h1>
            <div className="w-24 h-1.5 bg-purple mx-auto mt-4 rounded-full opacity-20"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <ServiceCard 
                key={idx}
                icon={service.icon}
                title={service.title}
                hindiTitle={service.hindiTitle}
                ctaText={service.ctaText}
              />
            ))}
          </div>
        </div>

        <footer className="mt-auto p-8 text-center text-slate-400 text-sm font-medium border-t border-slate-100">
          &copy; 2026 eFormX Digital Solutions Pvt. Ltd. All rights reserved.
        </footer>
      </main>
    </div>
  )
}

export default Dashboard
