import React from 'react'
import { motion } from 'framer-motion'

const ServiceCard = ({ icon, title, hindiTitle, ctaText, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col items-start text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-20px_rgba(111,44,242,0.15)] transition-all border border-slate-100 h-full relative group overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* ... icon box ... */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-purple/5 transition-colors">
        <span className="text-3xl md:text-4xl text-slate-800 drop-shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>

      {/* Text Content */}
      <div className="flex-1 space-y-2 mb-8">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base font-hindi font-bold text-purple opacity-70 tracking-wide">
          {hindiTitle}
        </p>
      </div>

      {/* Purple Action Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="w-full py-4 rounded-3xl bg-purple text-white font-black text-sm uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-purple/20 active:scale-[0.98]"
      >
        {ctaText}
      </button>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  )
}

export default ServiceCard
