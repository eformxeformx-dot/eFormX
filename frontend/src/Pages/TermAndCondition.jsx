import React, { useState } from 'react';
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
    // ... (rest of sections)
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
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <main className="max-w-5xl mx-auto px-4 md:px-12">
        {/* Page Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-secondary/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-secondary/5 rotate-3 hover:rotate-0 transition-transform duration-500">
            <FiFileText size={44} className="text-secondary" />
          </div>
          <h1 className="text-5xl font-display font-black text-primary tracking-tight mb-4">Terms & Conditions</h1>
          <div className="flex items-center justify-center gap-2 text-muted font-medium bg-white w-max mx-auto px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
            <FiInfo className="text-secondary" />
            <span>Last Updated: January 2026</span>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <div className="space-y-6">
          
          {/* English Section */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-secondary/5">
            <button 
              onClick={() => setIsEnglishOpen(!isEnglishOpen)}
              className="w-full bg-primary px-10 py-8 flex justify-between items-center text-white text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                  <FiShield size={28} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Terms & Conditions</h3>
                  <p className="text-slate-400 text-sm font-medium">Agreement for English Speakers</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isEnglishOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <FiChevronDown className={`w-8 h-8 ${isEnglishOpen ? 'text-secondary' : 'text-slate-400'}`} />
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
                  <div className="p-10 text-slate-600 leading-relaxed space-y-10">
                    <div className="relative p-8 rounded-3xl bg-secondary/5 border-l-8 border-secondary overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <FiFileText size={100} />
                      </div>
                      <p className="italic text-xl text-primary font-bold relative z-10">
                        These Terms & Conditions govern the use of the EFORMX application and website operated by EFORMX Digital Solutions Pvt. Ltd. By accessing or using our platform, you agree to comply with and be legally bound by these terms.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                      {sections.map((section, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="space-y-4 group p-6 rounded-3xl hover:bg-slate-50 transition-colors"
                        >
                          <h4 className="font-black text-primary text-xl flex items-center gap-3">
                            <span className="bg-secondary/10 text-secondary w-10 h-10 rounded-xl flex items-center justify-center text-sm shadow-sm group-hover:bg-secondary group-hover:text-white transition-all">
                              {idx + 1}
                            </span>
                            {section.title.split('. ')[1]}
                          </h4>
                          {section.content && <p className="text-muted leading-relaxed font-medium">{section.content}</p>}
                          {section.list && (
                            <ul className="space-y-3">
                              {section.list.map((item, i) => (
                                <li key={i} className="flex gap-3 text-muted font-medium">
                                  <div className="w-2 h-2 rounded-full bg-secondary/30 mt-2.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-10 border-t border-slate-100 bg-slate-50 -mx-10 px-10 pb-10">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                          <h4 className="font-black text-primary text-2xl mb-2 tracking-tight">Questions about these Terms?</h4>
                          <p className="text-muted font-medium">Our legal team is here to help you understand our agreement.</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <a href="mailto:support@eformx.com" className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-100 font-bold text-primary hover:bg-secondary hover:text-white transition-all">
                            Email Support
                          </a>
                          <a href="https://www.eformx.com" className="bg-primary px-8 py-4 rounded-2xl shadow-lg font-bold text-white hover:shadow-secondary/20 transition-all">
                            Official Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hindi Section */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <button 
              onClick={() => setIsHindiOpen(!isHindiOpen)}
              className="w-full bg-slate-50 px-10 py-8 flex justify-between items-center text-primary text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-slate-200 p-3 rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all">
                  <FiFileText size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">नियम और शर्तें (Hindi)</h3>
                  <p className="text-slate-400 text-sm font-medium">हिंदी भाषी उपयोगकर्ताओं के लिए समझौता</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isHindiOpen ? 180 : 0 }}
              >
                <FiChevronDown className={`w-8 h-8 ${isHindiOpen ? 'text-secondary' : 'text-slate-300'}`} />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isHindiOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-slate-50/50"
                >
                  <div className="p-16 text-center space-y-6">
                    <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2rem] border border-white max-w-2xl mx-auto shadow-sm">
                      <FiInfo className="w-12 h-12 text-secondary mx-auto mb-4 opacity-50" />
                      <p className="text-slate-600 text-xl font-medium leading-relaxed">
                        नियमों और शर्तों का हिंदी संस्करण अनुरोध पर या इस दस्तावेज़ के डाउनलोड करने योग्य PDF संस्करण में उपलब्ध है। हम इसे जल्द ही यहाँ अपडेट करेंगे।
                      </p>
                      <button className="mt-8 btn-primary px-10">
                        PDF डाउनलोड करें
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermAndCondition;

