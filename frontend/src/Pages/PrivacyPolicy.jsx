import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiServer } from 'react-icons/fi';

const PrivacyPolicy = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-purple/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-purple/5">
            <FiShield size={44} className="text-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Your data security is our top priority</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <FiLock />, title: "Data Collection", content: "We collect personal information such as name, email, and phone number only for the purpose of provide digital assistance and service facilitation." },
            { icon: <FiEye />, title: "Confidentiality", content: "Your data is treated with strict confidentiality and is never sold or shared with third parties for marketing purposes." },
            { icon: <FiServer />, title: "Security Measures", content: "We implement industry-standard security protocols to protect your information from unauthorized access or disclosure." },
            { icon: <FiShield />, title: "Legal Compliance", content: "Our data practices comply with the applicable data protection laws in India." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-purple/10 transition-shadow"
            >
              <div className="w-12 h-12 bg-purple/10 text-purple rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-4">{item.title}</h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrivacyPolicy;
