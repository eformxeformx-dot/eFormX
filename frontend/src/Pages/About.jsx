import React from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiGlobe, FiCpu } from 'react-icons/fi';

const About = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-purple/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-purple/5">
            <FiUsers size={44} className="text-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">About eFormX</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">India's Premier Digital Service Aggregator</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
             <div className="flex items-center gap-4 mb-8">
               <FiTarget size={32} className="text-purple" />
               <h3 className="text-2xl font-black text-slate-800 tracking-tight">Our Mission</h3>
             </div>
             <p className="text-slate-500 font-bold leading-relaxed text-sm tracking-wide">
               To simplify complex digital workflows for millions of users by building a bridge between government public interfaces and modern digital solutions.
             </p>
          </div>

          <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
             <div className="flex items-center gap-4 mb-8">
               <FiCpu size={32} className="text-purple" />
               <h3 className="text-2xl font-black text-slate-800 tracking-tight">The Technology</h3>
             </div>
             <p className="text-slate-500 font-bold leading-relaxed text-sm tracking-wide">
               Leveraging cloud infrastructure and secure data protocols to provide a fast, reliable, and user-friendly agency experience.
             </p>
          </div>

          <div className="md:col-span-2 bg-[#0f172a] p-12 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700">
               <FiGlobe size={200} />
            </div>
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-3xl font-black tracking-tight mb-6">Built for the Future of India</h3>
              <p className="text-slate-400 font-bold text-base leading-relaxed mb-8">
                eFormX Digital Solutions Pvt. Ltd. was founded on the idea that digital India should be accessible to everyone, regardless of their technical expertise. We provide the tools and support needed to navigate the digital landscape with confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-2 rounded-2xl bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest">Digital Inclusion</div>
                 <div className="px-6 py-2 rounded-2xl bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest">Secure Infrastructure</div>
                 <div className="px-6 py-2 rounded-2xl bg-white/10 border border-white/5 text-xs font-black uppercase tracking-widest">Nationwide Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;