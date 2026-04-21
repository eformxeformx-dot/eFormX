import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import ServiceCard from '../Components/ServiceCard';
import { motion } from 'framer-motion';
import { FiUsers, FiBookOpen, FiShield, FiFileText, FiEdit3, FiBriefcase, FiHome, FiCheckCircle } from 'react-icons/fi';
import { FaGraduationCap, FaGavel } from 'react-icons/fa';
import { fetchService, applyService } from '../services/Api';

const Dashboard = () => {
  const handleApply = async (serviceName) => {
    try {
      // For now, using a placeholder apply_id (can be dynamic later)
      const res = await applyService(serviceName, `APP_${Date.now()}`);
      if (res.status) {
        alert(`Successfully applied for ${serviceName}! 🚀`);
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      console.error("Application failed:", error);
      alert("Failed to apply. Please try again.");
    }
  };

  const services = [
    { icon: <FiUsers />, title: "All Vacancy", type: "all_vacancy", hindiTitle: "अन्य स्थानीय नौकरियाँ", ctaText: "View" },
    { icon: <FaGraduationCap />, title: "Scholarship", type: "scholarship", hindiTitle: "स्कॉलरशिप से जुड़ी सेवा", ctaText: "Open" },
    { icon: <FaGavel />, title: "Legal Services", type: "legal", hindiTitle: "स्टाम्प • एग्रीमेंट", ctaText: "Get Service" },
    { icon: <FiShield />, title: "Insurance Service", type: "insurance", hindiTitle: "बीमा सेवा", ctaText: "Apply" },
    { icon: <FiFileText />, title: "Document Filling", type: "doc_filling", hindiTitle: "PAN • Income • Caste फॉर्म", ctaText: "Submit" },
    { icon: <FiEdit3 />, title: "Resume Builder", type: "resume", hindiTitle: "प्रोफेशनल रेज़्यूमे सेवा", ctaText: "Create" },
    { icon: <FiHome />, title: "Company Registration", type: "company_reg", hindiTitle: "कंपनी पंजीकरण सेवा", ctaText: "Apply" },
    { icon: <FiBriefcase />, title: "Business Support", type: "msme", hindiTitle: "MSME • GST • Documentation", ctaText: "Support" },
    { icon: <FiBookOpen />, title: "College Admission", type: "admission", hindiTitle: "फॉर्म • काउंसलिंग • सहायता", ctaText: "Apply" },
    { icon: <FiCheckCircle />, title: "Document Verification", type: "verification", hindiTitle: "दस्तावेज़ सत्यापन सेवा", ctaText: "Verify" }
  ];

  // Logic to show appropriate cards based on screen size
  const getLimit = () => {
    const width = window.innerWidth;
    if (width < 1024) return 6; // mobile and tablet
    return 10; // desktop and above
  };

  const [limit, setLimit] = React.useState(getLimit());

  React.useEffect(() => {
    const handleResize = () => {
      setLimit(getLimit());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 max-w-[100vw] overflow-x-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 text-center"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-purple tracking-tight mb-3 sm:mb-4 text-center">
            Our Services / हमारी सेवाएँ
          </h1>
          <div className="h-1 sm:h-1.5 w-16 sm:w-20 md:w-24 bg-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 w-full">

          {services.slice(0, limit).map((service, idx) => (
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
                onClick={() => handleApply(service.type || service.title)}
              />
            </motion.div>
          ))}
        </div>
        
        {services.length > limit && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setLimit(services.length)}
              className="bg-purple text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-secondary transition-all shadow-lg"
            >
              View All Services
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};


export default Dashboard;
