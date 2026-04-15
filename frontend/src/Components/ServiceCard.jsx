import React from 'react'
import { motion } from 'framer-motion'

const ServiceCard = ({ icon, title, hindiTitle, ctaText, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col items-start text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-20px_rgba(111,44,242,0.15)] transition-all border border-slate-100 h-full relative group overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Icon Box */}
      <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-slate-50 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-purple/5 transition-colors">
        <span className="text-2xl md:text-4xl text-slate-800 drop-shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>

      {/* Text Content */}
      <div className="flex-1 space-y-1 md:space-y-2 mb-6 md:mb-8">
        <h3 className="text-lg md:text-3xl font-black text-slate-900 tracking-tight leading-tight line-clamp-2 md:line-clamp-none">
          {title}
        </h3>
        <p className="text-[10px] md:text-base font-hindi font-bold text-purple opacity-70 tracking-wide uppercase">
          {hindiTitle}
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="w-full py-2.5 md:py-4 rounded-2xl md:rounded-3xl bg-purple text-white font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-purple/20 active:scale-[0.98]"
      >
        {ctaText}
      </button>


      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  )
}

export default ServiceCard
