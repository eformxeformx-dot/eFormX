import React from 'react'
import { motion } from 'framer-motion'

const ServiceCard = ({ icon, title, hindiTitle, ctaText, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-xl md:rounded-2xl lg:rounded-[2rem] p-2.5 sm:p-3 md:p-5 lg:p-6 flex flex-col items-start text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-20px_rgba(111,44,242,0.15)] transition-all border border-slate-100 h-full relative group overflow-hidden cursor-pointer w-full"
      onClick={onClick}
    >
      {/* Icon Box */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl bg-slate-50 flex items-center justify-center mb-2 sm:mb-2.5 md:mb-4 lg:mb-5 group-hover:bg-purple/5 transition-colors flex-shrink-0">
        <span className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-slate-800 drop-shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>

      {/* Text Content */}
      <div className="flex-1 space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2 mb-2 sm:mb-2.5 md:mb-4 lg:mb-5 w-full min-w-0">
        <h3 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-black text-slate-900 tracking-tight leading-tight line-clamp-2 break-words">
          {title}
        </h3>
        <p className="text-[7px] sm:text-[8px] md:text-[11px] lg:text-xs xl:text-sm font-hindi font-bold text-purple opacity-70 tracking-wide uppercase truncate">
          {hindiTitle}
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="w-full py-1.5 sm:py-2 md:py-2.5 lg:py-3 rounded-lg sm:rounded-xl md:rounded-2xl bg-purple text-white font-black text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm uppercase tracking-wider lg:tracking-widest hover:bg-secondary transition-all shadow-lg shadow-purple/20 active:scale-[0.98] flex-shrink-0"
      >
        {ctaText}
      </button>


      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple/40 to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  )
}

export default ServiceCard
