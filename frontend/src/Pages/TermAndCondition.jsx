import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { FiChevronDown, FiShield, FiFileText, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const TermAndCondition = () => {
  const [isEnglishOpen, setIsEnglishOpen] = useState(true);
  const [isHindiOpen, setIsHindiOpen] = useState(false);

  const sections = [
    {
      title: "1. Nature of Service",
      content: "EFORMX is a private Digital Service Aggregator platform that provides digital assistance, information display, and form-filling support based on publicly available data from official government websites. We are not affiliated with any government authority and do not provide official government services or guarantees of approval, jobs, certificates, or benefits."
    },
    {
      title: "2. User Responsibilities",
      list: [
        "Provide accurate, complete, and updated information.",
        "Do not submit false, forged, or misleading documents.",
        "Do not misuse the platform for illegal or fraudulent activities.",
        "You are responsible for maintaining the confidentiality of your account credentials."
      ]
    },
    {
      title: "3. Payments & Fees",
      content: "Fees charged by EFORMX are for digital assistance and service facilitation only. Payments are generally non-refundable unless otherwise specified in the refund policy or required under applicable law."
    },
    {
      title: "4. Account & KYC Verification",
      content: "Certain services may require identity verification (KYC). Users agree to provide necessary documents for verification. Failure to comply may result in service limitations or account suspension."
    },
    {
      title: "5. Limitation of Liability",
      content: "EFORMX shall not be responsible for any delays, rejections, decisions, losses, or damages arising from actions or decisions taken by government authorities, third-party service providers, or external systems."
    },
    {
      title: "6. Data Usage",
      content: "User data is collected, processed, and stored in accordance with our Privacy Policy."
    },
    {
      title: "7. Account Suspension or Termination",
      content: "We reserve the right to suspend or terminate user accounts without prior notice if users violate these terms, provide false information, or engage in unlawful activity."
    },
    {
      title: "8. Intellectual Property",
      content: "All platform content, design, branding, and materials belong to EFORMX Digital Solutions Pvt. Ltd. and may not be copied, reproduced, or distributed without permission."
    },
    {
      title: "9. Changes to Terms",
      content: "We reserve the right to update or modify these terms at any time. Continued use of the platform constitutes acceptance of updated terms."
    },
    {
      title: "10. Governing Law",
      content: "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of competent courts in India."
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-purple/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-purple/5 rotate-3 hover:rotate-0 transition-transform duration-500">
            <FiFileText size={44} className="text-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Terms & Conditions</h1>
          <div className="flex items-center justify-center gap-2 text-slate-400 font-bold bg-white w-max mx-auto px-6 py-2 rounded-full shadow-sm border border-slate-100 uppercase tracking-widest text-[10px]">
            <FiInfo className="text-purple" />
            <span>Last Updated: January 2026</span>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <div className="space-y-6">
          {/* English Section */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-purple/5">
            <button 
              onClick={() => setIsEnglishOpen(!isEnglishOpen)}
              className="w-full bg-[#0f172a] px-10 py-8 flex justify-between items-center text-white text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                  <FiShield size={28} className="text-purple" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black">Terms & Conditions</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Agreement for English Speakers</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isEnglishOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <FiChevronDown className={`w-8 h-8 ${isEnglishOpen ? 'text-purple' : 'text-slate-400'}`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isEnglishOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 md:p-12 text-slate-600 leading-relaxed space-y-10">
                    <div className="relative p-8 rounded-3xl bg-purple/5 border-l-8 border-purple overflow-hidden">
                      <p className="italic text-lg md:text-xl text-slate-800 font-bold relative z-10">
                        These Terms & Conditions govern the use of the EFORMX platform. By accessing or using our services, you agree to comply with and be legally bound by these terms.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                      {sections.map((section, idx) => (
                        <motion.div 
                          key={idx} 
                          className="space-y-4 group p-6 rounded-3xl hover:bg-slate-50 transition-colors"
                        >
                          <h4 className="font-black text-slate-800 text-xl flex items-center gap-3">
                            <span className="bg-purple/10 text-purple w-10 h-10 rounded-xl flex items-center justify-center text-sm shadow-sm group-hover:bg-purple group-hover:text-white transition-all font-black">
                              {idx + 1}
                            </span>
                            {section.title.split('. ')[1]}
                          </h4>
                          {section.content && <p className="text-slate-500 leading-relaxed font-bold text-sm tracking-wide">{section.content}</p>}
                          {section.list && (
                            <ul className="space-y-3">
                              {section.list.map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-500 font-bold text-sm tracking-wide">
                                  <div className="w-2 h-2 rounded-full bg-purple/30 mt-2 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TermAndCondition;
