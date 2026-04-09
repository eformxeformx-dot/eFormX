import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiAlertTriangle, FiSearch } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-texture">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
        
        {/* Visual Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 lg:order-1"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative z-10 text-center">
            <h1 className="text-[12rem] md:text-[18rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-secondary opacity-10">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 ring-4 ring-slate-50 relative"
              >
                <FiAlertTriangle size={120} className="text-secondary" />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-3xl shadow-xl">
                  <FiAlertTriangle size={32} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center lg:text-left order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-black text-sm tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            ERROR 404
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-black text-primary mb-8 leading-tight tracking-tight">
            Oops! This page has <span className="text-secondary">vanished.</span>
          </h2>
          
          <p className="text-slate-500 text-xl font-medium mb-12 max-w-lg leading-relaxed">
            The link you followed might be broken, or the page may have been moved to a new destination in our digital ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <NavLink
              to="/"
              className="group bg-primary text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/30 hover:shadow-secondary/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3"
            >
              <FiHome />
              Back to Home
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </NavLink>
            
            <NavLink
              to="/help"
              className="px-10 py-5 rounded-[2rem] font-black text-lg text-primary hover:bg-slate-200/50 flex items-center gap-3 transition-all"
            >
              <FiSearch />
              Help Center
            </NavLink>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-200">
            <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mb-6">Suggested Links:</p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {['Services', 'Features', 'Pricing', 'Contact'].map((link) => (
                <NavLink 
                  key={link}
                  to={`/${link.toLowerCase()}`}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-slate-500 font-bold hover:border-secondary hover:text-secondary transition-all"
                >
                  {link}
                </NavLink>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFoundPage;
