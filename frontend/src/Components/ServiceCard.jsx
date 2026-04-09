import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const ServiceCard = ({ icon, title, hindiTitle, subtitle, hindiSubtitle, ctaText, themeColor = "secondary" }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Main Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white shadow-xl shadow-slate-200/50 flex flex-col items-center text-center h-full overflow-hidden">
        
        {/* Animated Background Pulse */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

        {/* Icon Container */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-[1.8rem] bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner group-hover:bg-secondary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
            <span className="text-4xl text-slate-700 group-hover:text-white transition-colors">
              {icon}
            </span>
          </div>
          <div className="absolute -inset-2 bg-secondary/10 rounded-[2rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        {/* Content Section */}
        <div className="space-y-3 mb-10 flex-1">
          <h3 className="text-2xl font-black text-slate-800 tracking-tighter leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm font-hindi font-bold text-secondary opacity-80">
            {hindiTitle}
          </p>
          
          {(subtitle || hindiSubtitle) && (
            <div className="pt-4 space-y-1">
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{subtitle}</p>
               <p className="text-[10px] text-slate-300 font-bold">{hindiSubtitle}</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button className="relative w-full py-4 rounded-2xl bg-slate-900 overflow-hidden group/btn transition-all active:scale-95 shadow-2xl shadow-slate-900/20">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          <span className="relative z-10 text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3">
            {ctaText}
            <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </span>
        </button>

        {/* Glass Reflection */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-tr from-white/20 to-transparent"></div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
