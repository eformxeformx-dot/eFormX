import React from 'react'

const ServiceCard = ({ icon, title, hindiTitle, subtitle, hindiSubtitle, ctaText, themeColor = "purple" }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 hover:shadow-[0_40px_80px_rgba(109,40,217,0.12)] transition-all duration-500 group flex flex-col items-center text-center">
      <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-purple/10 transition-colors`}>
        <span className="text-3xl text-slate-700 group-hover:text-purple transition-colors">
          {icon}
        </span>
      </div>
      
      <div className="space-y-1 mb-8">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 font-medium">{hindiTitle}</p>
        <div className="pt-2">
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{subtitle}</p>
           <p className="text-[10px] text-slate-400 font-bold">{hindiSubtitle}</p>
        </div>
      </div>

      <button className="mt-auto w-full py-3.5 rounded-2xl bg-purple text-white font-bold text-sm shadow-lg shadow-purple/20 hover:bg-[#5b21b6] hover:scale-[1.02] active:scale-95 transition-all">
        {ctaText}
      </button>
    </div>
  )
}

export default ServiceCard
