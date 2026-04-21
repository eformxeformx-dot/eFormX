import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiInfo, FiExternalLink } from 'react-icons/fi';

const Disclaimer = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-amber-400/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-amber-400/5 rotate-12">
            <FiAlertTriangle size={44} className="text-amber-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Disclaimer</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Important Information for all users</p>
        </motion.div>

        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 space-y-12">
          <div className="flex gap-6 items-start">
            <div className="bg-amber-500/10 p-4 rounded-2xl flex-shrink-0">
              <FiInfo className="text-amber-600" size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-800">Not a Government Entity</h3>
              <p className="text-slate-500 font-bold leading-relaxed text-sm">
                EFORMX is an independent digital service aggregator. We are NOT an official government website, and we are NOT affiliated with any government department, agency, or ministry.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div className="space-y-4">
              <h4 className="font-black text-slate-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Information Accuracy
              </h4>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-wider leading-relaxed">
                While we strive for accuracy, the information on this platform is for general informational purposes only. We rely on public government portals and cannot guarantee real-time updates.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-black text-slate-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                External Links
              </h4>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-wider leading-relaxed">
                Our platform may redirect users to official websites. EFORMX has no control over the content or policies of these external sites.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 flex items-center gap-6 group hover:bg-amber-50 transition-colors">
            <FiExternalLink className="text-slate-300 group-hover:text-amber-500 transition-colors" size={24} />
            <p className="text-slate-400 font-bold text-xs leading-relaxed">
              By using this platform, you acknowledge that all registration, application, or informational services are provided at your own discretion.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Disclaimer;
